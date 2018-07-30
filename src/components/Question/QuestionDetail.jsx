import React from 'react';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import HeaderMenu from '../header/HeaderComponet'

import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

import ModalWindow from '../parts/modal'
import Avatar from '@material-ui/core/Avatar';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';

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

    panelSize: {
        width: '90%',
        margin: '0 auto',
    },

    bigAvatar: {
        width: '8vw',
        maxWidth: '120px',
        height: 'auto',
        marginLeft: '7vw',
    },

    flex: {
        marginTop: '3vw',
        display: 'flex',
    },

    boxLeft: {
        width: '20%'
    },

    boxRight: {
        width: '80%'
    },

    name: {
        marginTop: '2.5vw',
        fontSize: '3.5vw'
    },

    panelParent: {
        marginTop: '3vw'
    },

    boxes: {
        width: '100%',
        padding: '1% 0',
    },

    content: {
        marginLeft: '7vw',
    },

    title: {
        fontSize: '4.5vw',
        fontWeight: 'bold',
    },

    answerHead: {
        marginTop: '3vh',
    },

    answerHeadText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    card: {
        width: '95%',
        margin: '2% auto'
    }

}

class QuestionList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            question: {},
            question_id: '',
            student_id: '',
            student_name: '',
            body: '',
            message: '',
        }

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount(){
        const question_id = localStorage.getItem('question_id');
        const student_name = localStorage.getItem('student_name');
        const student_id = localStorage.getItem('student_id');

        this.setState({
            question_id:question_id,
            student_name:student_name,
            student_id:student_id,
        });
        
        axios.get('/question/detail/'+question_id).then(
            (res) => {
                console.log(res);
                this.setState({
                    question: res.data
                });

                console.log(1);
                console.log(this.state.question);
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
        let jwt = localStorage.getItem('jwt');

        if(body == null || body == ''){
            this.setState({
                open:true,
                message:'本文が未入力です'
            });
            return false;
        }

        let params = new URLSearchParams();

        params.append('student_id',student_id);
        params.append('question_id',question_id);
        params.append('body',body);
        params.append('jwt',jwt);

        axios.post('/question/answer/post',params).then(
            (r)=>{
                console.log(r);
                this.props.history.push('/question/detail');
                if(r.data.state === false){
                    this.setState({
                        open:true,
                        message: 'この質問にはすでに回答しています'
                    })
                }
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

    handleRequestClose(){
        this.setState({
          open: false,
        });
    }

    render(){
        let data = this.state.question;
        let answers = [];
        answers = data.answers;
        let ans = [];
        let tags = [];

        for(let d in data.question_tags){
            //表示するタグを追加
            tags.push(
                <Chip
                    label={data.question_tags[d]['tag_name']}
                    className="tags"
                    href="#chip"
                    clickable
                    key={d}
                    style={{margin:'0 1vw'}}
                />
            );
        }

        let cnt = 0;
        for(let a in answers){
            
            ans.push(
                <div key={a}>
                    <Card style={styles.card}>
                        <CardContent>
                            <Typography gutterBottom variant="title">
                                {answers[a]['post_user']}さん　より
                            </Typography>
                            <Divider />
                            <Typography>
                                <h3>[ アドバイス ]</h3>
                                {answers[a]['answer_body']}
                            </Typography>
                            <br/>
                            <Divider />
                            <Typography component="p">
                                投稿日時：{answers[a]['answer_date']}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            );
            cnt++;
        }

        if(cnt === 0){
            ans.push(<div key="0" style={{textAlign:'center'}}>まだ誰も答えていません。君が最初の回答者にならない?</div>);
        }

        return(
            <MuiThemeProvider>
                <div>
                    <HeaderMenu headerName="質問の詳細" />
                    <div>
                        <div style={Object.assign({},...[styles.flex])}>
                            <div style={Object.assign({},...[styles.boxLeft])}>
                                <Avatar 
                                    alt="Adelle Charles"
                                    src="/assets/images/student.png"
                                    style={Object.assign({},...[styles.bigAvatar])}
                                />
                            </div>
                            <div style={Object.assign({},...[styles.boxRight])}>
                                <Typography style={Object.assign({},...[styles.name])}>{data.post_user}</Typography>
                            </div>
                        </div>

                        <br/>
                        <Divider />

                        <div style={Object.assign({},...[styles.boxes])}>
                            <Typography style={Object.assign({},...[styles.content,styles.title,{marginTop:'1.5%'}])}>{data.question_title}</Typography>
                        </div>

                        <div style={Object.assign({},...[styles.boxes])}>
                            <Typography variant="subheading" gutterBottom style={styles.content}>
                                科目：{data.genre}
                            </Typography>
                        </div>
                        
                        <Divider />

                        <div style={Object.assign({},...[styles.boxes])}>
                            <Typography variant="body2" gutterBottom  style={styles.content}>
                                <h3>[ 質問 ]</h3>
                                {data.question_body}
                            </Typography>
                        </div>

                        <Divider />

                        { console.log(tags.length) }
                        <div style={Object.assign({},...[styles.boxes])}>
                            <div style={styles.content}>
                                ついているタグ：{tags}
                            </div>
                        </div>

                        <Divider />


                        <div style={Object.assign({},...[styles.boxes])}>
                            <Typography variant="body2" gutterBottom  style={Object.assign({},...[styles.content])}>
                                投稿日：{data.question_date}
                            </Typography>
                        </div>

                        <Divider />
                    </div>
                    
                    <div style={Object.assign({},...[styles.panelParent,{margin: '1vh 0'}])}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>回答を投稿する</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={styles.panelSize}>
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
                        <div style={Object.assign({},...[styles.answerHead])}>
                            <div>
                                <Typography variant="title" gutterBottom style={Object.assign({},...[styles.answerHeadText])}>
                                    みんなからのアドバイス
                                </Typography>
                            </div>
                            <Divider />

                            <div>
                                {ans}
                            </div>
                        </div>
                    </div>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.message}
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}
                    />
                    <div>
                        <ModalWindow />
                    </div>     
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(QuestionList);