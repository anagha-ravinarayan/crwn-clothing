import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherButtonProps }) => {
    return (
        <button className={`
            ${isGoogleSignIn ? 'google-sign-in' : ''} 
            ${inverted ? 'inverted' : ''} 
            custom-button`} {...otherButtonProps}>
            {children}
        </button>
    );
}

export default CustomButton;