import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';
import TopPage from './pages/TopPage';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage'; 
const App = () =>{
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">TOP</Link>
            </li>
            <li>
              <Link to="/album">앨범</Link>
            </li> 
          </ul>
        </nav> 
        <Switch>
          <Route path="/" exact>
            <TopPage />
          </Route>
          <Route path="/@:songname">
            <SongPage />
          </Route>
          <Route path="/album">
            <AlbumPage />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}  
export default App; 