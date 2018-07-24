import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },

    searchContetBox: {
        padding: '10% 0'
    }
}

export default class QuestionList extends React.Component{

    state = {
        open: false,

        student_id:'',
        title: '',
        genre: '',
        body: '',
        jwt: '',

        select:'',
    };

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

    //質問の投稿処理
    handleClickSubmit(){
        let student_id = this.state.student_id;
        let jwt = this.state.jwt;
        let question_title = this.state.question_title;
        let body = this.state.body;
        let genre = this.state.genre;

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
                console.log(r);
            },

            ()=>{
                console.log(0);
            }
            //this.props.history.push('/user');
        ).catch((err)=>{
            //通信失敗時のコールバック
            let msg;
            if(err.response == undefined){
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

    render(){

        return(
            <div>
                <p>投稿者:{this.state.student_name}</p>
                <div style={Object.assign({},...[styles.searchContetBox])}>
                    <TextField
                        id="title"
                        label="質問タイトル"
                        onChange={this.handleTextChange.bind(this)}
                        margin="normal"
                    />
                </div>
           
                <Divider />

                <div style={Object.assign({},...[styles.searchContetBox])}>
                    <InputLabel htmlFor="age-simple">科目</InputLabel>
                    <Select
                        value={this.state.genre}
                        onChange={this.handleSelectChange.bind(this)}
                        // inputProps={{
                        //     name: 'class',
                        //     id: 'age-simple',
                        // }}
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
                    <TextField
                        id="body"
                        label="質問本文"
                        multiline
                        rows="4"
                        margin="normal"
                        onChange={this.handleBodyTextChange.bind(this)}
                    />
                </div>
    
                <Divider />

                <div style={Object.assign({},...[styles.searchContetBox])}>
                    <Button 
                        variant="outlined"
                        onClick={this.handleClickSubmit.bind(this)}
                    >
                        投稿する
                    </Button>
                </div>    
            </div>
        )
    }
}