import { Form, Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/user/userActions';

const Register = () => {
  const dispatch = useDispatch();
  const handleSubmit = (fieldsValue) => {
    const collectedValues = {username: fieldsValue['username'], email: fieldsValue['email'], password: fieldsValue['password']}
    axios.post('http://localhost:1337/auth/local/register', {
    username: `${collectedValues.username}`,
    email: `${collectedValues.email}`,
    password: `${collectedValues.password}`
  })
  .then(response => {
    console.log('Connected');
    console.log('User profile', response.data.user);
    Cookies.set('token', response.data.jwt, { sameSite: 'lax' });
    dispatch(logIn(Cookies.get('token'), response.data.user.id));
  })
      .catch(error => {
    console.log('An error occurred:', error.response.data);
  });
  }
  return (
    <>
      <h1>Sign up for My Social Network!</h1>
      <div style={{width:'50%', margin:'auto auto'}}>
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
            Sign in
          </button>
        </Form>
      </div>      
    </>
  )  
};

export default Register;