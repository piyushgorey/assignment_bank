import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginUser } from '../model/model';
import { Constants } from '../constants/constant';
import { DashboardService } from '../services/dashboard.service';
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
      LoginService, 
      DashboardService,
      {provide: Router, useClass: RouterStub}
    ]

    })
    .compileComponents();
    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call a GET Url and return a login user', () => {
    const mockUser: LoginUser = {
      username: 'testuser',
      name: 'Test User',
      password: '1234',
      custNum: '23423'
    }
    service.authenticate().subscribe((userResponse: LoginUser)=>{
      expect(userResponse).toEqual(mockUser);
    })
    const request = httpMock.expectOne(Constants.loginUserUrl);
    expect(request.request.method).toBe('GET')
    request.flush(mockUser);
  });
});
