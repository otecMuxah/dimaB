import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/UI/Button";
import {ROUTES} from "../common/constants";
import {useAppDispatch} from "../hooks/redux-hooks";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../store/slices/userSlice";



const LoginPage = () => {
    const dispatch=useAppDispatch()
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin=(event:any,email:string,password:string)=>{
        event.preventDefault()
        const auth=getAuth()
        signInWithEmailAndPassword(auth,email,password)
            .then(({user})=>{
            console.log(user);
            dispatch(setUser({
                email:user.email,
                id:user.uid,
                token:user.refreshToken
            }))
            navigate(ROUTES.MAIN)
        })
            .catch(()=>alert('Invalid user!'))

    }



    return (
        <div className={'login'}>


            <h2>Login page</h2>
            <form className="login__form"
                  onSubmit={(event)=>handleLogin(event,email,pass)
            }>
                <label htmlFor="login">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                       type="email" placeholder="email" id="email" name="email" autoComplete={'off'}/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                       placeholder="********" id="password"
                       autoComplete={'off'}
                       name="password" />
                <Button  type="submit" title={'login'}></Button>
            </form>
            <div>
            <p>Don't have an account? </p>
            <Link to={ROUTES.REGISTER} ><span> Register here</span></Link>
            </div>
        </div>
    );
};

export default LoginPage;
