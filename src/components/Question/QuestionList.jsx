import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
    handleDispatch(s){
        console.log(s);
    }

    render(){

        let questionLists = this.props.questionList['question'];
        let lists = [];
        
        //if(numberOfQuesiton > 0) {
            for(let i in questionLists){
                let tags = []; 
                for(let t in questionLists[i].question_tags){
                    tags.push(
                        <Chip
                            label={ questionLists[i].question_tags[t]}
                            className="tags"
                            component="a"
                            href="#chip"
                            clickable
                        />
                    );
                }

                lists.push(
                    <div key={i} style={Object.assign({},...[styles.container])}>               
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    <a href="#" id={i} onClick={this.handleDispatch(i)}>{questionLists[i].question_title}</a>
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
        //}else{
        //    lists.push(<div key="0">まだ質問がありません</div>)
        //}
      

        return(
            <div>
                {lists}
            </div>
        )
    }
}