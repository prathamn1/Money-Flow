import React from "react";
import { keyframes, styled } from "styled-components";
import { WindowSize } from "../../utils/WindowSize";

const Orb = () => {
  const { width, height } = WindowSize();

  // console.log(width,height);
  // const moveOrb = keyframes`
  //     0% {
  //         transform: translate(0,${height}px);
  //     }
  //     50% {

  //         transform: translate(${width/2}px,${height/2}px);
  //     }
  //     100% {
  //         transform : translate(${width}px,0);
  //     }
  // `;

  const moveOrb = keyframes`
        0% {
            transform: translate(0,0);
        }
        50% {
            
            transform: translate(${width}px,${height}px);
        }
        100% {
            transform : translate(0,0);
        }
    `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-top: -37vh;
    margin-left: -37vh;

    background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
    /* background-color: red; */
    filter: blur(400px);
    animation: ${moveOrb} 5s alternate linear infinite;
  `;

  return <OrbStyled></OrbStyled>;
};

export default Orb;
