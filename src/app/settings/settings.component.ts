import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'app-settings',
  //templateUrl: './settings.component.html',
  template: `
    <div class="component-wrapper">
  <p-card styleClass="add-image-card">
    <ng-template pTemplate="header">
      <div class="header-content">
        <span>Add an Image to the Game</span>
      </div>
    </ng-template>

    <ng-template pTemplate="content">
      <div class="add-image-content">
        <div class="p-field p-fluid">
          <label for="fileUpload">Select Image</label>
          <input id="fileUpload" type="file" (change)="onFileSelected($event)" />
        </div>

        <div class="p-field p-fluid">
          <label for="latitude">Latitude</label>
          <input
            id="latitude"
            type="text"
            pInputText
            [(ngModel)]="latitude"
            placeholder="Enter Latitude"
          />
        </div>

        <div class="p-field p-fluid">
          <label for="longitude">Longitude</label>
          <input
            id="longitude"
            type="text"
            pInputText
            [(ngModel)]="longitude"
            placeholder="Enter Longitude"
          />
        </div>
      </div>
    </ng-template>

    <ng-template pTemplate="footer">
      <div class="footer-content">
        <button
          pButton
          type="button"
          label="Upload"
          icon="pi pi-upload"
          class="p-button-raised p-button-primary"
          (click)="onUpload()"
        ></button>
      </div>
    </ng-template>
  </p-card>
    </div>
`,
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  selectedFile!: File;
  latitude: number = 0;
  longitude: number = 0;

  constructor(private storage: AngularFireStorage, private firebaseService: FireBaseService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

  const filePath = `game_images/${Date.now()}_${this.selectedFile.name}`;
  const fileRef = this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath, this.selectedFile);


    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File URL:', url);
            this.firebaseService.saveImageMetadata(url, this.latitude, this.longitude);
          });
        })
      )
      .subscribe();
  }
}

