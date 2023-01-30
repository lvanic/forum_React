import Comments from "./Comments";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import "../css/question.css"
import ImageOpen from './ImageOpen.jsx'
function Question(props) {
    let location = useLocation()
    const [question, setQestion] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState('');

    useEffect(() => {
        async function fetchQuestion() {
            await fetch(`${process.env.REACT_APP_SERVER_NAME}/question${location.search}`)
                .then(response => response.json())
                .then(response => {
                    setQestion(response);
                })
        }
        fetchQuestion();
    }, [])

    useEffect(() => {

    }, [question])
    if (question != undefined) {
        return (
            <>
                <div className="info">
                    <div className="name">{question.title}</div>
                    <div className="description">
                        {question.description}
                    </div>
                    {
                        question.files.map(el =>
                            <img src={`data:image/png;base64,${el}`} onClick={(e) => {
                                setSelectedPhoto(`data:image/png;base64,${el}`)
                            }} className="photoQuestion" />)
                    }
                    <div className="user_name">{question.user.name}</div>
                    <Comments comments={question.comments} />
                </div>

                {
                    selectedPhoto != '' ?
                        <ImageOpen photo={selectedPhoto} selectedPhoto={setSelectedPhoto} />
                        :
                        null
                }

            </>
        );
    }
    else {
        return (<div style={{ width: '40%', textAlign: 'center', fontSize: '18px', marginLeft: 'auto', marginRight: 'auto' }}>Wait...</div>);
    }

}
export default Question;