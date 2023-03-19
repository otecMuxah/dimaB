import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''}></Route>
                <Route path={'product/:id'} element={<FullProduct/>}></Route>
                <Route></Route>
                {/*добавить в список желаний переход сразу на нужную вкладку*/}
            </Route>
          </Routes>
    </div>
  );
}

export default App;
