import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

import { SignInContainer, Title, Buttons } from "./sign-in.styles";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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

        const { signInWithEmail } = this.props;
        const { email, password } = this.state;
        signInWithEmail(email, password);
    }

    render() {
        const { signInWithGoogle } = this.props;
        return (
            <SignInContainer>
                <Title>I already have an account</Title>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
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

                    <Buttons>
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn> Sign in with Google </CustomButton>
                    </Buttons>
                </form>
            </SignInContainer>
        );
    }
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