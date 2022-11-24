import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

function PasswordChange(props) {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [errorText, setErrorText] = useState('')
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('key')
    },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    };
    useEffect(() => {
        if(newPassword != newPasswordConfirm){
            setErrorText('Password do not match')
        }
        else{
            setErrorText('')
        }
    }, [newPassword, newPasswordConfirm])
    const SendPasswordChange = async () => {
        const response = await fetch('https://localhost:3001/change-password', requestOptions);
    }
    return (
        <div className='passwordChange'>
            <div>{props.language.oldPassword}</div>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <div>{props.language.password}</div>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <div>{props.language.confirmPassword}</div>
            <input type="password" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
            <input className='passwordChangeButton' type="button" onClick={SendPasswordChange} value="Подтвердить" />
            <div>{errorText}</div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}
export default connect(mapStateToProps)(PasswordChange);