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

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },
}

export default class QuestionList extends React.Component{

    state = {
        open: false,

        student_name:'',
        title: '',
        genre: '',
        body: '',
        posted_date: '',

        select:'',
    };

    componentWillMount(){
        let student_name = localStorage.getItem('user_name');
        this.setState({student_name:student_name});
        // const question_id = localStorage.getItem('question_id');
        // localStorage.removeItem('question_id');

        // this.setState({
        //     questionId:question_id,
        // });

        // console.log(this.state.questionId);
        
        // axios.get('/question/detail', {
        //     params: {
        //       // ここにクエリパラメータを指定する
        //       question_id: question_id
        //     }
        // }).then(
        //     (res) => {
        //         console.log(res);
        //         this.setState({
        //             question: res
        //         });
        //     },

        //     () => {
        //         console.log('connection rejected.');
        //     }
        // ).catch(
        //     (err)=>{
        //         console.log(err.response.status);
        //         console.log('connection rejected.');
        //     }
        // );
    }

    // handlePostAnswer(){
    //     console.log(this.state.questionId);
    // }

    handleSelectChange(e){
        let value = e.target.value;
        this.setState({select:value});
    }

    handleTextChange(e){
        let value = e.target.value;
        this.setState({title:value});
    }

    handleBodyTextChange(e){
        let value = e.target.value;
        this.setState({body:value});
    }

    handleClickSubmit(){
        let student_name = this.state.student_name;
        let question_title = this.state.question_title;
        let body = this.state.body;
        let genre = this.state.genre;

        //paramsにpostするデータを追加
        let params = new URLSearchParams();
        params.append('student_name',student_name);
        params.append('question_title',question_title);
        params.append('body',body);
        params.append('genre',genre);


        //Ajaxでのログイン処理
        axios.post('/question/post',params).then((res) => {
            
            ()=>{
                console.log(1);
            },
            ()=>{
                console.log(0);
            }

            this.props.history.push('/user');
        }).catch((err)=>{
            //通信失敗時のコールバック
            let msg;
            if(err.response == undefined){
                msg = '通信に失敗しました';
            }else if(err.response.status == 404){
                msg = '名前かパターンが違います';
            }else{
                msg = '500 ISE.';
            }

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
                <TextField
                    id="title"
                    label="質問タイトル"
                    value={this.state.name}
                    onChange={this.handleTextChange.bind(this)}
                    margin="normal"
                />

                <br />

                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                    value={this.state.select}
                    onChange={this.handleSelectChange.bind(this)}
                    inputProps={{
                    name: '科目',
                    id: 'age-simple',
                    }}
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

                <br />
    
                <TextField
                    id="body"
                    label="質問本文"
                    multiline
                    rows="4"
                    defaultValue="Default Value"
                    margin="normal"
                    onChange={this.handleBodyTextChange.bind(this)}
                />

                <br />

                <Button 
                    variant="outlined"
                    onClick={this.handleClickSubmit.bind(this)}
                >
                    Default
                </Button>
            </div>
        )
    }
}