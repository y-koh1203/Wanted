import React from 'react';

const style = {

}

export default class Login extends React.Component{
    onClickButtonHandler(){
        
    }

    render(){
        return(
            <div id="login">
                <input type="text" name="student_class"/>
                <button type="button" onClick={this.onClickButtonHandler.bind(this)}>Login</button>
            </div>   
        )
    }
}