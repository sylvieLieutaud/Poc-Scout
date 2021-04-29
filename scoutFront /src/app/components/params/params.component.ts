import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit{

  constructor(private location: Location,
    public router: Router,
    public route: ActivatedRoute) { }

  resolution: 'low'| 'middle' |'high';
  quality: '0.6'| '0.8' | '1' ;

  ngOnInit(){
    let params = JSON.parse(localStorage.getItem('params'))
    if (params !== null){
      this.resolution = params.resolution;
      this.quality = params.quality
    } else {
      this.resolution = 'middle';
      this.quality = '0.8';
    }
  }
  
  goback() {
    // if (this.resolution === 'low'){
    //   this.resol = [720,480];
    // } else if (this.resolution === 'middle'){
    //   this.resol = [1280,720]
    // } else {
    //   this.resol = [1920,1080]
    // }
    let params ={
      resolution: this.resolution,
      quality: this.quality
    }
    localStorage.setItem('params',JSON.stringify(params));
    this.location.back();
  }
}
