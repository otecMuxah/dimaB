import React, {useEffect, useState} from 'react';
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTES} from "../common/constants";
import {useAppDispatch} from "../hooks/redux-hooks";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {setUser} from "../store/slices/userSlice";
import Button from "../components/UI/Button";
import {EMAIL_REGEX} from "../common/constants";
import {PWD_REGEX} from "../common/constants";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";


const RegisterPage = ():JSX.Element => {
    const navigate:NavigateFunction = useNavigate();
    const dispatch:ThunkDispatch<{user: {email: null|string, token: null|string, id: null|number}}, undefined, AnyAction> = useAppDispatch();;

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [matchPass, setMatchPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [emailFocus, setEmailFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [validPass, setValidPass] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    useEffect(() => {
        setErrMsg('')
        setValidPass(PWD_REGEX.test(pass))
        setValidEmail(EMAIL_REGEX.test(email))
        setValidMatch(pass === matchPass)

    }, [email,pass, matchPass]);


    const handleRegister = (event: any) => {
        event.preventDefault()

        const verifiedEmail = EMAIL_REGEX.test(email);
        const verifiedPass = PWD_REGEX.test(pass);
        if (!verifiedEmail || !verifiedPass) {
            setErrMsg('Invalid Entry')
            return;
        }

        const auth = getAuth()

        createUserWithEmailAndPassword(auth, email, pass)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                navigate(ROUTES.MAIN)
            })
            .catch((err)=>{
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
            })

    }

    return (
        <div className={'register'}>

            <h2>Register page</h2>
            <p
               className={errMsg ? "register__errmsg" : "register__offscreen"}
               aria-live="assertive">
                {errMsg}
            </p>
            <form className="register-form"
                  onSubmit={(e) => handleRegister(e)}>

                <label htmlFor="email">email</label>
                <input
                    type="email" placeholder="email@gmail.com"
                    autoComplete={'off'}
                    autoFocus={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email" name="email"
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="emailnote"
                   className={emailFocus && email && !validEmail
                       ? "register__instructions" : "register__offscreen"}>
                    <span>The e-mail address is incorrect.</span>
                    <span>Make sure there is an @ after the name and remove any extra dots or symbols</span>
                </p>


                <label htmlFor="password">password</label>
                <input autoComplete={'off'}
                       required
                       onChange={(e) => setPass(e.target.value)}
                       value={pass}
                       aria-invalid={validPass ? "false" : "true"}
                       aria-describedby="passnote"
                       type="password" placeholder="********"
                       id="password"
                       onFocus={() => setPassFocus(true)}
                       onBlur={() => setPassFocus(false)}/>
                <p id="passnote"
                   className={passFocus && !validPass ? "register__instructions" : "register__offscreen"}>
                    <span>8 to 24 characters</span>
                    Must include uppercase and lowercase letters, numbers
                </p>


                <label htmlFor="confirm_password">password</label>
                <input autoComplete={'off'}
                       value={matchPass}
                       onChange={(e) => setMatchPass(e.target.value)}
                       type="password"
                       required
                       placeholder="repeat pass"
                       id="confirm_password" name="confirm_password"
                       aria-invalid={validMatch ? "false" : "true"}
                       aria-describedby="confirmnote"
                       onFocus={() => setMatchFocus(true)}
                       onBlur={() => setMatchFocus(false)}/>
                <p id="confirmnote" className={matchFocus && !validMatch
                    ? "register__instructions" : "register__offscreen"}>
                    Must match the first password input field.
                </p>

                <Button disabled={!validEmail || !validPass || !validMatch ? true : false} type="submit"
                        title={'register'}></Button>
            </form>
            <div>
                <p>Already have an account?</p>
                <Link className="register__link" to={ROUTES.LOGIN}>
                    <span> Login here</span>
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
