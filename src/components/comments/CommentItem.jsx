import React, { useState } from 'react'
import { useMemo } from 'react';
import { connect } from 'react-redux';
import ChangeCommentInput from './ChangeCommentInput';
const CommentItem = ({ commentInfo, login, language, deleteComment, editComment }) => {

    const [reply, setReply] = useState(true)//TODO useMemo 
    const [isShow, setShow] = useState(false)//TODO useMemo 
    const [isSettings, setSettings] = useState(false)//TODO useMemo 
    const [replyComment, setComment] = useState('');
    const [isChange, setChange] = useState(false);
    const [isBlockClosing, setBlockClosing] = useState(false);
    const sendReplyComment = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            },
            body: JSON.stringify({
                commentId: commentInfo.commentId,
                commentText: replyComment
            })
        };
        let response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/comment-reply`, requestOptions);
        let data = await response.json();
        commentInfo.replyComments.push(data)
        setComment('');
        setReply(true)
    }
    const sendChangeComment = (text) => {
        // alert(text)
        editComment({ commentInfo, text });
    }

    return (
        <div className='comms'>
            <div className='commentItem'>
                <div className='commentMain'>
                    <div className='comment_info_field'>
                        <div className='upperField'>
                            <div className={'textField'}>{commentInfo.text}</div>
                            
                            {
                                isSettings ?
                                    commentInfo.user.name == login ?
                                        <div className='commentItemSettings'>
                                            {/* <div onClick={() => prompt("complaint event to do")}>Complaint</div> */}
                                            <div onClick={() => {
                                                setChange(!isChange);
                                                setBlockClosing(false);
                                            }}>Change</div>
                                            <div onClick={() => deleteComment(commentInfo)}>Delete</div>
                                        </div>
                                        :
                                        <div className='commentItemSettings'>
                                            <div onClick={() => prompt("complaint event to do")}>Complaint</div>
                                        </div>
                                    : null
                            }
                            <div onClick={() => {
                                setSettings(!isSettings)
                                setChange(false)
                            }}>
                                &#9881;
                            </div>
                        </div>
                        <div className='userName'>{commentInfo.user.name}</div>
                        <div className=''>{new Date(commentInfo.date).toISOString().substring(0, 10)}</div>
                        <div className='userSettingsComments'>
                            <div className='replyButton' onClick={() => setReply(!reply)}>Reply</div>
                            {
                                commentInfo.replyComments.length > 1 ?
                                    <div onClick={() => setShow(!isShow)}>Show</div>
                                    :
                                    null
                            }
                        </div>
                        <div className='commentSettings'>

                            {
                                isChange ?
                                    <ChangeCommentInput id={commentInfo.commentId} setBlockClosing={setBlockClosing} editComment={sendChangeComment} setChange={setChange} />
                                    : null
                            }

                        </div>
                    </div>

                </div>
                {
                    isShow ?
                        <div className='replForm'>
                            <div style={{ color: '#4A7786', fontSize: '25px' }}>&#10149;</div>
                            {
                                commentInfo.replyComments.map((element) => (
                                    <div>
                                        <div className={'textField'}>{element.text}</div>
                                        <div className='userName'>{element.user.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        commentInfo.replyComments.length > 0 ?
                            <div className='replForm'>
                                <div style={{ color: '#4A7786', fontSize: '25px' }}>&#10149;</div>
                                <div>
                                    <div className={'textField'}>{commentInfo.replyComments[commentInfo.replyComments.length - 1].text}</div>
                                    <div className='userName'>{commentInfo.replyComments[commentInfo.replyComments.length - 1].user.name}</div>
                                </div>
                            </div>
                            :
                            null
                }
                <div hidden={reply}>
                    <input type='text' className='repltext' value={replyComment} onChange={(e) => setComment(e.target.value)} />
                    <button className='replyButton' onClick={sendReplyComment} style={{ marginLeft: '1%' }}>Reply</button>
                </div>

            </div>
        </div>
    )
}

const
    mapStateToProps = (state) => {
        return {
            login: state.login,
            lamguage: state.language
        }
    }
export default connect(mapStateToProps)(CommentItem)

