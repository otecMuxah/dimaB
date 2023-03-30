import React from 'react';
import {ROUTES} from "../common/constants";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth";
import {removeUser} from "../store/slices/userSlice";
import {useAppDispatch} from "../hooks/redux-hooks";
import Button from "../components/UI/Button";


const MainPage = () => {
    const dispatch=useAppDispatch()
    const {isAuth,email}=useAuth()


    return isAuth ?(
        <div className='main'>
           <h1>Welcome to you personal page</h1>
            <span>{email}</span>
            <Button
            onClick={()=>dispatch(removeUser())}
            title={`logout from ${email}`}
            ></Button>
        </div>
    ):(

        <Navigate to={ROUTES.HOME}></Navigate>


    )
};

export default MainPage;
