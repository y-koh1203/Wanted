import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import QuestionList from './QuestionList';
import HeaderMenu  from '../header/HeaderComponet';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import ModalWindow from '../parts/modal'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    sizes: {
        width: '50vw',
        marginLeft: '13vw',
    },

    flex: {
        display: 'flex',
        textAlign: 'conter',
    },

    searchContetBoxL: {
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
    },

    searchContetBoxR: {
        width: '50%',
    },
    
    button: {
        marginTop: '3vw',
        marginLeft: '3vw',
        width: '6vw',
        height: '2vh',
    }
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
              
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>質問を探す</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={styles.flex}>
                            <div style={Object.assign({},...[styles.searchContetBoxL])}>
                                <TextField
                                    id="student_class"
                                    label="キーワードをいれてね"
                                    name="query"
                                    margin="normal"
                                    style={Object.assign({}, ...[styles.sizes])}
                                />
                            </div>
                            <Button 
                                variant="outlined"
                                style={styles.button}
                                //onClick={this.handlePostAnswer.bind(this)}
                            >
                                探す
                            </Button>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Divider />

                <div id="question_list">
                    <QuestionList questionList={question} />
                </div>

                <div>
                    <ModalWindow />
                </div>        
            </div>
        )
    }
}