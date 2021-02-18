import React from "react";

import Spinner from "../spinner/spinner.component";

// Higher Order Component which returns another component - Outer function has a component WrappedComponent as its only prop
const WithSpinner = (WrappedComponent) => {
    const SpinnerComponent = ({ isLoading, ...otherProps }) => {
        return (
            isLoading ?
                (
                    <Spinner />
                ) :
                (
                    <WrappedComponent {...otherProps} />
                )
        );
    }
    return SpinnerComponent;
}

export default WithSpinner;