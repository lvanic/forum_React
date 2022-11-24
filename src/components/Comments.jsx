import React, {useState} from 'react'
import CommentsList from "./comments/CommentsList"
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import "../css/comments.css"

// todo сделать нормальные стили

function Comments (props){
    const [commentsList, setCommentsList] = useState(props.comments)
    const [comment, setComment] = useState('')
    const location = useLocation();
    const newCommentHandler = (e) =>{
        setComment(e.target.value)
    }
    async function postComment(commentPost){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
                    'Authorization': 'Bearer ' + localStorage.getItem('key')},
            body: JSON.stringify({
                questionId: location.search.slice(4),
                commentText: commentPost
         })
        };
        let response = await fetch('https://localhost:3001/comment', requestOptions);
        let data = await response.json();
        //console.log(commentsList)
        const result ={ user:data.user, text: data.text, date: data.date, commentId: data.commentId, replyComments: data.replyComments }
        setCommentsList([...commentsList, result])
        
    }
    //console.log(commentsList)    
    const addNewComment = (e) => {
        
        if (comment != '') {
            postComment(comment);
            
        } else {
            alert('You need to set comment values')
        }
        //alert(comment)
        setComment(''); 
    }
    return (
        <div className={'commentsContainer'}>
            <div className='comment_input_button'>
            <input className='comment_input' type='text' value={comment} onChange={newCommentHandler}/>
            <button type='button' onClick={(e) => addNewComment(e)}>Send</button>
            </div>
            <CommentsList commentsList={commentsList}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        login: state.login,
        question: state.activeTopic
    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps) (Comments)