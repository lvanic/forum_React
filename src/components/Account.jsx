import { useState } from "react";
import { signUp, signedIn } from "../redux/actions/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import { useEffect } from "react";
import '../css/account.css'

function Account(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ login: 'none', img: 'none' })
    const [isModalOpen, setModalOpen] = useState(false)
    const [themes, setThemes] = useState([]);
    useEffect(() => {
        async function fetchUserQuestions() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('key')
                }
            };
            const response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/user-questions`, requestOptions)
            const data = await response.json();
            setThemes(data.questions);
            console.log(data.questions)
        }
        fetchUserQuestions();
    }, [])
    return (
        <div className="info" style={{ height: '100vh' }}>
            <img />
            <div></div>
            <div onClick={() => setModalOpen(!isModalOpen)}>Options</div>
            <div onClick={() => {
                localStorage.removeItem('key')
                props.signedIn(false)
                props.signUp('');
                navigate('/')
            }}>EXIT</div>
            {
                isModalOpen ? <Settings setModalOpen={setModalOpen} /> : null
            }
            <div className="userQuestionContiner">
                {
                    themes.map(x => (
                        <div className="userQuestionItem" onClick={() =>navigate('/question?id=' + x.questionId)}>
                            <div className="userQuestionTitle">{x.title}</div>
                            <div className="userQuestionSection">{x.section}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = {
    signUp,
    signedIn
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);