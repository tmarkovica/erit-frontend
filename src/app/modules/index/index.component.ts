import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public contents: Content[];
  public newContentInputsVisible = false;

  public username: string;
  public userIsAdmin: boolean;

  constructor(
    private _eritContent: EritContentService,
    private _login: LoginService
  ) { }

  ngOnInit(): void {
    this._eritContent.contents.subscribe((res: Content[]) => {
      this.contents = res;
    });

    this._login.username.subscribe((usr: string) => {
      this.username = usr;
    });

    this._login.admin.subscribe((usr: boolean) => {
      this.userIsAdmin = usr;
    });
  }

  public logout() {
    this._login.logout();
  }
}
