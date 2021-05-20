import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
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
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/profile/edit" exact component={EditProfile} />
              <PrivateRoute path="/profile/:userID" component={Profile} />
            </Switch>
          </div>          
        </main>
      </Router>
    </Provider>
  );
}

export default App;
