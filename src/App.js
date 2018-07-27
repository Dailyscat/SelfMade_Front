import React, { Component } from 'react';
import './App.css';
import firebase from './services/firebase'
import { Home,PlayerHome,Profile,LoginModal,SignUpModal,Header, FooterAudio } from './components/index';

class App extends Component {
  constructor() {
    super();

    this.state ={
        loginModalOpen: false,
        signUpModalOpen: false,
        chooseCategory: null,
        loggedIn: false,
        profilePageOpen: false,
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {

          return firebase.auth().signInWithEmailAndPassword(email, uid);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
        this.setState({
          loggedIn: true,

        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    });
  }

  loginModal () { 
    this.setState({
      loginModalOpen: !this.state.loginModalOpen,
    });
  }

  signUpModal () { 
    this.setState({
      signUpModalOpen: !this.state.signUpModalOpen,
    });
  }

  chooseCategory(category){
    this.setState({
      chooseCategory:category,
    })
  }

  googleAuthTrigger () {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      this.setState({
        loggedIn : true,
      })
      this.loginModal();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  googleAuthLogout () {
    firebase.auth().signOut().then(() => {
      this.setState({
        loggedIn: false,
      })
    }).catch(function(error) {
      // An error happened.
    });
  }

  loggedInSegMenuClick(pageName){
    this.setState({
      profilePageOpen:pageName,
    })
  }

  render() {
    return (
      <div className="App">
        <Header googleAuthLogout = {this.googleAuthLogout.bind(this)} loggedIn = {this.state.loggedIn} loggedInSegMenuClick = {this.loggedInSegMenuClick.bind(this)} loginModal = {this.loginModal.bind(this)} signUpModal = {this.signUpModal.bind(this)}  />
        <Home chooseCategory = {this.chooseCategory.bind(this)}/>
        {this.state.loginModalOpen ?<LoginModal loginModal = {this.loginModal.bind(this)} googleAuthTrigger = {this.googleAuthTrigger.bind(this)}/> : ""}
        {this.state.signUpModalOpen ?<SignUpModal signUpModal = {this.signUpModal.bind(this)}/> : ""}
        {this.state.chooseCategory !== null ?<PlayerHome chooseCategory = {this.state.chooseCategory}/> : ""}
        {this.state.profilePageOpen ?<Profile pageName = {this.state.profilePageOpen}/> :"" }
        <FooterAudio/>
      </div>
    );
  }
}

export default App;
