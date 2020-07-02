import React, {useEffect} from 'react';
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
import styled from 'styled-components'; 
import { gql } from 'apollo-boost';

const Label = styled.label` 
display: inline-block; 
height: 35px;
width: 35px;
box-sizing: border-box;
margin: 0px 8px 7px 0px;
padding: 7px 9px 0px 9px;
border: 3px solid black;
border-radius: 25px;
transition: all .2s ease;
cursor: text;  
position:relative; 
&:after {
  content: "";
  position: absolute;
  width: 3px;
  height: 15px;
  right: -5px;
  top: 21px;
  background: black;
  border-radius: 3px;
  transform: rotate(-45deg);
  transition: all 200ms ease;
}
&.active, &:hover {
  width: 100%;
  margin-right: 0px;
}
&.active:after, &:hover:after {
  height: 0px;
}
input {
  width: 100%;
  border: none;
  box-sizing: border-box; 
  font-size: 15px;
  color: inherit;
  background: transparent;
  outline-width: 0px;
} 
` 
const HeaderSearchBox = styled.header` 
position: fixed;
padding: 5px; 
box-sizing : border-box; 
left:0;
right:0;
margin-left:auto;
margin-right:auto; 
max-width: 375px;
top: 0; 
z-index: 3;
width: 100%;
text-align: right;
background: rgba(255, 255, 255, 0.5); 
`

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
    useEffect(()=>{

    }, [])
    return (
      <>
      <Router>  
        <Switch>
          <Route path="/" exact>  
            <HeaderSearchBox>
              <Label>
                <input type="text" id="inpt_search" /> 
              </Label>
            </HeaderSearchBox> 
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
            <HeaderSearchBox>
              <Label>
                <input type="text" id="inpt_search" /> 
              </Label>
            </HeaderSearchBox> 
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