import { useState, useEffect } from "react";
import React from 'react';
import { connect } from "react-redux";
import { setLanguage, signUp, signedIn } from "../redux/actions/actions";
import { language } from "../settings/language";
import { Link, useNavigate } from 'react-router-dom';
import Authorization from "./Authorization";
import '../css/header.css';

function HeadBar(props) {
  const [isDropSearch, setDropSearch] = useState(true);
  const [isDropContacts, setDropContacts] = useState(true);
  const [dropDown, setDropDown] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const onLangHandler = (index) => {
    props.setLanguage(language[index]);
  }
  const searchChange = (e) =>//TODO: request to server
  {
    setSearchText(e.target.value.trim());
    if (e.target.value.trim() != '')
      setSearchText(e.target.value);

    fetchSearch(e.target.value);
    if (e.target.value !== '')
      setDropSearch(false);
    else if (e.target.value == '')
      setDropSearch(true);
  }


  useEffect(() => {
    fetchInit();
  }, [])

  async function fetchSearch(search) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(`${process.env.REACT_APP_SERVER_NAME}/search?search=${search}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        setDropDown([...response])
      })
  }
  async function fetchInit() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('key')
      },
    };
    fetch(`${process.env.REACT_APP_SERVER_NAME}/user`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.name != undefined) {
          props.signUp(response.name);
          props.signedIn(true);
        }
      })
  }

  return (

    <header>
      <div className="background_content" onClick={() => setDropSearch(true)} hidden={isDropSearch}></div>
      <div className="topnav">
        <div className="content_1">
          <a onClick={() => navigate('/')}>{props.language.questions}</a>
          <a className="about_us_contacts" onClick={() => navigate('/about')}>{props.language.about}</a>

          <a className="div_header_contacts" onMouseUp={() => { window.innerWidth < 675 ? setDropContacts(true) : setDropContacts(false) }} onMouseLeave={() => setDropContacts(true)}>
            {props.language.сontacts}
            <div className="header_contacts" hidden={isDropContacts} style={{}}>
              <a style={{ width: '100%', textAlign: 'left' }} href='tel:+375293540613'>+375 29 354 06 13</a>
              <a style={{ width: '100%', textAlign: 'left' }} href="mailto:vlad@htmlbook.ru?subject=Вопрос по HTML">{props.language.mail}</a>
            </div>
          </a>

        </div>

        <div className="content_2">

          <input type="text" placeholder={props.language.search} name="search" onChange={searchChange} onClick={() => setDropSearch(false)} />
          <table className="dropDownSearch" hidden={isDropSearch}>
            {
              dropDown.map((x, k) => (
                <tr id="dropTr" onClick={() => {
                  navigate('/question?id=' + x.questionId)
                  setDropSearch(true)
                }} key={k}>
                  {x.title}
                </tr>
              ))
            }
          </table>

        </div>
        <div className="content_3">
          <a className="language" onClick={() => onLangHandler(0)}>Rus</a>
          <a className="language" onClick={() => onLangHandler(1)}>Eng</a>
          {props.signIn ? <a onClick={() => navigate('/account')}>{props.login}</a> : <a onClick={() => setModalOpen(true)}>{props.language.sign}</a>}

        </div>
      </div>
      {isModalOpen && !props.signIn ? <Authorization modalOpen={setModalOpen} /> : null}
    </header>


  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    signIn: state.signedIn,
    login: state.login
  }
};
const mapDispatchToProps = {
  setLanguage,
  signUp,
  signedIn
}
export default connect(mapStateToProps, mapDispatchToProps)(HeadBar);
