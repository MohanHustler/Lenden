import React from "react";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import FrequentlyModal from "../frequently-modal/frequently-modal";

import "./faq.scss";
import styles from "./faq.module.scss";

const Faq = props => {
  return (
    <div className={styles.popoverPostion}>
      <PopupState
        variant="popover"
        popupId="demo-popup-popover"
      >
        {popupState => (
          <div>
            <div className="frequently-ask" {...bindTrigger(popupState)}>
              <div className="frequently-ask-content">
                <label>Frequently Asked Questions</label>
                <span>
                  <img
                    src={require("../../../../../assets/images/lenden/pop-up.png")}
                  />
                </span>
              </div>
            </div>

            <Popover
              className={styles.popOverFaq}
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
            <FrequentlyModal faq={props.faq} />

            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
};

export default Faq;
