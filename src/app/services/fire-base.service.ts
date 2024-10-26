import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(
    private store: AngularFirestore,
    private authService: AuthService
  ) {}

  async getData(): Promise<any[]> {
    try {
      const dataSnapshot = await firstValueFrom(
        this.store.collection('osintGame').get()
      );
      return dataSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  saveImageMetadata(
    imageUrl: string,
    latitude: number,
    longitude: number
  ): void {
    const newImage = {
      imageUrl,
      latitude,
      longitude,
    };

    // Save the new image metadata to the 'osintGame' collection
    this.store
      .collection('osintGame')
      .add(newImage)
      .then(() => {
        console.log('Image metadata saved successfully');
      })
      .catch((error) => {
        console.error('Error saving image metadata:', error);
      });
  }

  async saveUserPoints(points: number): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    const email = await this.authService.getCurrentUserEmail();
    if (userId) {
      try {
        const userDocRef = this.store.collection('users').doc(userId);
        await userDocRef.set({ points, email }, { merge: true });
        console.log('User points updated successfully');
      } catch (error) {
        console.error('Error saving user points:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  }

  async getRanking(): Promise<any[]> {
    try {
      const dataSnapshot = await firstValueFrom(
        this.store.collection('users', ref => ref.orderBy('points', 'desc')).get()
      );
      return dataSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
