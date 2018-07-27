import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDxpXUphrUTCdCpeVXI90E_WT4YNPLHBiE",
    authDomain: "selfmade-dailyscat.firebaseapp.com",
    databaseURL: "https://selfmade-dailyscat.firebaseio.com",
    projectId: "selfmade-dailyscat",
    storageBucket: "selfmade-dailyscat.appspot.com",
    messagingSenderId: "677941215762"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
export default firebase;