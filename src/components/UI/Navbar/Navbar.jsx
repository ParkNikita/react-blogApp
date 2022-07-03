import React, { useContext } from 'react';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import MyLink from '../link/MyLink';

const Navbar = () => {
  const {setIsAuth} = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
    return (
        <div className='navbar'>
          <MyButton onClick={() => logout()}>
            Log Out
          </MyButton>
        <div className='navbar__links'>
          <MyLink to='/about'>About</MyLink>
          <MyLink to='/posts'>Posts</MyLink>
        </div>
      </div>
    );
};

export default Navbar;