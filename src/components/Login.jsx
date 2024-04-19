import { useState, useEffect } from 'react';
import { loginApi } from '../Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/');
    //     }
    // }, []);
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required');
            return;
        }
        setLoadingAPI(true);

        let res = await loginApi(email.trim(), password);
        console.log(res);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/');
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or username (eve.holt@reqres.in)</div>
                <input
                    type="text"
                    placeholder="email or username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-2">
                    {' '}
                    <input
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>

                <button
                    onClick={() => handleLogin()}
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true}
                >
                    {loadingAPI && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                    &nbsp;LOGIN
                </button>

                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>
                    <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
                </div>
            </div>
        </>
    );
};

export default Login;
