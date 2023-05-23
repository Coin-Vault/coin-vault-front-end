import React, { Component } from "react";
import ProfileAuth0 from './Auth0-components/profileAuth0';

export class Home extends Component {
    render() {
        return(
            <div className="mt-5 d-flex justify-content-center">
                <ProfileAuth0/>
            </div>
        )
    }
}