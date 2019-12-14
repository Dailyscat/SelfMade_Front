import React from "react";
import "./Home.css";

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  chooseCategory(ev) {
    ev.preventDefault();
    this.props.chooseCategory(ev.currentTarget.innerText);
  }
  render() {
    return (
      <div className="home">
        <nav className="menu">
          <input className="menu-toggler" type="checkbox" />
          <label htmlFor="menu-toggler"></label>
          <ul>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                HipHop
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                RnB
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                Soul
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                Kpop
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                Fork
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                Ballad
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                EDM
              </a>
            </li>
            <li className="menu-item">
              <a
                className=""
                href=""
                target="_blank"
                onClick={this.chooseCategory.bind(this)}
              >
                ETC
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
