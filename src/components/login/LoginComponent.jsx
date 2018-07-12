import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    
    flexCol : {
        display : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    flexRow : {
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
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
    },

    patternsWrap : {
        width: '80%',
        margin: '0 auto'
    },

    patternImgWrap : {
        width: '25%',
        height: '25vw',
        borderRadius: '50%'
    },

    patterImg: {
        width: '10vw',
        height: 'auto',
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
        this.handleCbChange = this.handleCbChange.bind(this);
    }

    onClickButtonHandler(){
        let student_class_number =  document.querySelector('#student_class').value;
        let student_select_pattern = document.getElementsByName('pattern');

        let params = new URLSearchParams();
        params.append('student_class',student_class_number);
        params.append('pattern',student_select_pattern);

        const promise = new Promise((resolve ,reject) => {
            axios.post('/student/login',params).then(
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

            //各種情報をローカルストレージにセット
            localStorage.setItem('user_name','山田太郎');
            localStorage.setItem('nickname','ヤマトロー');
            localStorage.setItem('class','B');
            localStorage.setItem('grade','4')
            localStorage.setItem('jwt','aaa');
            
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

    handleCbChange(){
        let cbValue = document.getElementsByClassName('login_patterns');
        for(let i = 0;i < cbValue.length;i++){
            if(cbValue[i].checked === true){
                cbValue[i].checked = false;
            }
        }
    }

    handleRequestClose(){
        this.setState({
          open: false,
        });
    }

    render(){
        return(
            <MuiThemeProvider>
                <div id="login" style={Object.assign({}, ...[styles.bgImage, styles.centering, styles.flexCol])}>     
                    <h1>ようこそ</h1>
                    <form noValidate autoComplete="off">
                        <div style={Object.assign({}, ...[styles.centering, styles.padd])}>
                            <TextField
                                id="student_class"
                                label="クラス + しゅっせきばんごう"
                                name="login_id"
                                margin="normal"
                                style={Object.assign({}, ...[styles.sizes])}
                            />
                        </div>

                        <div style={Object.assign({}, ...[styles.centering, styles.padd])}>              
                            <div style={Object.assign({},...[styles.flexRow,styles.patternsWrap])}>
                                <div className="animal_image_pattern" style={Object.assign({},...[styles.patternImgWrap])}>
                                    {/* <img src="/assets/images/dog_img.png" alt="" style={styles.patterImg}/> */}
                                    <input type="radio" name="pattern" id="" value="1" />val1
                                </div>

                                <div className="animal_image_pattern" style={Object.assign({},...[styles.patternImgWrap])}>
                                    {/* <img src="/assets/images/cat_img.png" alt="" style={styles.patterImg}/> */}
                                    <input type="radio" name="pattern" id="" value="2" />val2
                                </div>

                                <div className="animal_image_pattern" style={Object.assign({},...[styles.patternImgWrap])}>
                                    {/* <img src="/assets/images/rabbit_img.png" alt="" style={styles.patterImg}/> */}
                                    {/* <FormControlLabel value="3" name="pattern" control={<Radio />} label="val3" /> */}
                                    <input type="radio" name="pattern" id="" value="3" />val3
                                </div>

                                <div className="animal_image_pattern" style={Object.assign({},...[styles.patternImgWrap])}>
                                    {/* <img src="/assets/images/lion_img.png" alt="" style={styles.patterImg}/> */}
                                    {/* <FormControlLabel value="4" name="pattern" control={<Radio />} label="val4" /> */}
                                    <input type="radio" name="pattern" id="" value="4" />val4
                                </div>
                            </div>
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