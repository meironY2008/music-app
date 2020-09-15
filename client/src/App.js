import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Songs from './components/Songs';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Albums from './components/Albums';
import Artists from './components/Artists';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='container'>
        <NavBar/>
        <div id='page'>
          <Switch className='page'>
            <Route path='/' exact  />
            <Route path='/songs' component={Songs} exact/>
            <Route path='/albums' component={Albums} exact/>
            <Route path='/artists' component={Artists} exact/>
            <Route path='/playlists' exact/>
          </Switch>
        </div> 
      </div>
      
    </BrowserRouter>
  );
}

export default App;