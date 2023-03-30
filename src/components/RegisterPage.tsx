import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Button from "./UI/Button";
import {useDispatch} from "react-redux";
import {createUser} from "../store/user/userSlice";
import {ROUTES} from "../common/constants";


const RegisterPage = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [login, setLogin] = useState('');


    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    });


    // @ts-ignore
    const handleChange=({target:{value,name}})=>{
        setValues({...values,[name]:value})
    }

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        const isNotEmpty=Object.values(values).every((val)=>val);

        if(!isNotEmpty) return;

        // @ts-ignore
        dispatch(createUser(values))
        navigate('/')

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
                <input autoComplete={'off'}
                       value={pass}
                       onChange={(e) => setPass(e.target.value)}
                       type="password" placeholder="********" id="password" name="password" />
                <p>error password</p>
                <input autoComplete={'off'} value={pass}
                       onChange={(e) => setPass(e.target.value)} type="password"
                       placeholder="repeat pass" id="password" name="password" />
                <p>error password2</p>

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
