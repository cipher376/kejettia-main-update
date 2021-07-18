import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  private searchTerm: string;
  private searchTermChanged = false;

  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  set SearchTerm(key: string) {
    if (key && key !== this.searchTerm) {
      this.searchTermChanged = true;
    }
    this.searchTerm = key;
  }


  get SearchTerm() {
    return this.searchTerm;
  }

  search() {
    console.log(this.searchTerm);
    if (this.searchTermChanged) {
      this.util.setSearchTermLocal(this.searchTerm);
      this.signal.sendAction(MY_ACTION.searchInputTextChange);
      this.router.navigateByUrl('/pages/search');
      this.searchTermChanged = false;
    }
  }
}
