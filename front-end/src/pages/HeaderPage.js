import React from 'react'; 
import styled from 'styled-components';

const CropBox = styled.div` 
  width:100%; 
  height: 300px; 
  overflow: hidden;  
  position:absolute; 
  top:0; 
  left: 0; 
  z-index:-999; 
  img{
    position:absolute; 
    height: calc(100% + 60px);
    width: 100%; 
    top:-60px;   
    left: 0;  

  }
`;
const HeaderBox = styled.div`
  height: 284px;
  h1{
    padding-top: 100px; 
    color: white; 
  }
  p{
    color: white; 
  }
`
const textMap = {
  TOP: {
    title : "18.04.23", 
    desc : "그럴 수도 있는 거다. 그런 일도 있는 거다."
  }, 
  song: {
    title : "최고의 음색", 
    desc : "그대가 날아와서 나는 나비가 되었다."
  },
  album: {
    title : "최고의 음색", 
    desc : "그대가 날아와서 나는 나비가 되었다."
  }
};  
const headerPage = ({type, img}) => {  
  const {title,desc} = textMap[type] 
  return (
    <> 
      <CropBox>
        <img src={require(`../img/${img}`)} />
      </CropBox> 
      <HeaderBox>
        <h1>{title}</h1>
        <p>{desc}</p>
      </HeaderBox>  
    </>
  );
};

export default headerPage;
