import React, {useState} from 'react'; 
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components';   
import _ from 'lodash'  
const Label = styled.label` 
display: inline-block; 
height: 35px;
width: 35px;
box-sizing: border-box;
margin: 0px 8px 7px 0px;
padding: 7px 9px 0px 9px;
border: 3px solid black;
border-radius: 25px;
transition: all .2s ease;
cursor: text;  
position:relative; 
&:after {
  content: "";
  position: absolute;
  width: 3px;
  height: 15px;
  right: -5px;
  top: 21px;
  background: black;
  border-radius: 3px;
  transform: rotate(-45deg);
  transition: all 200ms ease;
}
&.active, &:hover {
  width: 100%;
  margin-right: 0px;
}
&.active:after, &:hover:after {
  height: 0px;
}
input {
  width: 100%;
  border: none;
  box-sizing: border-box; 
  font-size: 15px;
  color: inherit;
  background: transparent;
  outline-width: 0px;
} 
` 
const HeaderSearchBox = styled.header` 
position: fixed;
padding: 5px; 
box-sizing : border-box; 
left:0;
right:0;
margin-left:auto;
margin-right:auto; 
max-width: 442px;
top: 0; 
z-index: 3;
width: 100%;
text-align: right;
background: rgba(255, 255, 255, 0.5); 
`

let debouncedFn; 
const SearchPage = () => {    
    const [inputValue, setInput] = useState("")  
    let history = useHistory();  
    const handleInput = (e) =>{
        setInput(e.target.value);
        e.persist();        
        if (!debouncedFn) {  
          debouncedFn =  _.debounce(() => {  
              history.push('/song' + e.target.value)  
          }, 3000);
        }else debouncedFn()
    }
    const handleEnter = (e) =>{
      if(e.key === 'Enter'){  
        history.push('/song' + inputValue)
      } 
    }
    return (
        <>  
            <HeaderSearchBox>
                <Label> 
                <input type="text" id="inpt_search" value = {inputValue} onChange={handleInput} onKeyDown = {handleEnter}/>  
                </Label>
            </HeaderSearchBox>  
        </>
    );
};

export default SearchPage;
