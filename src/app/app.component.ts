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

    // Firebase access
    const firebaseConfig = {
      apiKey: "AIzaSyAWN5j7-xCdOCywZQ9k8ZG5MgFMhL8fGvM",
      authDomain: "projet-s4-1a312.firebaseapp.com",
      databaseURL: "https://projet-s4-1a312-default-rtdb.firebaseio.com/",
      projectId: "projet-s4-1a312",
      storageBucket: "projet-s4-1a312.appspot.com",
      messagingSenderId: "111844526857",
      appId: "1:111844526857:web:f1c18186a799affa4f61d8"
    };

    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
  }
}
