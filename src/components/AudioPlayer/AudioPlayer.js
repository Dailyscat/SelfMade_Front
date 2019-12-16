import React from "react";
import "./AudioPlayer.css";
import Play from "../../icon/play-button.svg";
import Pause from "../../icon/pause.svg";

export default class AudioPlayer extends React.Component {
  constructor() {
    super();

    this.state = {
      is_playing: false,
      progress: 0,
      in_set_progress_mode: false
    };

    this.is_progress_dirty = false;
    this.interval_id = setInterval(this.onUpdate.bind(this), 250);
  }

  // componentDidUpdate() {
  //     this._player.load();
  // }

  onUpdate() {
    if (this._player) {
      if (!this.is_progress_dirty) {
        this.setState({
          progress: this._player.currentTime / this._player.duration
        });
      }

      // if (this._player.ended && this.props.onDone) {
      //     this.props.onDone(this.props.src);
      // }
    }
  }

  togglePlay(ev) {
    this.setState({ is_playing: !this.state.is_playing }, () => {
      var playingId = this.props.songInfo._id;
      this.props.isPlaying(this.state.is_playing, playingId);
    });
  }

  startSetProgress(evt) {
    this.setState({
      in_set_progress_mode: true
    });
    this.setProgress(evt);
  }
  stopSetProgress(evt) {
    this.setState({
      in_set_progress_mode: false
    });
    this.setProgress(evt);
  }
  setProgress(evt) {
    if (this.state.in_set_progress_mode) {
      var progress =
        (evt.clientX - offsetLeft(this._progress_bar)) /
        this._progress_bar.clientWidth;
      this.setState({
        progress: progress
      });
      this.is_progress_dirty = true;
    }
  }
  render() {
    var currentTime = 0;
    var totalTime = 0;

    if (this._player) {
      if (this._player.currentSrc !== this.props.songInfo.songUrl) {
        this._player.load();
      }

      if (this._player.paused && !this._player.ended) {
        if (this.state.is_playing) {
          this._player.play();
        }
      } else if (!this.state.is_playing) {
        this._player.play().then(() => {
          this._player.pause();
        });
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;
        this._player.currentTime = this._player.duration * this.state.progress;
      }

      currentTime = this._player.currentTime;
      totalTime = this._player.duration;
    }

    return (
      <li className="AudioPlayerList">
        <div className="AudioPlayer">
          <div className="listAudioContainer">
            <div className="listAudioPlayer">
              <div className="listPlayerButtonContainer">
                <button
                  className="listPlayerPlay"
                  onClick={this.togglePlay.bind(this)}
                >
                  {this.state.is_playing ? (
                    <img src={Pause} alt="" />
                  ) : (
                    <img src={Play} alt="" />
                  )}
                </button>
              </div>
              <div
                className="listPlayerSeekBar"
                onMouseDown={this.startSetProgress.bind(this)}
                onMouseMove={this.setProgress.bind(this)}
                onMouseLeave={this.stopSetProgress.bind(this)}
                onMouseUp={this.stopSetProgress.bind(this)}
              >
                <div
                  className="progress"
                  ref={ref => (this._progress_bar = ref)}
                >
                  <div
                    className="progressBar"
                    style={{ width: this.state.progress * 100 + "%" }}
                  >
                    <span className="progressBall"></span>
                  </div>
                </div>
                <div className="handle"></div>
              </div>
              <div className="listPlayerSongProfile">
                <div
                  className="listPlayerThumbNail"
                  style={{
                    backgroundImage: `url(${this.props.songInfo.thumbNail})`
                  }}
                ></div>
                <div className="listPlayerArtistName">
                  {this.props.songInfo.artist}
                </div>
                <div className="listPlayerSongTitle">
                  {this.props.songInfo.title}
                </div>
              </div>
            </div>
          </div>
          <div className="listAudioPlayerTime">
            <span className="start">{formatTime(currentTime)}</span>
            <span className="end">{formatTime(totalTime)}</span>
          </div>
          <audio ref={ref => (this._player = ref)}>
            <source src={this.props.songInfo.songUrl} />
          </audio>
        </div>
      </li>
    );
  }
}
function format2Number(num) {
  var str = num + "";
  if (str.length === 1) {
    return "0" + str;
  }
  if (str.length === 0) {
    return "00";
  }
  return str;
}

function formatTime(s) {
  if (!s && s !== 0) {
    return "??:??";
  }

  var total_seconds = Math.floor(s);
  var hours = Math.floor(total_seconds / 3600);
  var minutes = Math.floor(total_seconds / 60) - hours * 60;
  var seconds = total_seconds - minutes * 60 - hours * 3600;

  if (hours) {
    return hours + ":" + format2Number(minutes) + ":" + format2Number(seconds);
  }

  return format2Number(minutes) + ":" + format2Number(seconds);
}

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}
