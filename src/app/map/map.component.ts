import { environment } from './../../environments/environment';
import { StateService } from '../services/state.service';
import { Component, OnInit } from '@angular/core';
import { CoordinatesService } from '../services/coordinates.service';
import { PlayerPointsService } from '../services/player-points.service';
import { PointsService } from '../services/points.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.css'],
  template: `
    <p-card styleClass="map-card">
      <ng-template pTemplate="content">
        <div class="info-container">
          <p-panel styleClass="info-panel">
            <div class="info">
              <p>
                Distance between guess and answer:
                <strong>{{ distanceLabel }}</strong>
              </p>
              <p>
                Points Earned: <strong>{{ points }}</strong>
              </p>
            </div>
          </p-panel>
        </div>

        <div class="map-container">
          <google-map
            *ngIf="googleMapsLoaded"
            [center]="center"
            [zoom]="zoom"
            [height]="'400px'"
            [width]="'100%'"
          >
        
            <map-marker
              [position]="userGuessCoords"
              label="Your Guess"
            ></map-marker>

    
            <map-marker
              [position]="correctCoords"
              label="Correct Location"
            ></map-marker>

       
            <map-polyline
              [path]="polylinePath"
              [options]="polylineOptions"
            ></map-polyline>
          </google-map>
        </div>
      </ng-template>

      <ng-template pTemplate="footer">
        <div class="footer-content">
          <button
            pButton
            type="button"
            label="Next"
            icon="pi pi-arrow-right"
            class="p-button-raised p-button-success"
            (click)="changeState()"
          ></button>
        </div>
      </ng-template>
    </p-card>
  `,
})
export class MapComponent implements OnInit {
  userGuessCoords: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  correctCoords: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 2;
  googleMapsLoaded = false;
  polylinePath: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 5,
  };
  distanceLabel: string = '';
  points = 0;

  constructor(
    private coordinatesService: CoordinatesService,
    private stateService: StateService,
    private contentService: ContentService,
    private pointsService: PointsService,
    private playerPointsService: PlayerPointsService
  ) {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  changeState() {
    this.stateService.changeState('image');
  }

  loadGoogleMaps() {
    if (typeof google !== 'undefined' && google.maps) {
      this.googleMapsLoaded = true;
      this.initializeMapData();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.googleMapsLoaded = true;
      this.initializeMapData();
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
    };

    document.body.appendChild(script);
  }

  async initializeMapData() {
    // Fetch user's guessed coordinates
    this.userGuessCoords = {
      lat: this.coordinatesService.getLatitude(),
      lng: this.coordinatesService.getLongitude(),
    };

    // Fetch correct coordinates based on the current index
    const currentIndex = this.stateService.getIndex();
    const correctLocation = await this.contentService.fetchDataId(currentIndex);
    if (correctLocation) {
      this.correctCoords = {
        lat: correctLocation.latitude,
        lng: correctLocation.longitude,
      };
    }

    // Set the map's center to the midpoint between the two locations
    this.center = {
      lat: (this.userGuessCoords.lat + this.correctCoords.lat) / 2,
      lng: (this.userGuessCoords.lng + this.correctCoords.lng) / 2,
    };

    // Define the polyline path
    this.polylinePath = [
      { lat: this.userGuessCoords.lat, lng: this.userGuessCoords.lng },
      { lat: this.correctCoords.lat, lng: this.correctCoords.lng },
    ];

    // Calculate the distance between the two points
    const userLocation = new google.maps.LatLng(
      this.userGuessCoords.lat,
      this.userGuessCoords.lng
    );
    const correctLocationPoint = new google.maps.LatLng(
      this.correctCoords.lat,
      this.correctCoords.lng
    );
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      userLocation,
      correctLocationPoint
    );

    this.points = this.pointsService.calculatePoints(distance);
    this.playerPointsService.addPoints(this.points);
    this.distanceLabel = `${(distance / 1000).toFixed(2)} km`;
  }
}
