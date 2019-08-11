import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should have a title', ()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const title = fixture.debugElement.componentInstance.title;
    expect(title).toBe('taskbank');
  });
});
