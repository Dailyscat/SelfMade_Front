import React from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './CategoryPlayList.css';

function offsetLeft(el) {
    var left = 0;
    while (el && el !== document){
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}

export default class CategoryPlayList extends React.Component {
    constructor() {
        super();

        this.state ={
            
        }
    }
    
    clickTab (ev) {
        this.props.clickTab(ev.currentTarget.innerText.toLowerCase());
        this.props.chooseCategoryTab(ev.currentTarget.innerText.toLowerCase());
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
                <div className = "categoryPlayList">
                    <div className = "tabContainer">
                        <ul className = "tabBody" >
                            <li className = {this.props.category === "hiphop" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>HipHop</li>
                            <li className = {this.props.category === "rnb" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>RnB</li>
                            <li className = {this.props.category === "soul" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Soul</li>
                            <li className = {this.props.category === "kpop" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Kpop</li>
                            <li className = {this.props.category === "fork" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Fork</li>
                            <li className = {this.props.category === "ballad" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Ballad</li>
                            <li className = {this.props.category === "edm" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>EDM</li>
                            <li className = {this.props.category === "etc" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Etc</li>
                        </ul>
                        <hr/>
                        <div className = "tabPlayer">
                            <div className = "playerHomePlayer">
                                <ul className = "audioPlayerUl">
                                {
                                    this.props.playList.map((data) => {
                                    return (
                                        <AudioPlayer isPlaying = {this.props.isPlaying.bind(this)} songInfo = {data} />
                                    );
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}