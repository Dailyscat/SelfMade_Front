import React from 'react';
import './PlayerHome.css'
import Play from '../../icon/play-button.svg';
import Pause from '../../icon/pause.svg';
import Stop from '../../icon/stop.svg';
import Previous from '../../icon/back.svg';
import Next from '../../icon/next.svg';
import Shuffle from '../../icon/shuffle.svg';
import Repeat from '../../icon/replay.svg';
import Speaker from '../../icon/speaker.svg';
import CategoryPlayList from '../CategoryPlayList/CategoryPlayList'

function offsetLeft(el) {
    var left = 0;
    while (el && el !== document){
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}

export default class PlayerHome extends React.Component {
    constructor() {
        super();

        this.state ={
            selected: "HipHop",
        }
    }

    componentDidMount(){
        this.setState({
            selected: this.props.chooseCategory,
        })
    }

    clickTab (category) {
        this.setState({
            selected: category,
        })
        
    }


    render(){
            return(
                <div className="playerHome">
                    <div className="playerHomeContainer">
                        
                        <CategoryPlayList category = {this.state.selected} clickTab = {this.clickTab.bind(this)}/>
                    </div>
                </div>
            );
    }
}