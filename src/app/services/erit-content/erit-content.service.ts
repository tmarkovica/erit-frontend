import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Content } from 'src/app/interfaces/content/content';
import { ContentPost } from 'src/app/interfaces/content/content-post';
import { ContentApproval } from 'src/app/interfaces/content/content-approval';

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
  private admin: boolean;

  constructor(
    private http: HttpClient,
    private _login: LoginService
  ) {
    this.getContent();

    this._login.admin.subscribe((res: boolean) => {
      this.admin = res;
    });
  }

  private filterContentForUser(content: Content[]) {
    let filteredContent: Content[] = [];
    if (this.admin === false) {
      content.forEach((c: Content) => {
        if (c.attributes.approval?.data?.attributes.approved === true)
          filteredContent.push(c);
      });
      this.contents.next(filteredContent);
    }
    else if (this.admin === true)
      this.contents.next(content);
  }

  private getContent() {
    this.http.get(`${this.api_url}/api/contents/?populate=*`, this.options).subscribe((res: { "data": Content[]}) => {
      this.filterContentForUser(res.data);
    }, err => {
      console.log(err);
    });
  }

  public postContent(content: ContentPost): Promise<boolean> {
    const data = this.createFormData(content);
    return this.http.post(`${environment.api_url}/api/contents`, data, this.options).toPromise().then((res: any) => {
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

  public approveContent(contentId: number) {
    const data: ContentApproval = {
      data: {
        approved: true,
        content: contentId
      }
    }
    this.http.post(`${environment.api_url}/api/approvals`, data, this.options).toPromise().then((res: any) => {
      this.getContent();
    }).catch(err => {
      console.log(err);
    });
  }

  public discardContent(contentId: number) {
    this.http.delete(`${environment.api_url}/api/contents/${contentId}`, this.options).toPromise().then((res: any) => {
      this.getContent();
    }).catch(err => {
      console.log(err);
    });
  }
}
