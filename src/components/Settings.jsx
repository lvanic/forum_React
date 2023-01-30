import { useState } from 'react';
import { connect } from 'react-redux';
import '../css/settings.css';
import PasswordChange from './settings/PasswordChange';
function Settings(props) {
    const [isPasswordChange, setPasswordIsChange] = useState(false)
    return (
        <div className="settings-modal">
            <div className="settings-modal-content">
                <div onClick={() => setPasswordIsChange(!isPasswordChange)}>{props.language.changePassword}</div>
                {
                    isPasswordChange ?
                        <PasswordChange setModalOpen={props.setModalOpen} /> : null
                }
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