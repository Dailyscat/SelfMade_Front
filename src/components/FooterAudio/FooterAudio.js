import React from "react";
import "./FooterAudio.css";
import Play from "../../icon/play-button.svg";
import Pause from "../../icon/pause.svg";
import Stop from "../../icon/stop.svg";
import Previous from "../../icon/back.svg";
import Next from "../../icon/next.svg";
import Shuffle from "../../icon/shuffle.svg";
import Repeat from "../../icon/replay.svg";
import Speaker from "../../icon/speaker.svg";

export default class FooterAudio extends React.Component {
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

  componentWillReceiveProps(props) {
    this.setState({ is_playing: props.playStatus });
  }

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
    this.setState({ is_playing: !this.state.is_playing });
    this.props.isPlaying();
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
    var currentSong;
    var id = this.props.playList.filter((currentVal, idx, arr) => {
      if (this.props.playingId === currentVal._id) {
        currentSong = currentVal;
        return currentVal.songUrl;
      }
    });
    id = id[0] ? id[0].songUrl : "";

    if (this._player) {
      if (this._player.currentSrc !== id) {
        this._player.src = id;
        this._player.load();
        this._player.play();
      } else if (!this.state.is_playing) {
        this._player.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;
        this._player.currentTime = this._player.duration * this.state.progress;
      }

      currentTime = this._player.currentTime;
      totalTime = this._player.duration;
    }

    return (
      <div className="footerAudio">
        <div className="audioContainer">
          <div className="audioPlayer">
            <div className="playerButtonContainer">
              <button
                className="button play"
                onClick={this.togglePlay.bind(this)}
              >
                {this.state.is_playing ? (
                  <img src={Pause} alt="" />
                ) : (
                  <img src={Play} alt="" />
                )}
              </button>
              <button className="button next">
                <img src={Next} alt="" />
              </button>
              <button className="button prev">
                <img src={Previous} alt="" />
              </button>
              <button className="button shuffle">
                <img src={Shuffle} alt="" />
              </button>
              <button className="button repeat">
                <img src={Repeat} alt="" />
              </button>
              <button className="button speaker">
                <img src={Speaker} alt="" />
              </button>
            </div>
            <div
              className="seekBar"
              onMouseDown={this.startSetProgress.bind(this)}
              onMouseMove={this.setProgress.bind(this)}
              onMouseLeave={this.stopSetProgress.bind(this)}
              onMouseUp={this.stopSetProgress.bind(this)}
            >
              <div className="progress" ref={ref => (this._progress_bar = ref)}>
                <div
                  className="progressBar"
                  style={{ width: this.state.progress * 100 + "%" }}
                >
                  <span className="progressBall"></span>
                </div>
              </div>
              <div className="handle"></div>
            </div>
            <div className="songProfile">
              <div
                className="thumbNail"
                style={{
                  backgroundImage: `url(${
                    currentSong ? currentSong.thumbNail : ""
                  })`
                }}
              ></div>
              <div className="artistName">
                {currentSong ? currentSong.artist : "Artist"}
              </div>
              <div className="songTitle">
                {currentSong ? currentSong.title : "Title"}
              </div>
            </div>
            <div className="time">
              {formatTime(currentTime)} / {formatTime(totalTime)}
            </div>
          </div>
        </div>
        <audio
          ref={ref => (this._player = ref)}
          controls
          autoPlay={this.state.is_playing}
        ></audio>
      </div>
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
