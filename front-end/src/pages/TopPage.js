import React from 'react'; 

import { Link } from 'react-router-dom'; 
import styled from 'styled-components'; 
const SongInfo = styled.div`
  h1, p{
    color:black; 
  }
  border-bottom : 0.6px solid #aaa; 
  position:relative; 
  img{
    width:100px;
    height:100px;
    position:absolute; 
    bottom:5px; 
    right:0; 
    border-radius : 10px;
  }
  animation: fadein .5s;
`
const topSongList = [
  {
    "name" : "밤편지", 
    "album" : "1집", 
    "date" : "2017. 4. 21.", 
    "albumImg" : 7
  }, {
    "name" : "밤편지", 
    "album" : "1집", 
    "date" : "2017. 4. 21.", 
    "albumImg" : 7
  }, 
]
const TopPage = () => {
  return (
    <>
    {topSongList.map((song, idx) =>(
        <Link className="song" to={`/@${song.name}`} key={idx}> 
          <SongInfo>
            <h1>{song.name}</h1> 
            <p>{song.album} - {song.date}</p> 
            <img src = {require(`../img/${song.albumImg}.jpg`)}></img> 
          </SongInfo> 
        </Link> 
    ))}
    </>  
  );
};

export default TopPage;
