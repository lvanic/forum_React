import React, {useState} from 'react'
import { useEffect } from 'react'
import CommentItem from "./CommentItem"



const CommentsList = ({commentsList, deleteComment, editComment}) => {
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
        <div className={'commentsList'}>
            <div onClick={() => setSortByDate(!sortByDate)}>Date</div>
            {sortedCommentList.map((comment) => //sort by date
            (
                <CommentItem key={comment.id} commentInfo={comment} deleteComment={deleteComment} editComment={editComment}/>
            ))
            }
        </div>
    )
}

export default CommentsList