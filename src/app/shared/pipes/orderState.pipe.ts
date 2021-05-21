import { Pipe, PipeTransform } from '@angular/core';
import { OrderState } from '../services/order.service';



@Pipe({ name: 'orderState' })
export class OrderStatePipe implements PipeTransform {
  transform(orderState: OrderState) {
    console.log(orderState);
    if (orderState == OrderState.CANCELLED) {
      return 'Cancelled';
    } else if (orderState == OrderState.COMPLETE) {
      return 'Complete';
    } else if (orderState == OrderState.NEW) {
      return 'New';
    } else if (orderState == OrderState.PENDING) {
      return 'Pending';
    }
  }
}
