import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Content } from 'src/app/interfaces/content';
import { ContentPost } from 'src/app/interfaces/content-post';

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
    this.http.get(`${this.api_url}/api/contents/?populate=document,cover_image`).subscribe((res: { "data": Content[]}) => {
      console.log(res.data)
      this.contents.next(res.data);
    }, err => {
      console.log(err);
    });
  }

  public postContent(content: ContentPost) {
    this.http.post(`${environment.api_url}/api/contents`, content, this.options).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
