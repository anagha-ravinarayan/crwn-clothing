import UserActionTypes from "./user.types";

export const checkUserSession = () => {
    return ({
        type: UserActionTypes.CHECK_USER_SESSION
    });
}

// ---- Sign In actions
export const googleSignInStart = () => {
    return ({
        type: UserActionTypes.GOOGLE_SIGN_IN_START
    });
}

export const emailSignInStart = (userCredentials) => {
    return ({
        type: UserActionTypes.EMAIL_SIGN_IN_START,
        payload: userCredentials
    });
}

export const signInSuccess = (user) => {
    return ({
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: user
    });
}

export const signInFailure = (error) => {
    return ({
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: error
    });
}

// ---- Sign Up actions
export const googleSignUpStart = () => {
    return ({
        type: UserActionTypes.GOOGLE_SIGN_UP_START
    });
}

export const emailSignUpStart = (userCredentials) => {
    return ({
        type: UserActionTypes.EMAIL_SIGN_UP_START,
        payload: userCredentials
    });
}

export const signUpSuccess = (user) => {
    return ({
        type: UserActionTypes.SIGN_UP_SUCCESS,
        payload: user
    });
}

export const signUpFailure = (error) => {
    return ({
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: error
    });
}

// ---- Sign Out actions
export const signOutStart = () => {
    return ({
        type: UserActionTypes.SIGN_OUT_START
    });
}

export const signOutSuccess = () => {
    return ({
        type: UserActionTypes.SIGN_OUT_SUCCESS
    });
}

export const signOutFailure = (error) => {
    return ({
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: error
    });
}