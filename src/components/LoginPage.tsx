import React, {useState} from 'react';
// import database from '../common/mockdata'
import {Link} from "react-router-dom";
import Button from "./UI/Button";


const errors = {
    uname: "invalid username",
    pass: "invalid password"
};
const LoginPage = (props:any) => {


    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit=(event:any)=>{
        event.preventDefault()
        console.log('login')
        alert( {login}+' you are login')
    }

    return (
        <div className={'login'}>
            <h2>Login page</h2>

            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="login">login</label>
                <input value={login} onChange={(e) => setLogin(e.target.value)}
                       type="text" placeholder="login" id="login" name="login" autoComplete={'off'}/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                       placeholder="********" id="password"
                       autoComplete={'off'}
                       name="password" />
                <Button className="login__button"  type="submit" title={'login'}></Button>
            </form>
            <div>
            <p>Don't have an account? </p>
            <Link to="/register" ><span> Register here</span></Link>
            </div>
        </div>
    );
};

export default LoginPage;
