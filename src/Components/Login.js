
import { useEffect, useState } from 'react';
import './Login.scss'
import { LoginApi } from '../Services/UserService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

const Login = () => {
    const { loginContext } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/')
    //     }
    // }, [])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }
        setLoadingAPI(true)
        let res = await LoginApi(email, password);
        console.log(res)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/');

        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false)

    }

    const handleGoHome = () => {
        navigate('/')
    }

    return (

        <div className='login-container col-12 col-sm-4' >
            <div className='title'>
                Login
            </div>
            <div className='text'>
                Email or username (eve.holt@reqres.in)
            </div>
            <input
                type='text'
                placeholder='Email or username...'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-2' >
                <input
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Password...'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                >

                </i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingAPI &&
                    <i className="fas fa-sync fa-spin"></i>}Login
            </button>
            <div className='back'>
                <i className="fa-solid fa-arrow-left"></i>
                <span onClick={() => handleGoHome()}>Go Home</span>
            </div>
        </div >

    )
}

export default Login;