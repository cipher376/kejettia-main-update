import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {
  public addForm: FormGroup = this.fb.group({});;

  public address: Address = new Address();
  @Output() addressEvent = new EventEmitter<Address>();


  public selectedCountry: IOption = {} as any;
  public selectedStates: Array<IOption> = [];

  public countries: Array<IOption> = [];

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
  ) {
    const tempCountries = this.util.getAllCountries();
    tempCountries.forEach(cty => {
      this.countries.push({
        value: cty.name,
        label: cty.name,
        disabled: false
      });
    })
    this.selectedCountry = {
      label: '',
      value: '',
      disabled: false
    }
    this.createAddressForm();
  }

  ngAfterViewInit(): void {

    this.createAddressForm();
  }

  async ngOnInit() {
  }

  @Input() set Address(address: Address) {
    this.address = address || new Address();
    this.createAddressForm();
  }


  createAddressForm() {
    this.selectedCountry = { value: this.address.country || 'Ghana', label: this.address.country || 'Ghana' };
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
        this.selectedCountry?.value || '',
        [Validators.minLength(2),
        Validators.maxLength(100)]],
      postcode: [this.address.postCode || '',
      [
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      // apartment: [this.address.apartment || '',[]],
      lat: [this.util.getLatLngArray(this.address?.latLng).lat],
      lng: [this.util.getLatLngArray(this.address?.latLng).lng]
    });
  }


  getAddressData() {
    if (!this.addForm?.valid) {
      console.log(this.addForm);
      // alert("Invalid data")
      alert('Provide valid address data!');
      return false;
    }
    if (!this.selectedCountry) {
      alert('Please select country ');
      return false;
    }
    this.address.street = this.addForm?.value.street ?? '';
    this.address.city = this.addForm?.value.city ?? '';
    this.address.country = this.addForm?.value.country ?? '';
    this.address.postCode = this.addForm?.value.postcode ?? '';
    this.address.state = this.addForm?.value.state ?? '';
    // this.address.apartment = this.addForm?.value.apartment ?? '';
    this.address.suburb = this.addForm?.value.suburb ?? '';
    this.address.latLng = this.addForm?.value.lat + ',' + this.addForm?.value.lng;
    console.log(this.address);
    return true;
  }

  onSaveAddress() {
    if (!this.getAddressData()) {
      return;
    }
    this.addressEvent.emit(this.address); // send address object to the calling component;
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

}
