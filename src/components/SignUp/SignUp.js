import React from "react";
import "./SignUp.css";

export default class SignUpModal extends React.Component {
  constructor() {
    super();

    this.state = {
      otherPoint: false
    };
  }

  otherPoint(ev) {
    if (ev.target.className === "modal-background") {
      this.props.signUpModal();
    }
  }

  render() {
    return (
      <div className="modal-container" onClick={this.otherPoint.bind(this)}>
        <div className="modal-background">
          <div className="modal">
            <div className="modalHeader">Create Account</div>
            <div className="hrCenter">Fill In</div>
            <hr />
            <div className="modalBody">
              <input
                type="text"
                placeholder="Enter Mail"
                name="uname"
                required
              />
              <input
                type="text"
                placeholder="Enter UserName"
                name="uname"
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
              <div className="signIn">Accept & continue</div>
            </div>
            <hr />
            <div className="signUpFooter">
              By signing up I accept the Terms of Use. I have read and
              understood the Privacy Policy and Cookies Policy.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
