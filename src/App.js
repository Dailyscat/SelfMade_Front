import React, { Component } from "react";
import "./App.css";
// import firebase from './services/firebase'
import {
  Home,
  PlayerHome,
  Profile,
  LoginModal,
  SignUpModal,
  Header,
  FooterAudio
} from "./components/index";
import { Route } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
      loginModalOpen: false,
      signUpModalOpen: false,
      chooseCategory: null,
      loggedIn: false,
      profilePageOpen: false,
      categoryPlayList: []
    };
  }

  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     var displayName = user.displayName;
    //     var email = user.email;
    //     var photoURL = user.photoURL;
    //     var uid = user.uid;
    //     this.setState({
    //       user: displayName
    //     });
    //     firebase
    //       .auth()
    //       .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //       .then(() => {
    //         return firebase.auth().signInWithEmailAndPassword(email, uid);
    //       })
    //       .catch(error => {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //       });
    //     this.setState({
    //       loggedIn: true
    //     });
    //   } else {
    //     this.setState({
    //       loggedIn: false
    //     });
    //   }
    // });
  }

  loginModal() {
    this.setState({
      loginModalOpen: !this.state.loginModalOpen
    });
  }

  signUpModal() {
    this.setState({
      signUpModalOpen: !this.state.signUpModalOpen
    });
  }

  chooseCategory(category) {
    var category = category.toLowerCase();
    this.setState(
      {
        chooseCategory: category
      },
      () => {
        axios
          .get("http://localhost:4000/api/song/songlist", {
            params: {
              category: this.state.chooseCategory
            }
          })
          .then(response => {
            shuffle(response.data);
            this.setState({
              categoryPlayList: response.data
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    );
  }

  googleAuthTrigger() {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then(result => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     this.setState({
    //       loggedIn: true
    //     });
    //     if (result.additionalUserInfo.isNewUser) {
    //       axios
    //         .post("http://localhost:4000/api/auth/register", {
    //           profile: result
    //         })
    //         .then(({ data }) => {
    //           axios.defaults.headers.common[
    //             "authorization"
    //           ] = `Bearer ${data.token}`;
    //           window.localStorage.setItem("SM_ADMIN_TOKEN", data.token);
    //         });
    //     } else {
    //       axios
    //         .post("http://localhost:4000/api/auth/login", {
    //           profile: result
    //         })
    //         .then(({ data }) => {
    //           axios.defaults.headers.common[
    //             "authorization"
    //           ] = `Bearer ${data.token}`;
    //           window.localStorage.setItem("SM_ADMIN_TOKEN", data.token);
    //         });
    //     }
    //     this.loginModal();
    //     window.location.reload();
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
  }

  googleAuthLogout() {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     this.setState({
    //       loggedIn: false
    //     });
    //     axios.defaults.headers.common["authorization"] = "";
    //     window.localStorage.removeItem("SM_ADMIN_TOKEN");
    //   })
    //   .catch(function(error) {
    //     // An error happened.
    //   });
  }

  loggedInSegMenuClick(pageName) {
    this.setState({
      profilePageOpen: pageName
    });
  }

  isPlaying(ev, status, playingId) {
    var newState = {};

    if (status !== undefined) {
      newState.isPlaying = status;
    }
    newState.playingId = playingId;
    if (playingId && this.state.isPlaying) {
      axios.defaults.headers.common["SM_ADMIN_TOKEN"] =
        window.localStorage.SM_ADMIN_TOKEN;
      axios
        .get("http://localhost:4000/api/user/recent")
        .then(response => {
          if (!response.data[0].listeningHistory.includes(playingId)) {
            response.data[0].listeningHistory.push(playingId);
          } else if (response.data[0].listeningHistory.includes(playingId)) {
            var idx;
            response.data[0].listeningHistory.filter(
              (currentVal, index, arr) => {
                if (currentVal === playingId) {
                  idx = index;
                  return index;
                }
              }
            );
            response.data[0].listeningHistory.splice(idx, 1);
            response.data[0].listeningHistory.push(playingId);
          }

          axios
            .put("http://localhost:4000/api/user/updateRecent", {
              listeningHistory: response.data[0].listeningHistory
            })
            .then(response => {
              console.log(response);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.user}
          googleAuthLogout={this.googleAuthLogout.bind(this)}
          loggedIn={this.state.loggedIn}
          loggedInSegMenuClick={this.loggedInSegMenuClick.bind(this)}
          loginModal={this.loginModal.bind(this)}
          signUpModal={this.signUpModal.bind(this)}
        />
        <Home chooseCategory={this.chooseCategory.bind(this)} />
        {this.state.loginModalOpen ? (
          <LoginModal
            loginModal={this.loginModal.bind(this)}
            googleAuthTrigger={this.googleAuthTrigger.bind(this)}
          />
        ) : (
          ""
        )}
        {this.state.signUpModalOpen ? (
          <SignUpModal signUpModal={this.signUpModal.bind(this)} />
        ) : (
          ""
        )}
        {this.state.chooseCategory !== null ? (
          <PlayerHome
            isPlaying={this.isPlaying.bind(this)}
            playList={this.state.categoryPlayList}
            chooseCategory={this.state.chooseCategory}
            chooseCategoryTab={this.chooseCategory.bind(this)}
          />
        ) : (
          ""
        )}
        {this.state.profilePageOpen ? (
          <Profile
            artistUploadedSong={this.state.artistUploadedSong}
            isPlaying={this.isPlaying.bind(this)}
            playingHistory={this.state.playingHistory}
            pageName={this.state.profilePageOpen}
          />
        ) : (
          ""
        )}
        <FooterAudio
          playingId={this.state.playingId}
          playList={this.state.categoryPlayList}
          playStatus={this.state.isPlaying}
          isPlaying={this.isPlaying.bind(this)}
        />
      </div>
    );
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default App;
