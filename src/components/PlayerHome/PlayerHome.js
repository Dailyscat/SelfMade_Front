import React from 'react';
import './PlayerHome.css'
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
            selected: "hiphop",
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
                        
                        <CategoryPlayList  isPlaying = {this.props.isPlaying.bind(this)} playList = {this.props.playList} category = {this.state.selected} clickTab = {this.clickTab.bind(this)} chooseCategoryTab = {this.props.chooseCategoryTab.bind(this)}/>
                    </div>
                </div>
            );
    }
}