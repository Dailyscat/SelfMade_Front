const FETCH_UPLOADED_SONG = "profile/FETCH_UPLOADED_SONG";
const FETCH_PLAYING_HISTORY = "profile/FETCH_PLAYING_HISTORY";
const IS_PLAYING = "profile/IS_PLAYING";
const PAGE_NAME = "profile/PAGE_NAME";

export const fetchArtistUploadedSong = uploadedSong => {
  return {
    type: FETCH_UPLOADED_SONG,
    artistUploadedSong: uploadedSong
  };
};
export const fetchPlayingHistory = playingHistory => {
  return {
    type: FETCH_PLAYING_HISTORY,
    playingHistory: playingHistory
  };
};
export const isPlaying = (status, playingId) => {
  return {
    type: IS_PLAYING,
    isPlaying: status,
    playingId: playingId
  };
};

const initialState = {
  artistUploadedSong: [],
  isPlaying: false,
  playingId: "",
  playingHistory: []
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPLOADED_SONG:
      return {
        ...state,
        artistUploadedSong: action.artistUploadedSong
      };
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    case FETCH_PLAYING_HISTORY:
      return {
        ...state,
        playingHistory: action.playingHistory
      };
  }
}
