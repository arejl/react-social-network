import axios from 'axios';
import { useSelector } from 'react-redux';
import React from 'react';

const Profile = () => {
  const userToken = useSelector(state => state.token);
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    axios.get(
      'http://localhost:1337/users/me',
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      }
    )
      .then(response => { setUserInfo(response.data); console.log('1') });
  }, [userToken]);  
  return (
    <>
      <div>Your username: {userInfo.username}</div>
      <div>Your email: {userInfo.email}</div>
      <div>Your description: {userInfo.description}</div>
      <button>Update my information</button>
    </>
  )
};

export default Profile;


