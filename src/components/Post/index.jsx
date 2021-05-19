import React from 'react';

const Post = (props) => {
  const [likes, setLikes] = React.useState(null);
  const [likeToggle, setLikeToggle] = React.useState(false);
  const toggleLikes = () => {
    if (!likeToggle) { setLikes(likes + 1) }
    else { setLikes(likes - 1) };
    setLikeToggle(!likeToggle);
  };
  //Le faire avec une request "put" pour modifier l'api
  return (
    <div>
      <span style={{margin:"10px"}}>by {props.username}: {props.text}</span>
      <span style={{margin:"10px"}}>{likes || 0} likes</span>
      <button onClick={() => toggleLikes()} style={{margin:"10px"}}>{likes || 0}</button>
    </div>
  )
};
export default Post;