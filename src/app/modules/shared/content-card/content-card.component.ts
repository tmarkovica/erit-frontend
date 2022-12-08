import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content';
import { Formats } from 'src/app/interfaces/formats';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {

  @Input() public content: Content;

  constructor() { }

  ngOnInit(): void {
    console.log(this.content);
  }

  public thumbnailImageURL(): string {
    const data = this.content.attributes.cover_image.data;
    if (data == null) return 'none';

    const formats: Formats = data.attributes?.formats;
    const url: string = data.attributes?.url;

    if (formats != null)
      return `url(${environment.api_url}${formats.thumbnail.url})`;
    else if (url != null)
      return `url(${environment.api_url}${url})`;
    else
      return 'none';
  }

  public fileURL(): string {
    if (this.content.attributes.document.data == null) return '';
    return environment.api_url + this.content.attributes.document.data?.attributes.url;
  }

  public documentAttached(): boolean {
    return this.content.attributes.document.data == null ? false : true;
  }

  public editorHasData(): boolean {
    return this.content.attributes.editor?.length > 0 ? true : false;
  }

  public documentName(): string {
    return this.content.attributes.document.data?.attributes.name;
  }
}
