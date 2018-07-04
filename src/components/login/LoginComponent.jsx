import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

const styles = {
    bgImage : {
        boxSizing:'border-box',
        // backgroundImage: "url(\"/assets/images/blackboard.jpg\")",
        // backgroundRepeat: 'no-repeat' ,
        // backgroundPosition: 'center' ,
        // backgroundSize:'cover',
        width: '100%',
        height: '100vh',
    },
    
    centering : {
        margin: '0 auto',
        textAlign: 'center',
    },
    
    flex : {
        display : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    sizes : {
        width: '50vw'
    },

    padd : {
        padding: '5% 0'
    },

    button: {
        verticalAlign:'middle',
        padding: '0 5%',
        marginTop: '3%'
    }
};

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
                <div id="login" style={Object.assign({}, ...[styles.bgImage, styles.centering, styles.flex])}>     
                    <h1>ようこそ</h1>
                    <form noValidate autoComplete="off">
                        <div style={Object.assign({}, ...[styles.centering, styles.padd])}>
                            <TextField
                                id="student_class"
                                label="なまえ"
                                margin="normal"
                                style={Object.assign({}, ...[styles.sizes])}
                            />
                        </div>
                        <div style={Object.assign({}, ...[styles.centering, styles.padd])}>
                            <TextField
                                id="password"
                                label="生年月日"
                                type="password"
                                margin="normal"
                                style={Object.assign({}, ...[styles.sizes])}
                            />
                        </div>
                        <div style={styles.centering}>
                            <Button 
                                variant="extendedFab" 
                                onClick={this.onClickButtonHandler.bind(this)}
                                style={Object.assign({},...[styles.button])}
                            >
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