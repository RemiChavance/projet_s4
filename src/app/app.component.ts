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
      apiKey: ",
      authDomain: "projet-s4-385ad.firebaseapp.com",
      databaseURL: "https://projet-s4-385ad-default-rtdb.firebaseio.com",
      projectId: "projet-s4-385ad",
      storageBucket: "projet-s4-385ad.appspot.com",
      messagingSenderId: "527248466640",
      appId: "1:527248466640:web:59dec3afeb644c5773b4d5"
    };

    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    
  }
}

// test github
