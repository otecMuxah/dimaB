import React, {useEffect, useState} from 'react';
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useAppDispatch} from "../hooks/redux-hooks";
import Button from "../components/UI/Button";
import {EMAIL_REGEX, PWD_REGEX, ROUTES} from "../common/constants";
import {setUser} from "../store/slices/userSlice";


const LoginPage = ():JSX.Element => {
    const dispatch:ThunkDispatch<{user: {email: null|string, token: null|string, id: null|number}}, undefined, AnyAction> = useAppDispatch()
    let navigate:NavigateFunction = useNavigate();


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    useEffect(() => {
        setErrMsg('')
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email, pass]);


    const handleLogin = (event: any) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                navigate(ROUTES.MAIN)
            }).catch((err) => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        })

    }
    return (
        <div className={'login'}>

            <h2>Login page</h2>
            <p
               className={errMsg ? "login__errmsg" : "login__offscreen"}
               aria-live="assertive">
                {errMsg}
            </p>
            <form className="login__form"
                  onSubmit={(event) => handleLogin(event)
                  }>
                <label htmlFor="email">email</label>
                <input value={email}
                       autoFocus={true}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       type="email" placeholder="email"
                       id="email" name="email"
                       aria-invalid={validEmail ? "false" : "true"}
                       aria-describedby="emailnote"
                       onFocus={() => setEmailFocus(true)}
                       onBlur={() => setEmailFocus(false)}
                       autoComplete={'off'}/>

                <p id="emailnote"
                   className={emailFocus && email && !validEmail
                       ? "register__instructions" : "register__offscreen"}>
                    <span>The e-mail address is incorrect.</span>
                    <span>Make sure there is an @ after the name and remove any extra dots or symbols</span>
                </p>

                <label htmlFor="password">password</label>
                <input value={pass}
                       onChange={(e) => setPass(e.target.value)}
                       type="password"
                       placeholder="********"
                       id="password"
                       autoComplete={'off'}
                       name="password"
                       required/>
                <Button type="submit" title={'login'}></Button>
            </form>
            <div>
                <p>Don't have an account? </p>
                <Link to={ROUTES.REGISTER}><span> Register here</span></Link>
            </div>
        </div>
    );
};

export default LoginPage;
