import React, {useEffect, useState} from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { GET_POPULAR_SONG } from '../graphql'   
import { Query} from 'react-apollo'   
// import {useQuery } from '@apollo/client';

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
  background-position: 50% ${props => {
    return '50%;' // 스크롤 아래로 내렸을 시 버버벅 거립니다. 
    return (50 + props.scrollH / 100).toFixed(4) + '%;'
  }}
  background-repeat: no-repeat; 
  transform: translateZ(0); 
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
  const [scroll, setScroll] = useState(window.pageYOffset); 
  const handleScroll = () => { 
    setScroll(window.pageYOffset);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []); 
  return (
      <>
        <TopsongHeader><span>노래 TOP</span>유투브 조회수 기준</TopsongHeader>  
        <Query query = {GET_POPULAR_SONG}>
          {({loading, data}) => {  
            return loading ?<p>로딩중입니다... </p> :
              (
                <>
                {
                  data && data.popularSong.map((e, idx) => (  
                  <Link to={`/song/${e.title}`} key={idx}>   
                    <TopSong back={e.img} scrollH={scroll}>
                        <span>{idx + 1} 순위 {e.seeCount}회</span> 
                        <img src={e.thumbImg} alt={e.title}></img>  
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
