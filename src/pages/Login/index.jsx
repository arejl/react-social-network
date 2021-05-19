import { Form, Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/user/userActions';
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (fieldsValue) => {
    const collectedValues = {email: fieldsValue['email'], password: fieldsValue['password']}
    axios.post('http://localhost:1337/auth/local', {
    identifier: `${collectedValues.email}`,
    password: `${collectedValues.password}`,
  })
  .then(response => {
    console.log('User profile', response.data.user);
    Cookies.set('token', response.data.jwt, { sameSite: 'lax' });
    dispatch(logIn(Cookies.get('token'), response.data.user.id));
    history.push('/');
  })
      .catch(error => {
    console.log('An error occurred:', error.response.data);
  });
  }
  return (
    <>
      <h1>Sign in with your My Social Network account!</h1>
      <div style={{width:'50%', margin:'auto auto'}}>
      <Form onFinish={(values) => handleSubmit(values)}>
        <Form.Item name="email" label={<span>Your email</span>}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label={<span>Your password</span>}>
          <Input.Password />
        </Form.Item>
        <button type="submit">
          Sign in
        </button>
      </Form>
      </div>      
    </>
  )  
};

export default Login;