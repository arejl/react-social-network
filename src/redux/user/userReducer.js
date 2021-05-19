
import Cookies from 'js-cookie';
import { LOGIN, LOGOUT } from './userTypes';

const initialState = {
  token: Cookies.get('token') || null,
  id: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.userToken,
        id: action.userID
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        id: null
      };
    default:
      return state;
  }
}

export default userReducer;
