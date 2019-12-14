import React, { Fragment } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

function Customer(props) {
  return (
    <Fragment>
      <div className="customer">
        <div className="userImg"></div>
        <div className="userBox">
          <div className="userNameCircle"></div>
          <div className="userName">Eungyu Lee</div>
          <div className="userDescription">Hello World!</div>
        </div>
        <div className="history">
          <hr />
          <div className="yourTrackHeader">Recent</div>
          <div className="customerPlayer">
            <ul className="audioPlayerUl">
              {props.playingHistory.length > 0
                ? props.playingHistory.map(data => {
                    return (
                      <AudioPlayer
                        isPlaying={props.isPlaying.bind(this)}
                        songInfo={data}
                      />
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Customer;
