import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/UI/Button";
import {EMAIL_REGEX, PWD_REGEX, ROUTES} from "../common/constants";
import {useAppDispatch} from "../hooks/redux-hooks";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../store/slices/userSlice";


const LoginPage = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate();
    const userRef = useRef(null);
    const errRef = useRef(null);



    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    useEffect(() => {
        // @ts-ignore
        userRef.current.focus()
    }, []);


    useEffect(() => {
        setErrMsg('')
    }, [email, pass]);


    const handleLogin = (event: any, email: string, password: string) => {
        event.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
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
            // @ts-ignore
            errRef.current.focus();
        })

    }


    useEffect(() => {
        // @ts-ignore
        userRef.current.focus()
    }, []);


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email]);





    return (
        <div className={'login'}>


            <h2>Login page</h2>
            <p ref={errRef}
               className={errMsg ? "login__errmsg" : "login__offscreen"}
               aria-live="assertive">
                {errMsg}
            </p>
            <form className="login__form"
                  onSubmit={(event) => handleLogin(event, email, pass)
                  }>
                <label htmlFor="login">email</label>
                <input value={email}
                       ref={userRef}
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
