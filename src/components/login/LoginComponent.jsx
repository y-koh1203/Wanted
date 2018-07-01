import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.onClickButtonHandler = this.onClickButtonHandler.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    onClickButtonHandler(){
        let student_class_number =  document.querySelector('#student_class').value;
        let params = new URLSearchParams();
        params.append('student_class',student_class_number);

        const promise = new Promise((resolve ,reject) => {
            axios.post('/login/user',params).then(
                (res) => {
                    console.log(res);
                    resolve(res);
                },

                ()=>{
                    reject('(*_*;)');
                }
            );
        });

        promise.then((res)=>{

            if(res['data']['id'] === null || res['data']['id'] === ''){
                this.setState({
                    open: true,
                });

                return false;
            }

            if(res['data']['token'] === null || res['data']['token'] === ''){
                this.setState({
                    open: true,
                }).bind(this);

                return false;
            }
    
            this.props.history.push('/test');
        }).catch((err)=>{
            console.log(err);
            return false;
        });

    }

    handleRequestClose(){
        this.setState({
          open: false,
        });
    }

    render(){
        return(
            <MuiThemeProvider>
                <div id="login">
                    <input type="text" name="student_class" id="student_class"/>
                    <button type="button" onClick={this.onClickButtonHandler.bind(this)}>Login</button>
                    <Snackbar
                        open={this.state.open}
                        message="名前かパターンがちがいます"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(Login);