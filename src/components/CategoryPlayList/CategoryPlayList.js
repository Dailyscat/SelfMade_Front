import React from 'react';

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
        this.props.clickTab(ev.currentTarget.innerText);
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
                            <li className = {this.props.category === "HipHop" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>HipHop</li>
                            <li className = {this.props.category === "RnB" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>RnB</li>
                            <li className = {this.props.category === "Soul" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Soul</li>
                            <li className = {this.props.category === "Kpop" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Kpop</li>
                            <li className = {this.props.category === "Fork" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Fork</li>
                            <li className = {this.props.category === "Ballad" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Ballad</li>
                            <li className = {this.props.category === "EDM" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>EDM</li>
                            <li className = {this.props.category === "Etc" ?"selected" : ""} onClick = {this.clickTab.bind(this)}>Etc</li>
                        </ul>
                        <hr/>
                        <div className = "tabPlayer">
                        <div className = "playerHomePlayer">
                            <div className = "bodyPlayerThumbNail"></div>
                            <div className = "bodyPlayerDescription">
                                <i class="fas fa-play"></i>
                                <div className = "titleAndDescription">
                                    <div className = "bodyPlayerTilte">title</div>
                                    <div className = "bodyPlayerDescription">description</div>
                                </div>
                                <div className = "possibleChargePlay">possible Charge Play </div>
                                <div className="seekBarBig" onClick={this.setProgress.bind(this)}>
                                    <div className="progress" ref="progress_bar" >
                                        <div className="progressBall"></div>
                                    </div>
                                    <div className="handle"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}