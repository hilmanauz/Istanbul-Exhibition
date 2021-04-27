import './App.css';
import React from 'react'
import Navbar from './components/navbar'
import Home from './views/Home'
import Detail from './views/detail'
import Favourite from './views/Favourite'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App () {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/favourite">
            <Favourite />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
