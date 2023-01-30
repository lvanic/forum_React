import { connect } from "react-redux"; 
import { useState } from "react"; 
import { useEffect } from "react";
 
function ChangeCommentInput({language, id, setChange, setBlockClosing, editComment}){ 
    const [changeText, setChangeText] = useState('') 

    const sendHandler = e => { 
        // alert(changeText)
        editComment(changeText)
        setChange(false); 
    } 
    return( 
        <div id="change-input"> 
            <input type='text' value={changeText} onFocus={() => setBlockClosing(true)} onChange={(e) => setChangeText(e.target.value)}/> 
            <button onClick={sendHandler}>{language.send}</button> 
        </div> 
    ); 
} 
 
const mapStateToProps = (state) => { 
    return { 
        login: state.login, 
        language: state.language 
    } 
} 
export default connect(mapStateToProps)(ChangeCommentInput)