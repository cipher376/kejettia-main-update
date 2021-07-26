import { StoreService } from 'src/app/shared/services/store.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {

  private company: Company;
  photoUrl = '';

  @Input() layout = 'grid'; // 'list'

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  @Input() set Company(company: Company) {
    this.company = company;
    this.photoUrl =  StoreService.getPhotoUrlByDisplayTypeLocal(this.company?.photos, 'cover', true);
    this.cd.detectChanges();
  }

  get Company() {
    return this.company;
  }



  getCategory() {
    if (this.company?.companyCategories?.length > 0) {
      return this.company?.companyCategories[0]?.name
    }
    return '';
  }

  getRating() {
    // this.storeService.getCompanyRating(this.company);
  }

  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.company?.dateCreated) <= 7) // within 7 days means new
      return true;
    return false;
  }

  goToCompany(){
    // this.storeService.setSelectedCompanyLocal(this.company).then(()=>{
    //   this.router.navigateByUrl('/companys/pages/home');
    // });
  }


}
