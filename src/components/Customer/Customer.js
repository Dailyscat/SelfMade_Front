import React, { Fragment } from 'react';

function Customer(props) {
    return (
        <Fragment>
        <div className = "customer">
            <div className = "userImg"></div>
            <div className = "userBox">
                <div className = "userNameCircle"></div>
                <div className = "userName">Eungyu</div>
                <div className = "userDescription">wow so fantastic</div>
            </div>
            <div className = "history">
                <div className = "customerPlayer">
                    <div className = "playerHomePlayer">
                        <div className = "bodyPlayerThumbNail"></div>
                        <div className = "bodyPlayerDescription">
                            <i class="fas fa-play"></i>
                            <div className = "titleAndDescription">
                                <div className = "bodyPlayerTilte">title</div>
                                <div className = "bodyPlayerDescription">description</div>
                            </div>
                            <div className = "possibleChargePlay">possible Charge Play </div>
                            <div className="seekBarBig" >
                                <div className="progress" >
                                    <div className="progressBall"></div>
                                </div>
                                <div className="handle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default Customer;