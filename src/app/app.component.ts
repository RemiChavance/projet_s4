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
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyDZlLlmtcdyxgBnQvwFn44F4xiLu7rFcwU',
      authDomain: 'projet-s4-4e77d.firebaseapp.com',
      databaseURL: 'https://projet-s4-4e77d-default-rtdb.firebaseio.com',
      projectId: 'projet-s4-4e77d',
      storageBucket: 'projet-s4-4e77d.appspot.com',
      messagingSenderId: '651198091582',
      appId: '1:651198091582:web:0e1cacf4a96f64af8d5c6f'
      };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
  }
}