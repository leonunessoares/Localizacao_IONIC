import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map:any;
  lugar:any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  posLatitude: any;
  posLongitude: any;
  Infowindow:any;

  constructor(private geolocation: Geolocation) {}

  ngOnInit(){
    this.exibeMap();
  }

  exibeMap(){

    this.geolocation.getCurrentPosition()
    .then((resp)=>{
      const position=new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.posLatitude =  resp.coords.latitude;
      this.posLongitude = resp.coords.longitude;
      alert('Latitude: ' + resp.coords.latitude + ' Longitude: ' + resp.coords.longitude);
      this.getPlaces(this.posLatitude, this.posLongitude)
      const mapOptions = {
        zoom: 18, 
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição: ', error);
    });
  }

   getPlaces(latitude, longitude) {

    var latLong = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {

        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    this.lugar = new google.maps.Map(document.getElementById('places'), mapOptions);
    this.Infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(Map);
    service.nearbySearch({

        location: latLong,
        radius: 500,
        type: ['store']
    }, this.foundStoresCallback);

}
 foundStoresCallback(results, status) {

  if (status === google.maps.places.PlacesServiceStatus.OK) {

      for (var i = 0; i < results.length; i++) {

          this.createMarker(results[i]);

      }
  }
}

createMarker(place) {

  var placeLoc = place.geometry.location;

  var marker = new google.maps.Marker({
      map: Map,
      position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {

    this.Infowindow .setContent(place.name);
    this.Infowindow .open(Map, this);

  });
}



}
