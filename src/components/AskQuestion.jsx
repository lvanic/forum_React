import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AskQuestion(props) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [section, setSection] = useState('Programming')
    const [tag, setTag] = useState('')
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
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
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('section', section);
        formData.append('tag', 'None');
        files.forEach(el => formData.append('FormFile', el))
        //formData.append('FormFile', files[0]);
        const request = await fetch('https://localhost:3001/question', requestOptions(formData))
        const data = await request.json();
        navigate(`/question?id=${data.questionId}`)
    }

    function onSubmitForm(e) {
        sendQuestion();
    }

    return (

        <div style={{ width: '10%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center' }}>
            Title
            <br />
            <input name='title' type='text' style={{ width: '100%' }} value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <br />
            Description
            <br />
            <input name='description' type='text' style={{ width: '100%' }} value={desc} onChange={(e) => setDesc(e.target.value)}></input>
            <br />
            Section
            <br />
            <select onChange={(e) => setSection(e.target.value)} style={{ width: '100%' }}>
                <option value='Programming'>Programming</option>
                <option value='Other'>Other</option>
                <option value='Cooking'>Cooking</option>
                <option value='DIY'>DIY</option>
                <option value='LifeHacks'>LifeHacks</option>
            </select>
            <br />
            <input type='file' multiple onChange={(e) => {
                setFiles([...e.target.files])
                
            }} />
            <input type='submit' style={{ marginTop: '10px' }} onClick={onSubmitForm}></input>
        </div>
    );
}

export default AskQuestion;