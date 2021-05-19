import './index.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logIn } from '../../redux/user/userActions';

const Register = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (fieldsValue) => {
    const collectedValues = {username: fieldsValue['username'], email: fieldsValue['email'], password: fieldsValue['password']}
    axios.post('http://localhost:1337/auth/local/register', {
    username: `${collectedValues.username}`,
    email: `${collectedValues.email}`,
    password: `${collectedValues.password}`
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
      <h1>Sign up for My Social Network!</h1>
      <div className="form">
        <Form onFinish={(values) => handleSubmit(values)}>
          <Form.Item name="username" label={<span>Your username</span>}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label={<span>Your email</span>}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label={<span>Your password</span>}>
            <Input.Password />
          </Form.Item>
          <button type="submit">
            Sign up
          </button>
        </Form>
      </div>      
    </>
  )  
};

export default Register;