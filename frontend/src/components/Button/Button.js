import React from "react";
import styled from "styled-components";

const Button = ({ name, icon, onClick, bg, bPad, color, bRad,isDisabled }) => {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: "Roboto Mono";
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

export default Button;
