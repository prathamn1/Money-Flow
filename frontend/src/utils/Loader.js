import React from "react";
// import { styled,keyframes} from 'styled-components'
// import logo2 from '../assets/logo2.png'
import { Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      {/* <LoaderStyled> */}
      {/* <img src={logo2} alt=""/> */}
      <Vortex
        visible={true}
        height="100"
        width="100"
        // radius="50"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          margin: "auto",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
        colors={[
          "var(--color-blue)",
          "var(--color-blue)",
          "var(--color-purple)",
          "var(--color-purple)",
          "var(--color-blue)",
          "var(--color-purple)",
        ]}
      />
      {/* </LoaderStyled> */}
    </>
  );
};

// const rotateLoader = keyframes`
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(359deg);
//     }
// `;

// const LoaderStyled = styled.div`
//     img {
//         background: transparent;
//         position: absolute;
//         top: 50%;
//         left: 0;
//         right: 0;
//         margin: auto;
//         transform: 'translateY(-50%)';
//         width: 80px;
//         aspect-ratio: 1;
//         backdrop-filter: blur(20px);
//         animation: ${rotateLoader} 2s infinite linear;
//         z-index : 1000;
//     }

// `;

export default Loader;
