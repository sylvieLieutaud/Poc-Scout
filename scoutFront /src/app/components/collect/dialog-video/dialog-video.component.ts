import { Component,Inject, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

declare var MediaRecorder: any; 

@Component({
  selector: 'app-dialog-video',
  templateUrl: './dialog-video.component.html',
  styleUrls: ['./dialog-video.component.css']
})
export class DialogVideoComponent implements OnInit {

	mediaRecorder:any;
	chunks = [];
	videoFiles = null;
  recorded = false;
  recording = false;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  constructor(
    private cd: ChangeDetectorRef, private dom: DomSanitizer,
    public dialogRef: MatDialogRef<DialogVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
    // if an existing video
    if (this.data.index === 'replay'){
      let videoUrl = JSON.parse(localStorage.getItem('video'));
      this.videoFiles = this.dom.bypassSecurityTrustResourceUrl(videoUrl.base64data);
    } else {
      this.videoRecord();
    }
  }
  
  public videoRecord() {
    this.videoFiles = [];
    var options = {mimeType: 'video/webm'};
    //ask permission
		navigator.getUserMedia(
			{ "video": { width: { max: 500 } }, "audio" : true },
			stream => {
        //camera view
        this.video.nativeElement.srcObject = stream
        this.video.nativeElement.play();
        this.mediaRecorder = new MediaRecorder(stream,options);
        //download the video , after MediaRecorder.stop() called
				this.mediaRecorder.onstop = e => {
					var blob = new Blob(this.chunks,{type: "video/webm"});
          //translate blob in base64 dans unload in localStorage
          var reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = function() {
              var base64data = reader.result;
              //create fileName for video object
              let fileName = new Date().toString().slice(0,24).split(' ').join('_') +'.webm';
              // create video object
              let videoObj = {
                fileName: fileName.toString(),
                base64data: base64data.toString(),
              }
              localStorage.setItem("video", JSON.stringify(videoObj));
          }
					this.chunks = [];
					var videoURL = URL.createObjectURL(blob);
					this.videoFiles.push(this.dom.bypassSecurityTrustUrl(videoURL));          
					// console.log(this.videoFiles);
					// console.log('recorder stopped');
					this.cd.detectChanges();
				};
				this.mediaRecorder.ondataavailable = e => {
					this.chunks.push(e.data);
				};
			},
			() => {
				alert('Error capturing audio.');
			},
		);
	}
	startRecording() {
		this.mediaRecorder.start();
    this.recording = true;
		console.log(this.mediaRecorder.state);
	}
	stopRecording() {
		this.mediaRecorder.stop();
    this.recorded = true;
    // setTimeout() here is needed for Firefox.
		console.log(this.mediaRecorder.state);
	}

  retour(): void {
    this.dialogRef.close();
  }
  //delete a video
  removeVideo(){
    localStorage.removeItem('video');
    this.dialogRef.close();
  }
}
