import { MERCHANT_KEY, MERCHANT_EMAIL, MERCHANT_MOBILE } from './../../../config';
import { Injectable } from '@angular/core';
import { Order, Cart, OrderApi } from '../store-sdk';
import { map, switchMap } from 'rxjs/operators';
import { throwError, Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';

export interface SlydeListRequest {
  emailOrMobileNumber?: string;  // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
  merchantKey?: string;  // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
}

export interface SlydeInvoiceRequest {
  emailOrMobileNumber?: string;  // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
  merchantKey?: string;  // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
  amount?: number;
  orderCode?: string;
  description?: string;
  orderItems?: OrderItem[];
  sendInvoice?: boolean;
  payOption?: string; // PayOption shortname field
  payToken?: string;
  customerName?: string;
  customerEmail?: string;
  customerMobileNumber?: string;
}

export interface InvoiceReqestResult {
  orderCode: string;
  paymentCode: string;
  payToken: string;
  description: string;
  qrCodeUrl: string;
  fullDiscountAmount: number;
  discounts: any[];
}

export interface PaymentStatusReq {
  emailOrMobileNumber?: string; // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
  merchantKey?: string;  // NOT OPTIONAL JUST TO HIDE IMPLEMENTATIONS
  orderCode?: string;
  payToken?: string;
  confirmTransaction?: boolean;
  transaction?: boolean;
  transactionId?: string;
}

export interface OrderItem {
  itemCode: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  subTotal: number;
}

export interface PayOption {
  name: string;
  shortName: string;
  maximumAmount: any;
  active: boolean;
  reason: string;
  logourl: string;
}

export interface SlydeResponse {
  success: boolean;
  result: any;
  errorMessage: string;
  errorCode: string;
}

const ERROR_CODES = ['INVALID_MERCHANT_DETAILS', 'INVALID_MERCHANT_KEY', 'USERNOTFOUND', 'INVALID_ORDERCODE',
  'ORDER_NOT_FOUND'];

const PAYMENT_STATUS = ['NEW', 'PENDING', 'CONFIRMED', 'DISPUTED', 'CANCELLED'];


@Injectable({
  providedIn: 'root'
})
export class SlydePayService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  merchantKey = MERCHANT_KEY;
  merchantEmail = MERCHANT_EMAIL;
  merchantNumber = MERCHANT_MOBILE;

  constructor(
    private orderApi: OrderApi,
    private http: HttpClient
  ) {
  }

  /*
      Retrieves a list of all possible payment options on Slydepay
  */
  getSlydePayOptions() {
    const url = 'https://app.slydepay.com.gh/api/merchant/invoice/payoptions';
    const data: SlydeListRequest = {
      emailOrMobileNumber: this.merchantEmail,
      merchantKey: this.merchantKey
    };
    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as PayOption[];
      })
    );
  }

  /**
   * Creates an invoice and sends back slydepay pay token.This web method assumes
   * a simple scenario of passing total transaction amount without complex orderItems
   * array to worry about. If you are used to the SOAP API then the orderItems array
   * which is used can also been used for display purpose only. This returns useful
   * details to enable your customer to complete the payment. One of them is the PayToken
   * that should be used to append to the slydepay payment page url
   * https://app.slydepay.com/paylive/detailsnew.aspx?pay_token. For example if the
   * PayToken is PayTokenGUID the redirect url
   * would be then : https://app.slydepay.com/paylive/detailsnew.aspx?pay_token=PayTokenGUID
   */

  CreateInvoice() {
    const url = 'https://app.slydepay.com.gh/api/merchant/invoice/create';
    // example data
    const data: SlydeInvoiceRequest = {
      emailOrMobileNumber: this.merchantEmail,
      merchantKey: this.merchantKey,
      amount: 100,
      orderCode: 'my-uniquely-generated-order-id',
      description: '',
      orderItems: [
        {
          itemCode: 'qwerty',
          itemName: 'RFC',
          unitPrice: 20,
          quantity: 2,
          subTotal: 40
        },
        {
          itemCode: 'qazxsw',
          itemName: 'POC',
          unitPrice: 60,
          quantity: 1,
          subTotal: 60
        }
      ]
    };
    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as InvoiceReqestResult;
      })
    );
  }


  /**
   * Creates an invoice and sends back slydepay pay token . This is the same web method
   * as the CreateInvoice method but the difference lies in the fact that this assumes
   * that your the merchant wants us to send the invoice to the customer instead of your
   * redirecting the user with the returned token to the slydepay payment url. This method
   * takes few extra parameters in addition to CreateInvoice parameters.
   * It is important to note that in case of Mobile Money payoption, the customer phone number
   * becomes compulsory otherwise a email with the invoice is sent to your customer. When MTN
   *  Mobile Money is the payoption chosen by you or in a form provided to your customer will
   *  receive a bill prompt directly on his/her phone.
   *    For MTN_MONEY, mobile bill prompt will only be sent if your customer has enough money
   *    in his/her wallet to cover the amount in your invoice
   */
  CreateSendInvoice(data: SlydeInvoiceRequest) {
    const url = 'https://app.slydepay.com.gh/api/merchant/invoice/create';
    // inject the merchant details
    if (data) {
      data.emailOrMobileNumber = this.merchantEmail;
      data.merchantKey = this.merchantKey;
    }
    // example data
    // const data: SlydeInvoiceRequest = {
    //     emailOrMobileNumber: 'merchant@awesomecustomer.com',
    //     merchantKey: 'thatkeyyoushouldkeepsecret',
    //     amount: 54.20,
    //     description: 'Invoice for this month bread purchase',
    //     orderCode: 'my-uniquely-generated-order-id',
    //     sendInvoice: true,
    //     payOption: 'MTN_MONEY',
    //     customerName: 'Kojo Monday',
    //     customerMobileNumber: '233244112233'
    // };

    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as InvoiceReqestResult;
      })
    );
  }

  /**
   * This web method can be use to send an invoice priory generated to you customer.
   * There are many ways of using this web method for example a way to retry a failed payment
   *  using a different method this time. A scheduled recurrent invoice generation which
   *  is sent to your customer automatically after been generated by some other background
   * process of yours. The method expect to reference your invoice by the paytoken generated
   * by slydepay for the invoice. What happens when the invoice is sent? if it's anything
   *  aside mobile money, then a mail with an invoice like shown below is sent to your
   *  customer. When your customer clicks on preferred channel of payment and the transaction
   * is completed Slydepay will call your callback url and it falls under same flow you are
   *  used to where you process and call slydepay to either confirm or cancel. If the preferred option of your
   */

  SendInvoice() {
    const url = 'https://app.slydepay.com.gh/api/merchant/invoice/send';
    const data: SlydeInvoiceRequest = {
      emailOrMobileNumber: 'merchant@awesomecustomer.com',
      merchantKey: 'thatkeyyoushouldkeepsecret',
      payToken: 'slydepay-payment-guid-token',
      payOption: 'SLYDEPAY',
      customerName: 'Kojo Monday',
      customerEmail: 'kodjo@awesomemail.com'
    };
    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.success;
      })
    );
  }

  /**
   * Most of the time before processing what payment is made for, you will
   * need to check the status of the payment whether successful callback or not
   * from slydepay. This method is for that and by checking the status you have
   * the opportunity to tell slydepay to confirm payment if status is CONFIRMED.
   *  Below are couples the list of statuses Slydepay uses.
   *   NEW : When there is a an order but no transaction. Happens when in integration mode
   *    or customer abandoned payment
   *   PENDING : When the order is payed for but you have not confirmed it
   *   CONFIRMED: When the payment is confirmed
   *   DISPUTED: When you or Slydepay cancelled the payment
   *   CANCELLED: When your customer raised a dispute on this payment
   */

  checkPaymentStatus(data: PaymentStatusReq) {
    const url = 'https://app.slydepay.com.gh/api/merchant/invoice/checkstatus';
    // const data: PaymentStatusReq = {
    //   emailOrMobileNumber: 'merchant@awesomecustomer.com',
    //   merchantKey: 'thatkeyyoushouldkeepsecret',
    //   orderCode: 'my-uniquely-generated-order-id',
    //   payToken: 'slydepay-payment-guid-token',
    //   confirmTransaction: true
    // };

    // inject the merchant details
    if (data) {
      data.emailOrMobileNumber = this.merchantEmail;
      data.merchantKey = this.merchantKey;
    }

    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as string;
      })
    );
  }


  /**
   * All transaction needs to be confirmed or cancelled.
   * Method to confirm the transaction. Assuming we received payment on your behalf and you
   * are to process what your customer just paid for, after a successful processing from your
   *  side , you need to call this method to confirm the payment so fund collected on your
   * behalf is readily made available on your slydepay account.
   *  Failing to call this method, the transaction status will remain in pending mode.
   */

  confirmTransaction() {
    const url = 'https://app.slydepay.com.gh/api/merchant/transaction/confirm';
    const data: PaymentStatusReq = {
      emailOrMobileNumber: 'merchant@awesomecustomer.com',
      merchantKey: 'thatkeyyoushouldkeepsecret',
      orderCode: 'my-uniquely-generated-order-id',
      payToken: 'slydepay-payment-guid-token',
      transactionId: 'transac_id_from_callback'
    };

    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as string;
      })
    );
  }

  cancelTransaction() {
    const url = 'https://app.slydepay.com.gh/api/merchant/transaction/confirm';
    const data: PaymentStatusReq = {
      emailOrMobileNumber: 'merchant@awesomecustomer.com',
      merchantKey: 'thatkeyyoushouldkeepsecret',
      orderCode: 'my-uniquely-generated-order-id',
      payToken: 'slydepay-payment-guid-token',
      transactionId: 'transac_id_from_callback'
    };

    return this.http.post(url, data, this.httpOptions).pipe(
      map((res: SlydeResponse) => {
        console.log(res);
        return res.result as string;
      })
    );
  }


  // **********************Mocking Services**********************************
  // ************************************************************************
  getSlydePayOptionsMock(): Observable<PayOption[]> {
    return from(new Promise<PayOption[]>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result: [
          {
            name: 'VISA',
            shortName: 'ZENITH_VISA',
            maximumAmount: null,
            active: true,
            reason: null,
            logourl: 'https://app.slydepay.com/images/orderformpage/logo-visa.png'
          },
          {
            name: 'MTN Mobile Money',
            shortName: 'MTN_MONEY',
            maximumAmount: null,
            active: true,
            reason: null,
            logourl: 'https://app.slydepay.com/images/orderformpage/logo-mtn.png'
          },
          {
            name: 'Airtel Money',
            shortName: 'AIRTEL_MONEY',
            maximumAmount: null,
            active: false,
            reason: 'This payment option has been deactivated on Slydepay',
            logourl: 'https://app.slydepay.com/images/orderformpage/logo-airtel.png'
          },
          {
            name: 'Slydepay',
            shortName: 'SLYDEPAY',
            maximumAmount: 20000,
            active: true,
            reason: null,
            logourl: 'https://app.slydepay.com/images/orderformpage/logo-slydepay.png'
          }
        ],
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as PayOption[]);
    }));
  }

  createInvoiceMock() {
    return from(new Promise<InvoiceReqestResult>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result:
        {
          orderCode: 'jfkh7DHl',
          paymentCode: 'l0ky5a',
          payToken: '3e1380dc-177f-4c9b-914b-1c2710b5b278',
          description: null,
          qrCodeUrl: 'https://app.slydepay.com/download/qrcodes/l0ky5a.png',
          fullDiscountAmount: 0,
          discounts: []
        },
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as InvoiceReqestResult);
    }));
  }

  createSendInvoiceMock() {
    return from(new Promise<InvoiceReqestResult>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result:
        {
          orderCode: 'jfkh7DHl',
          paymentCode: 'l0ky5a',
          payToken: '3e1380dc-177f-4c9b-914b-1c2710b5b278',
          description: null,
          qrCodeUrl: 'https://app.slydepay.com/download/qrcodes/l0ky5a.png',
          fullDiscountAmount: 0,
          discounts: []
        },
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as InvoiceReqestResult);
    }));
  }

  sendInvoiceMock() {
    return from(new Promise<boolean>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result: null,
        errorMessage: null,
        errorCode: null
      };
      resolve(res.success);
    }));
  }

  checkPaymentStatusMock() {
    return from(new Promise<string>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result: 'CONFIRMED',
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as string);
    }));
  }

  confirmTransactionMock() {
    return from(new Promise<string>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result: 'CONFIRMED',
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as string);
    }));
  }

  cancelTransactionMock() {
    return from(new Promise<string>(resolve => {
      const res: SlydeResponse = {
        success: true,
        result: 'CANCELLED',
        errorMessage: null,
        errorCode: null
      };
      resolve(res.result as string);
    }));
  }
}
