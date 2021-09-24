import React from "react";

import "./university.scss";

const University = (props) => {

    return(
        <a href={props.univerityLink}  className="univerityLink" >
        <div className="university-card">
            <div className="university-card-img">
            <img
                src={require(`../../../../../../assets/images/more/${props.unversityImage}.png`)}
                alt="img"
            />
            </div>       
            <p>{props.title}</p>
        </div>
        </a>
    );
    
};

export default University;
