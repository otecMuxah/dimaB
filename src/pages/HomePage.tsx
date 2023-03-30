import React from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../common/constants";

import {useAuth} from "../hooks/use-auth";



const HomePage = () => {
    const name="User"
    const {isAuth,email}=useAuth()

    return (
        <div className='home'>
        <Link draggable={'false'} className="home__link" to={ROUTES.LOGIN}>login</Link>
            <h1>Welcome <span>{email}</span></h1>
        <Link draggable={'false'} className="home__link__register" to={ROUTES.REGISTER}>Register</Link>
        </div>
    )
};

export default HomePage;
