import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";   // In case network goes down/ some error

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { GlobalStyle } from "./global.styles";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ currentUser, checkUserSession }) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);     // If prop is coming from redux and not from parent component, pass that in the array to avoid warning

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/shop" component={ShopPage} />
                        <Route exact path="/signin"
                            render={() =>
                                currentUser
                                    ? (<Redirect to="/" />)      // after sign-in or whenever signed-in, redirect to home
                                    : (<SignInAndSignUpPage />)
                            }
                        />
                        <Route exact path="/checkout" component={CheckoutPage} />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
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
