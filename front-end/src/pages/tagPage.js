import React from 'react';  
import { Link, useParams } from 'react-router-dom'; 
import styled from 'styled-components'; 
import { Query } from 'react-apollo'
import { GET_SONGS_BY_TAGS } from '../graphql'    

const setTag = (data, nowTag) => data.map(e => {
  if(e === nowTag){
    return (<span className="tagWrap activeTag"><Link to={`/tag/${e}`}>#{e}</Link> </span>)
  }else return (<span className="tagWrap"><Link to={`/tag/${e}`}>#{e}</Link> </span>) 
})

const Header = styled.header`
 h1{
  text-align: center;
  padding:10px;
  border: .7px solid #4695fa; 
  border-radius : 5px;
  font-size: 1.5rem; 
 } 
 img{
   width: 100%; 
 } 
`
const Content = styled.div`
  margin-top:10px;
  h1{ 
    margin-bottom:0px;
    font-size: 1.4rem;
  } 
  p{
    margin-top:0px;
  } 
  padding:10px;
  background: #fff;
  border-radius: 2px;    
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1); 
  &:hover{ 
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

`
const TagPage = () => {
  let { tag } = useParams();  
  const obj = {
    "tags" : [tag]
  }
  return ( 
    <div>     
      <Header>
        <h1>TAG : #{tag}</h1>
        <img src={require(`../img/tagheader.jpg`)} alt="태그해더"/>
      </Header>    
      <Query query = {GET_SONGS_BY_TAGS} variables = {obj}>
        {({loading, data}) =>  loading ?
            <p>loading...</p> : 
            data.songbyTag.map((song, idx) =>( 
              <Link to={`/song/${song.title}`} key={idx}>  
                <Content>
                    <h1>{song.title}</h1>  
                    <p>[{song.albumInfo}]</p>  
                    <p>{setTag(song.tags, tag)}</p>  
                </Content> 
              </Link> 
          ))
        } 
      </Query>  
    </div>  
  );
};

export default TagPage;
