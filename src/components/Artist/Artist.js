import React, { Fragment } from 'react';

function Artist(props) {
    return (
        <Fragment>
        <div className = "artist">
            <div className="uploadPannel">
                <div className="uploadPannerHeader">Self Made Your Stairs!</div>
                <a href="#" class="action-button shadow animate blue">Upload</a>                                        
            </div>
            <hr/>
            <div className = "artistTrack">
                <div className = "yourTrackHeader">YourTrack</div>
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

export default Artist;