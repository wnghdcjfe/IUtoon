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
import Search from './pages/searchPage';   
import { gql } from 'apollo-boost';  
 
export const GET_POPULAR_SONG = gql`
  query{
    popularSong{
      id 
      title
      seeCount
      albumInfo
      img 
    }
  }
`  

export const GET_ALL_ALBUMLIST = gql`
  query {
    allAlbumList{
      name
      desc  
    } 
  }
`   
 
export const GET_ALBUM_SONG = gql` 
  query allAlbumSongList($name : String!){
    allAlbumSongList(name : $name){
      name
      img
      album{
        name
        desc
        img
      }
      date 
    } 
  } 
` 

export const GET_SONG_BY_NAME = gql`
  query song ($name : String!){
    song(name : $name){ 
      title
      url
      seeCount
      lyrics
      album
      date
      id
      albumInfo
      img 
    } 
  }
` 
                
const headerImgList = ["1.gif", "7.jpg"]; 
const set_img = (list) => list[~~(Math.random() * list.length)] 
const App = ({client}) =>{ 
    return (
      <>
      <Router>  
        <Switch>
          <Route path="/" exact>  
            <Search /> 
            <Header type="TOP" img={set_img(headerImgList)}/> 
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
            <Header type="album" img={set_img(headerImgList)}/>  
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
          <Route path="/@:songname">
            <Header type="song" img={set_img(headerImgList)}/> 
          </Route> 
        </Switch>   
        <Switch>
          <Route path="/" exact>
            <TopPage />
          </Route>
          <Route path="/@:songname">
            <SongPage />
          </Route>
          <Route path="/album/:albumname">
            <AlbumPage />
          </Route>
        </Switch> 
    </Router>

    </>
 
    )
}  
export default withApollo(App); 