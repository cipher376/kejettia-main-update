import { environment } from './../../../environments/environment';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { UserService } from './../../shared/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { WcProductReview } from 'src/app/models/woocommerce.model';

@Component({
  selector: 'app-review-comments',
  templateUrl: './review-comments.component.html',
  styleUrls: ['./review-comments.component.scss']
})
export class ReviewCommentsComponent implements OnInit {
  private reviews: WcProductReview[] = [];
  users: User[] = [];

  fileRootUrl = environment.file_api_download_url_root;
  constructor(
    private userService: UserService,
    private signal: SignalService
  ) { }

  ngOnInit(): void {

  }

  @Input() set Reviews(reviews: WcProductReview[]) {
    if ((reviews?.length != this.reviews?.length)&&(reviews!=this.reviews)) {
      this.reviews = reviews.reverse();
      this.getReviewUsers();
    }
  }

  get Reviews() {
    return this.reviews;
  }

  getReviewUsers() {
    // let usersIds = [];
    // // console.log(this.reviews)
    // this.reviews.forEach(r => {
    //   usersIds.push(r.reviewerId);
    // })

    // usersIds= [...new Set(usersIds)]; // remove duplicates;
    // if (usersIds?.length > 0)
    //   this.userService.getUsersByIds(usersIds).subscribe(users => {
    //     this.users = users;
    //   })
  }

  getRatePerCent(rate: number) {
    return ((rate / 5) * 100);
  }

  getUserWithId(id:any){
    for (const user of this.users) {
      if(user?.id == id){
        // console.log(user);
        return user;
      }
    }
    return undefined;
  }

}
