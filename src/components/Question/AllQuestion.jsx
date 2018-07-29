import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import QuestionList from './QuestionList';
import HeaderMenu  from '../header/HeaderComponet';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

const styles = {
    sizes: {

    },
}

export default class AllQuestion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questions:{
                question:[]
            }
        }
    }

    //マウント時に、質問を持ってくる
    componentWillMount(){
        let jwt = localStorage.getItem('jwt');
        axios.get('/question/all',{
            params:{
                jwt:jwt,
                limit: 10,
                offset:0,
            }
        }).then(
            (res)=>{
                //console.log(res['data']);

                let tmpArray = [];
                let val = res['data'];
                
                let questions = this.state.questions;
                let newQuestions = Object.assign({},questions);

                val.forEach(v => {
                    newQuestions.question.push(v);
                });
 
                this.setState({
                    questions:newQuestions
                })

                console.log(this.state.questions);
            },
            ()=>{
                console.log('question get failed.');
            }
        )
    }


    render(){
        let question = this.state.questions;
        // console.log(question);

        console.log(this.state);

        return(
            <div id="wrap">
                <HeaderMenu headerName="全ての質問" />
                <div>
                    <TextField
                        id="student_class"
                        label="クラス + しゅっせきばんごう"
                        name="login_id"
                        margin="normal"
                        style={Object.assign({}, ...[styles.sizes])}
                    />
                </div>

                <div id="question_list">
                    <QuestionList questionList={question} />
                </div>
            </div>
        )
    }
}