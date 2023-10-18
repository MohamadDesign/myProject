import { Component } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  envelope = faEnvelope;
  lock = faLock;
  username: any = '';
  password: any = '';
  loginForm: FormGroup;
  formSubmitted = false

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.formSubmitted = true
    if (this.loginForm.valid) {
      const loginData = {
        username: this.username,
        password: this.password,
      };
      this.authService.setLoginData(loginData);
      this.router.navigate(['/dashboard', this.username]);
    }
  }
}
