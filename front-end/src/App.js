import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom'; 
import {withApollo} from 'react-apollo';
import TopPage from './pages/TopPage';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage'; 
import Header from './pages/HeaderPage';   
import Search from './pages/SearchPage';   
import TagPage from './pages/TagPage';    
import {HEADER_IMG_LIST, set_img_random} from './utils'

const App = ({client}) =>{  
    return (
      <>
      <Router>  
        <Switch>
          <Route path="/" exact>  
            <Search /> 
            <Header type="TOP" img={set_img_random(HEADER_IMG_LIST)} id="header"/> 
            <nav>
              <ul>
                <li>
                  <Link to="/">TOP</Link>
                </li>
                <li>
                  <Link to="/album/1집">앨범</Link>
                </li> 
              </ul>
            </nav> 
          </Route> 
          <Route path="/album"> 
            <Search />  
            <Header type="album" img={set_img_random(HEADER_IMG_LIST)} id="header"/>  
            <nav className="backBlue">
              <ul>
                <li>
                  <Link to="/">TOP</Link>
                </li>
                <li>
                  <Link to="/album/1집">앨범</Link>
                </li> 
              </ul>
            </nav> 
          </Route>
          <Route path="/song/:songname">
            <Header type="song" img={set_img_random(HEADER_IMG_LIST)} id="header"/> 
          </Route> 
        </Switch>   
        <Switch>
          <Route path="/" exact>
            <TopPage />
          </Route>
          <Route path="/song/:songname">
            <SongPage />
          </Route>
          <Route path="/album/:albumname">
            <AlbumPage />
          </Route>
          <Route path="/tag/:tag">
            <TagPage />
          </Route>
        </Switch> 
    </Router>

    </>
 
    )
}  
export default withApollo(App); 