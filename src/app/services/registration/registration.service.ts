import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/interfaces/user/login-credentials';
import { RegistrationData } from 'src/app/interfaces/user/registration-data';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private _login: LoginService
    ) { }

  public registration(data: RegistrationData) {
    const dataToSend: RegistrationData = {
      username: data['username'],
      "first-name": data['firstName'],
      "last-name": data['lastName'],
      email: data['email'],
      password: data['password'],
      role: 1
    }

    this.http.post(`${environment.api_url}/api/users`, dataToSend).subscribe((res: any) => {
      const loginData: LoginCredentials = {
        identifier: dataToSend.username,
        password: dataToSend.password
      }
      this._login.login(loginData);
    })
  }
}
