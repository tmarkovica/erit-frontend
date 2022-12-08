import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Content } from 'src/app/interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class EritContentService {

  private options = {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this._login.getAuthToken()}`
    })
  };


  private api_url = environment.api_url;
  public contents: BehaviorSubject<Content[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private _login: LoginService
  ) {
    this.getContent();
  }

  private getContent() {
    this.http.get(`${this.api_url}/api/contents/?populate=document,cover_image`, this.options).subscribe((res: { "data": Content[]}) => {
      console.log(res.data)
      this.contents.next(res.data);
    }, err => {
      console.log(err);
    });
  }

  public postContent(data: FormData): Promise<boolean> {
    return this.http.post(`${environment.api_url}/api/contents`, data, this.options).toPromise().then((res: any) => {
      console.log(res);
      this.getContent();
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
  }
}
