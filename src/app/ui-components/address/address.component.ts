import { DeliveryAddress } from './../../models/delivery-address';
import { SignalService } from './../../shared/services/signal.service';
import { Component, EventEmitter, OnInit, Output, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { Address, User } from 'src/app/models';
import { UtilityService, UserService } from 'src/app/shared/services';
import { MY_ACTION } from 'src/app/shared/services/signal.service';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, AfterViewInit {

  public addForm: FormGroup = this.fb.group({});;

  public address: Address = new Address();
  @Output() addressEvent = new EventEmitter<Address>();


  public selectedCountry: IOption = {} as any;
  public selectedStates: Array<IOption> = [];

  public countries: Array<IOption> = [];

  public loggedUser: User;

  deliveryAddresses: DeliveryAddress[] = [];
  selectedDeliveryAddress: DeliveryAddress;

  tab = "permanent" // shipping

  hideCoordinate = false;

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
    private userService: UserService,
    private signal: SignalService
  ) {
    const tempCountries = this.util.getAllCountries();
    tempCountries.forEach(cty => {
      this.countries.push({
        value: cty.name,
        label: cty.name,
        disabled: false
      });
    })
    this.createAddressForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.address = this.loggedUser?.address || new Address();
    this.createAddressForm();
  }

  set Tab(t: string) {
    this.tab = t;
  }
  get Tab() {
    return this.tab;
  }

  @Input() set HideCoordinate(h: boolean){
    this.hideCoordinate = h;
  }


  // @Input() set Address(address: Address) {
  //   this.address = address || new Address();
  //   this.createAddressForm();
  // }


  getDeliveryAddress() {
    this.userService.getUserDeliveryAddress(this.loggedUser?.id).subscribe(addresses => {
      this.deliveryAddresses = addresses;
    });
  }

  createAddressForm() {
    this.selectedCountry = { value: this.address.country || '', label: this.address.country || '' };
    this.setCountry(this.selectedCountry);
    this.addForm = this.fb.group({
      street: [
        this.address.street || '',
        [
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      suburb: [
        this.address.suburb || '',
        [
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      city: [
        this.address.city || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      state: [
        this.address.state || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      country: [
        this.selectedCountry?.value || '', [Validators.minLength(2),
        Validators.maxLength(100)]],
      postcode: [this.address.postCode],
      apartment: [this.address.apartment],
      lat: [this.util.getLatLngArray(this.address?.latLng).lat],
      lng: [this.util.getLatLngArray(this.address?.latLng).lng]
    });
  }


  getAddressData() {
    if (!this.addForm?.valid) {
      console.log(this.addForm);
      // alert("Invalid data")
      this.toaster.error('Provide valid data!');
      return false;
    }
    if (!this.selectedCountry) {
      this.toaster.error('Please select country ');
      return undefined;
    }
    this.address.street = this.addForm?.value.street ?? '';
    this.address.city = this.addForm?.value.city ?? '';
    this.address.country = this.addForm?.value.country ?? '';
    this.address.postCode = this.addForm?.value.postcode ?? '';
    this.address.state = this.addForm?.value.state ?? '';
    this.address.apartment = this.addForm?.value.apartment ?? '';
    this.address.suburb = this.addForm?.value.suburb ?? '';
    this.address.latLng = this.addForm?.value.lat + ',' + this.addForm?.value.lng;
    console.log(this.address);
    return true;
  }

  onSaveAddress() {
    if (!this.getAddressData()) {
      return;
    }
    if (!this.loggedUser) {
      this.toaster.error('Cannot add address if user is empty');
      return;
    }
    this.address.userId = this.loggedUser.id;
    this.userService.createUpdateAddress(this.loggedUser?.id, this.address).subscribe((address: Address) => {
      if (this.loggedUser) {
        this.loggedUser.address = address;
        this.address = address;
        this.userService.setLoggedUserLocal(this.loggedUser);
        // this.toaster.info('Address saved!');
        this.signal.sendAction(MY_ACTION.reloadUser);

        // Save for shipping 
        if(this.loggedUser.otherDeliveryAddresses?.length <=0 && !this.loggedUser?.currentDeliveryAddress?.id){
          const deliveryAddress = new DeliveryAddress();
          deliveryAddress.fname = this.loggedUser?.profile?.firstName;
          deliveryAddress.lname = this.loggedUser?.profile?.lastName;
          deliveryAddress.mname = this.loggedUser?.profile?.otherName;
          deliveryAddress.email = this.loggedUser?.email;
          deliveryAddress.phone = this.loggedUser?.phone;
          deliveryAddress.visibleToUser = true;

          let add = new Address();
          add.country = address.country
          add.city = address.city
          add.apartment = address.apartment
          add.latLng = address.latLng
          add.postCode = address.postCode
          add.state = address.state
          add.suburb = address.suburb;
          add.zipCode = address.zipCode;
          deliveryAddress.address = add;
          this.userService.createUpdateUserDeliveryAddress(this.loggedUser?.id, deliveryAddress)?.subscribe(dAddress => {
          });
        }
        alert("Address saved")
      }
    }, error => {
      console.log(error);
      this.toaster.error('Check network  | try again later');
    });
  }

  setCountry($event: any) {
    this.selectedCountry = $event;
    this.selectedStates = [];
    this.util.getStatesByCountry(this.selectedCountry.value).forEach(state => {
      this.selectedStates.push({
        value: state,
        label: state,
        disabled: false
      });
    });
  }

  view(add: DeliveryAddress) {
    this.selectedDeliveryAddress = add;
  }

  delete(add: DeliveryAddress) {
    this.userService.deleteDeliveryAddress(this.loggedUser?.id, add).subscribe(() => {
      this.getDeliveryAddress();
    });
  }
}
