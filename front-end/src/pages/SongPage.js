import React from 'react';  
import { Query } from 'react-apollo'   
import { GET_SONG_BY_NAME } from '../App'  
import { 
  useParams
} from "react-router-dom";

const line = data => data.split('\n').map( line => (<span>{line}<br/></span>)); 
const SongPage = () => { 
  let { songname } = useParams();
  
  const obj = {
    "name" : songname
  }
  console.log(songname)
  return (
      <>  
      <Query query = {GET_SONG_BY_NAME} variables = {obj}>
        {({loading, data}) => loading ?
            <p>loading...</p> :
            (
              <>  
                <iframe width="100%" height="345" src={data.song.url}></iframe> 
                <h1>{data.song.title}</h1>
                <p>{data.song.date}</p>
                <p>{data.song.albumInfo}</p>
                <p>조회수 : {data.song.seeCount}회</p>
                <p><span>#아름다운</span></p>
                <p>
                  {data.song.lyrics ? line(data.song.lyrics) : ""}
                </p>
              </>
            ) 
        } 
      </Query>   
      </> 
  );
};

export default SongPage;
