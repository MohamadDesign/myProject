import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginData: any;

  setLoginData(data: any) {
    this.loginData = data;
  }

  getLoginData() {
    return this.loginData;
  }
}
