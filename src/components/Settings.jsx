import { useState } from 'react';
import { connect } from 'react-redux';
import '../css/settings.css';
import PasswordChange from './settings/PasswordChange';
function Settings(props) {
    const [isPasswordChange, setPasswordIsChange] = useState(false)
    return (
        <div className="modal">
            <div className="modal-content">
                <div onClick={() => setPasswordIsChange(!isPasswordChange)}>{props.language.changePassword}</div>
                {
                    isPasswordChange ?
                        <PasswordChange /> : null
                }
            </div>
            <div className="modal-environment" onClick={() => props.setModalOpen(false)}>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}
export default connect(mapStateToProps)(Settings);