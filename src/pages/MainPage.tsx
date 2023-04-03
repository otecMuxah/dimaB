import React from 'react';
import {ROUTES} from "../common/constants";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth";
import {removeUser} from "../store/slices/userSlice";
import {useAppDispatch} from "../hooks/redux-hooks";
import Button from "../components/UI/Button";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";


const MainPage = ():JSX.Element => {
    const dispatch:ThunkDispatch<{user: {email: null|string, token: null|string, id: null|number}}, undefined, AnyAction> = useAppDispatch();
    const {isAuth, email}:{isAuth:boolean,email:string|null} = useAuth();


    return isAuth ? (
        <div className='main'>
            <h1>Welcome to you personal page</h1>
            <span>{email}</span>
            <Button
                title={`logout from ${email}`}
                onclick={() => dispatch(removeUser())}
            ></Button>
        </div>
    ) : (
        <Navigate to={ROUTES.HOME}></Navigate>
    )
};

export default MainPage;
