import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Profile, User } from 'src/app/models';
import { UtilityService, UserService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  public profForm: FormGroup = this.fb.group({});;
  public profile: Profile = new Profile();
  public loggedUser?: User;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private util: UtilityService,
    private userService: UserService,
    private signal: SignalService
  ) {
    this.createProfileForm();

  }

  ngAfterViewInit(): void {
    this.loadUser()
  }

  async ngOnInit() {
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.reloadUser) {
        this.loadUser();
      }
    });
  }


  async loadUser() {
    this.loggedUser = await this.userService.getLoggedUserLocalSync();
    this.profile = this.loggedUser?.profile || new Profile();
    console.log(this.loggedUser);
    this.createProfileForm();
  }


  createProfileForm() {
    this.profForm = this.fb.group({
      firstName: [
        this.profile.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        this.profile.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      otherName: [
        this.profile.otherName ?? '',
        [
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      gender: [this.profile.gender || '', Validators.required],
      dateOfBirth: [this.profile?.dateOfBirth ? this.util.formatDateFormRebind(this.profile?.dateOfBirth) : '', Validators.required],
      about: [this.profile.about]
    });

  }

  getProdfileData() {
    if (!this.profForm?.valid) {
      // console.log(this.profForm);
      // alert("Invalid data")
      this.toaster.error('Provide valid data!');
      return false;
    }

    if (!this.loggedUser || !this.loggedUser.id) {
      this.toaster.error('Please select user or create new user ');
      return false;
    }

    this.profile.firstName = this.profForm?.value.firstName;
    this.profile.lastName = this.profForm?.value.lastName;
    this.profile.otherName = this.profForm?.value.otherName ?? '';
    this.profile.dateOfBirth = new Date(this.profForm?.value.dateOfBirth);
    this.profile.about = this.profForm?.value.about ?? '';
    this.profile.gender = this.profForm?.value.gender;

    this.profile.userId = this.loggedUser.id;

    return true;
  }

  // save | update profile
  onSaveProfile() {
    if (!this.getProdfileData()) {
      return;
    }

    // console.log(this.profile);
    this.userService.createUpdateProfile(this.loggedUser?.id, this.profile).subscribe((profile: Profile) => {
      if (this.loggedUser && profile) {
        this.loggedUser.profile = <Profile>profile;
        this.profile = <Profile>profile;

        // update profile on disk
        this.userService.setLoggedUserLocalSync(this.loggedUser);
        this.signal.sendAction(MY_ACTION.reloadUser);

        this.toaster.info('Profile saved!');
        this.createProfileForm()
      }
    }, (error: string) => {
      console.log(error);
      this.toaster.error('Check nework  | try again later');
    });

  }
}
