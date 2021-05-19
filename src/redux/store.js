import { createStore } from 'redux';
import userReducer from './user/userReducer';

let store = createStore(userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => console.log(store.getState()));

export default store;