import React, {FC} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/thunks/auth";

const AuthRootComponent:FC = ():JSX.Element => {

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()


    const handleSubmitForm= (e:any) => {
        e.preventDefault()

        if(location.pathname==='/login'){
            try{
                // @ts-ignore
                await dispatch(loginUser(data))
            }catch (e) {

            }
        }

    }

    return (
        <div>

        </div>
    );
};

export default AuthRootComponent;
