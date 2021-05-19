import '../Register/index.scss'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input } from 'antd';
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
    Cookies.set('token', response.data.jwt, { sameSite: 'lax' });
    Cookies.set('id', response.data.user.id, { sameSite: 'lax' });
    Cookies.set('isLoggedIn', true, { sameSite: 'lax' });
    dispatch(logIn(Cookies.get('token'), Cookies.get('id')));
    history.push('/');
  })
  .catch(error => {
    alert(error.response.data.message[0].messages[0].message);
  });
  }
  return (
    <>
      <h1>Sign in with your My Social Network account!</h1>
      <div class="form">
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