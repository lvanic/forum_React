import React, {useState} from 'react'
import { useEffect } from 'react'
import CommentItem from "./CommentItem"



const CommentsList = ({commentsList, editComment, deleteComment, changeComment}) => {
    const [sortByDate, setSortByDate] = useState(true)
    const [sortedCommentList, setSortCommentList] = useState([...commentsList])
    useEffect(() =>{
        var buf = [...sortedCommentList.reverse()]
        setSortCommentList(buf);
    },[sortByDate])
    useEffect(() => {
        setSortCommentList(commentsList)
    },[commentsList])
    
    return (    
        <div style={{width:'90%'}}>
            <div onClick={() => setSortByDate(!sortByDate)}>Date</div>
            {sortedCommentList.map((comment) => //sort by date
            (
                <CommentItem key={comment.id} commentInfo={comment} deleteComment={deleteComment} editComment={changeComment}/>
            ))
            }
        </div>
    )
}

export default CommentsList