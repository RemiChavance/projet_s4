import { Component } from '@angular/core';
import firebase from 'firebase';

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
      apiKey: "AIzaSyD0jinb4_fJfj7tiXFpA8ynOtB8VqWoWRE",
      authDomain: "projet-s4-dev.firebaseapp.com",
      databaseURL: "https://projet-s4-dev-default-rtdb.firebaseio.com",
      projectId: "projet-s4-dev",
      storageBucket: "projet-s4-dev.appspot.com",
      messagingSenderId: "624618870456",
      appId: "1:624618870456:web:8fc1bbdc57b297da1a464d"
    };
        
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}