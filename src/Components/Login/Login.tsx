import React, { useState,useEffect } from 'react';
import './Login.css'

import { loginUser, signupUser } from '../Store/UserSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../Store/index';
import { useAppDispatch, useAppSelector } from '../Store/react-hooks';


const Login : React.FC=()=> {
    const [account, setAccount] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {  error, user } = useAppSelector((state:RootState) => state.user);
    
    useEffect(() => {
        if (user) {
    
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }
       
    }, [user, error, navigate]);
   

    const handleLogin = (e:any) => {
        e.preventDefault();
        let credentials = { email, password };
        dispatch<any>(loginUser(credentials))
    };

    const handleSignup = (e:any) => {
        e.preventDefault();
        let userData = { name, email, password };
        dispatch<any>(signupUser(userData))
    };

    return (
        <div className='acc' data-testid='login'>
            <ToastContainer />
            <h1>PROJECT SCHEME</h1>
            {account === 'login' ? (
                <div className='login-form'>
                    <div className='frominput'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            required
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='btn-grp'>
                        <button className='login-btn' onClick={handleLogin}>Login</button>
                        <button onClick={() => setAccount('register')} className='register-btn'>Create Account</button>
                    </div>
                </div>
            ) : (
                <div className='register-form'>
                    <div className='frominput'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            required
                            placeholder='Name'
                            data-testid='Name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            required
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='btn-grp'>
                        <button className='register-btn' onClick={handleSignup}>Register</button>
                        <button onClick={() => setAccount('login')} className='login-btn'>Login</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
