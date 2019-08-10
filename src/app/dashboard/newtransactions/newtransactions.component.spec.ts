import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtransactionsComponent } from './newtransactions.component';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
describe('NewtransactionsComponent', () => {
  let component: NewtransactionsComponent;
  let fixture: ComponentFixture<NewtransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtransactionsComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [ 
        DashboardService,
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
