import React from 'react';

export default class Login extends React.Component{
    render(){
        return(
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">page1</Link></li>
                        <li><Link to="/b">page2</Link></li>
                    </ul>
                </nav>
            </header>
        );     
    }
}