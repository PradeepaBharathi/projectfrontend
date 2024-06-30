import React, { useState } from 'react';
import './Login.css'
import { useDispatch } from 'react-redux';
import { loginUser, signupUser } from '../Store/UserSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [account, setAccount] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const nav = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        let credentials = { email, password };
        dispatch(loginUser(credentials)).then(() => {
            nav('/home'); 
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        let userData = { name, email, password };
        dispatch(signupUser(userData)).then(() => {
            nav('/home'); 
        });
    };

    return (
        <div className='acc'>
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
