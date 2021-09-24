import React from "react";
import Setting from "./setting"
import "./setting-list.scss";

const SettingList = props => {
    return <div className="setting-list">
                <p>{props.settingTittle}</p>
                <div className="setting-list-sec">
                    <Setting
                        accountImg={props.accountImg1}
                        settingTittle={props.settingTittle1}
                        settingsLink={props.settingsLink}
                    />
                    <Setting
                        accountImg={props.accountImg2}
                        settingTittle={props.settingTittle2}
                        settingsLink={props.settingsLink2}
                    />
                </div>
        </div>;
};

export default SettingList;
