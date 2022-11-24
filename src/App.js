import './App.css';
import React, { useState } from 'react'
import HeadBar from './components/HeadBar';
import LeftBar from './components/LeftBar';
import MainContent from './components/MainContent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutUs from './components/AboutUs';
import FooterBar from './components/FooterBar';
import Recomendations from './components/Recomendations';
import Question from './components/Question';
import { signedIn, signUp } from "./redux/actions/actions";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AskQuestion from './components/AskQuestion';
import Account from './components/Account';

function App(props) {


  return (

    <Router>
      <HeadBar />
      <LeftBar />
      <Routes>
        <Route path='/' element={
          <MainContent />
        } />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/question' element={<Question />} />
        <Route path='/ask' element={<AskQuestion />} />
        <Route path='/account' element={<Account />} />
      </Routes>
      <FooterBar />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}
const mapDispatchToProps = {
  signedIn,
  signUp
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
