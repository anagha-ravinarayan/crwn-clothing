import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

import { SignInContainer, Title, Buttons } from "./sign-in.styles";

const SignIn = ({ signInWithGoogle, signInWithEmail }) => {

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        signInWithEmail(email, password);
    }

    return (
        <SignInContainer>
            <Title>I already have an account</Title>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
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

                <Buttons>
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn> Sign in with Google </CustomButton>
                </Buttons>
            </form>
        </SignInContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        signInWithGoogle: () => {
            dispatch(googleSignInStart());
        },
        signInWithEmail: (email, password) => {
            dispatch(emailSignInStart({ email, password }));        // pass as object
        }
    });
}

export default connect(null, mapDispatchToProps)(SignIn);