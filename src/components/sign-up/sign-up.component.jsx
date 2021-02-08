import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { googleSignUpStart, emailSignUpStart } from "../../redux/user/user.actions";

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
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        const { signUpWithEmail } = this.props;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        signUpWithEmail(displayName, email, password);
    }

    render() {
        const { signUpWithGoogle } = this.props;
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
        );
    }
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