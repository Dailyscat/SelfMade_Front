import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from "../components/Profile";
import {} from "../store/modules/profile";

class ProfileContainer extends Component {

  render() {
    const { artistUploadedSong } = this.props;
    return (<Profile artistUploadedSong={artistUploadedSong}/>);
  }
}

const mapStateToProps = state => ({
  artistUploadedSong: state.profile.artistUploadedSong,
})

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)