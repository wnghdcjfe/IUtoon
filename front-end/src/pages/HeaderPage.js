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
    padding-left: 10px;
  }
  p{
    color: white;  
    padding: 10px;
    background: rgba(0, 0, 0, 0.7); 
  }
` 

const textMap = {
  TOP: {
    title : "이지은", 
    desc : "채찍질하고 그런건 이제 조금 쉬어도 되겠다, 라는 생각을, “나는 이제 내가 원하는 건 많이 이뤘어.” 란 생각을 스물 다섯에 처음 했어요."
  }, 
  song: {
    title : "하고 싶은 것.", 
    desc : "뭔가 막 최고가 되고 싶거나 그렇진 않아요. 저는 부담 가지면서 살고 싶진 않거든요. 안주하는 삶이 안 좋은 거라곤 하지만 제가 정말 하고싶은 거 하면서 살면 되게 행복할 것 같아요. 저는 제 생각을 담은 노래를 직접 쓰고, 부르고 그렇게 제 소신을 담은 음악을 하고 싶습니다."
  },
  album: {
    title : "하루정도는", 
    desc : "요즘 쓴 가사 중 맘에 쏙 드는 구절이 있어요. “하루 정도는 행복하지 않아도 괜찮아” 라는 노랫말. 어느 순간부터 행복에 집착하며 더 피로해지는 것 같은 생각이 들었거든요. 조바심도 들고요. 그런 맘을 담아 쓴 곡이에요."
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
        <h1 className="nanummyeongjo">{title}</h1>
        <p className="nanummyeongjo">{desc}</p>
      </HeaderBox>  
    </>
  );
};

export default headerPage;
