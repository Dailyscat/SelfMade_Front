import React, { Fragment } from "react";

function CustomerSide(props) {
  return (
    <Fragment>
      <div className="sideContainerForCustomer">
        <div className="playBox">
          <div className="totalPlay">
            TotalPlay : <span>2221</span>
          </div>
          <div className="accumulate">
            Accumulate : <span>1324</span>
          </div>
        </div>
        <div className="cashBox">
          <div className="accumulatedMoney">
            AccumulatedMoney: <span>1234521원</span>
          </div>
          <a href=""> 환전하기</a>
        </div>
        <div className="favoriteBox"> favorite </div>
        <div className="commentBox"> comment </div>
      </div>
    </Fragment>
  );
}

export default CustomerSide;
