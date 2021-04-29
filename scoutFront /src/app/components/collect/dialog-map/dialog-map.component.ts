import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import * as leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";



@Component({
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrls: ['./dialog-map.component.css']
})
export class DialogMapComponent implements OnInit {

  public map;
  public marker;
  public e;
  public trajet;
  markerIcon = {
    icon: leaflet.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "../../assets/images/marker-icon-red.png",
      shadowUrl: "../../assets/images/marker-shadow.png"
    })
  };
  markerblue = {
    icon: leaflet.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "../../assets/images/marker-icon.png",
      shadowUrl: "../../assets/images/marker-shadow.png"
    })
  }

  public gps;
  public lat;
  public lng;
  public circle;
  
  constructor(public dialogRef: MatDialogRef<DialogMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    // je recupere via la clé data les valeurs X et Y du user transmises par openDialog
    // je les attribut aux coordonnees 
    const coord: [number, number] = [ this.data.X, this.data.Y];
    this.map = leaflet.map('mapid').setView(coord, 20);
    console.log('coordonnées transmises par ouverture dialog : ' + coord);
   
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic3lsdmllYmV3ZWIiLCJhIjoiY2tsNmt6M251MGp5eDJvbjJ3YWtkaDYwaiJ9.p7I4ZONFwAnkCc17AyEs3Q'
  }).addTo(this.map);

  
  // je me positionne sur la carte avec le marker qui contient les coordonnees
  leaflet.marker(coord, this.markerblue).addTo(this.map).bindPopup('votre position à ' + this.data.precision + ' mètres près').openPopup();
  
  //Création d'un cercle
this.circle = leaflet.circle(coord, this.data.precision, {
  color: 'blue',
  fillColor: 'gray',
  fillOpacity: 0.5
}).addTo(this.map);

    // tracé
    this.trajet = leaflet.polyline(this.data.latlngs as [number, number][], {color: 'red'}).addTo(this.map);
    //bindPopup('nouveau point ' + this.data.latlngs ).openPopup();
    this.map.fitBounds(this.trajet.getBounds());
    // console.log(this.data.latlngs);

  // au mouse click event sur la carte, je recupere 'e' pour les coordonnees
  this.map.on("click", e => {
  // s'il y a deja un second marker existant, je le supprime pour pouvoir en recreer un autre ( en cas d'erreur de position)
    if (this.marker != undefined) {
      this.map.removeLayer(this.marker);
    };
    
    // afficher les coordonnees dans la consoles pour test
    console.log(e.latlng);

    // j'attribut lat et lng grace à 'e'
    this.lat = e.latlng.lat;
    this.lng = e.latlng.lng; 
   
    // si la position choisie est differente ma position, (sinon je ne fais rien, j'ai deja un marker de position)
    if( this.data.X !== this.lat && this.data.Y !== this.lng){

    // je creer un nouveau marker au click 
    this.marker = leaflet.marker([this.lat, this.lng], this.markerIcon).addTo(this.map);
    console.log(this.lat,this.lng);
    }

    // localstorage : j'ajoute mes valeurs à data
    this.data = {
      X: this.lat,
      Y: this.lng
    }
    // je store data
    localStorage.setItem('gps', JSON.stringify(this.data));
  });
}
// je renvoi data à mon collect.component.ts
retour(): void {
  this.dialogRef.close(this.data);
};
}

