import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <main className="App">
        <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path="/profile/edit" exact>
                <EditProfile />
              </Route>
              <Route path="/profile/:userID">
                <Profile />
              </Route>
            </Switch>
          </div>          
        </main>
      </Router>
    </Provider>
  );
}

export default App;
