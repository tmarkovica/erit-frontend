import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.http.get(`${this.api_url}/api/contents/?populate=document,cover_image`, this.options).subscribe((res: { "data": Content[]}) => {
      this.contents.next(res.data);
    }, err => {
      console.log(err);
    });
  }

  public postContent(content: ContentPost): Promise<boolean> {

    const data = this.createFormData(content);

    return this.http.post(`${environment.api_url}/api/contents`, data, this.options).toPromise().then((res: any) => {
      console.log(res);
      this.getContent();
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  private createFormData(content: ContentPost): FormData {
    let formData = new FormData();

    formData.append('data', JSON.stringify(content.data));
    formData.append('files.cover_image', content['files.cover_image']);
    formData.append('files.document', content['files.document']);

    return formData;
  }
}
