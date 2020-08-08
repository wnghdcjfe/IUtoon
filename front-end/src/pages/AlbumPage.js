import React from 'react';  
import { Link, useParams } from 'react-router-dom'; 
import styled from 'styled-components'; 
import { Query } from 'react-apollo'
import { GET_ALL_ALBUMLIST, GET_ALBUM_SONG } from '../graphql'  
const SongInfo = styled.div`
  h1, p{
    color:black; 
  }
  h1{
    font-size: 1rem;
    margin: 0;
    padding-top: 10px;
  }
  p{
    margin: 0 auto; 
    font-size: .7rem;
    color: #383535; 
    margin-top:5px;
  }
  time{
    font-size: .6rem;
  }
  border-bottom : 0.6px solid #aaa; 
  position:relative; 
  img{ 
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 2px;
    right: 0;
    border-radius: 10px;
  }
  animation: fadein .5s;
`
const GridContainer = styled.div`  
display: flex;
justify-content: space-between;
a{
  display:block;
  padding:10px;
  color: #aaa; 
}
.main{   
  width: 20%;   
  position: sticky;
  top: 100px;  
  height: 80vh; 
}  
.sidebar{
  position: relative; 
  width: 80%;  
} 
` 
const TopPage = () => {
  let { albumname } = useParams();  
  const obj = {
    "name" : albumname
  }
  return (
    <GridContainer> 
    <div className="main"> 
      <Query query={GET_ALL_ALBUMLIST}>
        {({loading, data}) => 
        { 
          return loading ?
            <p>loading...</p> : 
            data.allAlbumList.map((album, idx) =>(
              <Link className="album" to={`/album/${album.name}`} key={idx} alt={album.desc}> 
                {album.name} 
              </Link> 
          ))
        }} 
      </Query> 
    </div>
    <div className="sidebar">    
      <Query query = {GET_ALBUM_SONG} variables = {obj}>
        {({loading, data}) =>  loading ?
            <p>loading...</p> : 
            data.allAlbumSongList.map((song, idx) =>(
              <Link className="song" to={`/song/${song.name}`} key={idx}> 
                <SongInfo>
                  <h1>{song.name}</h1> 
                  <p>{song.album.name}</p> 
                  <time>{song.date}</time> 
                  <img src = {song.img} alt={song.name}></img> 
                </SongInfo> 
              </Link> 
          ))
        } 
      </Query>  
    </div> 
    </GridContainer>  
  );
};

export default TopPage;
