import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content/content';
import { Formats } from 'src/app/interfaces/content/formats';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {

  @Input() public content: Content;

  constructor(
    private _eritContent: EritContentService
  ) { }

  ngOnInit(): void {
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

  public contentApprovedByAdmin(): boolean {
    if (this.content.attributes.approval?.data == null)
      return false;
    else
      return this.content.attributes.approval?.data?.attributes.approved;
  }

  public approveThisContent() {
    this._eritContent.approveContent(this.content.id);
  }

  public discardThisContent() {
    this._eritContent.discardContent(this.content.id);
  }
}
