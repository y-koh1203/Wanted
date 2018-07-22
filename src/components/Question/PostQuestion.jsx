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

        student_id:'',
        title: '',
        genre: '',
        body: '',
        posted_date: '',
        jwt: '',

        select:'',
    };

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

    handleSelectChange(e){
        let value = e.target.value;
        this.setState({select:value});
    }

    handleTextChange(e){
        let value = e.target.value;
        this.setState({question_title:value});
    }

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

        let key = process.env.API_KEY;

        let params_keyword = new URLSearchParams();
        params_keyword.append('app_id',key);
        params_keyword.append('sentence',body);
        params_keyword.append('max_num',5)

        let words = [];

        //形態素解析APIを使用して、帰ってきた値を整形する
        axios.post('https://labs.goo.ne.jp/api/morph',params_keyword).then(
            (res)=>{
                let word_list = res.data.word_list;
                for(let i = 0; i< word_list.length;i++){
                    for(let j = 0;j < word_list[i].length;j++){
                        if(word_list[i][j][1] === '名詞'){
                            if(words.indexOf(word_list[i][j][0]) == -1){
                                words.push(word_list[i][j][0]);
                            }
                        }
                    }
                }
            },
            ()=>{
                console.log('fail');
            }
        )

        //paramsにpostするデータを追加
        let params = new URLSearchParams();
        params.append('student_id',student_id);
        params.append('question_title',question_title);
        params.append('body',body);
        params.append('genre',genre);
        params.append('jwt',jwt);
        params.append('tags',words);

        console.log(student_id);
        console.log(words);

        //Ajaxでのログイン処理
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
                    onChange={this.handleTextChange.bind(this)}
                    margin="normal"
                />

                <br />

                <InputLabel htmlFor="age-simple">科目</InputLabel>
                <Select
                    value={this.state.select}
                    onChange={this.handleSelectChange.bind(this)}
                    inputProps={{
                    name: 'class',
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
                    margin="normal"
                    onChange={this.handleBodyTextChange.bind(this)}
                />

                <br />

                <Button 
                    variant="outlined"
                    onClick={this.handleClickSubmit.bind(this)}
                >
                    投稿する
                </Button>
            </div>
        )
    }
}