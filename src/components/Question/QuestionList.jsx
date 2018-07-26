import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import axios from '../../../node_modules/axios';

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },

    centering: {
        textAlign: 'center'
    }
}

class QuestionList extends React.Component{
    handleDispatch(i){
        // console.log(i);
        localStorage.setItem('question_id',i);
        this.props.history.push('/question/detail');
    }

    render(){

        let questionLists = this.props.questionList['question'];
        console.log(questionLists);
        let lists = [];
        
        if(questionLists != undefined && questionLists != null) {
            for(let i in questionLists){
                console.log(questionLists[i]);
                let tags = []; 
                for(let t in questionLists[i].question_tags[0]){
                    tags.push(
                        <Chip
                            label={ questionLists[i].question_tags[0][t]}
                            className="tags"
                            href="#chip"
                            clickable
                            key={t}
                        />
                    );
                }

                lists.push(
                    <div key={i} style={Object.assign({},...[styles.container])}>               
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    <a href="#" key={i} onClick={this.handleDispatch.bind(this,questionLists[i].question_id)}>{questionLists[i].question_title}</a>
                                </Typography>
                                <Typography component="p">
                                    {questionLists[i].question_body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {tags}
                            </CardActions>
                        </Card>
                    </div>
                );
            }
        }else{
           lists.push(<div key="0" style={styles.centering}>まだ質問がありません</div>)
        }
      

        return(
            <div>
                {lists}
            </div>
        )
    }
}

export default withRouter(QuestionList);