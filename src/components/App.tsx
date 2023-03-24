import React from 'react';
import '../scss/App.scss';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import RegisterPage from "./RegisterPage";

function App() {
  return (
      <div className={'app'}>

          <Routes>
                <Route path={'/'} element={<Home/>}></Route>
                <Route path={'/login'} element={<LoginPage/>}></Route>
                <Route path={'/register'} element={<RegisterPage/>}></Route>
          </Routes>
          <div className={'app__footer'}>
              <span>DEV</span>
              <a target={'_blank'} href="https://github.com/dmaberlin1"> dmaberlin1</a>
          </div>
      </div>
  );
}

export default App;
