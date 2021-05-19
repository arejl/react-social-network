import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, TeamOutlined, PoweroffOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/user/userActions';
import Cookies from 'js-cookie';

const Navbar = () => {
  const userToken = useSelector(state => state.token);
  const dispatch = useDispatch();
  let navbarItems;
  (userToken == null) ?
    navbarItems = <>
      <Menu.Item key="register" icon={<UsergroupAddOutlined />}>
        <Link to={`/register`}>Register</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<PoweroffOutlined />}>
        <Link to={`/login`}>Log In</Link>
      </Menu.Item>
    </>
    : navbarItems = <>
    <Menu.Item key="profile" icon={<TeamOutlined />}>
      <Link to={`/profile`}>My Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout" icon={<PoweroffOutlined />}>
        <Link to={`/`} onClick={() => { dispatch(logOut()); Cookies.remove('token'); Cookies.remove('id'); Cookies.remove('isLoggedIn') }}>Log Out</Link>
    </Menu.Item>
    </>;
  return (
    <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to={`/`}>Home</Link>
      </Menu.Item>
      {navbarItems}
    </Menu>
  )
}
export default Navbar;