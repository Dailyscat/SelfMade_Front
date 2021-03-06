import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Profile from "../components/Profile";
import {
  fetchArtistUploadedSong,
  fetchPlayingHistory,
  isPlaying
} from "../store/modules/profile";

class ProfileContainer extends Component {
  componentDidMount() {
    const { fetchArtistUploadedSong, fetchPlayingHistory } = this.props;
    fetchArtistUploadedSong();
    fetchPlayingHistory();
  }

  render() {
    const { artistUploadedSong } = this.props;
    return <Profile artistUploadedSong={artistUploadedSong} />;
  }
}

const mapStateToProps = state => ({
  artistUploadedSong: state.profile.artistUploadedSong,
  isPlaying: state.profile.isPlaying,
  playingId: state.profile.playingId,
  playingHistory: state.profile.playingHistory
});

const mapDispatchToProps = dispatch => ({
  fetchArtistUploadedSong: () => {
    axios
      .get("http://localhost:4000/api/song/artistUploadedSong")
      .then(response => {
        dispatch(fetchArtistUploadedSong(response.data));
      });
  },
  fetchPlayingHistory: () => {
    axios.defaults.headers.common["SM_ADMIN_TOKEN"] =
      window.localStorage.SM_ADMIN_TOKEN;
    axios
      .get("http://localhost:4000/api/user/recent")
      .then(response => {
        axios
          .get("http://localhost:4000/api/song/currentSong", {
            params: { listeningHistory: response.data[0].listeningHistory }
          })
          .then(response => {
            dispatch(fetchPlayingHistory(response.data));
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  isPlaying: (status, playingId) => {
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
              dispatch(isPlaying(status, playingId));
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
