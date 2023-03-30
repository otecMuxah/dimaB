import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../common/constants";
import {useAppDispatch} from "../hooks/redux-hooks";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {setUser} from "../store/slices/userSlice";
import Button from "../components/UI/Button";



const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleRegister = (event:any,email: string, password: string) => {
        event.preventDefault()
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                navigate(ROUTES.MAIN)
            })
            .catch(console.log)

    }


    return (
        <div className={'register'}>

            <h2>Register page</h2>
            <form className="register-form" onSubmit={(e)=>handleRegister(e,email,pass)}>
                <label htmlFor="email">email</label>
                <input autoComplete={'off'} value={email} onChange={(e) => setEmail(e.target.value)}
                       type="email" placeholder="email@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input autoComplete={'off'}
                       value={pass}
                       onChange={(e) => setPass(e.target.value)}
                       type="password" placeholder="********" id="password" name="password"/>
                {/*<p>error password</p>*/}
                {/*<input autoComplete={'off'} value={pass}*/}
                {/*       onChange={(e) => setPass(e.target.value)} type="password"*/}
                {/*       placeholder="repeat pass" id="password" name="password"/>*/}
                {/*<p>error password2</p>*/}
                <Button type="submit" title={'register'}></Button>
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
