import React from 'react'
import { styled,keyframes} from 'styled-components'
import logo_simple from '../assets/logo-simple.png'

const Loader = () => {
  return (
    <>
        <LoaderStyled>
            <img src={logo_simple} alt=""/>
        </LoaderStyled>
    </>
  )
}


const rotateLoader = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;

const LoaderStyled = styled.div`
    img {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        transform: 'translateY(-50%)';
        width: 80px;
        aspect-ratio: 1;
        backdrop-filter: blur(2px);
        animation: ${rotateLoader} 2s infinite linear;
    }
    
`;

export default Loader
