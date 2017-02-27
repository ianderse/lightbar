import * as firebase from 'firebase';
import secrets from '../../secrets.json';

export default class FirebaseHelper {
  static firebaseSetup() {
    firebase.initializeApp({
      apiKey: secrets.firebase.apiKey,
      authDomain: "lightbar-3388c.firebaseapp.com",
      databaseURL: "https://lightbar-3388c.firebaseio.com",
      storageBucket: "lightbar-3388c.appspot.com"
    });
  }
}
