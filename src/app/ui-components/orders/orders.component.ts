import { Urls } from './../../config';
import { Router } from '@angular/router';
import { ConsolidatedOrder } from './../../models/Order';
import { MY_ACTION, SignalService } from './../../shared/services/signal.service';
import { UserService } from './../../shared/services/user.service';
import { User } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  loggedUser: User;

  consolidatedOrders: ConsolidatedOrder[] = [];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private signals: SignalService,
    private router: Router
  ) { }

  @Input() set ConsolidatedOrders(orders: ConsolidatedOrder[]) {
    this.consolidatedOrders = orders;
  }

  ngOnInit(): void {
    this.signals._action$.subscribe(action => {
      if (action === MY_ACTION.ordersLoaded) {
        this.ConsolidatedOrders = this.orderService.getConsolidatedOrdersLocal();
      }
    })

    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.ConsolidatedOrders = this.orderService.getConsolidatedOrdersLocal();
    this.loadUserOrders();

  }

  countItems(con: ConsolidatedOrder) {
    let items = 0;
    con.orders.forEach(order => {
      items += order.cartItems?.length;
    })
    return items;
  }

  loadUserOrders() {
    this.orderService.getConsolidatedOrders(this.loggedUser?.id)?.subscribe(consolidatedOrders => {
      this.ConsolidatedOrders = consolidatedOrders;
      console.log(this.consolidatedOrders);
    });
  }

  goToOrderComplete(order: ConsolidatedOrder) {
    this.orderService.setSelectedConsolidatedOrderLocal(order);
    this.router.navigateByUrl(Urls.order)

  }

  goToOrderDetails(order: ConsolidatedOrder) {
    this.orderService.setSelectedConsolidatedOrderLocal(order);
    window.location.pathname = Urls.order

  }

  delete(order: ConsolidatedOrder) {
    this.orderService.deleteConsolidatedOrderFromUser(order?.id)?.subscribe(() => {
      this.loadUserOrders();
    })
  }
}
