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


  convertFormat(time) {
    let format = 'PM'
    if (time >= 12) {
      format = 'AM'
    }
    return format;
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

  showTime() {

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    try {
      let formatHours = this.convertFormat(hours)
      hours = this.checkTime(hours)

      hours = this.addZero(hours)
      minutes = this.addZero(minutes)
      seconds = this.addZero(seconds)
      document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}${formatHours}`

    } catch (error) {

    }



  }




}
