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
}
