import React, { Component } from "react";
import connect from "react-redux";
import axios from "axios";
import Home from "../components/Home/Home";
import { chooseCategory } from "../store/modules/home";
import { shuffle } from "../util/index";

class HomeContainer extends Component {
  render() {
    const { choosedCategory } = this.props;
    return <Home choosedCategory={choosedCategory} />;
  }
}

const mapStateToProps = state => ({
  choosedCategory: state.home.choosedCategory
});

const mapDispatchToProps = dispatch => ({
  choosedCategory = (category) => {
    let category = category.toLowerCase();
    dispatch(chooseCategory(category));
    axios
      .get("http://localhost:4000/api/song/songlist", {
        params: {
          category: category
        }
      })
      .then(response => {
        dispatch(categorisePlayList(shuffle(response.data)))
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
