import React from 'react';
import axios from 'axios';

const style = {

}

export default class Login extends React.Component{
    onClickButtonHandler(){
        let student_class_number =  document.querySelector('#student_class').value;
        let params = new URLSearchParams();
        params.append('student_class',student_class_number);
        axios.post('/login/user',params).then(
            (res)=>{
                console.log(res)
            }
        );
    }

    render(){
        return(
            <div id="login">
                <input type="text" name="student_class" id="student_class"/>
                <button type="button" onClick={this.onClickButtonHandler.bind(this)}>Login</button>
            </div>   
        )
    }
}