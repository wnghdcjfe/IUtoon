import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';  
import TopPage from './pages/TopPage';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage'; 
import Header from './pages/HeaderPage';   
import styled from 'styled-components'; 

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
top: 0;
left: 0; 
z-index: 3;
width: 100%;
text-align: right;
background: rgba(255, 255, 255, 0.5); 
`
const App = () =>{
    return (
      <>
      <Router> 
        <HeaderSearchBox>
          <Label>
            <input type="text" id="inpt_search" /> 
          </Label>
        </HeaderSearchBox> 
        <Switch>
          <Route path="/" exact> 
            <Header type="TOP" img= "1.gif"/>
          </Route>
          <Route path="/@:songname">
            <Header type="song" img= "7"/> 
          </Route>
          <Route path="/album">
            <Header type="album" img= "7.jpg"/> 
          </Route>
        </Switch>  
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
      <div> 
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

    </>
 
    )
}  
export default App; 