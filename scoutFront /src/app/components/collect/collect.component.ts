import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { DialogPhotoComponent } from './dialog-photo/dialog-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { FilesService } from '../../services/files.service';
import { PhotoService } from '../../services/photo.service';
import { CollectService } from '../../services/collect.service';

import { DialogVideoComponent } from './dialog-video/dialog-video.component';
import { DialogMapComponent } from 'src/app/components/collect/dialog-map/dialog-map.component';

import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})

export class CollectComponent implements OnInit {
  idVisit=0;
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  audioUrl = null;
  videoFiles = null;
  error;

  collectForm = new FormGroup({
    "text": new FormControl()
  });
  //Geolocalisation
  position: any;
  text:any;

  public point;
  public gps;
  public gpsUserX; // longitude user position
  public gpsUserY; // latitude user position
  public precision; // gpsUser accuracy
  public gpsX = null; // longitude collect position
  public gpsY = null; // latitude collect position

  public userPosition : any;
  way = [];
  //photos list
  captures =[];
  

  constructor( 
    public collectService: CollectService, 
    public photoService: PhotoService,  
    public filesService: FilesService,
    public dialog: MatDialog, 
    private domSanitizer: DomSanitizer,
    public router: Router, 
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idVisit = this.route.snapshot.params.id;
    this.initForm();
    //get metadata saved in localStorage
    this.text = JSON.parse(localStorage.getItem('text'));
    this.collectForm.controls['text'].setValue(this.text);
    this.captures= JSON.parse(localStorage.getItem('photos'));
    this.audioUrl = JSON.parse(localStorage.getItem('audio'));
    //get video saved and translate in security url
    if (localStorage.getItem('video')!==null){
      let videoUrl = JSON.parse(localStorage.getItem('video'));
      this.videoFiles = this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl.base64data);
    }
      

// geolocalisation
    // si pas en mouvement remplacer watchPosition par getCurrentPosition
    this.point = navigator.geolocation.watchPosition(pos => {
      this.position = pos;
      // console.log(pos);
      this.gpsUserY = pos.coords.longitude;
      this.gpsUserX = pos.coords.latitude;
      this.precision = pos.coords.accuracy;
      //console.log(this.precision);
      // console.log(`Position: longitude : ${this.gpsUserX} latitude : ${this.gpsUserY}`);   
    
      // si en mouvement :  decommenter 
          this.userPosition = [
          this.gpsUserX, this.gpsUserY,
          ];

     // sinon tableau de test si pas en mouvement
      //     this.userPosition = [
      //   [45.832387499999996, 3.1420139999999996],
      //   [45.8324115247767, 3.1423473914195514],
      //   [45.832227732706315, 3.1425539902872446],
      //   [45.83210832281976, 3.1425412128367074],
      //   [45.83210832281978, 3.142339355035393],
      //   [45.83189629439147, 3.142339355035393]
      // ];

      // console.log(this.userPosition);
      this.way.push(this.userPosition);

      // test recuperation tableau coordonnees
      // console.log('this way : ' + this.way); 

      // console.log('latlngs : ' + this.latlngs);
    }, err =>{
      console.log(err);
      // get accuracy maximum error at the moment
    }, {enableHighAccuracy: true }
    );
  }
  
saveText(){
    this.text = this.collectForm.controls['text'].value;
    localStorage.setItem('text',JSON.stringify(this.text));
}

// ----- Async functions for paths of audio and video 
async getCollect() {
  let audioURL;
  let videoURL;
  if (localStorage.getItem('audio')!== null){
    audioURL = await this.filesService.upload(JSON.parse(localStorage.getItem('audio'))).toPromise();
  } else {
    audioURL= null;
  }
  if (localStorage.getItem('video')!== null){
    videoURL = await this.filesService.upload(JSON.parse(localStorage.getItem('video'))).toPromise();
  } else {
    videoURL = null;
  }
    let values = await Promise.all([audioURL, videoURL]);
    let collectObj = {
      text: this.collectForm.controls["text"].value,
      gpsX: this.gpsX,
      gpsY: this.gpsY,
      audioURL: values[0],
      videoURL: values[1],
      idVisit: this.idVisit
    }
   return collectObj;
}

onSubmit(){
  navigator.geolocation.clearWatch(this.point);
  this.getCollect().then((res)=>{
    // save object of collect in bd 
    this.collectService.create(res).subscribe(data=>{
        // get idCollect of photo with data
        this.captures.forEach(element=>{
        //save photos's base64data in server and get their paths
        this.filesService.upload(element).subscribe((res)=>{
        let photoURL = res;
        let photo = {
          fileName: element.fileName,
          photoURL: photoURL,
          // get idCollect of photo with data
          idCollect: data.id
        }
        this.photoService.create(photo).subscribe();
        // localStorage.clear();
        });
      });
    });
    alert('Les données de la collecte sont bien enregistées!');
    localStorage.removeItem('text');
    localStorage.removeItem('photos');
    localStorage.removeItem('audio');
    localStorage.removeItem('video');
    this.router.navigate([`resumeVisit/${this.idVisit}`]);
  }).catch((e) =>
       console.log(e)
  );
}

private initForm() {
    this.collectForm = new FormGroup({
      text: new FormControl(this.text, Validators.required),
    });
    this.collectForm.patchValue({
      text: this.text,
    });

  }
  // --------------------take or open a phto---------------
//dialog for add one photo
openDialogAdd(): void {
  const dialogRef = this.dialog.open(DialogPhotoComponent, {
    width: 'auto',
    height: 'auto',
    data: {
    index: null
    },
  });
 
  dialogRef.afterClosed().subscribe(data => {
    this.refresh();
  });
}
// dislog for read one photo existing
openDialogPhoto(index){
  const dialogRef = this.dialog.open(DialogPhotoComponent, {
    width: 'auto',
    height: 'auto',
    panelClass: 'app',
    data: {index: index}
  });

  dialogRef.afterClosed().subscribe(data => {
    console.log('The dialog was closed');
    this.refresh();
  });
}
/*******************Audio Record*********************/
// security url
sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
}
  
// Start recording. 
initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseCancellation: false
      },
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}
// start automately
successCallback(stream) {
  var options = {
    mimeType: "audio/wav",
    numberOfAudioChannels: 1,
    sampleRate: 48000,
    bufferSize: 256,
  };
  //Start Actuall Recording
  var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, options);
  this.record.record();
}

//Stop recording.
stopRecording() {
  this.recording = false;
  this.record.stop(this.processRecording.bind(this));
}
/**
* processRecording Do what ever you want with blob
* @param  {any} blob Blog
*/
processRecording(blob) {
  //encoder blob in base64 
  var reader = new FileReader();
  reader.readAsDataURL(blob); 
  reader.onloadend = function() {
      var base64data = reader.result;
      //create fileName for audio
      let fileName = new Date().toString().slice(0,24).split(' ').join('_') +'.wav';
      // create audio object 
      let audio = {
        fileName: fileName.toString(),
        base64data: base64data.toString(),
      }
      // save audio object in localStorage
      localStorage.setItem("audio", JSON.stringify(audio));
  }
}
//error of audio
errorCallback(error) {
  this.error = 'Can not play audio in your browser';
}
//delete recording
deleteRecording(){
  this.audioUrl = null;
  localStorage.removeItem('audio');
  this.refresh();

}
/*******************Video Record*********************/
//record a new video
openDialogVideo(){
  const dialogRef = this.dialog.open(DialogVideoComponent, {
    width: 'auto',
    height: 'auto',
    panelClass: 'app',
    data: { }
  });

  dialogRef.afterClosed().subscribe(data => {
    this.refresh();
  });
}
//review a existing video
openDialogVideoRecorded(){
  const dialogRef = this.dialog.open(DialogVideoComponent, {
    width: 'auto',
    height: 'auto',
    panelClass: 'app',
    data: { index :'replay'}
  });

  dialogRef.afterClosed().subscribe(data => {
    this.refresh();
  });
}

// dialog du map
openDialogMap(){
  const dialogRef = this.dialog.open(DialogMapComponent, {
    width: '60%',
    height: '60%',
    panelClass: 'my-dialog',
    data : {  X : this.gpsUserX, 
              Y: this.gpsUserY,
              precision: this.precision,
              latlngs: this.way,
             
  }});

  dialogRef.afterClosed().subscribe(data => {
    this.gpsX = data.X;
    this.gpsY = data.Y;
    this.gps = JSON.parse(localStorage.getItem('gps'));
  });
}
//delete video
deleteVideo(){
  this.videoFiles = null;
  localStorage.removeItem('video');
  this.refresh();

}
//refresh 
refresh() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
}

}

