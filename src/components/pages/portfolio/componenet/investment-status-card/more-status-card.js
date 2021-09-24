import React, { useState } from "react";
import "./more-status-card.scss";

const InvestmentCardMore = props => {
  const [more, setMore] = useState(false);

  const handleClickMore = () => {
    setMore(true);
  };

  return (
    <div>
      <div className="more-status-card">
        <div className="more-status-card-top">
          <label>{props.title} </label>
          <span onClick={handleClickMore} className={`${more && 'hide' }`}>
            <img src={props.imgUrl} />
          </span>
        </div>
        <div className={`more-status-card-bottom ${!more && 'hide' }`  } >
          <p>Delay</p>
          <p>Delay1</p>
          <p>Default</p>
        </div>
      </div>
    </div>
  );
};
export default InvestmentCardMore;
