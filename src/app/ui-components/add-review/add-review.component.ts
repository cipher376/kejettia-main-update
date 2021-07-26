import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { UserService } from './../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Review } from './../../models/review';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store, Product, User, Company } from 'src/app/models';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup = this.fb.group({});
  review: Review = {} as any;

  private selectedStore: Store;
  private selectedProduct: Product;
  private selectedCompany: Company;

  loggedUser: User;

  assert = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private toaster: ToastrService,
    private userService: UserService,
    private signal: SignalService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
  }

  set rating(rate: number) {
    this.review.rate = rate;
  }

  get rating() {
    return this.review.rate;
  }

  @Input() set Store(store: Store) {
    this.selectedStore = store;
    this.selectedCompany = undefined;
    this.selectedProduct = undefined;
  }

  @Input() set Product(product: Product) {
    this.selectedProduct = product;
    this.selectedStore = undefined;
    this.selectedCompany = undefined;
  }

  @Input() set Company(company: Company) {
    this.selectedCompany = company;
    this.selectedProduct = undefined;
    this.selectedStore = undefined;
  }


  createForm() {
    this.reviewForm = this.fb.group({
      comment: [
        this.review.comment,
        [
          Validators.minLength(0),
          Validators.maxLength(400)
        ]
      ],
      assert: [
        this.assert,
        [
          Validators.required
        ]
      ]
    });
  }

  getData() {
    if (this.reviewForm.valid) {
      this.review.comment = this.reviewForm?.value?.comment;
      this.review.rate = this.rating;
      return true;
    }
    return false;
  }

  save() {

    if (!this.loggedUser) {
      alert('Please login to comment');
      return;
    }

    if (!this.getData()) {
      this.toaster.error('Please accept the agreement below!');
      alert('Provide comment and  accept the agreement below!');
      return;
    }

    if (!this.rating) {
      this.toaster.error('Please rate the product with the stars!');
      alert('Please rate the product with the stars!');
      return;
    }

    this.review.reviewerEmail = this.loggedUser?.email;
    this.review.reviewerName = this.loggedUser?.profile?.firstName + ' ' +
      this.loggedUser?.profile?.lastName;
    this.review.reviewerId = this.loggedUser?.id;

    if (this.selectedProduct) {
      this.review.productId = this.selectedProduct?.id;

    } else if (this.selectedStore) {
      this.review.storeId = this.selectedStore?.id;

    } else if (this.selectedCompany) {
      this.review.companyId = this.selectedCompany?.id
    }

    // console.log(this.review);
    this.storeService.createReview(this.review)?.subscribe(review => {
      console.log(review);
      this.review = {} as any;
      this.rating = 0;
      this.assert = false;
      this.signal.sendAction(MY_ACTION.loadReviews);
    });
  }


}
