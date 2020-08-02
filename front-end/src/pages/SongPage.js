import React from 'react';  
import { Query } from 'react-apollo'   
import { GET_SONG_BY_NAME } from '../App'  
import {  
  Link } from 'react-router-dom'; 
import { 
  useParams
} from "react-router-dom";

const line = data => data.split('\n').map( line => (<span className="lylic">{line}<br/></span>));  
 
const setTag = data => data.map(e => (<span className="montrait tagWrap"><Link to={`/tag/${e}`}>#{e}</Link> </span>))
const SongPage = () => { 
  let { songname } = useParams(); 
  console.log(songname)
  const obj = {
    "name" : songname
  } 
  return (
      <>  
      <Query query = {GET_SONG_BY_NAME} variables = {obj}>
        {({loading, data}) => {
          if(loading) return <p>loading...</p>
          else if(!data) return <p>찾고자 하는 노래가 없습니다</p>
          else return (
            <>  
              <iframe width="100%" height="345" src={data.song.url}></iframe> 
              <h1 className="montrait center m0">{data.song.title}</h1>
              <p className="montrait center gray">{data.song.date}</p>
              <p className="montrait center">[ {data.song.albumInfo} ]</p>
              <p className="montrait right">조회수 : {data.song.seeCount}회</p>
              <p>{setTag(data.song.tags)}</p>
              <p className="montrait songWrap">
                {data.song.lyrics ? line(data.song.lyrics) : ""}
              </p>
            </> 
          )
        }
      } 
      </Query>   
      </> 
  );
};

export default SongPage;
