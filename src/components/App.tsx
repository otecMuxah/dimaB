import React from 'react';
import '../scss/App.scss';
import {Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import {ROUTES} from "../common/constants";
import MainPage from "../pages/MainPage";

function App() {
    // @ts-ignore

    return (
        <div className={'app'}>

            <Routes>
                <Route path={ROUTES.MAIN} element={<MainPage/>}></Route>
                <Route path={ROUTES.HOME} element={<HomePage/>}></Route>
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
