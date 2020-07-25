import React from 'react';  
import { Link, useParams } from 'react-router-dom'; 
import styled from 'styled-components'; 
import { Query } from 'react-apollo'
import { GET_SONGS_BY_TAGS } from '../App'   
const TagPage = () => {
  let { tag } = useParams();  
  const obj = {
    "name" : [tag]
  }
  return ( 
    <div>    
      <Query query = {GET_SONGS_BY_TAGS} variables = {obj}>
        {({loading, data}) =>  loading ?
            <p>loading...</p> : 
            data.getSongTags.map((song, idx) =>(
              <Link className="song" to={`/tag/${song.name}`} key={idx}> 
                <SongInfo>
                  <h1>{song.name}</h1> 
                  <p>{song.album.name}</p> 
                  <time>{song.date}</time> 
                  <img src = {song.img}></img> 
                </SongInfo> 
              </Link> 
          ))
        } 
      </Query>  
    </div>  
  );
};

export default TagPage;
