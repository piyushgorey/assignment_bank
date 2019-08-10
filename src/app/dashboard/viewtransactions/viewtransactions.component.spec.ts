import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransactionsComponent } from './viewtransactions.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewtransactionsComponent', () => {
  let component: ViewtransactionsComponent;
  let fixture: ComponentFixture<ViewtransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtransactionsComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        DashboardService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
