import { CreateAddressComponent } from './../create-address/create-address.component';
import { AddressComponent } from './../address/address.component';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { User, DeliveryAddress, Address } from 'src/app/models';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-create-delivery-address',
  templateUrl: './create-delivery-address.component.html',
  styleUrls: ['./create-delivery-address.component.scss']
})
export class CreateDeliveryAddressComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  loggedUserDeliveryAddresses: DeliveryAddress[] = [];
  selectedDeliveryAddress: DeliveryAddress = new DeliveryAddress();
  deliveryAddresses: Array<IOption> = [];
  newAddress = false;

  public deliveryForm: FormGroup = this.fb.group({});;
  public address: Address = new Address();

  _isEmail = false;
  _isPhone = false;

  hideForm = false;

  @Output() savedEvent = new EventEmitter<boolean>();

  @ViewChild(CreateAddressComponent) createAddressComponent: CreateAddressComponent;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private userService: UserService,
    // private storeService: StoreService,
  ) {
    this.createDeliveryForm();
  }
  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.createDeliveryForm();
    this.loadUserDeliveryAddress();

  }

  ngOnInit(): void {
  }


  set SelectedDeliveryAddress(addressOption: IOption) {
    this.selectedDeliveryAddress = this.loggedUserDeliveryAddresses.find(ad => {
      return (ad.id == addressOption.value)
    })
    // console.log(this.selectedDeliveryAddress);
    this.address = this.selectedDeliveryAddress?.address;
  }



  get HideForm(){
    if(this.deliveryAddresses.length == 0){
      return false;
    }else {
      return this.newAddress;
    }
  }


  newAddressBoxClicked(){
    console.log(this.hideForm);
    if(this.hideForm){
      this.hideForm = false;
    } else {
      this.hideForm = true;
    }

    if(!this.newAddress){
      this.selectedDeliveryAddress = new DeliveryAddress();
      this.address = new Address();
    }
    // console.log(this.selectedDeliveryAddress);
  }

  loadUserDeliveryAddress() {
    this.userService.getUserDeliveryAddress(this.loggedUser?.id)?.subscribe((addresses: DeliveryAddress[]) => {
      this.loggedUserDeliveryAddresses = addresses;
      this.newAddress = (this.deliveryAddresses?.length > 0)
     
      this.loggedUserDeliveryAddresses.forEach(deliv => {
        if (deliv?.visibleToUser)
          this.deliveryAddresses.push({
            value: deliv?.id,
            label: `${deliv?.address?.country} ${deliv?.address?.state} ${deliv?.address?.city}
          ${deliv?.address?.suburb} ${deliv?.address?.apartment} ${deliv?.address?.postCode}`,
            disabled: false
          });
      })

      if(this.deliveryAddresses?.length>0){
        this.hideForm = true;
      } else {
        this.hideForm = false;
      }
    })
    console.log(this.loggedUserDeliveryAddresses)
  }


  saveDeliveryAddress() {
    if (!this.getData()) {
      // this.toaster.error('Delivery address information is invalid');
      alert('Delivery address information is invalid');
      return false;
    }
    return new Promise((resolve, reject) => {
      console.log(this.newAddress);
      if (!this.newAddress && this.selectedDeliveryAddress?.id) {
        // delivery address selected
        resolve(true);
        return;
      }
      this.createAddressComponent.onSaveAddress();

      if(this.address?.country && this.address?.state && this.address?.postCode && this.address?.city){
        this.selectedDeliveryAddress.address = this.address;
        console.log(this.selectedDeliveryAddress);
        this.userService.createUpdateUserDeliveryAddress(this.loggedUser?.id, this.selectedDeliveryAddress)?.subscribe((deliveryAddress) => {
          this.selectedDeliveryAddress = deliveryAddress;
          this.userService.getUserDeliveryAddress(this.loggedUser?.id)?.subscribe(addresses => { });
          // inform neighboring components
          if (deliveryAddress?.id) {
            this.savedEvent.emit(true);
            resolve(true);
          } else {
            this.savedEvent.emit(false);
            resolve(false);
          }
        })
      } else {
        // alert("Invalid address information provided")
        this.savedEvent.emit(false);
        resolve(false);
        return;
      }
    })
  }


  getData() {
    console.log(this.deliveryForm)
    this.onValidate('email')
    if (!this._isEmail) {
      return false;
    }
    this.onValidate('phone')
    if (!this._isPhone) {
      return false;
    }

    if (this.selectedDeliveryAddress) {
      this.selectedDeliveryAddress.fname = this.deliveryForm?.value.firstName;
      this.selectedDeliveryAddress.lname = this.deliveryForm?.value.lastName;
      this.selectedDeliveryAddress.mname = this.deliveryForm?.value.otherName ?? '';
      this.selectedDeliveryAddress.email = this.deliveryForm?.value.email;
      this.selectedDeliveryAddress.phone = this.deliveryForm?.value.phone;
      this.selectedDeliveryAddress.visibleToUser = true;
      if (this.address)
        this.selectedDeliveryAddress.address = this.address;
    }

    return true;
  }

  onValidate(value: string) {
    // console.log(value);
    switch (value) {
      case 'email':
        const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
        if (this.deliveryForm?.value.email?.match(emailRe)) {
          this._isEmail = true;
        } else {
          this._isEmail = false;
        }
        break;
      case 'phone':
        const re1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const re2 = /^\d{10}$/;
        const re3 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        const re4 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (this.deliveryForm?.value?.phone?.match(re1) ||
          this.deliveryForm?.value?.phone?.match(re2) ||
          this.deliveryForm?.value?.phone?.match(re3) ||
          this.deliveryForm?.value?.phone?.match(re4)) {
          this._isPhone = true;
          console.log(true);
        } else {
          this._isPhone = false;
        }
        break;
    }
  }


  createDeliveryForm() {

    this.deliveryForm = this.fb.group({
      firstName: [
        this.selectedDeliveryAddress.fname ?? this.loggedUser?.profile?.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        this.selectedDeliveryAddress.lname ?? this.loggedUser?.profile?.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      otherName: [
        this.selectedDeliveryAddress.mname ?? this.loggedUser?.profile?.otherName,
        [
          Validators.maxLength(100)
        ]
      ],
      email: [
        this.selectedDeliveryAddress.email ?? this.loggedUser?.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      phone: [
        this.selectedDeliveryAddress.phone ?? this.loggedUser?.phone,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ]
    });
  }

  
}
