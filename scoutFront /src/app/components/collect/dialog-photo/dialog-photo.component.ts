import { Component,Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { from } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.css']
})
export class DialogPhotoComponent implements OnInit {

  constructor(
    public filesService: FilesService,
    public dialogRef: MatDialogRef<DialogPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures = [];
  public photo:any;
  public resol =[];
  public quality;

  public ngOnInit() {
    // get params of photo
    if (localStorage.getItem('params') !== null ){
    let params =JSON.parse(localStorage.getItem('params'));
    console.log(params);
    this.quality = params.quality;
        // get resolution of photos
        if (params.resolution === 'low'){
        this.resol = [480,270];
      } else if (params.resolution === 'middle'){
        this.resol = [720,480]
      } else {
        this.resol = [1280,720]
      }
    } else {
      this.resol = [720,480];
      this.quality = 0.8;
    }
    if ( localStorage.getItem('photos') !== null){
      this.captures = JSON.parse(localStorage.getItem('photos'));
      if ( this.data.index !== null){
      //get index of photo
      this.photo = this.captures[this.data.index];
    }
  }

    //  this.captures = JSON.parse(localStorage.getItem('photos'));
    
  }
  // demander la permission de camera 
  public ngAfterViewInit() {
    if( this.data.index === null){
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream
            this.video.nativeElement.play();
        });
    }
    }
  }
  //prendre une capture de l'écran
  public capture() {
    // console.log(this.resol);
      this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, this.resol[0], this.resol[1] );
      //tranformer la source de photo en png base64: canvas.toDataURL(type, encoderOptions); encoderOptions = 0 ->1 for image quality
      let photoBase = this.canvas.nativeElement.toDataURL("image/png",this.quality);
      //create fileName
      let fileName = new Date().toString().slice(0,24).split(' ').join('_') +'.png';
      // create object photo
      let photo = {
        fileName: fileName.toString(),
        base64data: photoBase.toString(),
      }
      this.captures.push(photo);
      localStorage.setItem('photos', JSON.stringify(this.captures));
      this.dialogRef.close();
  }

  //delete une photo
  delete(){
    this.captures.splice(this.data.index,1);
    localStorage.setItem('photos', JSON.stringify(this.captures));
    this.dialogRef.close();
  }
  //button de retour
  retour(): void {
    this.dialogRef.close();
  }

}
