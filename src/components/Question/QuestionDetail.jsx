import React from 'react';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import HeaderMenu from '../header/HeaderComponet'

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

    bodySize: {
        width: '50vw',
        marginLeft: '5vw'
    },

    centering: {
        textAlign: 'center'
    },
    
    searchContetBox: {
        padding: '5% 0'
    },

    titleSize: {
        width: '50vw',
        marginLeft: '5vw'
    },

}

export default class QuestionList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            question: {},
            questionId: '',
            student_id: '',
            student_name: '',
            body: '',
        }
    }

    componentWillMount(){
        const question_id = localStorage.getItem('question_id');
        const student_name = localStorage.getItem('student_name');
        const student_id = localStorage.getItem('student_id');
        localStorage.removeItem('question_id');

        this.setState({
            questionId:question_id,
            student_name:student_name,
            student_id:student_id,
        });
        
        axios.get('/question/detail/:question_id', {
            params: {
              // ここにクエリパラメータを指定する
              question_id: question_id
            }
        }).then(
            (res) => {
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

    //質問本文に変更があった場合に、stateを変更する
    handleBodyTextChange(e){
        let value = e.target.value;
        this.setState({body:value});
    }

    //回答をpost
    handlePostAnswer(){
        let student_id = this.state.student_id;
        let question_id = this.state.question_id;
        let body = this.state.body;

        let parsms = new URLSearchParams();

        parsms.append('student_id',student_id);
        params.append('question_id',question_id);
        params.append('body',body);

        axios.post('question/answer/post',params).then(
            (r)=>{
                console.log(r);
            },
            ()=>{
                console.log(0);
            }
        ).catch(
            ()=>{
                console.log('error happend!!');
            }
        )
    }

    render(){

        return(
            <div>
               <button onClick={this.handlePostAnswer.bind(this)}>aaa</button>
               <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>回答を投稿する</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <div style={Object.assign({},...[styles.searchContetBox])}>
                                <InputLabel htmlFor="age-simple">なまえ</InputLabel>
                                <span style={styles.titleSize}>{this.state.student_name}</span>
                            </div>
                            
                            <br/>
                            <Divider />

                            <div style={Object.assign({},...[styles.searchContetBox])}>
                                <InputLabel htmlFor="age-simple">こたえる</InputLabel>
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

                            <br/>
                            <Divider />

                            <div style={Object.assign({},...[styles.centering,styles.searchContetBox])}>
                                <Button 
                                    variant="outlined"
                                    onClick={this.handlePostAnswer.bind(this)}
                                >
                                    投稿する
                                </Button>
                            </div>   
                        </div>         
                    </ExpansionPanelDetails>
                </ExpansionPanel>
               </div>
            </div>
        )
    }
}