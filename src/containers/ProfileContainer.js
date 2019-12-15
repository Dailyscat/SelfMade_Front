import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from "../components/Profile";
import { fetchArtistUploadedSong } from "../store/modules/profile";

class ProfileContainer extends Component {

  componentDidMount() {
    const { fetchArtistUploadedSong } = this.props;
    fetchArtistUploadedSong();
  }

  render() {
    const { artistUploadedSong } = this.props;
    return (<Profile artistUploadedSong={artistUploadedSong}/>);
  }
}

const mapStateToProps = state => ({
  artistUploadedSong: state.profile.artistUploadedSong,
})

const mapDispatchToProps = dispatch => ({
  fetchArtistUploadedSong: () => {
    axios
    .get("http://localhost:4000/api/song/artistUploadedSong")
    .then(response => {
      dispatch(fetchArtistUploadedSong(response.data));
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)