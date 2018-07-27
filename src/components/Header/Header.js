import React from 'react';
import './Header.css'

export default class Header extends React.Component {
    constructor() {
        super();

        this.state ={
        }
    }

    loginModal(){
        this.props.loginModal()
    }

    signUpModal(){
        this.props.signUpModal()
    }

    toggleCustomerSeg(ev){
        ev.preventDefault();
        ev.currentTarget.classList.toggle("clicked");
        ev.currentTarget.nextElementSibling.classList.toggle("none");
    }

    loggedInSegMenuClick (ev) {
        this.props.loggedInSegMenuClick(ev.currentTarget.innerText);
    }

    googleAuthLogout () {
        this.props.googleAuthLogout();
    }

    render(){
            return(
                <div className="header">
                    <div className="headerContainer">
                        <a className ="logoSelfMade" href="">Self Made</a>
                        <div className ="searchInput">
                            <input type="text" placeholder ="Search.."/>
                            <i className="fas fa-search"></i>
                        </div>
                        {this.props.loggedIn 
                        ?
                        <div className ="customerMenu">
                            <a href="" className = "customerMenuContainer" onClick = {this.toggleCustomerSeg.bind(this)}>
                                <div className ="customerName">Dailyscat</div>
                            </a>
                            <ul className ="customerSeg none">
                                <li className = "profile" onClick = {this.loggedInSegMenuClick.bind(this)}>Profile</li>
                                <li className = "upload" onClick = {this.loggedInSegMenuClick.bind(this)}>Upload</li>
                                <li className = "logout" onClick = {this.googleAuthLogout.bind(this)}>Logout</li>
                            </ul>
                        </div>
                        :
                        <div className="registerContainer">
                            <div className="logIn" onClick = {this.loginModal.bind(this)}>Log In</div>
                            <div className="createAccount" onClick = {this.signUpModal.bind(this)}>createAccount</div>
                        </div>
                        }
                    </div>
                </div>
            );
    }
}