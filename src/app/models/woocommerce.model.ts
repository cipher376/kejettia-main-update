export class WcProduct {
  name: string;
  id: number;
  slug?: string;
  permalink?: string;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
  type?: string;
  status?: string;
  featured?: string;
  catalog_visibility?: string;
  description?: string;
  short_description?: string;
  sku?: string;
  price?: number;
  regular_price?: number;
  sale_price?: number;
  date_on_sale_from?: Date;
  date_on_sale_from_gmt?: Date;
  date_on_sale_to?: Date;
  date_on_sale_to_gmt?: Date;
  on_sale?: string;
  purchasable?: string;
  total_sales?: string;
  virtual?: string;
  downloadable?: string;
  downloads?: string;
  download_limit?: string;
  download_expiry?: string;
  external_url?: string;
  button_text?: string;
  tax_status?: string;
  tax_class?: string;
  manage_stock?: boolean;
  stock_quantity?: number;
  backorders?: string;
  backorders_allowed?: string;
  backordered?: string;
  low_stock_amount?: string;
  sold_individually?: string;
  weight?: string;
  shipping_required?: string;
  shipping_taxable?: string;
  shipping_class?: string;
  shipping_class_id?: string;
  reviews_allowed?: any;
  average_rating?: number;
  rating_count?: number; // Total reviews
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  parent_id?: any;
  purchase_note?: string;
  dimensions?: any[];
  categories?: any[];
  tags?: any[];
  images?: any[];
  attributes?: any[];
  default_attributes?: any[];
  variations?: any[];
  grouped_products?: any[];
  menu_order?: any;
  price_html?: any;
  related_ids?: any[];
  stock_status?: any;
  has_options?: any;
  "jetpack-related-posts"?: any;

  constructor() {

  }
}


export class WcProductReview {
  id: number; //	Unique identifier for the resource.READ-ONLY
  review: string; //	The content of the review.MANDATORY
  date_created: Date; //	The date the review was created, in the site's timezone.
  date_created_gmt: Date; //	The date the review was created, as GMT.
  rating: number; //	Review rating (0 to 5).
  name: string; //	Reviewer name.MANDATORY
  email: string; //	Reviewer email.MANDATORY
  verified: boolean; //	Shows if the reviewer bought the product or not.
}

export class WcFile { id: string; name: string; file: string; }
export class WcDimension {
  length: string; // Variation length.
  width: string;	// Variation width.
  height: string;	// Variation height.
}
export class WcImage {
  id: number; //	Image ID.
  date_created: Date; //	The date the image was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date; //	The date the image was created, as GMT.READ-ONLY
  date_modified: Date; //	The date the image was last modified, in the site's timezone.READ-ONLY
  date_modified_gmt: Date; //	The date the image was last modified, as GMT.READ-ONLY
  src: string; //	Image URL.
  name: string; //	Image name.
  alt: string; //	Image alternative text.
}

export class WcProductImage extends WcImage {
  position: number; //	Image position. 0 means that the image is featured.
}

export class WcAttribute {
  id: number; //	Attribute ID.
  name: string; //	Attribute name.
  option: string //	Selected attribute term name.
}

export class WcMetaData {
  id: number;	//Meta ID.READ-ONLY
  key: string;	//Meta key.
  value: string;	//Meta value.
}

export class WcProductAttribute {
  id: number; //	Unique identifier for the resource.READ-ONLY
  name: string; //	Attribute name.MANDATORY
  slug: string; //	An alphanumeric identifier for the resource unique to its type.
  type: string; //	Type of attribute. By default only select is supported.
  order_by: string	//Default sort order. Options: menu_order, name, name_num and id. Default is menu_order.
  has_archives: boolean	//Enable/Disable attribute archives. Default is false.
}

export class WcProductAttributeTerms {
  id: number; //	Unique identifier for the resource.READ-ONLY
  name: string; //	Term name.MANDATORY
  slug: string; //	An alphanumeric identifier for the resource unique to its type.
  description: string//	HTML description of the resource.
  menu_order: number//	Menu order, used to custom sort the resource.
  count: number;//	Number of published products for the resource.
}

export class WcProductCategory {
  id: number; //	Unique identifier for the resource.READ-ONLY
  name: string; //	Category name.MANDATORY
  slug: string; //	An alphanumeric identifier for the resource unique to its type.
  parent: number; //	The ID for the parent of the resource.
  description: string; //	HTML description of the resource.
  display: string; //	Category archive display type. Options: default, products, subcategories and both. Default is default.
  image: object; //	Image data. See Product category - Image properties
  menu_order: number; //	Menu order, used to custom sort the resource.
  count: number; //	Number of published products for the resource.
}

export class ProductCategoryImage extends WcImage {

}

export class ProductShippingClass {
  id: number; //	Unique identifier for the resource.READ-ONLY
  name: string; //	Shipping class name.MANDATORY
  slug: string; //	An alphanumeric identifier for the resource unique to its type.
  description: string; //	HTML description of the resource.
  count: number; //	Number of published products for the resource.
}

export class ProductTag extends ProductShippingClass {
}

export class TaxRate {
  id: number; //	Unique identifier for the resource.READ-ONLY
  country: string; //	Country ISO 3166 code. See ISO 3166 Codes (Countries) for more details
  state: string; //	State code.
  postcode: string; //	Postcode/ZIP.
  city: string; //	City name.
  rate: string; //	Tax rate.
  name: string; //	Tax rate name.
  priority: number; //	Tax priority. Only 1 matching rate per priority will be used. To define multiple tax rates for a single area you need to specify a different priority per rate. Default is 1.
  compound: boolean; //	Whether or not this is a compound rate. Compound tax rates are applied on top of other tax rates. Default is false.
  shipping: boolean; //	Whether or not this tax rate also gets applied to shipping. Default is true.
  order: number; //	Indicates the order that will appear in queries.
  class: string; //	Tax class. Default is standard.
}

export class TaxClass {
  slug: string; //	Unique identifier for the resource.READ-ONLY
  name: string; //	Tax class name.
}

export class WcOrderLineItem {
  id: number; //	Item ID.READ-ONLY
  name: string	//Product name.
  product_id: number	//Product ID.
  variation_id: number	//Variation ID, if applicable.
  quantity: number	//Quantity ordered.
  tax_class: number	//Tax class of product.
  subtotal: string; //	Line subtotal (before discounts).
  subtotal_tax: string;  //	Line subtotal tax (before discounts).READ-ONLY
  total: string;	//Line total (after discounts).
  total_tax: string;	//Line total tax (after discounts).READ-ONLY
  taxes: OrderTax[]; //overide inherited property
  meta_data: WcCustomerMetaData[];	// Meta data. See Order - Meta data properties
  sku: string	//Product SKU.READ-ONLY
  price: string	//Product price.
}


export class OrderTax {
  id: number; //	Item ID.READ-ONLY
  rate_code: string	//Tax rate code.READ-ONLY
  rate_id: string	//Tax rate ID.READ-ONLY
  label: string	//Tax rate label.READ-ONLY
  compound: boolean	//Show if is a compound tax rate.READ-ONLY
  tax_total: string	//Tax total (not including shipping taxes).READ-ONLY
  total: number; //
  subtotal: number; //
  shipping_tax_total: string	//Shipping tax total.READ-ONLY
  meta_data: WcCustomerMetaData[]	//Meta data. See Order - Meta data properties
}



export class OrderShippingLine {
  id: number; //	Item ID.READ-ONLY
  method_title: string	//Shipping method name.
  method_id: string	//Shipping method ID.
  total: string	//Line total (after discounts).
  total_tax: string	//Line total tax (after discounts).READ-ONLY
  taxes: OrderTax[]	//Line taxes. See Order - Taxes propertiesREAD-ONLY
  meta_data: WcCustomerMetaData[]	//Meta data. See Order - Meta data properties
}



export class OrderFeeLine {
  id: number; //	Item ID.READ-ONLY
  name: string	//Fee name.
  tax_class: string	//Tax class of fee.
  tax_status: string	//Tax status of fee. Options: taxable and none.
  total: string	//Line total (after discounts).
  total_tax: string	//Line total tax (after discounts).READ-ONLY
  taxes: OrderTax[]	//Line taxes. See Order - Taxes propertiesREAD-ONLY
  meta_data: WcCustomerMetaData[]	//Meta data. See Order - Meta data properties
}


export class OrderCouponLine {
  id: number; //	Item ID.READ-ONLY
  code: string	//Coupon code.
  discount: string	//Discount total.
  discount_tax: string	//Discount total tax.READ-ONLY
  meta_data: WcCustomerMetaData[]	//Meta data. See Order - Meta data properties
}


export class OrderRefundNote {
  id: number; //	Refund ID.READ-ONLY
  reason: string;//	Refund reason.READ-ONLY
  total: string;//	Refund total.
}

export class OrderRefund {
  id: number //	Unique identifier for the resource.READ-ONLY
  date_created: Date; //	The date the order refund was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date; //	The date the order refund was created, as GMT.READ-ONLY
  amount: string	//Refund amount.
  reason: string	//Reason for refund.
  refunded_by: number;	//User ID of user who created the refund.
  meta_data: WcCustomerMetaData[];	//Meta data. See Order refund - Meta data properties
  line_items: WcOrderLineItem[]	//Line items data. See Order refund - Line items properties
  api_refund: boolean	//When true, the payment gateway API is used to generate the refund. Default is true
}


export class OrderNote {
  id: number //	Unique identifier for the resource.READ-ONLY
  date_created: Date;	//The date the order note was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date;	//The date the order note was created, as GMT.READ-ONLY
  note: string; //	Order note content.MANDATORY
  customer_note: boolean	//If true, the note will be shown to customers and they will be notified. If false, the note will be for admin reference only. Default is false.
}



export class WcOrder {

  id: number; //Unique identifier for the resource.READ-ONLY

  parent_id: number //	Parent order ID.
  number: string; //	//Order number.READ-ONLY
  order_key: string; //	//Order key.READ-ONLY
  created_via: string; //	//Shows where the order was created.READ-ONLY
  version: string; //	//Version of WooCommerce which last updated the order.READ-ONLY
  status: string; //	//Order status. Options: pending, processing, on-hold, completed, cancelled, refunded, failed and trash. Default is pending.
  currency: string; //	//Currency the order was created with, in ISO format. Options: AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BRL, BSD, BTC, BTN, BWP, BYR, BZD, CAD, CDF, CHF, CLP, CNY, COP, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GGP, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, IMP, INR, IQD, IRR, IRT, ISK, JEP, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRO, MUR, MVR, MWK, MXN, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PRB, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD, SSP, STD, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, UYU, UZS, VEF, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR and ZMW. Default is USD.
  date_created: Date; //;	//The date the order was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date; //;	//The date the order was created, as GMT.READ-ONLY
  date_modified: Date; //;	The //date the order was last modified, in the site's timezone.READ-ONLY
  date_modified_gmt: Date; //;	//The date the order was last modified, as GMT.READ-ONLY
  discount_total: string; //	//Total discount amount for the order.READ-ONLY
  discount_tax: string; //	//Total discount tax amount for the order.READ-ONLY
  shipping_total: string; //	//Total shipping amount for the order.READ-ONLY
  shipping_tax: string; //	//Total shipping tax amount for the order.READ-ONLY
  cart_tax: string; //	//Sum of line item taxes only.READ-ONLY
  total: string; //	//Grand total.READ-ONLY
  total_tax: string; //	//Sum of all taxes.READ-ONLY
  prices_include_tax: boolean; //	//True the prices included tax during checkout.READ-ONLY
  customer_id: number; //	//User ID who owns the order. 0 for guests. Default is 0.
  customer_ip_address: string; //	Customer's IP address.READ-ONLY
  customer_user_agent: string; //	User agent of the customer.READ-ONLY
  customer_note: string; //	//Note left by customer during checkout.
  billing: WcCustomerBill;	//Billing address. See Order - Billing properties
  shipping: WcCustomerShipping;	//Shipping address. See Order - Shipping properties
  payment_method: string; //	//Payment method ID.
  payment_method_title: string; //	//Payment method title.
  transaction_id: string; //	//Unique transaction ID.
  date_paid: string; //;	//The date the order was paid, in the site's timezone.READ-ONLY
  date_paid_gmt: string; //;	//The date the order was paid, as GMT.READ-ONLY
  date_completed: string; //;	//The date the order was completed, in the site's timezone.READ-ONLY
  date_completed_gmt: string; //;	//The date the order was completed, as GMT.READ-ONLY
  cart_hash: string; //	MD5 hash of cart items to ensure orders are not modified.READ-ONLY
  meta_data: WcCustomerMetaData[];	//Meta data. See Order - Meta data properties
  line_items: WcOrderLineItem[]; //	Line items data. See Order - Line items properties
  tax_lines: OrderTax[]; //	Tax lines data. See Order - Tax lines propertiesREAD - ONLY
  shipping_lines: OrderShippingLine[]; //	Shipping lines data.See Order - Shipping lines properties
  fee_lines: OrderFeeLine[]; //	Fee lines data.See Order - Fee lines properties
  coupon_lines: OrderCouponLine[]; //	Coupons line data.See Order - Coupon lines properties
  refunds: OrderRefundNote[]; //	List of refunds.See Order - Refunds propertiesREAD - ONLY
  set_paid: boolean; //	Define if the order is paid. It will set the status to processing and reduce stock items. Default is false.

  constructor() {
  }
}


export class WcCustomerBill {
  first_name: string	//First name.
  last_name: string	//Last name.
  company: string	//Company name.
  address_1: string	//Address line 1
  address_2: string	//Address line 2
  city: string	//City name.
  state: string	//ISO code or name of the state, province or district.
  postcode: string	//Postal code.
  country: string	//ISO code of the country.
  email: string	//Email address.
  phone: string	//Phone number.
}

export class WcCustomerShipping {
  
  first_name: string	//First name.
  last_name: string	//Last name.
  company: string	//Company name.
  address_1: string	//Address line 1
  address_2: string	//Address line 2
  city: string	//City name.
  state: string	//ISO code or name of the state, province or district.
  postcode: string	//Postal code.
  country: string	//ISO code of the country.
}

export class WcCustomerMetaData {
  id: number;	//Meta ID.READ-ONLY
  key: string;	//Meta key.
  value: string;	//Meta value.
}

export class WcCustomer {
  id: number;//	Unique identifier for the resource.READ-ONLY
  date_created: Date; //	The date the customer was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date; //	The date the order was created, as GMT.READ-ONLY
  date_modified: Date; // The date the customer was last modified, in the site's timezone.READ-ONLY
  date_modified_gmt: Date; //	The date the customer was last modified, as GMT.READ-ONLY
  email: string	//The email address for the customer.MANDATORY
  first_name: string	//Customer first name.
  last_name: string	//Customer last name.
  role: string;	//Customer role.READ-ONLY
  username: string; //	Customer login name.
  password: string	//Customer password.WRITE-ONLY
  billing: WcCustomerBill[]	//List of billing address data. See Customer - Billing properties
  shipping: WcCustomerShipping[]	//List of shipping address data. See Customer - Shipping properties
  is_paying_customer: boolean;	//Is the customer a paying customer?READ-ONLY
  orders_count: number;	//Quantity of orders made by the customer.READ-ONLY
  total_spent: string;	//Total amount spent.READ-ONLY
  avatar_url: string;	//Avatar URL.READ-ONLY
  meta_data: WcCustomerMetaData[];	//Meta data. See Customer - Meta data properties

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor() {
  }
}


export class WcRequestFilter {


  /**
   * Scope under which the request is made;
   * determines fields present in response. Options:
   * view and edit. Default is view.
   */

  context?: string;


  /**
   * Current page of the collection. Default is 1.
   */
  page?: number;


  /**
   * Maximum number of items to be
   * returned in result set. Default is 10.
   */
  per_page?: number;

  /**
   * Limit results to those matching a string.
   */
  search?: string;

  /**
   * Limit response to resources published after a
   * given ISO8601 compliant date.
   */

  after?: string;

  /**
  * Limit response to resources published before a
  * given ISO8601 compliant date.
  */

  before?: string;

  /**
  * Ensure result set excludes specific IDs.
  */
  exclude?: any[];

  /**
  * Limit result set to specific ids.
  */
  include?: any[];


  /**
  * Offset the result set by a specific number of items.
  */
  offset?: number;


  /**
  * Order sort attribute ascending or descending. Options: asc and desc.
  * Default is desc.
  */

  order?: string;


  /**
  * Sort collection by object attribute. Options: date, id, include,
  * title and slug. Default is date.
  */

  orderby?: string;



  /**
  * Limit result set to those of particular parent IDs.
  */

  parent?: any[];


  /**
  * Limit result set to all items except those of a particular parent ID.
  */

  parent_exclude?: any[];


  /**
  * Limit result set to products with a specific slug.
  */

  slug?: string;



  /**
  * Limit result set to products assigned a specific status. Options: any, draft, pending,
  * private and publish. Default is any.
  */

  status?: string;


  /**
  * Limit result set to products assigned a specific type. Options: simple,
  * grouped, external and variable.
  */

  type?: string;


  /**
  * Limit result set to
  * products with a specific SKU.
  */

  sku?: string;


  /**
  * Limit result set to featured products.
  */

  featured?: boolean;


  /**
  * Limit result set to products
  * assigned a specific category ID.
  */

  category?: string;


  /**
  * Limit result set to products assigned a specific tag ID.
  */
  tag?: string;


  /**
  * Limit result set to products assigned a specific shipping class ID.
  */

  shipping_class?: string;


  /**
  * Limit result set to products with a specific attribute.
  */

  attribute?: string;


  /**
  * Limit result set to products with a specific attribute term ID
  * (required an assigned attribute).
  */

  attribute_term?: string;


  /**
  * Limit result set to products with a specific tax class. Default
  *  options: standard, reduced-rate and zero-rate.
  */

  tax_class?: string;

  /**
   * Limit result set to products in stock or out of stock.
   */

  in_stock?: boolean;


  /**
   * Limit result set to products on sale.
   */

  on_sale?: boolean;


  /**
   * Limit result set to products based on a minimum price.
   */

  min_price?: boolean;


  /**
   * Limit result set to products based on a maximum price.
   */
  max_price?: boolean;

  constructor() {
  }
}


export class ProductVariation {
  id: number; //	Unique identifier for the resource.READ-ONLY
  date_created: Date; //	The date the variation was created, in the site's timezone.READ-ONLY
  date_created_gmt: Date; //	The date the variation was created, as GMT.READ-ONLY
  date_modified: Date; //	The date the variation was last modified, in the site's timezone.READ-ONLY
  date_modified_gmt: Date; //	The date the variation was last modified, as GMT.READ-ONLY
  description: string; //	Variation description.
  permalink: string; //	Variation URL.READ-ONLY
  sku: string; //	Unique identifier.
  price: number; //	Current variation price.READ-ONLY
  regular_price: number; //	Variation regular price.
  sale_price: number; //	Variation sale price.
  date_on_sale_from: Date; //	Start date of sale price, in the site's timezone.
  date_on_sale_from_gmt: Date; //	Start date of sale price, as GMT.
  date_on_sale_to: Date; //	End date of sale price, in the site's timezone.
  date_on_sale_to_gmt: Date; //	End date of sale price, as GMT.
  on_sale: boolean; //	Shows if the variation is on sale.READ-ONLY
  visible: boolean; //	Define if the attribute is visible on the "Additional information" tab in the product's page. Default is true.
  purchasable: boolean; //	Shows if the variation can be bought.READ-ONLY
  virtual: boolean; //	If the variation is virtual. Default is false.
  downloadable: boolean; //	If the variation is downloadable. Default is false.
  downloads: WcFile[]; //	List of downloadable files. See Product variation - Downloads properties
  download_limit: number; //	Number of times downloadable files can be downloaded after purchase. Default is -1.
  download_expiry: number; //	Number of days until access to downloadable files expires. Default is -1.
  tax_status: string; //	Tax status. Options: taxable, shipping and none. Default is taxable.
  tax_class: string; //	Tax class.
  manage_stock: boolean; //	Stock management at variation level. Default is false.
  stock_quantity: number; //	Stock quantity.
  in_stock: boolean; //	Controls whether or not the variation is listed as "in stock" or "out of stock" on the frontend. Default is true.
  backorders: string; //	If managing stock, this controls if backorders are allowed. Options: no, notify and yes. Default is no.
  backorders_allowed: boolean; //	Shows if backorders are allowed.READ-ONLY
  backordered: boolean; //	Shows if the variation is on backordered.READ-ONLY
  weight: string; //	Variation weight.
  dimensions: WcDimension[]; //	Variation dimensions. See Product variation - Dimensions properties
  shipping_class: string; //	Shipping class slug.
  shipping_class_id: string; //	Shipping class ID.READ-ONLY
  image: WcProductImage; //	Variation image data. See Product variation - Image properties
  attributes: WcAttribute[]; //	List of attributes. See Product variation - Attributes properties
  menu_order: number; //	Menu order, used to custom sort products.
  meta_data: WcMetaData[]; //	Meta data. See Product variation - Meta data properties
}
