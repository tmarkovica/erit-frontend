import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';
import { ContentPost } from 'src/app/interfaces/content-post';
import { EritContentService } from 'src/app/services/erit-content/erit-content.service';
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

  public uploadImage: string = null;
  public processing: boolean;

  public uploadedDocument: string = null;

  public htmlContent: string = '';
  public editorConfig = wysiwygConfig;

  public content: ContentPost = {
    data: {
      title: '',
      category: '',
      cover_image: null,
      document: null,
      editor: ''
    }
  }

  constructor(
    private _eritContent: EritContentService
    ) {}

  onNoClick(): void {
  }

  // load image
  presentActionSheet(fileLoader) {
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      console.log("uri", URL.createObjectURL(file));
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        that.processing = true;
        that.getOrientation(fileLoader.files[0], function (orientation) {
          if (orientation > 1) {
            that.resetOrientation(reader.result, orientation, function (resetBase64Image) {
              that.uploadImage = resetBase64Image;
            });
          } else {
            that.uploadImage = reader.result.toString();
          }
        });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  imageLoaded() {
    this.processing = false;
  }

  private getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e: any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }

  private resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }
      // draw image
      ctx.drawImage(img, 0, 0);
      // export base64
      callback(canvas.toDataURL());
    };
    img.src = srcBase64;
  }

  removePic() {
    this.uploadImage = null;
  }

  removeDocument() {
    this.uploadedDocument = null;
  }

  // checkout https://stackoverflow.com/questions/69099204/reading-binary-file-by-parts
  // load file
  uploadFile(fileLoader) {
    fileLoader.click();

    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      console.log("uri", URL.createObjectURL(file));

      var reader = new FileReader();
      console.log(reader.result);

      this.uploadedDocument = URL.createObjectURL(file) as string;
      console.log("uploadedDocument", this.uploadedDocument);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  public publish(fileLoader) {
    console.log(this.content.data);


    const image_Base64 = document.getElementById('checkinImage')?.getAttribute('src');

    //console.log(image_Base64);

    let binary = "";
    for (var i = 0; i < image_Base64?.length; i++) {
        binary += image_Base64[i].charCodeAt(0).toString(2) + " ";
    }
    //console.log(binary);

    var file: File = fileLoader.files[0];

    const f: File = new File([image_Base64 as BlobPart], file.name)

    console.log(file.name);
    console.log(file.stream);



    console.log(fileLoader.files[0]);

    this.content.data.cover_image = f;

    this._eritContent.postContent(this.content);
    //const b: BinaryData = ArrayBuffer(binary)

    //this.content.data.cover_image = b;


  }

  // https://stackoverflow.com/questions/70855816/conversion-of-the-binary-data-string-of-image-file-to-a-blob
}
