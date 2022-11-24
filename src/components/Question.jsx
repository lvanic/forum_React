import Comments from "./Comments";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import "../css/question.css"
function Question(props) {

    //window.scrollTo(0, 0);


    let location = useLocation()
    const [question, setQestion] = useState();

    useEffect(() => {
        async function fetchQuestion() {
            await fetch('https://localhost:3001/question' + location.search)//TODO: ${} not working
                .then(response => response.json())
                .then(response => {
                    setQestion(response);
                    //console.log(response)
                })
        }
        fetchQuestion();
    }, [])
    if (question != undefined) {
        //console.log(question.files[0])
        return (
            <div className="info">
                <div className="title">{question.title}</div>
                <div className="description">{question.description}</div>
                <div className="user">{question.user.name}</div>
                <div className="photos">
                    {question.files.map(el =>
                        <img src={`data:image/png;base64,${el}`} className="photoQuestion" />)}
                </div>
                <Comments comments={question.comments} />
            </div>
        );
    }
    else {
        return (<div style={{ width: '40%', textAlign: 'center', fontSize: '18px', marginLeft: 'auto', marginRight: 'auto' }}>Error</div>);
    }

}
export default Question;