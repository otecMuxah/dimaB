import React from 'react';
import './scss/App.scss';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
          <Routes>

                <Route path={'/login'} element={<LoginPage/>}></Route>
                <Route path={'/register'} element={<RegisterPage/>}></Route>

          </Routes>

  );
}

export default App;
