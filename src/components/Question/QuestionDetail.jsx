import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

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
        question:{},
        questionId:'',
    };

    componentWillMount(){
        const question_id = localStorage.getItem('question_id');
        localStorage.removeItem('question_id');

        this.setState({
            questionId:question_id,
        });

        console.log(this.state.questionId);
        
        axios.get('/question/detail', {
            params: {
              // ここにクエリパラメータを指定する
              question_id: question_id
            }
        }).then(
            (res) => {
                console.log(res);
                this.setState({
                    question: res
                });
            },

            () => {
                console.log('connection rejected.');
            }
        ).catch(
            (err)=>{
                console.log(err.response.status);
                console.log('connection rejected.');
            }
        );
    }

    handlePostAnswer(){
        console.log(this.state.questionId);
    }

    render(){

        return(
            <div>
               <button onClick={this.handlePostAnswer.bind(this)}>aaa</button>
            </div>
        )
    }
}