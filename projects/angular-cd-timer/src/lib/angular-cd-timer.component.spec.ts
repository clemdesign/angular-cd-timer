import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdTimerComponent } from './angular-cd-timer.component';

describe('AngularCdTimerComponent', () => {
  let component: CdTimerComponent;
  let fixture: ComponentFixture<CdTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
