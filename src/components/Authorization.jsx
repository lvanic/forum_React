import { useState } from "react"
import { connect } from "react-redux";
import { signedIn,  signUp} from "../redux/actions/actions";
import '../css/authorization.css'
function Authorization(props){
    const [isAuthorization, setAuthorization] = useState(true);
    const[login, setLogin] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[styleError, setStyleError] = useState({});
    const[textError, setTextError] = useState('');

    function passwordHandler(e){
        setPassword(e.target.value); 
        if(e.target.value != confirmPassword && !isAuthorization) 
            setTextError('Passwords do not match');
        else
            setTextError(null);
    }

    function confirmPasswordHandler(e){
        setConfirmPassword(e.target.value); 
        if(password != e.target.value && !isAuthorization) 
            setTextError('Passwords do not match');
        else
            setTextError(null);
    }

    async function register(){
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login:login,
                    password:password
             })
            };
            let response;
            if(isAuthorization){
                response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/authorization`, requestOptions);
            }
            else if(!isAuthorization && password == confirmPassword){
                response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/register`, requestOptions);
            }
            
            if(response.status == 200){
                const data = await response.json();
                localStorage.setItem('key', data.access_token)
                props.signUp(data.login)
                props.signedIn(true);
                props.modalOpen(false)
            }
            else{
                setTextError('Error on server please try later');
                setStyleError({border: 'red 2px solid', background:'white'})
            }
        
    }
    return (
    <div className="modal">
        <div className="modal-content">
            Set name
        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
            Set password
        <input type='password' value={password} onChange={(e) => passwordHandler(e)}/>
            {isAuthorization ? <br/> : 'Confirm password'}
            {isAuthorization ? <br/> : <input type='password' value={confirmPassword} onChange={(e) => confirmPasswordHandler(e)}/>}

        <label className="switch">
            <input type="checkbox" checked={isAuthorization} onChange={() => {setAuthorization(!isAuthorization)}}/>
            <span className="slider round"></span>
        </label>
        Registration/Authorization

        <button className="register_button" onClick={() => register()}>{!isAuthorization? props.language.register:props.language.sign}</button>
        <div style={styleError}>{textError}</div>
       
        </div>
        <div onClick={() => props.modalOpen(false)} style={{width:'100%', height:'100%', position:'absolute', zIndex:'-1'}}>

        </div>
    </div>
    )
}
const mapStateToProps = (state) =>{
    return{
        language: state.language
    }
};
const mapDispatchToProps = {
    signedIn,
    signUp
}
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);