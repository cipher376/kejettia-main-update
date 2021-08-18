import { Shipping } from './../../models/shipping';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-select',
  templateUrl: './delivery-select.component.html',
  styleUrls: ['./delivery-select.component.scss']
})
export class DeliverySelectComponent implements OnInit {
  private shippings: Shipping[] = [];
  private selectedShipping: Shipping;

  @Output() selectedShippingEvent = new EventEmitter<any>();
  @Output() selectedShippingCostEvent =  new EventEmitter<number>();

  @Output() guideEvent = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }


  @Input() set Shippings(ships: Shipping[]){
    this.shippings = ships;
  }

  get Shippings(){
    return this.shippings;
  }
  set Shipping(id: any){
    this.shippings.forEach(s => {
      if(s.id == id){
        this.selectedShipping = s;
        this.selectedShippingCostEvent.emit(s.flatCharge);
        this.selectedShippingEvent.emit(s);
      }
    })

  }

  get Shipping(){
    return this.selectedShipping?.id
  }
  goToGuide(guide: string) {
    this.guideEvent.emit(guide);
  }

}
