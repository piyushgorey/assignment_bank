import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from '../services/dashboard.service';
import { NewtransactionsComponent } from './newtransactions/newtransactions.component';
import { ViewtransactionsComponent } from './viewtransactions/viewtransactions.component';
import { Router } from '@angular/router';
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, NavbarComponent, NewtransactionsComponent, ViewtransactionsComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
