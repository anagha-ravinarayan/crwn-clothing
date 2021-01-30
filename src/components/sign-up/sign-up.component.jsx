import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument, signInWithGoogle as signUpWithGoogle } from "../../firebase/firebase.utils";

import { SignUpContainer, Title, Buttons } from "./sign-up.styles";

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user: userAuth } = await auth.createUserWithEmailAndPassword(email, password);
            const userRef = await createUserProfileDocument(userAuth, { displayName }); // Create reference of signed-up user to database
            if (userRef) {
                this.setState({
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.log("User could not be created", error);
        }
    }

    render() {
        return (
            <SignUpContainer>
                <Title>I do not have an account</Title>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        required
                        name="displayName"
                        type="text"
                        label="Name"
                        value={this.state.displayName}
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        required
                        name="email"
                        type="email"
                        label="Email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        required
                        name="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        required
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={this.state.confirmPassword}
                        handleChange={this.handleChange}
                    />

                    <Buttons>
                        <CustomButton type="submit"> Sign Up </CustomButton>
                        <CustomButton onClick={signUpWithGoogle} isGoogleSignIn> Sign up with Google </CustomButton>
                    </Buttons>
                </form>
            </SignUpContainer>
        )
    }
}

export default SignUp;