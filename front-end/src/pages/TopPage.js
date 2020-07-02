import React, {useEffect} from 'react'; 
import styled from 'styled-components';
import {GET_POPULAR_SONG} from '../App'
import { Query } from 'react-apollo' 


const songList = [
  {
    "name" : "밤편지", 
    "seecount" : 123,  
    "thumbImg" : "test_1.png", 
    "backImg" : "7.jpg"
  }, {
    "name" : "밤편지", 
    "seecount" : 123,  
    "thumbImg" : "test_1.png", 
    "backImg" : "1.gif"
  },{
    "name" : "밤편지", 
    "seecount" : 123,  
    "thumbImg" : "test_1.png", 
    "backImg" : "7.jpg"
  },{
    "name" : "밤편지", 
    "seecount" : 123,  
    "thumbImg" : "test_1.png", 
    "backImg" : "7.jpg"
  },
]
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
    position: relative; 
  } 
  background-image: url(${props => { 
    return (props.back)
  }});  
  height: 100px;  
  text-align: center; 
  margin: 0 auto;
  margin-bottom: 57px; 
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
    width: 50%; 
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
  useEffect(() =>{

  }, [])
  return (
      <>
        <TopsongHeader><span>노래 TOP</span>멘마의 마음 기준</TopsongHeader>  
        <Query query = {GET_POPULAR_SONG}>
          {({loading, data}) => {
            console.log(data)
            return loading ?
              <p>loading...</p> :
              (
                <>
                {
                  data.popularSong.map((e, idx) => (
                    <TopSong key={idx} back={e.img}>
                        <span>{idx} 순위 {e.seeCount}</span> 
                        {/* <img src={require(`../img/${e.thumbImg}`)}></img>  */}
                        <img src={require(`../img/test_1.png`)}></img> 
                        <p>{e.name}</p> 
                    </TopSong> 
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
