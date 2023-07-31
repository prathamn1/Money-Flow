import React from 'react'
import { styled } from 'styled-components'
import { MenuItems } from '../../utils/MenuItems'
import { signout } from '../../utils/Icons'
import avatar from '../../assets/avatar.png'

const Navigation = ({active,setActive}) => {   // here props contain useState and active for active links on sidebar
  return (
    <NavStyled>

        <div className="user-container">
            <img src={avatar} alt="" srcSet="" />
            <div className="text">
                <h2>Mike</h2>
                <p>Your Money</p>
            </div>
        </div>
        <ul className="menu-items">
            {
                MenuItems.map( (items)=> {
                return <li 
                        key= {items.id} 
                        onClick = {()=> setActive(items.id)}
                        className={active===items.id ? 'active' : ''}
                    >
                        {items.icon}
                        <span>{items.title}</span>
                    </li>
                })
            }
        </ul>
        <div className="bottom-nav">
            <li>{signout} Sign Out</li>
        </div>

    </NavStyled>
  )
}


const NavStyled = styled.div`
  padding: 2rem 1.5rem;
  max-width : 374px;
  height : 100%;
  background : rgba(252,246,249,0.78);
  border : 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    height : 100px;
    display: flex;
    align-items : center;
    gap : 1rem;
    img {
        width : 80px;
        height : 80px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #fcf6f9;
        box-shadow: 0px 1px 17px rgba(0, 0, 0,0.06);
    }
    h2 {
        color : rgba(34,34,96,1);
    }
    h2 {
        color : rgba(34,34,96,0.6);
    }



    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }


`;

export default Navigation