import { Shipping } from './../../models/shipping';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shipping-view',
  templateUrl: './shipping-view.component.html',
  styleUrls: ['./shipping-view.component.scss']
})
export class ShippingViewComponent implements OnInit {

  @Input() shippings: Shipping[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
