import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  async login(){
    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      console.log('Error')
      return null
    }
  }

  getUser(){
    return this.auth.authState
  }

  async logout(){
    this.router.navigate(['/'])
    return await this.auth.signOut().then(()=>{
      this.router.navigate(['/'])
    })
  }

}
