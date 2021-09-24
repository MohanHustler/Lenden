import React, { useState } from "react";

const ViewPlanDetails = props => {
  const currentPlan = props.currentPlan;
  const features = currentPlan.features;
  const firstFourFeatures = features.slice(0, 4);
  const remainingFeatures = features.slice(4);
  const [viewCollapse, viewCollapseState] = useState(false);

  const viewMoreCollapse = toggleExpand => {
    viewCollapseState(!viewCollapse);
    props.expandPlanCard(toggleExpand);
  };

  return (
    <div className="plane-desc">
      <ul>
        {firstFourFeatures &&
          firstFourFeatures.map((feature, index) => {
            return (
              <li key={`current-first-${index}`}>
                <span>{feature}</span>
                <label>
                    <img
                      src={require("../../../../../assets/images/check.png")}
                      alt="logo"
                    />
                  </label>
              </li>
            );
          })}
      </ul>
      {viewCollapse ? (
        <ul>
          {remainingFeatures &&
            remainingFeatures.map((feature, index) => {
              return (
                <li key={`current-remaining-${index}`}>
                  <span>{feature}</span>
                  <label>
                    <img
                      src={require("../../../../../assets/images/check.png")}
                      alt="logo"
                    />
                  </label>
                </li>
              );
            })}
        </ul>
      ) : null}
      <div>
        {!viewCollapse && (
          <div
            className="view-more"
            onClick={() => {
              viewMoreCollapse(true);
            }}
          >
            <a>view more</a>
          </div>
        )}
      </div>
      <div>
        {viewCollapse && (
          <div
            className="view-more"
            onClick={() => {
              viewMoreCollapse(false);
            }}
          >
            <a>view less</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlanDetails;
