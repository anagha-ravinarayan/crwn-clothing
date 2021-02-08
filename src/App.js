import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import './App.css';

class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin"
            render={() =>
              this.props.currentUser
                ? (<Redirect to="/" />)      // after sign-in or whenever signed-in, redirect to home
                : (<SignInAndSignUpPage />)
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

// Map the state from Redux store to the props of App component
const mapStateToProps = (state) => {
  return ({
    currentUser: selectCurrentUser(state)
  });
}

// Dispatch the state to be set to Redux store which propogates it to all components that use it
const mapDispatchToProps = (dispatch) => {
  return ({
    checkUserSession: () => {
      dispatch(checkUserSession());
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
