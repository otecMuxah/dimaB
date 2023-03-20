import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {LOGIN_URL} from "../../../common/const/constants";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";


const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const userRef = useRef(null)
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        // @ts-ignore
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd]);


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data))

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;


            //добавить логин через redux toolkit
            // useDispatch()
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (err) {
            // @ts-ignore
            if (!err?.response) {
                setErrMsg('No Server Response')
                // @ts-ignore
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            // @ts-ignore
            errRef.current.focus()
        }
    }


    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br/>
                    <p>
                        <Link to={'/'}>Go to Home</Link>
                    </p>
                </section>) : (
                <section>
                    <p ref={errRef}
                       aria-live={'assertive'}
                       className={errMsg ? 'login__errmsg' : 'login__offscreen'}>{errMsg}</p>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               id={'username'}
                               ref={userRef}
                               autoComplete={'off'}
                               onChange={(e) => setUser(e.target.value)}
                               value={user}
                               required
                        />

                        <label htmlFor="password">Password:</label>
                        <input type="text"
                               id={'password'}
                               onChange={(e) => setPwd(e.target.value)}
                               value={pwd}
                               required
                        />
                        <button>Sign in</button>
                        <p>
                            Need an Account?<br/>
                            <span className={'line'}>
                                <Link to={'/register'}>Sign Up</Link>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default LoginPage;
