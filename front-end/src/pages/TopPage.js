import React from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import {GET_POPULAR_SONG} from '../App'
import { Query } from 'react-apollo'  
const TopSong = styled.div`
  span{ 
    z-index: 2;
    position: absolute;
    font-size: .7rem;
    top: -7px;
    left: -10px;
    padding: 1px 4px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }
  p{
    position: relative;
    top: -36px;
  }
  position:relative;
  img{ 
    height:120px;
    bottom: 20px; 
    z-index:2; 
    left : 93px; 
    position: relative; 
  } 
  background-image: url(${props => { 
    return (props.back)
  }});  
  height: 100px;  
  text-align: center; 
  margin: 0 auto;
  margin-bottom: 57px; 
  background-size: 380px 700px; 
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat; 
  width: 93%; 
`  
const TopsongHeader = styled.p`
  color: #aaa; 
  span{
    font-weight: bold; 
    color: black; 
    margin-right: 10px;
  }
  padding:10px;
  position:relative;
  &::after{
    content: ''; 
    display: block; 
    width: 35%; 
    height: 5px;
    position: absolute; 
    height: 2px; 
    top: 18px;
    color: red;
    background: #aaa;
    right: 0px;
  }
`


const TopPage = () => { 
  return (
      <>
        <TopsongHeader><span>노래 TOP</span>유투브 조회수 기준</TopsongHeader>  
        <Query query = {GET_POPULAR_SONG}>
          {({loading, data}) => {  
            return loading ?
              <p>loading...</p> :
              (
                <>
                {
                  data && data.popularSong.map((e, idx) => (  
                  <Link to={`/song/${e.title}`} key={idx}>   
                    <TopSong back={e.img}>
                        <span>{idx + 1} 순위 {e.seeCount}회</span> 
                        <img src={e.thumbImg}></img>  
                        <p>{e.title}</p> 
                    </TopSong>  
                  </Link>
                  ))
                }
                </>
              ) 
          }} 
        </Query>   
      </> 
  );
};

export default TopPage;
