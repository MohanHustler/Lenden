import React,{useState} from "react";
import "./investment-status-card.scss";

const InvestmentCard = (props) => {

  return (
    <div>
      <div className="investment-status-card">
        <label>{props.title} </label>
        <span>
          <img src={props.imgUrl}  />
        </span>
      </div>
    </div>
  );
};
export default InvestmentCard;
