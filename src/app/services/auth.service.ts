import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<any | null>;
  
  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = this.afAuth.authState;
  }

  async getCurrentUserEmail(): Promise<any | null> {
    try {
      const user = await this.afAuth.currentUser;
      return user?.email;
    } catch (error) {
      console.error('Error retrieving current user email:', error);
      return null;
    }
  }

  async getCurrentUserId(): Promise<any | null> {
    try {
      const user = await this.afAuth.currentUser;
      return user?.uid;
    } catch (error) {
      console.error('Error retrieving current user email:', error);
      return null;
    }
  }

  // Register a new user with email and password
 async register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User registered successfully:', userCredential.user);
        return userCredential.user;
      })
      .catch(error => {
        console.error('Error during registration:', error);
        throw error;
      });
  }

  // Sign in an existing user
  async signin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User signed in successfully:', userCredential.user);
        return userCredential.user;
      })
      .catch(error => {
        console.error('Error during sign-in:', error);
        throw error;
      });
  }
  
  // Sign out the current user
  async signOut(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Error during sign-out:', error);
        throw error;
      });
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return user !== null;
  }
}
