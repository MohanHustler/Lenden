import React from "react";

import "react-step-progress-bar/styles.css";

import { ProgressBar } from "react-step-progress-bar";

class ProgressBarStatus extends React.Component {
  render() {
    const { values } = this.props;
    return (
      <ProgressBar
        percent={values}
        height="0.5rem"
        filledBackground="#319CD8"
      />
    );
  }
}

export default ProgressBarStatus;
