import React from 'react';
import './Login.css'

export default class LoginModal extends React.Component {
    constructor() {
        super();

        this.state ={
            otherPoint: false
        }
    }

    otherPoint(ev){
        if(ev.target.className === "modal-background"){
            this.props.loginModal();
        }
    }

    googleAuthTrigger () {
        this.props.googleAuthTrigger();
    }

    render(){
        return (
            <div className= "modal-container" onClick={this.otherPoint.bind(this)}>
                <div className="modal-background">
                    <div className="modal">
                        <div className="modalHeader">
                            Sign In
                        </div>
                        <div className="hrCenter">with</div>
                        <hr/>
                        <div className="modalIcon">
                            <i className="fa fa-facebook-square" ></i>
                            <i className="fa fa-google-plus-circle" onClick = {this.googleAuthTrigger.bind(this)} ></i>
                        </div>
                        <div className="modalBody">
                            <input type="text" placeholder="Enter Username" name="uname" required/>
                            <input type="password" placeholder="Enter Password" name="psw" required/>
                            <div className ="signIn">Sign In</div>
                        </div>
                        <hr/>
                        <div className="loginFooter">
                            <div>New Here? <a href="">Sign Up</a></div>
                            <a href="" >Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    }
};

