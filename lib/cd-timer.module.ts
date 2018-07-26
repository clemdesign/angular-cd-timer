import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdTimerComponent} from './cd-timer';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CdTimerComponent
  ],
  exports: [
    CdTimerComponent
  ]
})
export class CdTimerModule {}
