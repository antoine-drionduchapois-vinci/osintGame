import { CoordinatesService } from '../services/coordinates.service';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-image-management',
  styleUrls: ['./image-management.component.css'],
  template: `
    <div class="image-management-container">
      <p-card styleClass="image-card">
        <div class="image-container">
          <pinch-zoom>
            <img
              [src]="image.imageUrl"
              alt="Image from Firestore"
              class="zoomable-image"
            />
          </pinch-zoom>
        </div>

        <div class="coordinate-inputs">
          <p>Enter Latitude and Longitude</p>
          <div class="p-fluid">
            <div class="p-field">
              <label for="latitude">Latitude</label>
              <input
                id="latitude"
                type="number"
                pInputText
                [(ngModel)]="userLatitude"
                placeholder="Latitude"
              />
            </div>

            <div class="p-field">
              <label for="longitude">Longitude</label>
              <input
                id="longitude"
                type="number"
                pInputText
                [(ngModel)]="userLongitude"
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>
        <div class="button-container">
          <button
            pButton
            type="button"
            label="Submit Coordinates"
            icon="pi pi-check"
            class="p-button-success"
            (click)="submitCoordinates()"
            pRipple
          ></button>
        </div>
      </p-card>
    </div>
  `,
})
export class ImageManagementComponent implements OnInit{
  constructor(
    private contentService: ContentService,
    private coordinatesService: CoordinatesService,
    private stateService: StateService
  ) {}

  userLatitude: number = 0;
  userLongitude: number = 0;
  image: any;

  submitCoordinates() {
    this.coordinatesService.setCoordinates(
      this.userLatitude,
      this.userLongitude
    );
    console.log('Coordinates set:', this.userLatitude, this.userLongitude);

    this.stateService.changeState('map');
  }

  async ngOnInit() {
    await this.getCurrentImage();
  }

  getCurrentIndex() {
    let currentIndex = this.stateService.getIndex();
    console.log(currentIndex);
    return currentIndex;
  }

  async getCurrentImage() {
    let data = await this.contentService.fetchDataId(this.getCurrentIndex());
    this.image = data;
    console.log('my data', data);
  }
}
