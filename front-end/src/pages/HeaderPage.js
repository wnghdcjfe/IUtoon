import React, {useEffect} from 'react'; 
import styled from 'styled-components';
import {TEXTMAP} from '../utils'
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
    padding-left: 10px;font-family:"Nanum Myeongjo";
  }
  p{
    color: white;  
    padding: 10px;
    background: rgba(0, 0, 0, 0.7); font-family:"Nanum Myeongjo";
    font-size: 1.2rem;
  }
`   
 
const HeaderPage = ({type, img}) => {  
  const {title,desc} = TEXTMAP[type]  
  useEffect(()=>{   
    let div = document.querySelector("section").offsetTop + 250; 
    const f = () =>{
      if (window.pageYOffset > 0) {  
        const opac = window.pageYOffset / div; 
        document.querySelector("section").style.background = "rgba(255, 255, 255, " + opac + ")"; 
        const opac2 = Math.min(0.7, 1 - window.pageYOffset / div) 
        document.querySelector("section div p").style.background = "rgba(0, 0, 0, " + opac2 + ")";
      }
    } 
    window.addEventListener("scroll", f); 
    return () => {
      window.removeEventListener("scroll", f);
    }; 
  }) 
  return (
    <section> 
      <CropBox>
        <img src={require(`../img/${img}`)} alt="헤더이미지"/>
      </CropBox> 
      <HeaderBox>
        <h1>{title}</h1>
        <p>{desc}</p>
      </HeaderBox>  
    </section>
  );
};

export default HeaderPage;
