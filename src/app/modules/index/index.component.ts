import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Content } from 'src/app/interfaces/content';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';
import { NewContentDialogComponent } from '../shared/new-content-dialog/new-content-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public contents: Content[];
  public newContentInputsVisible = false;

  constructor(
    private _eritContent: EritContentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._eritContent.contents.subscribe((res: Content[]) => {
      this.contents = res;
    });
  }

  public openNewContentDialog() {
    const dialogRef = this.dialog.open(NewContentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
