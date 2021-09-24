import React from "react";
import "./delay-row.scss";

const DelayRow = () => {
  return (
    
    <tr className="delay-row">
      <td>Azeem</td>
      <td>VR2342GD</td>
      <td>48% </td>
      <td> 750+</td>
      <td>1 Month</td>
      <td>Home Renovation</td>
      <span>
        <img
          src={require("../../../assets/images/invest/information.png")}
          alt="logo"
        />
      </span>
    </tr>
  );
};

export default DelayRow;
