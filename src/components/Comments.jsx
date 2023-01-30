import React, {useState} from 'react'
import CommentsList from "./comments/CommentsList"
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import "../css/comments.css"
import { useEffect } from 'react'


function Comments (props){

    const [commentsList, setCommentsList] = useState(props.comments)
    const [comment, setComment] = useState('')
    const location = useLocation();
    const newCommentHandler = (e) =>{
        setComment(e.target.value)
    }
    console.log(commentsList)
    const deleteCommentHandler = async (commentInfo) => {
        let result = window.confirm('Вы действительно хотите удалить комментарий?');
        if (result) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('key')
                }
            };
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/comment?id=${commentInfo.commentId}`, requestOptions);
            if(response.ok){
                setCommentsList(commentsList.filter(x => x.commentId != commentInfo.commentId))
            }
        }
    }
    const changeCommentHandler = async ({commentInfo, text}) => {        
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('key')
                }
            };
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/comment?id=${commentInfo.commentId}&text=${text}`, requestOptions);
            if(response.ok){
                setCommentsList(commentsList.map(x => x.commentId == commentInfo.commentId ? {...x, text:text, date: new Date().toISOString().substring(0, 10) } : x))
            }   
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
        let response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/comment`, requestOptions);
        let data = await response.json();
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
            <input className='comment_input' placeholder='Напишите что-нибудь...' type='text' value={comment} onChange={newCommentHandler}/>
            <button type='button' className='new_button' onClick={(e) => addNewComment(e)}>Send</button>
            </div>
            <CommentsList commentsList={commentsList} deleteComment={deleteCommentHandler} changeComment={changeCommentHandler}/>
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