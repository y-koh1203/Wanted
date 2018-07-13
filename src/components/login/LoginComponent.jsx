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
        // this.handleCbChange = this.handleCbChange.bind(this);
    }

    onClickButtonHandler(){
        let student_class_number =  document.querySelector('#student_class').value;
        let student_select_pattern = document.getElementsByName('pattern');
        let val;

        for(let e in student_select_pattern){
            if(student_select_pattern[e].checked == true){
                val = student_select_pattern[e].value;
            }
        }

        //paramsにpostするデータを追加
        let params = new URLSearchParams();
        params.append('login_id',student_class_number);
        params.append('pattern',val);

        //Ajaxでのログイン処理
        axios.post('/student/login',params).then(
            (res) => {
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

                console.log(res);

                //各種情報をローカルストレージにセット
                localStorage.setItem('user_name', res['data']['studentProfile']['student_name']);
                localStorage.setItem('nickname', res['data']['studentProfile']['nickname']);
                localStorage.setItem('class', res['data']['studentProfile']['class']);
                localStorage.setItem('grade', res['data']['studentProfile']['grade'])
                localStorage.setItem('jwt', res['data']['jwtToken']);
                
                this.props.history.push('/user');
        }).catch((err)=>{
            //通信失敗時のコールバック
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

    //コンポーネントをレンダリング
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
                                    <input type="radio" name="pattern" id="" value="3" />val3
                                </div>

                                <div className="animal_image_pattern" style={Object.assign({},...[styles.patternImgWrap])}>
                                    {/* <img src="/assets/images/lion_img.png" alt="" style={styles.patterImg}/> */}
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