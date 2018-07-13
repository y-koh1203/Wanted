import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Axios from '../../../node_modules/axios';
import { withRouter } from 'react-router';

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },
}

export default class QuestionList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            question:{},
        };
    }

    componentWillMount(){
        const question_id = this.props.questionId;
        
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
                console.log(err);
                console.log('connection rejected.');
            }
        );
    }

    render(){

        return(
            <div>
               a
            </div>
        )
    }
}