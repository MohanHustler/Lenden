import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import "./frequently-modal.scss";

const FrequentlyModal = props => {
  const faq = props.faq;
  const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);

  const expansionPanelHandle = () => {
    setExpansionPanelOpen(!expansionPanelOpen);
  };

  return (
    <div className="hover-show-pop-up">
      <div className="pop-up-hover">
      {/* <div className="pop-up-hover-image">
          <img
            src={require("../../../../../assets/images/lenden/pop-up.png")}
          />
        </div> */}
        <div className="pop-up-hover-content">
          {faq &&
            faq.map((questionAnswer, index) => {
              return (
                <ExpansionPanel key={`faq-${index}`}>
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <a className="pop-up-hover-content-desc">
                      {questionAnswer.question}
                    </a>
                    <span onClick={expansionPanelHandle}>
                      {expansionPanelOpen ? (
                        <img
                          src={require("../../../../../assets/images/invest/down-arrow.png")}
                          alt="logo"
                        />
                      ) : (
                        <img
                          src={require("../../../../../assets/images/invest/bottom-arrow.png")}
                          alt="logo"
                        />
                      )}
                    </span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <a className="pop-up-hover-content-desc">
                      {questionAnswer.answer}
                    </a>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyModal;
