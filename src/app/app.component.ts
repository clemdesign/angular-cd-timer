import {Component, ViewChild} from '@angular/core';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('basicTimer', { static: true }) basicTimer: CdTimerComponent;

  timerInfo = '';

  constructor() {
    this.timerInfo = '';
  }

  onComplete(data) {
    this.timerInfo = 'Finished !';
  }

  onTick(data: TimeInterface) {
    this.timerInfo = 'In Progress [' + data.tick_count.toString().padStart(4, '0') + ']';
  }

  onStart(data) {
    console.log('Timer started.');
  }

  doActionBasicTimer(action: String) {
    switch (action) {
      case 'start':
        this.basicTimer.start();
        break;
      case 'resume':
        this.basicTimer.resume();
        break;
      case 'reset':
        this.basicTimer.reset();
        break;
      default:
        this.basicTimer.stop();
        break;
    }
  }
}
