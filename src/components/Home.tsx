import React from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../common/constants";

const Home = () => {
    const name="User"

    return (
        <div className='home'>
        <Link draggable={'false'} className="home__link" to={ROUTES.LOGIN}>login</Link>
            <h1>Welcome <span>{name}</span></h1>
        <Link draggable={'false'} className="home__link__register" to={ROUTES.REGISTER}>Register</Link>
        </div>
    );
};

export default Home;
