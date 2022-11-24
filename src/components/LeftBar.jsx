import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setTopic, setPage } from "../redux/actions/actions";
import "../css/leftbar.css";
import { useState } from "react";
import { useEffect } from "react";

function LeftBar(props) {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/');
  }
  const filterTopicks = (topic) => {
    props.setTopic(topic);
    props.setPage(1);
  }
  return (
    <div className="questions">
      <p className="razd">{props.language.sections}</p>
      <div className="smth" onClick={() => { filterTopicks('Programming'); navigateTo() }}>{props.language.programming}</div>
      <div className="smth" onClick={() => { filterTopicks('Other'); navigateTo() }}>{props.language.other}</div>
      <div className="smth" onClick={() => { filterTopicks('Cooking'); navigateTo() }}>{props.language.cooking}</div>
      <div className="smth" onClick={() => { filterTopicks('DIY'); navigateTo() }}>{props.language.diy}</div>
      <div className="smth" onClick={() => { filterTopicks('LifeHacks'); navigateTo() }}>{props.language.lifehacks}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}
const mapDispatchToProps = {
  setTopic,
  setPage
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);