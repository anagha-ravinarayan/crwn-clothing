import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { googleSignUpStart, emailSignUpStart } from "../../redux/user/user.actions";

import { SignUpContainer, Title, Buttons } from "./sign-up.styles";

const SignUp = ({ signUpWithGoogle, signUpWithEmail }) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        signUpWithEmail(displayName, email, password);
    }

    return (
        <SignUpContainer>
            <Title>I do not have an account</Title>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    required
                    name="displayName"
                    type="text"
                    label="Name"
                    value={displayName}
                    handleChange={handleChange}
                />
                <FormInput
                    required
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    handleChange={handleChange}
                />
                <FormInput
                    required
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    handleChange={handleChange}
                />
                <FormInput
                    required
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    handleChange={handleChange}
                />

                <Buttons>
                    <CustomButton type="submit"> Sign Up </CustomButton>
                    <CustomButton onClick={signUpWithGoogle} isGoogleSignIn> Sign up with Google </CustomButton>
                </Buttons>
            </form>
        </SignUpContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        signUpWithGoogle: () => {
            dispatch(googleSignUpStart());
        },
        signUpWithEmail: (displayName, email, password) => {
            dispatch(emailSignUpStart({ displayName, email, password }));        // pass as object
        }
    });
}

export default connect(null, mapDispatchToProps)(SignUp);