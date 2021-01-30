import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, ...buttonProps }) => {
    return (
        <CustomButtonContainer {...buttonProps}>
            {children}
        </CustomButtonContainer>
    );
}

export default CustomButton;