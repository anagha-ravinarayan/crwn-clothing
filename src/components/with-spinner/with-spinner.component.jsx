import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles"

// Higher Order Component which returns another component - Outer function has a component WrappedComponent as its only prop
const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return (
            isLoading ?
                (
                    <SpinnerOverlay>
                        <SpinnerContainer />
                    </SpinnerOverlay>
                ) :
                (
                    <WrappedComponent {...otherProps} />
                )
        );
    }
    return Spinner;
}

export default WithSpinner;