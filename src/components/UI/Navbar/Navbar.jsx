import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Log out
            </MyButton>
            <div className="navbar__links">
                <MyButton style={{marginRight:'mediumslateblue'}}><Link style={{color: 'mediumslateblue',textDecoration: 'none'}} to="/about">About</Link></MyButton>
                <MyButton><Link style={{color: 'mediumslateblue',textDecoration: 'none'}} to="/posts">Posts</Link></MyButton>
            </div>
        </div>
    );
}

export default Navbar;