import React from 'react';
import axios from 'axios';
import Post from '../../components/Post'

const Home = () => {
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    axios
  .get('http://localhost:1337/posts/')
  .then(response => {
    setPostList(response.data);
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
  }, []);
  
  return (
    <>
      <h1>Welcome to <strong>My Social Network</strong></h1>
      <p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      
      <h3>What's going on</h3>
      {postList.map(element => <Post key={element.id} text={element.text} username={element.user.username} />)}
    </>
  )  
};
export default Home;