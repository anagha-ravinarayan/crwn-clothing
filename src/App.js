import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // onAuthStateChanged: event listener for user sign-in and sign-out
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);      // Get reference of logged-in user from database

        // onSnapshot: event listener for any changes to the user entry in db
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,      // ID of the document
              ...snapshot.data()    // The data stored in the document
            }
          });
        });
      }

      // When user logs out set state to null (returned in userAuth)
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin"
            render={() => 
              this.props.currentUser
                ? (<Redirect to="/" />)      // after sign-in or whenever signed-in, redirect to home
                : (<SignInAndSignUpPage />)
            }
          />
        </Switch>
      </div>
    );
  }
}

// Map the state from Redux store to the props of App component
const mapStateToProps = (state) => {
  return ({
    currentUser: state.user.currentUser
  });
}

// Dispatch the state to be set to Redux store which propogates it to all components that use it
const mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentUser: (user) => {        // setCurrentUser is the prop that gets returned
      dispatch(setCurrentUser(user));   // dispatch method notifies all reducers about the change in state
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
