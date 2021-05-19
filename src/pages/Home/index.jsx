import './index.scss';
import React from 'react';
import axios from 'axios';
import Post from '../../components/Post';
import PostForm from '../../components/PostForm';
import { useSelector } from 'react-redux';

const Home = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userToken = useSelector(state => state.token);
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    axios
  .get('http://localhost:1337/posts?_sort=created_at:desc')
  .then(response => {
    setPostList(response.data);
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
  }, []);
  const handleNewPost = (newPost) => {
    setPostList([newPost].concat(postList));
  };
  const handleDelete = (postID) => {
    setPostList(postList.filter(post => post.id != postID));
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
      <h1>Welcome to <strong>My Social Network</strong></h1>
      <p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      <br/>
      {isLoggedIn && <PostForm handleNewPost={handleNewPost} />}
      <br/>
      <h2>What's going on</h2>
      <div className="posts-list">
      {postList.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete}/>)}
      </div>      
    </>
  )  
};
export default Home;