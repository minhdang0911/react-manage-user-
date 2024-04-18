import { useState, useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or username</div>
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
                    />
                    <i
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>

                <button className={email && password ? 'active' : ''} disabled={email && password ? false : true}>
                    login
                </button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>Go back
                </div>
            </div>
        </>
    );
};

export default Login;
