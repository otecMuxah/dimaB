import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Button from "./UI/Button";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [login, setLogin] = useState('');

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        console.log(login)
    }


    return (
        <div className={'register'}>
            <h2>Sign in</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={login} name="login"
                       autoComplete={'off'}
                       onChange={(e) => setLogin(e.target.value)} id="name" placeholder="login" />
                <label htmlFor="email">email</label>
                <input autoComplete={'off'} value={email} onChange={(e) => setEmail(e.target.value)}
                       type="email" placeholder="email@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input autoComplete={'off'} value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <input autoComplete={'off'} value={pass}
                       onChange={(e) => setPass(e.target.value)} type="password"
                       placeholder="repeat pass" id="password" name="password" />
                <Button type="submit" title={'register'}></Button>
            </form>
            <div>
                <p>Already have an account?</p>
            <Link className="register__link" to={'/login'}>
               <span> Login here</span>
            </Link>
            </div>

        </div>
    );
};

export default RegisterPage;
