import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'projet';

  constructor() {
    
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyC20shHVQ2ja13Ll_cWrkHOosku1SgBlM0",
      authDomain: "projet-s4-7081d.firebaseapp.com",
      databaseURL: "https://projet-s4-7081d-default-rtdb.firebaseio.com",
      projectId: "projet-s4-7081d",
      storageBucket: "projet-s4-7081d.appspot.com",
      messagingSenderId: "1084615419975",
      appId: "1:1084615419975:web:9a6172788b02accdd52962"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);

  }

}

