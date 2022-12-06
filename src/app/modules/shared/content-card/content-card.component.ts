import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

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

}
