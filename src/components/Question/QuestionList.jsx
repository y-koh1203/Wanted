import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = {
    container: { 
        // width: '80vw',
        // borderRadius: '10%',
        // backgorundColor,
        margin: '2.5% 0',
    },

    centering: {
        textAlign: 'center'
    },

    card: {
        width: '90%',
        margin: '0 auto',
        borderRadius: '10px',
    },
    
    aTag: {
        textDecoration: 'none',
        color: '#000000',
        fontWeight: 'bold'
    }
}

class QuestionList extends React.Component{
    handleDispatch(i){
        localStorage.setItem('question_id',i);
        this.props.history.push('/question/detail');
    }

    render(){

        let questionLists = this.props.questionList['question'];
        console.log(questionLists);
        let lists = [];
        let tagList = [];
        
        if(questionLists != undefined && questionLists != null) {
            for(let i in questionLists){
                let tags = []; 
                for(let t in questionLists[i].question_tags){
                    //タグリストに重複するタグがないか判別
                    // if(tagList.indexOf(questionLists[i].question_tags[t]['tag_name']) === -1){   
                        //タグリストに、重複していないタグを追加
                        tagList.push(questionLists[i].question_tags[t]['tag_name']);
                        //表示するタグを追加
                        tags.push(
                            <Chip
                                label={ questionLists[i].question_tags[t]['tag_name']}
                                className="tags"
                                href="#chip"
                                clickable
                                key={t}
                            />
                        );
                    // }
                }

                lists.push(
                    <div key={i} style={Object.assign({},...[styles.container])}>               
                        <Card style={styles.card}>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    <a href="javascript:void(0)" key={i} style={styles.aTag} onClick={this.handleDispatch.bind(this,questionLists[i].question_id)}>{questionLists[i].question_title}</a>
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