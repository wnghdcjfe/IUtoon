import React from 'react';  
import { Query } from 'react-apollo'  
const line = data => data.split('\n').map( line => (<span>{line}<br/></span>)); 
import { 
  useParams
} from "react-router-dom";
const SongPage = () => { 
  let { songname } = useParams();
  return (
      <>  
      <Query query = {GET_ALBUM_SONG_NAME} variables = {{songname}}>
        {({loading, data}) => loading ?
            <p>loading...</p> :
            (
              <>
                <iframe width="100%" height="345" src={data.url}></iframe> 
                <h1>{data.name}</h1>
                <p>{data.date}</p>
                <p>{data.albumInfo}</p>
                <p>조회수 : {data.seeCount}</p>
                <p><span>#아름다운</span></p>
                <p>
                  {line(data.lylics)}
                </p>
              </>
            ) 
        } 
      </Query>   
      </> 
  );
};

export default SongPage;
