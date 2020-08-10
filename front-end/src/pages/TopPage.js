import React, {useEffect, useState} from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { GET_POPULAR_SONG } from '../graphql'   
import { Query} from 'react-apollo'   
// import {useQuery } from '@apollo/client';

const TopSong = styled.div` 
  overflow:hidden;
  box-sizing:border-box;
  padding:10px;
  span{ 
    z-index: 2;
    position: absolute;
    font-size: .7rem;
    top: 1px;
    left: -10px;
    padding: 1px 4px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
  } 
  position:relative;
  img{ 
    height:120px;
    bottom: 9px; 
    z-index:2; 
    left : 93px; 
    position: relative; 
  }  
  height: 100px;  
  text-align: center; 
  margin: 0 auto; 
  width: 93%;   
`     

const TopSongBg = styled.div`
background-image : url(${props => props.back});
background-repeat: no-repeat;  
position: absolute; 
top:15px; 
left: 0; 
width:100%;
height:300%;
background-size: 380px 700px; 
background-attachment: fixed; 
background-position: bottom; 
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
  //const [scroll, setScroll] = useState(window.pageYOffset);  
  const handleScroll = () => {
    const div = [...document.querySelectorAll('.Topsong_back')] 
    div.forEach(e =>{
      e.style.transform = "translateY(" + Math.min(0, (20 + -window.pageYOffset / 15))+ "%)";
      console.log(e.style.transform)
    })  
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
                  <Link to={`/song/${e.title}` } key={idx}>   
                    <span className="TopSong_span">{idx + 1} 순위 {e.seeCount}회</span> 
                    <TopSong>  
                      <TopSongBg back={e.img} className="Topsong_back"></TopSongBg> 
                      <img src={e.thumbImg} alt={e.title}></img>   
                    </TopSong>  
                    <p className="TopSong_title"><span>{e.title}</span></p>  
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
