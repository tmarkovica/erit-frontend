import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/interfaces/login-credentials';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api_url = environment.api_url;
  private JWT_STORAGE_KEY = "token";
  private jwt: string = null;
  private username: string;
  private loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkForUserInLocalStorage();
  }

  private checkForUserInLocalStorage() {
    this.loadTokenFromLocalStorage();
    if (this.jwt != null) {
      this.loggedIn = true;
    }
    else {
      this.router.navigate(['']);
    }
  }

  public login(credentials: LoginCredentials) {
    this.http.post(`${this.api_url}/api/auth/local`, credentials).subscribe((res: LoginResponse) => {
      this.loginSuccessful(res);
    }, err => {
      console.log(err);
    });
  }

  public isLoggedIn(): boolean { return this.loggedIn; }

  public logout() {
    this.loggedIn = false;
    this.jwt = null;
    this.username = '';
    localStorage.removeItem(this.JWT_STORAGE_KEY);
    this.router.navigate(['']);
  }

  private loginSuccessful(response: LoginResponse) {
    this.saveTokenToLocalStorage(response.jwt);
    this.username = response.user.username;
    this.loggedIn = true;
    this.jwt = response.jwt;
    this.router.navigate(['index']);
  }

  private loadTokenFromLocalStorage() {
    this.jwt = localStorage.getItem(this.JWT_STORAGE_KEY);
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem(this.JWT_STORAGE_KEY, token);
  }
}
