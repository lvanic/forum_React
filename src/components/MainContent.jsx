import { Link, useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import { setPage, signedIn, signUp } from '../redux/actions/actions';
import { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import "../css/main.css"

function MainContent(props) {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestion() {
      await fetch('https://localhost:3001/questions?page=' + props.page + '&filter=' + props.topic)//TODO: ${} not working
        .then(response => response.json())
        .then(response => {
          setThemes(response.questions);
          setPages(response.countPages);
        })
    }

    fetchQuestion();
  }, [props.topic, props.page])

  const changePageHandler = (index) => {
    props.setPage(index);
  }

  function setActiveIndex(value) {
    props.setIndex(value);
  }
  const [pages, setPages] = useState(0)//Количество страниц
  const [themes, setThemes] = useState([]);//Массив объектов с вопросами на форуме
  return (
    <div className="info">
      <table className='table_info'>
        <tbody>
          <tr className='table_header'>
            <td className='table_title'>
              <p>{props.language.topicks}</p>
            </td>

            <td id="askIdTd">

              <div onClick={() => navigate('/ask')} id="askIdDiv">
                {props.language.ask}
              </div>
            </td>

            <div></div>
          </tr>

          {themes.map((theme, k) => (

            <tr key={k} onClick={() => { navigate('/question?id=' + theme.questionId); setActiveIndex(theme.questionId) }} style={{ cursor: 'pointer' }}>
              <td className='td_question'>

                <strong>{theme.title}</strong>
                <br />
                {theme.description}
                <br />
                <div className='container_user_sect'>
                  <div className="sect">{theme.section}</div>
                  <div className='table_user_name'>{theme.user.name}</div>
                </div>
              </td>
            </tr>


          ))
          }
        </tbody>

      </table>
      <Pagination activePage={props.page}
      itemsCountPerPage={1}
      totalItemsCount={pages}
      pageRangeDisplayed={5}
      onChange={changePageHandler}
      itemClass='page-item'
      linkClass='page-link'
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    topic: state.activeTopic,
    page: state.page,
  }
};
const mapDispatchToProps = {
  setPage,
  signedIn,
  signUp
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);