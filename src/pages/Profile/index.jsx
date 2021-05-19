import './index.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import React from 'react';
import Post from '../../components/Post';

const Profile = () => {
  const { userID } = useParams();
  const userToken = useSelector(state => state.token);
  const currentUserID = useSelector(state => state.id);
  const [userInfo, setUserInfo] = React.useState({});
  const [userPosts, setUserPosts] = React.useState([]);
  React.useEffect(() => {
    let userToFind;
    userID && userID != currentUserID ? userToFind = userID : userToFind = "me";
    axios.get(
      `http://localhost:1337/users/${userToFind}`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      }
    )
      .then(response => { setUserInfo(response.data) });
  }, [userID]);

  React.useEffect(() => {
    let userToFind;
    userID ? userToFind = userID : userToFind = currentUserID;
    axios.get(
      `http://localhost:1337/posts?user.id=${userToFind}&_sort=created_at:desc`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      }
    )
      .then(response => { setUserPosts(response.data) });
  }, [userID]);

  const handleDelete = (postID) => {
    setUserPosts(userPosts.filter(post => post.id != postID));
    axios.delete(`http://localhost:1337/posts/${postID}`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      });
  };

  return (
    <>
      {userID ?
        <>
          <h1>{userInfo.username}'s profile</h1>
          <div>{userInfo.username}'s description: {userInfo.description}</div>
          <div>{userInfo.username}'s posts:</div>
          {userPosts.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete} />)}
         </> 
        :
        <>
          <h1>My profile</h1>
          <div className="my-info">
            <div><strong>My username:</strong> {userInfo.username}</div>
            <div><strong>My email:</strong> {userInfo.email}</div>
            <div><strong>My description:</strong> {userInfo.description}</div>
            <Link to={`profile/edit`}><button>Update my information</button></Link> 
          </div>         
          <div><strong>My posts:</strong></div>
          {userPosts.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete} />)}
        </>
      }
    </>
  )
};

export default Profile;


