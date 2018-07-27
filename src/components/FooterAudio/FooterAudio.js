import React from 'react';
import './FooterAudio.css'
import Play from '../../icon/play-button.svg';
import Pause from '../../icon/pause.svg';
import Stop from '../../icon/stop.svg';
import Previous from '../../icon/back.svg';
import Next from '../../icon/next.svg';
import Shuffle from '../../icon/shuffle.svg';
import Repeat from '../../icon/replay.svg';
import Speaker from '../../icon/speaker.svg';


export default class FooterAudio extends React.Component {
    constructor() {
        super();

        this.state ={
            file: "http://www.youtube-audio.com/d/rCeM57e2BfU",
            progress:0.2,
        }
    }

    togglePlay(){
        this.setState({is_playing: !this.state.is_playing});
        this.refs.player.play();
    }

    setProgress(ev){
        var progress = (ev.clientx - offsetLeft(this.refs.progress_bar)) / this.refs.progress_var.clientWidth;
        this.setState({
            progress: progress
        })
    }

    render(){
            return(
                <div className="footerAudio">
                <div className="audioContainer">
                    <div className="audioPlayer">
                            <div className="playerButtonContainer">
                                <button className ="button play" onClick = {this.togglePlay.bind(this)}><img src={Play} alt=""/></button>
                                <button className ="button next"><img src={Next} alt=""/></button>
                                <button className ="button prev"><img src={Previous} alt=""/></button>
                                <button className ="button shuffle"><img src={Shuffle} alt=""/></button>
                                <button className ="button repeat"><img src={Repeat} alt=""/></button>
                                <button className ="button speaker"><img src={Speaker} alt=""/></button>
                            </div>
                            <div className="seekBar" onClick={this.setProgress.bind(this)}>
                                <div className="progress" ref="progress_bar" >
                                    <div className="progressBall"></div>
                                </div>
                                <div className="handle"></div>
                            </div>
                            <div className="songProfile">
                                <div className="thumbNail">img</div>
                                <div className="artistName">artist</div>
                                <div className="songTitle">songTitle</div>
                            </div>
                        </div>
                    </div>
                    <audio ref="player" autoPlay = {this.state.playing}>
                        <source src={this.state.file}/>
                    </audio>
                </div>
            );
    }
}

function offsetLeft(el) {
    var left = 0;
    while (el && el !== document){
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}