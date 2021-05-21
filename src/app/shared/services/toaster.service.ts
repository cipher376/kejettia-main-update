import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }

  async toast(msg: string, duration?: number) {
    if (!duration) { duration = 2000; }
    alert(msg);
  }

  async toastOptions(conf: any) {
    // {
    //   message: 'Click to Close',
    //   showCloseButton: true,
    //   position: 'top',
    //   closeButtonText: 'Done'
    // }
    // const toast = await this._toast.create(conf);
    // toast.present();
  }
}
