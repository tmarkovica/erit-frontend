import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public contents: Content[];

  constructor(
    private _eritContent: EritContentService
  ) { }

  ngOnInit(): void {
    this._eritContent.contents.subscribe((res: Content[]) => {
      this.contents = res;
      console.log("items: ", this.contents.length);
    });
  }
}
