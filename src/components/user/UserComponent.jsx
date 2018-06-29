import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserComponent extends Component {
    render() {
        return (
            <div className="wrap">
                <input type="text" name="main-tb" />
            </div>
        );
    }
}