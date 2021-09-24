import React from "react";

import "./setting.scss";

const Setting = (props) => {
    return (

        <a href={props.settingsLink}  className="settingsLink" >
            <div className="setting-card">
                    <div className="setting-card-img">                        
                    <img
                        src={require(`../../../../../../assets/images/more/${props.accountImg}.png`)}
                        alt="img"
                    />
                    </div>       
                    <p>{props.settingTittle}</p>
            </div>
        </a>

    );
};

export default Setting;
