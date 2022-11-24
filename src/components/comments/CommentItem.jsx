import React, { useState } from 'react'
import { useMemo } from 'react';
 const  CommentItem = ({ commentInfo }) => {
    
    const [reply, setReply] = useState(true)//TODO useMemo
    const [replyComment, setComment] = useState('');

    const  sendReplyComment = async() =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
                    'Authorization': 'Bearer ' + localStorage.getItem('key')},
            body: JSON.stringify({
                commentId: commentInfo.commentId,
                commentText: replyComment
         })
        };
        let response = await fetch('https://localhost:3001/comment-reply', requestOptions);
        let data = await response.json();
        commentInfo.replyComments.push(data)
        setComment('');
        setReply(true)
    }
    console.log(commentInfo)
    return (
        <div>
            <div className={'commentItem'}>
                <div className='comment_info_field'>
                    <div className={'textField'}>{commentInfo.text}</div>
                    <div className='userName'>{commentInfo.user.name}</div>
                </div>
                <div onClick={() => setReply(!reply)}>Reply</div>
            </div>
            <div>Show</div>
            {
                commentInfo.replyComments.map((element) => (
                    
                    <div>
                        <div className={'textField'}>{element.text}</div>
                        <div className='userName'>{element.user.name}</div>
                    </div>
                ))
            }
            <div hidden={reply}>
                <input type='text' value={replyComment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={sendReplyComment}>Reply</button>
            </div>
        </div>
    )
}

export default CommentItem