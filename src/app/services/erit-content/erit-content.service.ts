import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Content } from 'src/app/interfaces/content';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EritContentService {

  private api_url = environment.api_url;
  public contents: BehaviorSubject<Content[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) {
    this.getContent();
  }

  private getContent() {
    this.http.get(`${this.api_url}/api/contents`).subscribe((res: { "data": Content[]}) => {
      console.log(res.data)
      this.contents.next(res.data);
    });
  }

  public getContentById(id: number) {

  }
}
