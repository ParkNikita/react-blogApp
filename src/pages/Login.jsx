import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';


const Login = () => {
    const {setIsAuth} = useContext(AuthContext)

    const login = function (event) {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='username'/>
                <MyInput type='password' placeholder='password'/>
                <MyButton>Log in</MyButton>
                
            </form>
        </div>
    );
};

export default Login;