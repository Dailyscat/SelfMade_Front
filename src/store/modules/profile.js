const FETCH_UPLOADED_SONG = "profile/FETCH_UPLOADED_SONG";
const IS_PLAYING = "profile/IS_PLAYING";
const PLAYING_HISTORY = "profile/PLAYING_HISTORY";
const PAGE_NAME = "profile/PAGE_NAME";

export const fetchArtistUploadedSong = uploadedSong => {
  return {
    type: FETCH_UPLOADED_SONG,
    artistUploadedSong: uploadedSong
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
  playingId: ""
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
  }
}
