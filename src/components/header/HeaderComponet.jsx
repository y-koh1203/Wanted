import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Header extends Component {
    render() {
        return (
            <div className="wrap">
                <header>
                    test
                </header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}