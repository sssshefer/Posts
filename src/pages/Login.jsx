import React, {useContext} from 'react';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext )
    const login = event =>{
        event.preventDefault();
        setIsAuth (true)
        localStorage.setItem('auth','true');
    }
    return (
        <div>
            <h1 style={{color:'#fff', margin:'15px 0px'}}>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password"/>
                <MyButton style={{margin:'10px 1px'}}>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;