import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {REGISTER_URL} from "../../../common/constants";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;



const RegisterPage = () => {

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //if button enabled with JS hack

        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({user, password: pwd}), {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data))
            setSuccess(true)
            //clear state and controlled inputs
            setUser('')
            setPwd('')
            setMatchPwd('')
        } catch (err) {
            // @ts-ignore
            if (!err?.response) {
                setErrMsg('No Server Response')
            }// @ts-ignore
            else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <>
            {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link draggable={'false'} to={'/'}>Sign in</Link>
                        </p>
                    </section>) :
                (
<div className="register">
    <section>
        <p ref={errRef} aria-live='assertive'
           className={errMsg ? 'register__errmsg' : 'register__offscreen'}>{errMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username:
                <FontAwesomeIcon icon={faCheck}
                                 className={validName
                                     ? 'register__valid' : 'register__hide'}/>
                <FontAwesomeIcon icon={faTimes}
                                 className={validName || !user ? 'register__hide' : 'register__invalid'}/>
            </label>
            <input type="text"
                   id={'username'}
                   ref={userRef}
                   autoComplete={'off'}
                   onChange={(e) => setUser(e.target.value)}
                   value={user}
                   required
                   aria-invalid={validName ? 'false' : 'true'}
                   aria-describedby={'uidnote'}
                   onFocus={() => setUserFocus(true)}
                   onBlur={() => setUserFocus(false)}
            />
            <p id={'uidnote'}
               className={userFocus && user && !validName
                   ? 'register__instructions' : 'register__offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 characters.<br/>
                Must begin with a letter.<br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck}
                                 className={validPwd
                                     ? 'register__valid' : 'register__hide'}/>
                <FontAwesomeIcon icon={faTimes}
                                 className={validPwd || !pwd
                                     ? 'register__hide' : 'register__invalid'}/>
            </label>
            <input type="password"
                   id={'password'}
                   onChange={(e) => setPwd(e.target.value)}
                   value={pwd}
                   required
                   aria-invalid={validPwd?'false':'true'}
                   aria-describedby={'pwdnote'}
                   onFocus={()=>setPwdFocus(true)}
                   onBlur={()=>setPwdFocus(false)}
            />
            <p id={'pwdnote'} className={pwdFocus && !validPwd
                ? 'register__instructions':'register__offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, and number<br/>
            </p>

            <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck}
                                 className={validMatch && matchPwd
                                     ? 'register__valid' : 'register__hide'}/>
                <FontAwesomeIcon icon={faCheck}
                                 className={validMatch || !matchPwd
                                     ? 'register__hide' : 'register__invalid'}/>
            </label>
            <input type="password"
                   id={'confirm_pwd'}
                   onChange={(e)=>setMatchPwd(e.target.value)}
                   value={matchPwd}
                   required
                   aria-invalid={validName?'false':'true'}
                   aria-describedby={'uidnote'}
                   onFocus={()=>setUserFocus(true)}
                   onBlur={()=>setUserFocus(false)}
            />
            <p id={'confirmnote'}
               className={matchFocus && !validMatch
                   ?'register__instructions':'register__offscreen'}
            >Must match the first password input field</p>

            <button>Sign Up</button>
        </form>

        <p>
            Already registered? <br/>
            <span className="line">
                <Link draggable={'false'} to={'/login'}>Sign In</Link>

                            </span>
        </p>
    </section>

</div>                )}
        </>
    );
};

export default RegisterPage;
