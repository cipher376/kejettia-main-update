import { Injectable } from "@angular/core";
import { MyLocalStorageService } from ".";
import { SignalService } from "./signal.service";


@Injectable({
  providedIn: 'root'
})
export class ToasterService {


  constructor(
    private signals: SignalService,
  ) {

  }

}
