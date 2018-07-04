import React, { Component } from 'react';
import HeaderMenu from '../header/HeaderComponet';
import ModalWindow from '../parts/modal'

export default class UserProfile extends Component {
    render() {
        return (
            <div className="wrap">
                <HeaderMenu />
                <ModalWindow />
            </div>
        );
    }
}