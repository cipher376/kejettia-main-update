import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { UserService } from './../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store, Product, User, Company } from 'src/app/models';
import { WcProductReview } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup = this.fb.group({});
  review: WcProductReview = {} as any;

  private selectedStore: Store;
  private selectedProduct: Product;
  private selectedCompany: Company;

  loggedUser: User;

  assert = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
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
    this.review.rating = rate;
  }

  get rating() {
    return this.review.rating;
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
        this.review.review,
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
      this.review.review = this.reviewForm?.value?.comment;
      this.review.rating = this.rating;
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

    this.review.email = this.loggedUser?.email;
    this.review.name = this.loggedUser?.profile?.firstName + ' ' +
      this.loggedUser?.profile?.lastName;
    // this.review.reviewerId = this.loggedUser?.id;

    // if (this.selectedProduct) {
    //   this.review.productId = this.selectedProduct?.id;

    // } else if (this.selectedStore) {
    //   this.review.storeId = this.selectedStore?.id;

    // } else if (this.selectedCompany) {
    //   this.review.companyId = this.selectedCompany?.id
    // }

    // console.log(this.review);
    // this.wcStoreService.createReview(this.review)?.subscribe(review => {
    //   console.log(review);
    //   this.review = {} as any;
    //   this.rating = 0;
    //   this.assert = false;
    //   this.signal.sendAction(MY_ACTION.loadReviews);
    // });
  }


}
