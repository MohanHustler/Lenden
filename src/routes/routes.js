import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";

import PrivateRoute from "./private-routes";
import OnBoardingRoute from "./on-boarding-routes";

// Application Components.
import LendenNavigator from "../components/pages/lenden-navigator/lenden-navigator";
import SignIn from "../components/pages/on-board/sign-in";
import SignUp from "../components/pages/on-board/sign-up";
import MobileVerification from "../components/pages/mobile-verification/mobile-verification";
import IdDetail from "../components/pages/mobile-verification/id-detail";
import AccountOpeningFee from "../components/pages/account-opening-fee/account-opening-fee";
import LegalAuthorization from "../components/pages/legal-authorization/legal-authorization";
import KycConfirmation from "../components/pages/kyc/kyc-confirmation";
import ConfirmAddress from "../components/pages/mobile-verification/confirm-address";
import ConnectBank from "../components/pages/mobile-verification/connect-bank";
import Dashboard from "../components/pages/dashboard/dashboard";
import Portfolio from "../components/pages/portfolio/Portfolio";
import Invest from "../components/pages/invest/invest";
import More from "../components/pages/more/more";
import AuthorityLetter from "../components/pages/legal-authorization/authortiy-letter";
import VideoKyc from "../components/pages/kyc/video-kyc";
import Registration from "../components/pages/registration/registration";
import Plan from "../components/pages/dashboard/Plan";
import Delay from "../components/pages/delay/delay";
import Wallet from "../components/pages/wallet-page/wallet-page";
import NotFound404 from "../components/pages/public/not-found-404";

const Routes = () => {
  return (
    <Router history={useHistory}>
      <Switch>
        <PrivateRoute exact path="/" component={LendenNavigator} />
        <PrivateRoute
          exact
          path="/lendennavigator"
          component={LendenNavigator}
        />
        <OnBoardingRoute exact path="/signin" component={SignIn} />
        <OnBoardingRoute exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/mobileverification"
          component={MobileVerification}
        />
        <PrivateRoute exact path="/iddetail" component={IdDetail} />
        <PrivateRoute
          exact
          path="/accountopeningfee"
          component={AccountOpeningFee}
        />
        <Route
          exact
          path="/legalauthorization"
          component={LegalAuthorization}
        />
        <PrivateRoute
          exact
          path="/authorityletter"
          component={AuthorityLetter}
        />
        <PrivateRoute
          exact
          path="/kycconfirmation"
          component={KycConfirmation}
        />
        <PrivateRoute exact path="/videokyc" component={VideoKyc} />
        <PrivateRoute exact path="/confirmaddress" component={ConfirmAddress} />
        <PrivateRoute exact path="/connectbank" component={ConnectBank} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/portfolio" component={Portfolio} />
        <PrivateRoute exact path="/invest" component={Invest} />
        <PrivateRoute exact path="/more" component={More} />
        <PrivateRoute exact path="/plan" component={Plan} />
        <PrivateRoute exact path="/registration" component={Registration} />
        <PrivateRoute exact path="/delay" component={Delay} />
        <PrivateRoute exact path="/wallet" component={Wallet} />
        <Route exact path="*" component={NotFound404} />
      </Switch>
    </Router>
  );
};

export default Routes;
