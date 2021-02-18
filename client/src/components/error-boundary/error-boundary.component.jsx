import React from "react";

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from "./error-boundary.styles";

class ErrorBoundary extends React.Component {

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {        // Method automatically sets state
        return {
            hasErrored: true
        };
    }

    componentDidCatch(error, info) {
        console.error(error);
        console.log(info);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl={'https://i.imgur.com/yW2W9SC.png'} />
                    <ErrorImageText>Sorry! This Page is broken :(</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;