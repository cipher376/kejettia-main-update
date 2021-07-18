import { UserService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  constructor(
    private userService: UserService
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loggedUser = this.userService.getLoggedUserLocalSync();
    }, 100);

  }

  ngOnInit(): void {
  }

}
