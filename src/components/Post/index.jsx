import './index.scss';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';

const Post = ({handleDelete, ...props}) => {
  const currentUser = useSelector(state => state.id);
  const userToken = useSelector(state => state.token);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [likes, setLikes] = React.useState(Number(props.like));
  const [likeToggle, setLikeToggle] = React.useState(JSON.parse(window.localStorage.getItem(`${props.id}_${currentUser}`)) || false);

  const toggleLikes = () => {
    if (!likeToggle) {
      setLikes(likes + 1);
      axios.put(`http://localhost:1337/posts/${props.id}`,
      {
        like: likes+1,
      },
    {
      headers: {
        Authorization:
          `Bearer ${userToken}`,
      },
        });
    }
    else {
      setLikes(likes - 1);
      axios.put(`http://localhost:1337/posts/${props.id}`,
      {
        like: likes-1,
      },
    {
      headers: {
        Authorization:
          `Bearer ${userToken}`,
      },
        });
    };
    window.localStorage.setItem(`${props.id}_${currentUser}`, !likeToggle);
    setLikeToggle(!likeToggle);
  };

  let url;
  props.userID == currentUser ? url = "/profile" : url = `/profile/${props.userID}`;

  return (
    <div className="post">
      {isLoggedIn && <span>by <Link to={`${url}`}><strong>{props.username}</strong></Link>:</span>}
      <span className="post-text">{props.text}</span>
      <div className="post-likebar">
        {isLoggedIn && <><span>{likes} likes</span><button className="button button-like" onClick={() => toggleLikes()}>{(likeToggle && <HeartFilled />) || <HeartOutlined />}</button></>}
        {(props.userID == currentUser) && <button className="button button-delete" onClick={() => handleDelete(props.id)}><DeleteOutlined /></button>}
      </div>
    </div>
  )
};
export default Post;