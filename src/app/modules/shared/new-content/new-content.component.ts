import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentPost } from 'src/app/interfaces/content/content-post';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { wysiwygConfig } from './wysiwyg-config';

@Component({
  selector: 'app-new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.css']
})
export class NewContentComponent {
  categories = [
    {value: 'employed', viewValue: 'employed'},
    {value: 'unemployed', viewValue: 'unemployed'},
    {value: 'retired', viewValue: 'retired'},
    {value: 'student', viewValue: 'student'},
  ];

  @Output() contentDiscarded: EventEmitter<void> = new EventEmitter();

  public uploadedImage: string = null;
  public uploadedDocument: string = null;

  public editorConfig = wysiwygConfig;
  public htmlContent: string = '';

  public content: ContentPost = {
    data: {
      title: '',
      category: '',
      editor: ''
    },
    "files.cover_image": null,
    "files.document": null
  }

  constructor(
    private _eritContent: EritContentService,
    private dialog: MatDialog
    ) {}

  public removeImage() {
    this.uploadedImage = null;
  }

  public removeDocument() {
    this.uploadedDocument = null;
  }

  private clearFields() {
    this.content.data.title = '';
    this.content.data.category = '';
    this.content.data.editor = '';
    this.content['files.cover_image'] = null;
    this.content['files.document'] = null;
    this.removeImage();
    this.removeDocument();
    this.contentDiscarded.emit();
  }

  public imageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.uploadedImage = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public documentSelected(fileLoader: Event){
    //this.uploadedDocument = fileLoader['target']['files'][0].name;
    this.uploadedDocument = fileLoader['srcElement']['files'][0].name;
  }

  public publish(imageLoader, fileLoader) {
    this.content['files.cover_image'] = imageLoader.files[0];
    this.content['files.document'] = fileLoader.files[0];

    this._eritContent.postContent(this.content).then((posted: boolean) => {
      if (posted)
        this.openNotifyDialog();
      else
        window.alert('Data is empty or incorrect and did not publish.');
    });
  }

  private openNotifyDialog() {
    const dialogRef = this.dialog.open(NotifyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.clearFields();
    });
  }
}
