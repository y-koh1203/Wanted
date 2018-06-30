import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const style = {

}

export default class Header extends Component {
    render() {
        return (
            <div className="wrap">
                <header>
                    <h1>Appication Main</h1>
                </header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/test">test</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}