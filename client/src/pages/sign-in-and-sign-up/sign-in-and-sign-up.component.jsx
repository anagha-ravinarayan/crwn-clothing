import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { SignInAndSignUp } from "./sign-in-and-sign-up.component.styles";

const SignInAndSignUpPage = () => {
    return (
        <SignInAndSignUp>
            <SignIn />
            <SignUp />
        </SignInAndSignUp>
    );
}

export default SignInAndSignUpPage;