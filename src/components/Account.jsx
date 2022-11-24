import { useState } from "react";
import { signUp, signedIn } from "../redux/actions/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";

function Account(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ login: 'none', img: 'none' })
    const [isModalOpen, setModalOpen] = useState(false)
    return (
        <div>
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
                isModalOpen ? <Settings setModalOpen={setModalOpen}/> : null
            }
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