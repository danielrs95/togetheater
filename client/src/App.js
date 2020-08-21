import React, {useContext} from 'react';
import { BrowserRouter, Switch , Route} from "react-router-dom";
import './App.css';
import NavbarComponent from './components/Navbar.component.js';
import Dashboard from './components/Dashboard.js';
import {NowPlaying, Trending, Popular, TopRated, Upcoming} from './views/Views.component.js';
import Login from './components/Login.component.js';
import Register from './components/Register.component.js';
import Wishlist from './components/Wishlist.component.js';
import Footer from './components/Footer.component.js';
import Auth from './context/store/Auth'

function App() {
  return (
    <Auth>
      <BrowserRouter>
        <NavbarComponent />
        <br/>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/Trending" exact component={Trending} />
          <Route path="/NowPlaying" exact component={NowPlaying} />
          <Route path="/Popular" exact component={Popular} />
          <Route path="/TopRated" exact component={TopRated} />
          <Route path="/Upcoming" exact component={Upcoming} />
          <Route path="/Wishlist" exact component={Wishlist} />
          <Route path="/Login"  component={Login} />
          <Route path="/Register"  component={Register} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </Auth>
    );
}

export default App;
