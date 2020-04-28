import firebase from 'firebase/app';
import 'firebase/database';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDGwUT2uLWQ0i927ITKJPUVWPk3ivEcB2g",
  authDomain: "character-select-5ae64.firebaseapp.com",
  databaseURL: "https://character-select-5ae64.firebaseio.com",
  projectId: "character-select-5ae64",
  storageBucket: "character-select-5ae64.appspot.com",
  messagingSenderId: "836605574248",
  appId: "1:836605574248:web:da5a282ba8dbaa22c6cfdd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
