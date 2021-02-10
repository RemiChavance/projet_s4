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
    
    // Firebase access
    
    /**
     * /!\ Initialiser la connection a la base de données
     */

    /*

    const firebaseConfig = {
      apiKey: "",
      authDomain: "projet-s4-ghac.firebaseapp.com",
      databaseURL: "https://projet-s4-ghac-default-rtdb.firebaseio.com",
      projectId: "projet-s4-ghac",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };

    firebase.default.initializeApp(firebaseConfig);

    */

  }
}
