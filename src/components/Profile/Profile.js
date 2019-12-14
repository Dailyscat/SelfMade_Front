import React from "react";
import "./Profile.css";
import Play from "../../icon/play-button.svg";
import Pause from "../../icon/pause.svg";
import Stop from "../../icon/stop.svg";
import Previous from "../../icon/back.svg";
import Next from "../../icon/next.svg";
import Shuffle from "../../icon/shuffle.svg";
import Repeat from "../../icon/replay.svg";
import Speaker from "../../icon/speaker.svg";
import CustomerSide from "../CustomerSide/CustomerSide";
import ArtistSide from "../ArtistSide/AritstSide";
import Customer from "../Customer/Customer";
import Artist from "../Artist/Artist";

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: "Customer"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageName && this.props.pageName !== nextProps.pageName) {
      if (nextProps.pageName === "Profile") {
        this.setState({ selected: "Customer" });
      } else {
        this.setState({ selected: "Artist" });
      }
    }
  }

  clickTab(ev) {
    this.setState({
      selected: ev.currentTarget.innerText
    });
    window.scrollTo(0, 0);
  }
  togglePlay() {
    this.setState({ is_playing: !this.state.is_playing });
    this.refs.player.play();
  }

  setProgress(ev) {
    var progress =
      (ev.clientx - offsetLeft(this.refs.progress_bar)) /
      this.refs.progress_var.clientWidth;
    this.setState({
      progress: progress
    });
  }

  render() {
    return (
      <div className="profile">
        <div className="profileContainer">
          <div className="profileBody">
            <div className="profileBodyContainer">
              <ul className="tabBody">
                <li
                  className={
                    this.state.selected === "Customer" ? "selected" : ""
                  }
                  onClick={this.clickTab.bind(this)}
                >
                  Customer
                </li>
                <li
                  className={this.state.selected === "Artist" ? "selected" : ""}
                  onClick={this.clickTab.bind(this)}
                >
                  Artist
                </li>
              </ul>
              <hr />
              {this.state.selected === "Customer" ? (
                <CustomerSide />
              ) : (
                <ArtistSide />
              )}
              <div className="contributor">
                {this.state.selected === "Customer" ? (
                  <Customer
                    isPlaying={this.props.isPlaying.bind(this)}
                    playingHistory={this.props.playingHistory}
                  />
                ) : (
                  <Artist
                    isPlaying={this.props.isPlaying.bind(this)}
                    artistUploadedSong={this.props.artistUploadedSong}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
