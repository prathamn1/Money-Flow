import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
        --color-purple : #4E4FEB;
        --color-blue : #068fff;
        --color-white : #F0F0F0;
        --color-black : #000000;
        --color-light-black : #252b48;
        --color-yellow : #F9D949;
      
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size : clamp(0.8rem,1.3vw,1rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
        background-color: var(--color-light-black);
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    html,body,#root {
        height : 100%;
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }
`;
