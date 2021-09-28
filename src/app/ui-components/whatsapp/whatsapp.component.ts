import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showTime()
    setInterval(this.showTime, 1000)
  }

   showTime() {

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let formatHours = this.convertFormat(hours)

    hours = this.checkTime(hours)

    hours = this.addZero(hours)
    minutes = this.addZero(minutes)
    seconds = this.addZero(seconds)

    document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}${formatHours}`

}

 convertFormat(time) {
    let formmat = 'PM'
    if (time >= 12) {
      formmat = 'AM'
    }
    return formmat;
}

 checkTime(time) {
    if (time > 12) {
        time = time - 12;
    }
    if (time === 0) {
        time = 12;
    }
    return time
}

 addZero(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time
}



}
