import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const MainLayout:FC = () => {
    return (
        <div className={'wrapper wrapper-main'}>
                <Header></Header>
            <div className="content">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;
