import axios from "axios";

const UPLOADED_SONG = "profile/UPLOADED_SONG";
const IS_PLAYING = "profile/IS_PLAYING";
const PLAYING_HISTORY = "profile/PLAYING_HISTORY";
const PAGE_NAME = "profile/PAGE_NAME";

export const uploadedSong = (artistUploadedSong) => {
  return {
    type: UPLOADED_SONG,
    artistUploadedSong
  }
};
export const isPlaying = (status, playingId) => {
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
            return {
              type: IS_PLAYING,
              newState: newState
            };
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

}

const initialState = {
  artistUploadedSong: [],
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPLOADED_SONG:
      return {
        ...state,
        artistUploadedSong: action.artistUploadedSong
      }
    case IS_PLAYING:
      return {
        ...state,
        
      }
  }
}

export const 
