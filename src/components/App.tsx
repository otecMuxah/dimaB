import React from 'react';
import '../scss/App.scss';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import {ROUTES} from "../common/constants";

function App() {
  return (
      <div className={'app'}>

          <Routes>
                <Route  path={ROUTES.HOME} element={<HomePage/>}></Route>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}></Route>
                <Route path={ROUTES.REGISTER} element={<RegisterPage/>}></Route>
          </Routes>
          <div className={'app__footer'}>
              <span>DEV</span>
              <a draggable={'false'} target={'_blank'} href="https://github.com/dmaberlin1"> dmaberlin1</a>
          </div>
      </div>
  );
}

export default App;
