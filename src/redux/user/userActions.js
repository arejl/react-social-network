import { LOGIN, LOGOUT } from './userTypes';

const logIn = (userToken, userID) => {
  return {
    type: LOGIN,
    userToken,
    userID
  };
};

const logOut = () => {
  return {
    type: LOGOUT
  };
};

export { logIn, logOut };
