import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginCredentials } from 'src/app/interfaces/login-credentials';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { RegistrationData2 } from 'src/app/interfaces/registration-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api_url = environment.api_url;

  private JWT_STORAGE_KEY = "token";
  private USER_ID_STORAGE_KEY = "userId";
  private jwt: string = null;
  public username: BehaviorSubject<string> = new BehaviorSubject('');
  public admin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userID: number;

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
      this.loadUserIdFromLocalStorage();
      this.getUser(this.userID);
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

  private getUser(id: number) {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.getAuthToken()}`
      })
    };
    this.http.get(`${this.api_url}/api/users/${id}`, options).subscribe((res: RegistrationData2) => {
      this.username.next(res.username);
      this.admin.next(res.admin);
    }, err => {
      console.log(err);
    });
  }

  public isLoggedIn(): boolean { return this.loggedIn; }

  public logout() {
    this.loggedIn = false;
    this.jwt = null;
    this.username.next('');
    localStorage.removeItem(this.JWT_STORAGE_KEY);
    localStorage.removeItem(this.USER_ID_STORAGE_KEY);
    this.router.navigate(['']);
  }

  private loginSuccessful(response: LoginResponse) {
    this.saveTokenToLocalStorage(response.jwt);
    this.username.next(response.user.username);
    this.userID = response.user.id;
    this.saveUserIdToLocalStorage(this.userID);
    this.admin.next(response.user.admin);
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

  private loadUserIdFromLocalStorage() {
    this.userID = Number.parseInt(localStorage.getItem(this.USER_ID_STORAGE_KEY));
  }

  private saveUserIdToLocalStorage(id: number) {
    localStorage.setItem(this.USER_ID_STORAGE_KEY, id.toString());
  }

  public getAuthToken(): string {
    return this.jwt;
  }
}
