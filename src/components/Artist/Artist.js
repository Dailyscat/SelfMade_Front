import React, { Fragment } from "react";
import axios from "axios";
import { format } from "url";
import "./Artist.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

export default class Artist extends React.Component {
  componentDidMount() {
    var form = document.getElementsByTagName("form")[0];
    var formData = new FormData(form);
    var uploadBtn = document.getElementsByClassName("uploadBtn")[0];
    uploadBtn.addEventListener("click", () => {});
  }

  onSubmit(ev) {
    // ev.preventDefault();
    var form = document.getElementsByTagName("form")[0];
    var formData = new FormData(form);
    axios.defaults.headers.common["SM_ADMIN_TOKEN"] =
      window.localStorage.SM_ADMIN_TOKEN;
    axios
      .get("http://localhost:4000/api/auth/check")
      .then(function(response) {
        axios({
          method: "post",
          url: "http://localhost:4000/upload",
          data: formData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        })
          .then(function(response) {
            //handle success
            console.log(response);
          })
          .catch(function(response) {
            //handle error
            console.log(response);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
    window.onload();
  }

  musicTitle(ev) {
    this.setState({ musicTitle: ev.target.value });
  }

  musicCategory(ev) {
    this.setState({ musicCategory: ev.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className="artist">
          <div className="uploadPannel">
            <div className="uploadPannerHeader">Self Made Your Stairs!</div>
            <form
              className="uploadForm"
              method="post"
              encType="multipart/form-data"
            >
              <input type="file" name="imgFile" className="imgFile" />
              <input type="file" name="musicFile" className="musicFile" />
              <div className="musicTitleCategory">
                <select name="musicCategory" defaultValue={"hiphop"}>
                  <option value="hiphop">HipHop</option>
                  <option value="rnb">RnB</option>
                  <option value="soul">Soul</option>
                  <option value="kpop">Kpop</option>
                  <option value="fork">Fork</option>
                  <option value="ballad">Ballad</option>
                  <option value="edm">EDM</option>
                  <option value="etc">ETC</option>
                </select>
                <input type="text" name="musicTitle" className="musicTitle" />
              </div>
              <a
                href="/"
                class="action-button shadow animate blue uploadBtn "
                onClick={this.onSubmit.bind(this)}
              >
                Upload
              </a>
            </form>
          </div>
          <hr />
          <div className="artistTrack">
            <div className="yourTrackHeader">YourTrack</div>
            <div className="aritstPlayer">
              <div className="playerHomePlayer">
                <ul className="audioPlayerUl">
                  {this.props.artistUploadedSong.length > 0
                    ? this.props.artistUploadedSong.map(data => {
                        return (
                          <AudioPlayer
                            isPlaying={this.props.isPlaying.bind(this)}
                            songInfo={data}
                          />
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
