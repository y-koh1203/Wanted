import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderMenu from '../header/HeaderComponet';

import ModalWindow from '../parts/modal'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import DrawingArea from '../parts/DrowingComponets'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import QuestionList from '../Question/QuestionList'

const styles = {
    main : {
        borderRadius:'40px',
        // backgroundColor:'#eceee9',
        width: '87%',
        minHeight: '100vh',
        margin: '18% auto 0 auto',
        position: 'relative',
        zIndex: '0',
    },

    icon_circle : {
        borderRadius: '50%',
        width: '34%',
        height: '29vw',
        position: 'absolute',
        top: '-14vw',
        left: '28vw',
        zIndex: '0',
    },

    bigAvatar: {
        width: '12vw',
        height: 'auto',
        margin: '25% auto 0 auto',
        display: 'flex',
        alignItems: 'center'
    },

    nameBox: {
        paddingTop: '18%',
    },

    tabBox : {
        marginTop: '8%',
        whiteSpace: 'nowrap'
    },

    tabLabel: { 
        padding: '0 10%',
        margin: '0 5%',
        whiteSpace: 'nowrap',
    },

    text_h1: {
        textAlign: 'center',
    },

    button: {
        verticalAlign:'middle',
        padding: '0 8%',
        marginTop: '5%',
        backgroundColor: '#ffff',
        fontSize: '2.2vh',
        // border: '2px solid black'
    },

    centering: {
        margin: '0 auto',
        textAlign: 'center',
    },

    fontLg: {
        fontSize: '4.2vh',
        fontWeight: 'lighter'
    },

    fontMd: {
        fontSize: '2.2vh',
        fontWeight: 'lighter'
    },

    fontSm: {
        fontSize: '1rem',
    },

    nickname: {
        marginTop: '-3.5%'
    },

    colorMain: { 
        backgroundColor:"#ededed"
    },

    colorSub: {
        backgroundColor:"#7cf1dc"
    },

    classAndGrade: {
        marginTop: '1.5%',
        fontSize: '2.6vh',
    },

    myQusetions: {
        paddingTop: '10%',
        fontSize: '2.6vh',
        fontWeight: 'lighter',
        marginBottom: '2%'
    }
}

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default class UserProfile extends Component {

    state = {
        value: 0,
        questionList:{
            question : [
                {
                    question_id: 11,
                    question_title: "算数の問題がわかりません",
                    genre: "算数",
                    question_body: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    question_tags: ["算数","数学","情報"],
                    question_date: "2017/07/07/sun",
                    post_user: "ymko",
                    icon: "/path"
                },	
                {
                    question_id: 11,
                    question_title: 11,
                    genre: 11,
                    question_body: 11,
                    question_tags: [1,2,3],
                    question_date: '2017/07/07/sun',
                    post_user: 'ymko',
                    icon: '/path'
                },
            ]
        }
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    //質問表示の初期状態
    componentWillMount(){
        this.handleTaughtQuestionAll;
    }

    //全ての教えた質問を取得する
    handleTaughtQuestionAll(){
        let student_id = localStorage.getItem('student_id');

        const promise = new Promise((resolve ,reject) => {
            axios.get('/question/user/:student_id', {
                params: {
                  student_id: student_id
                }
            }).then(
                (res) => {
                    resolve(res);
                },

                () => {
                    reject();
                }
            );
        });

        promise.then(
            (res)=>{

            }
        ).catch(()=>{

        });

    }

    //全ての聞いた質問を取得する
    handleHeardQuestionAll(){
        let student_id = localStorage.getItem('student_id');

        const promise = new Promise((resolve ,reject) => {
            axios.get('/question/answer/user/:student_id', {
                params: {
                  student_id: student_id
                }
            }).then(
                (res) => {
                    resolve(res);
                },

                () => {
                    reject();
                }
            );
        });

        promise.then(
            (res)=>{

            }
        ).catch(()=>{

        });

    }

    render() {
        const { value } = this.state;
        return (
            <div className="wrap">
                <HeaderMenu headerName="プロフィール" />
             
                <div className="main">
                    <div id="user_profile_area" style={Object.assign({},...[styles.main,styles.colorMain])}>
                        <div id="icon_circle" className="iconCircle" style={Object.assign({},...[styles.icon_circle,styles.colorSub])}>
                            <Avatar
                                alt="Adelle Charles"
                                src="/assets/images/student.png"
                                style={styles.bigAvatar}
                            />
                        </div>

                        <div style={Object.assign({},...[styles.nameBox])}>
                            <h1 style={Object.assign({},...[styles.text_h1,styles.fontLg])}>{localStorage.getItem("user_name")}</h1>
                            <p style={Object.assign({},...[styles.centering,styles.fontMd,styles.nickname])}>{localStorage.getItem("nickname")}</p>
                            <p style={Object.assign({},...[styles.centering,styles.fontMd,styles.classAndGrade])}>{localStorage.getItem("grade")}年　{localStorage.getItem("class")}組</p>

                            <div style={styles.centering}>
                                <Button 
                                    variant="extendedFab" 
                                    // onClick={this.onClickButtonHandler.bind(this)}
                                    style={Object.assign({},...[styles.button])}
                                >
                                    自己紹介を変更する
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h2 style={Object.assign({},...[styles.centering,styles.myQusetions])}>じぶんのきろく</h2>
                            <Divider />
                        </div>

                        <div style={Object.assign({},...[styles.tabBox])}>
                            <Paper className="root">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    style={Object.assign({},...[styles.tabLabel,styles.fontMd])}
                                    //style={Object.assign({},...[styles.paper])}
                                    centered
                                >
                                    <Tab label="おしえた" style={Object.assign({},...[styles.tabLabel,styles.fontMd])} />
                                    <Tab label="きいた" style={Object.assign({},...[styles.tabLabel,styles.fontMd])}/>
                                </Tabs>
                            </Paper>
                            {value === 0 && 
                                <TabContainer>
                                    <div className="taught">
                                       <QuestionList questionList={this.state.questionList} />
                                    </div>
                                </TabContainer>
                            }

                            {value === 1 && 
                                <TabContainer>
                                    <div className="heard">
                                        <div className="answerContainer">
                                       </div>
                                    </div>
                                </TabContainer>
                            }
                        </div>
                    </div>
                </div>
                <ModalWindow />
            </div>
        );
    }
}