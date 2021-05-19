import '../Register/index.scss';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import React from 'react';

const EditProfile = () => {
  let history = useHistory();
  const userToken = useSelector(state => state.token);
  const currentUserID = useSelector(state => state.id);
  const handleSubmit = (fieldsValue) => {
    const collectedValues = { username: fieldsValue['username'], description: fieldsValue['description'] }
    if (!collectedValues.username || !collectedValues.description) {
      alert('Please fill in both fields.');
    }
    else {
      axios.put(`http://localhost:1337/users/${currentUserID}`,
        {
          description: collectedValues.description
        },
        {
          headers: {
            Authorization:
              `Bearer ${userToken}`,
          }
        })
        .then(response => console.log(response));
      // history.push('/profile');
    };
  };
  const goBack = () => {
    history.push('/profile');
  };
  return (
    <>
      <h1>Edit my profile information</h1>
      <div className="form">
        <Form onFinish={(values) => handleSubmit(values)}>
          <Form.Item name="username" label={<span>Change my username</span>}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={<span>Change my description</span>}>
            <Input.TextArea />
          </Form.Item>
          <button type="submit">
            Save changes
          </button>
        </Form>
        <button style={{color:'white', margin:'1rem 0', backgroundColor:'grey', width:'53%'}} onClick={goBack}>Go back</button>
      </div>
      
    </>
  );
};

export default EditProfile;