import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import QuestionList from './QuestionList';
import HeaderMenu  from '../header/HeaderComponet';

const styles = {

}

export default class AllQuestion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questions:{
                question : [
                    {
                        question_id: '質問ID',
                        question_title: '質問タイトル',
                        genre: 'ジャンル',
                        question_body: '質問内容',
                        question_tags: ['tag1','tag2','tag3'],
                        question_date: '質問の投稿日時',
                        post_user: '投稿者'
                    },	
                    {
                        question_id: '質問ID',
                        question_title: '質問タイトル',
                        genre: 'ジャンル',
                        question_body: '質問内容',
                        question_tags: ['tag1','tag2','tag3'],
                        question_date: '質問の投稿日時',
                        post_user: '投稿者'
                    },
                    {
                        question_id: '質問ID',
                        question_title: '質問タイトル',
                        genre: 'ジャンル',
                        question_body: '質問内容',
                        question_tags: ['tag1','tag2','tag3'],
                        question_date: '質問の投稿日時',
                        post_user: '投稿者'
                    }
                ]
            }
        }
    }

    
    //マウント時に、質問を持ってくる
    // componentWillMount(){
    //     let jwt = localStorage.getItem('jwt');
    //     axios.get('/question/all',{
    //         params:{
    //             jwt:jwt,
    //             limit: 10,
    //             offset:0,
    //         }
    //     }).then(
    //         (res)=>{
    //             this.setState({
    //                 question:res
    //             })
    //         },
    //         ()=>{
    //             console.log('question get failed.');
    //         }
    //     ).catch(
    //         ()=>{
    //            console.log('connection refused.'); 
    //         }
    //     )
    // }


    render(){
        let question = this.state.questions['question'];
        return(
            <div id="wrap">
                <HeaderMenu headerName="全ての質問" />
                <div>

                </div>

                <div id="question_list">
                    <QuestionList questionList={question} />
                </div>
            </div>
        )
    }
}