import { Component } from '@angular/core';
import { User } from './models/user.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet';

  constructor() {
    const user = new User('remi@gmail.com', 'remi123', 'Remi');
    console.log(user);

    var firebaseConfig = {
      apiKey: "AIzaSyC1zspIj9wrsBiQX16g20kEfWJ0C-oGqDI",
      authDomain: "projet-s4-ghac.firebaseapp.com",
      databaseURL: "https://projet-s4-ghac-default-rtdb.firebaseio.com",
      projectId: "projet-s4-ghac",
      storageBucket: "projet-s4-ghac.appspot.com",
      messagingSenderId: "378917706292",
      appId: "1:378917706292:web:00d412b6082bb39b0fc861"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);

  }
  
}
