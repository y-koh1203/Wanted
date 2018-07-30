import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import HeaderMenu from '../header/HeaderComponet'
import ModalWindow from '../parts/modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },

    searchContetBox: {
        padding: '5% 0'
    },

    selectSize: {
        width: '30vw',
        marginLeft: '3.5vw'
    },

    titleSize: {
        width: '50vw',
        marginLeft: '5vw'
    },

    bodySize: {
        width: '50vw',
        marginLeft: '5vw'
    },

    centering: { 
        textAlign: 'center',
    },

    panelSize: {
        width: '90%',
        margin: '0 auto',
    }
}

class PostQuestion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
    
            student_id:'',
            question_title: '',
            genre: '',
            body: '',
            jwt: '',
    
            select:'',

            openDialog: false,
        };

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    //マウント時にLocalStorageから必要な情報を取得する
    componentWillMount(){
        let jwt = localStorage.getItem('jwt');
        let student_id = localStorage.getItem('student_id');
        let student_name = localStorage.getItem('student_name')
        this.setState({
            student_id: student_id,
            student_name: student_name,
            jwt: jwt,
        });
    }

    //質問タイトルに変更があった場合にstateを変更する
    handleTextChange(e){
        let value = e.target.value;
        this.setState({question_title:value});
    }

    //セレクトボックスに変更があった時に、stateを変更する
    handleSelectChange(e){
        let value = e.target.value;
        this.setState({genre:value});
    }

    //質問本文に変更があった場合に、stateを変更する
    handleBodyTextChange(e){
        let value = e.target.value;
        this.setState({body:value});
    }

    //URLをクリックした際の確認ダイアログ表示
    handlePost(e){
        e.preventDefault();

        let question_title = this.state.question_title;
        let body = this.state.body;
        body = body.replace(/\r?\n/g, '');
        let genre = this.state.genre;


        if(question_title == ''){
            this.setState({
                open: true,
                message: 'タイトルが未入力です'
            });

            return false;
        }

        if(genre == ''){
            this.setState({
                open: true,
                message: '授業を選択してください'
            });

            return false;
        }

        if(body == ''){
            this.setState({
                open: true,
                message: '質問本文が未入力です'
            });

            return false;
        }

        this.setState({ openDialog: true })
    }
    
    //Dialogを閉じる
    handleClose = () => {
        this.setState({ openDialog: false });
    };

    //質問の投稿処理
    handleClickSubmit(){
        let student_id = this.state.student_id;
        let jwt = this.state.jwt;
        let question_title = this.state.question_title;
        let body = this.state.body;
        body = body.replace(/\r?\n/g, '');
        let genre = this.state.genre;

        if(question_title == ''){
            this.setState({
                open: true,
                message: 'タイトルが未入力です'
            });

            return false;
        }

        if(genre == ''){
            this.setState({
                open: true,
                message: '授業を選択してください'
            });

            return false;
        }

        if(body == ''){
            this.setState({
                open: true,
                message: '質問本文が未入力です'
            });

            return false;
        }
        
        //paramsにpostするデータを追加
        let params = new URLSearchParams();
        params.append('student_id',student_id);
        params.append('question_title',question_title);
        params.append('body',body);
        params.append('genre',genre);
        params.append('jwt',jwt);

        //Ajaxでのpost処理
        axios.post('/question/post',params).then(          
            (r)=>{
                if(r.response.status === 200){
                    let question_id = res.questionId;
                    localStorage.setItem('question_id',question_id);
                    this.props.history.push('/question/detail');
                }
            },

            (r)=>{
                console.log(0);
                if(r.response.status === 400){
                    this.setState({
                        open: true,
                        message: '投稿に失敗しました。'
                    });

                    return false;
                }
            }
            //this.props.history.push('/user');
        ).catch(
            (err)=>{
                //通信失敗時のコールバック
                let msg;
                if(err.response == undefined || err.response === null){
                    msg = '通信に失敗しました';
                }else if(err.response.status == 404){
                    msg = '名前かパターンが違います';
                }else{
                    msg = '500 ISE.';
                }

                // 投稿失敗時のスナックバーのコントロール
                this.setState({
                    open: true,
                    message: msg
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
                <div style={styles.panelSize}>
                    <div>
                        <HeaderMenu headerName="しつもんする" />
                    </div>

                    <div style={Object.assign({},...[styles.searchContetBox])}>
                        <InputLabel htmlFor="age-simple">なまえ</InputLabel>
                        <span style={styles.titleSize}>{this.state.student_name}</span>
                    </div>

                    <Divider />

                    <div style={Object.assign({},...[styles.searchContetBox])}>
                        <InputLabel htmlFor="age-simple">たいとる</InputLabel>
                        <TextField
                            id="title"
                            label="質問タイトル"
                            onChange={this.handleTextChange.bind(this)}
                            margin="normal"
                            style={styles.titleSize}
                        />
                    </div>
            
                    <Divider />

                    <div style={Object.assign({},...[styles.searchContetBox])}>
                        <InputLabel htmlFor="age-simple">じゅぎょう</InputLabel>
                        <Select
                            value={this.state.genre}
                            onChange={this.handleSelectChange.bind(this)}
                            style={Object.assign({},...[styles.selectSize])}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>国語</MenuItem>
                            <MenuItem value={2}>算数</MenuItem>
                            <MenuItem value={3}>理科</MenuItem>
                            <MenuItem value={4}>社会</MenuItem>
                            <MenuItem value={5}>英語</MenuItem>
                            <MenuItem value={6}>体育</MenuItem>
                            <MenuItem value={7}>音楽</MenuItem>
                            <MenuItem value={8}>家庭科</MenuItem>
                        </Select>
                    </div>

                    <Divider />

                    <div style={Object.assign({},...[styles.searchContetBox])}>
                        <InputLabel htmlFor="age-simple">きくこと</InputLabel>
                        <TextField
                            id="body"
                            label=""
                            multiline
                            rows="4"
                            margin="normal"
                            onChange={this.handleBodyTextChange.bind(this)}
                            style={styles.bodySize}
                        />
                    </div>
        
                    <Divider />

                    <div style={Object.assign({},...[styles.searchContetBox,styles.centering])}>
                        <Button 
                            variant="outlined"
                            onClick={this.handlePost.bind(this)}
                        >
                            投稿する
                        </Button>
                    </div>   
                    <div>
                        <ModalWindow />
                    </div>    
                    <Snackbar
                        open={this.state.open}
                        message={this.state.message}
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}
                    />

                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">かくにん</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                投稿します。よろしいですか？
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose.bind(this)} color="primary">
                                中止
                            </Button>
                            <Button onClick={this.handleClickSubmit.bind(this)} color="primary" autoFocus>
                                投稿する
                            </Button>
                        </DialogActions>
                    </Dialog>     
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(PostQuestion);