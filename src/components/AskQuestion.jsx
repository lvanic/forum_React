import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/question.css"
function AskQuestion(props) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [section, setSection] = useState('Programming')
    const [tag, setTag] = useState('')
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
    const [messageError, setMessageError] = useState('');
    const requestOptions = (data) => {
        return {
            method: 'POST',
            headers: {
                // 'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            },
            body: data
        }
    };

    async function sendQuestion() {
        if (title == '' || desc == '') {
            setMessageError("Введите все данные")
        }
        else{
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', desc);
            formData.append('section', section);
            formData.append('tag', 'None');
            files.forEach(el => formData.append('FormFile', el))
            //formData.append('FormFile', files[0]);
            const request = await fetch(`${process.env.REACT_APP_SERVER_NAME}/question`, requestOptions(formData))
            const data = await request.json();
            navigate(`/question?id=${data.questionId}`)
        }
    }

    function onSubmitForm(e) {
        sendQuestion();
    }

    return (

        <div className='title_name'>
            <strong className='strong'>Задайте свой вопрос</strong>
            Title
            <br />
            <input name='title' type='text' className='title' placeholder='  Напишите что-нибудь...' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <br />
            Description
            <br />
            <input name='description' type='text' className='forma' placeholder='  Напишите что-нибудь...' value={desc} onChange={(e) => setDesc(e.target.value)}></input>
            <br />
            Section
            <br />
            <select onChange={(e) => setSection(e.target.value)} className='title'>
                <option value='Programming'>Programming</option>
                <option value='Other'>Other</option>
                <option value='Cooking'>Cooking</option>
                <option value='DIY'>DIY</option>
                <option value='LifeHacks'>LifeHacks</option>
            </select>
            <br />
            <input type='file' className='files' multiple onChange={(e) => {
                setFiles([...e.target.files])

            }} />
            <input type='submit' className='submit' onClick={onSubmitForm}></input>
            {
                messageError != '' ? 
                <div style={{color:'red'}}>
                    {messageError}
                </div> 
                : 
                null
            }
        </div>
    );
}

export default AskQuestion;