import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

import "./header.scss";

import AddFunds from "../../pages/dashboard/components/add-funds/add-funds";
import Logout from "../../pages/dashboard/components/Logout/logout";
import Notification from "../../pages/dashboard/components/notification/notification";

import { NOTIFICATION_STATUS_UNREAD } from "../../../common/application-constants";

import {
  getAllNotifications,
  getProfileDetails
} from "../../../api-integrations/modules/landing-apis";

const DialogContent = withStyles(theme => ({}))(MuiDialogContent);

const Header = props => {
  const [allNotifications, setAllNotifications] = useState("");
  const [unReadNotifications, setUnReadNotifications] = useState("");
  const [addFundBankDetails, setAddFundBankDetails] = useState([]);
  const [fundOpen, setFundOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const handleClickFund = () => {
    setFundOpen(true);
  };
  const handleCloseFund = () => {
    setFundOpen(false);
  };

  const handleClickLogout = () => {
    setLogoutOpen(true);
  };
  const handleCloseLogout = () => {
    setLogoutOpen(false);
  };

  const handleClickNotify = () => {
    setNotifyOpen(true);
  };
  const handleCloseNotify = () => {
    setNotifyOpen(false);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      right: "15px!important",
      bottom: "initial!important",
      top: "70px!important",
      left: "initial!important"
    }
  }));

  const useStyless = makeStyles(theme => ({
    root: {
      background: "#fff!important"
    }
  }));
  const classes = useStyles();
  const classess = useStyless();

  const [age, setAge] = React.useState("");
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [activePage, setActivePage] = useState("");

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    let path = window.location.pathname;
    if (path === "/dashboard" || path === "/") {
      setActivePage("dashboard");
    } else if (path === "/portfolio") {
      setActivePage("portfolio");
    } else if (path === "/invest") {
      setActivePage("invest");
    } else if (path === "/more") {
      setActivePage("more");
    } else if (path === "/plan") {
      setActivePage("more");
    }
    getAllUserNotifications();
    getUserDetails();
  }, []);

  const getAllUserNotifications = () => {
    getAllNotifications().then(notifications => {
      if (notifications != undefined && notifications.response) {
        var responseNotifications = notifications.response.notification;
        var unReadNotifications = responseNotifications.filter(
          notify => notify.status === NOTIFICATION_STATUS_UNREAD
        ).length;
        setAllNotifications(responseNotifications);
        setUnReadNotifications(unReadNotifications);
      }
    });
  };

  const getUserDetails = () => {
    getProfileDetails().then(userMoreDetails => {
      if (userMoreDetails && userMoreDetails.bank_details != undefined) {
        setAddFundBankDetails(userMoreDetails.bank_details);
      }
    });
  };

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="common-top-bar">
        <div className="top-bar-menu">
          <div className="logo">
            <img src={require("../../../assets/images/logo.png")} alt="logo" />
          </div>
          <ul>
            <li className={`${activePage === "dashboard" && "active"}`}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={`${activePage === "portfolio" && "active"}`}>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li className={`${activePage === "invest" && "active"}`}>
              <Link to="/invest">Invest</Link>
            </li>
            <li className={`${activePage === "more" && "active"}`}>
              <Link to="/more">More</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-secondary-menu">
          <div className="add-fund">
            <a onClick={handleClickFund}>
              Add Fund
              <span>
                <img src={require("../../../assets/images/add.png")} />
              </span>
            </a>
          </div>
          <div className="notification">
            <img
              onClick={() => {
                handleClickNotify();
              }}
              src={require("../../../assets/images/notification.png")}
              alt="logo"
            />
            {(() => {
              if (unReadNotifications) {
                return <label>{unReadNotifications}</label>;
              }
            })()}
          </div>
          <div className="more-menu-icon" onClick={handleClickLogout}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="common-header-mob">
        <div className="mobile-header-section">
          <div className="mobile-header-left">
            <div className="mob-logo">
              <img
                src={require("../../../assets/images/logo.png")}
                alt="logo"
              />
            </div>
            <div className="mob-menu">
              <div className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  />
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                  >
                    <Link to="/dashboard" className="link">
                      <MenuItem className={classess.root} value={1}>
                        Dashboard
                      </MenuItem>
                    </Link>
                    <Link to="/portfolio" className="link">
                      <MenuItem className={classess.root} value={2}>
                        Portfolio
                      </MenuItem>
                    </Link>
                    <Link to="/invest" className="link">
                      <MenuItem className={classess.root} value={3}>
                        Invest
                      </MenuItem>
                    </Link>
                    <Link to="/invest" className="link">
                      <MenuItem className={classess.root} value={4}>
                        More
                      </MenuItem>
                    </Link>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="mobile-header-right">
            <div className="mob-add" onClick={handleClickFund}>
              <img src={require("../../../assets/images/add.png")} alt="logo" />
            </div>
            <div className="mob-notify">
              <img
                onClick={() => {
                  handleClickNotify();
                }}
                src={require("../../../assets/images/notification.png")}
                alt="logo"
              />
              {(() => {
                if (unReadNotifications) {
                  return <label>{unReadNotifications}</label>;
                }
              })()}
            </div>
            <div className="more-menu-icon" onClick={handleClickLogout}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Funds Popup */}
      <Dialog
        className={classes.root}
        onClose={handleCloseFund}
        open={fundOpen}
      >
        <DialogContent>
          <AddFunds
            addFundBankDetails={addFundBankDetails}
            handleCloseFund={handleCloseFund}
          />
        </DialogContent>
      </Dialog>

      {/* Notification Popup */}
      <Dialog
        className={classes.root}
        onClose={handleCloseNotify}
        open={notifyOpen}
      >
        <DialogContent>
          <Notification notifications={allNotifications} />
        </DialogContent>
      </Dialog>

      {/* Logout Popup */}
      <Dialog
        className={classes.root}
        onClose={handleCloseLogout}
        open={logoutOpen}
      >
        <DialogContent>
          <Logout />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
