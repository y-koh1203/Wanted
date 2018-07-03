import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
});

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message:'',
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
                    message: '名前かパターンが違います'
                });

                return false;
            }

            if(res['data']['token'] === null || res['data']['token'] === ''){
                this.setState({
                    open: true,
                    message: '名前かパターンが違います'
                });

                return false;
            }
    
            this.props.history.push('/user');
        }).catch((err)=>{
            console.log(err);
            this.setState({
                open: true,
                message: '通信に失敗しました。通信状況を確認し、再度お試しください。'
            });
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
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="student_class"
                                label="なまえ"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="生年月日"
                                type="password"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <Button variant="extendedFab" aria-label="delete" onClick={this.onClickButtonHandler.bind(this)}>
                                はじめる
                            </Button>
                        </div>
                        <Snackbar
                            open={this.state.open}
                            message={this.state.message}
                            autoHideDuration={3000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </form>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(Login);