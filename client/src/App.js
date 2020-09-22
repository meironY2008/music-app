import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';
import Playlists from './components/Playlists';
import ArtistPage from './components/ArtistPage';
import SongPage from './components/SongPage';
import AlbumPage from './components/AlbumPage';
import PlaylistPage from './components/PlaylistPage';
import Home from './components/Home';
import Error from './components/Error';
import FadeMenu from './components/Menu';


function App() {

  return (
    <Router>
      <FadeMenu />
      <div className="container">
        <div id="page">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/songs" component={Songs} exact />
            <Route path="/albums" component={Albums} exact />
            <Route path="/artists" component={Artists} exact />
            <Route path="/playlists" component={Playlists} exact />
            <Route path="/artists/:id" component={ArtistPage} />
            <Route path="/albums/:id" component={AlbumPage} />
            <Route path="/playlists/:id" component={PlaylistPage} />
            <Route path="/songs/:id" component={SongPage} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;