import React from "react";
import logo from "../../assets/logo2.png";
import { styled, keyframes, css } from "styled-components";

const Logo = (props) => {
  return (
    <LogoStyled rotate={props}>
      <img src={logo} alt="" />
    </LogoStyled>
  );
};

const rotateLogin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;

const LogoStyled = styled.div`
  img {
    margin: auto;
    width: 80px;
    aspect-ratio: 1;
    backdrop-filter: blur(2px);
    animation: ${(props) =>
      props.rotate.rotate &&
      css`
        ${rotateLogin} 1s infinite linear;
      `};
  }
`;

export default Logo;
