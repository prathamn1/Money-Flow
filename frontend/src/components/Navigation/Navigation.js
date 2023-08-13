import React from "react";
import { styled } from "styled-components";
import { MenuItems } from "../../utils/MenuItems";
import { useGlobalContext } from "../../context/GlobalContext";
import { signout, copyright } from "../../utils/Icons";
import logo2 from "../../assets/logo2.png";
import "../../index.css";

const Navigation = ({ active, setActive }) => {
  // here props contain useState and active for active links on sidebar

  const { loggedInUser, logOutUser } = useGlobalContext();
  let userName = "";
  if (loggedInUser.name !== undefined) {
    userName = loggedInUser.name.split(" ");
  }
  if (userName.length === 1) userName.push("");
  return (
    <NavStyled>
      <div className="sidebar">
        <div className="user-container">
          <img src={logo2} alt="" srcSet="" />
          <div className="text">
            <h2>{userName[0]}</h2>
            <h2>{userName[1]}</h2>
          </div>
        </div>
        <ul className="menu-items">
          {MenuItems.map((items) => {
            return (
              <li
                key={items.id}
                onClick={() => setActive(items.id)}
                className={active === items.id ? "active" : ""}
              >
                {items.icon}
                <span>{items.title}</span>
              </li>
            );
          })}
        </ul>
        <div className="bottom-nav">
          <button className="sign-out" onClick={logOutUser}>
            {signout} Sign Out
          </button>
          <p className="copyright">{copyright} Pratham NIT-A '24</p>
        </div>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.div`
  resize: both;
  .sidebar {
    font-family: "Roboto Mono", monospace;

    max-width: 374px;
    height: 100%;
    /* background: rgba(252, 246, 249, 0.78); */
    background-color: #000000;
    /* border: 3px solid #ffffff; */
    /* backdrop-filter: blur(4.5px); */
    /* border-radius: 32px; */
    border-right: 5px solid #068fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user-container {
      padding: 0 1rem;
      margin-top: 1rem;
      height: 100px;
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 90px;
        object-fit: cover;
        background-color: #000000;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
      }
      h2 {
        letter-spacing: 0.1rem;
        font-size: large;
        font-weight: 700;
        color: #068fff;
      }
    }

    .menu-items {
      letter-spacing: 0.1rem;
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      li {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        margin: 0.6rem 0;

        font-weight: 700;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        /* color: rgba(34, 34, 96, 0.6); */
        color: #4e4feb;
        padding-left: 1rem;
        position: relative;
        i {
          color: #4e4feb;
          font-size: 1.4rem;
          transition: all 0.4s ease-in-out;
        }
      }
    }

    .active {
      color: #068fff !important;

      i {
        color: #068fff !important;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #068fff;
        border-radius: 0 10px 10px 0;
      }
    }
    .bottom-nav {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: clamp(100px, 50px, 100px);
      color: #068fff;
      cursor: pointer;

      .sign-out {
        height: 50px;
        padding: 0 2rem;
        border: 2px solid #4e4feb;
        transition: all 0.6s ease-in-out;
      }

      .sign-out:hover {
        background-color: var(--color-blue);
        color: black;
      }

      .copyright {
        padding: 1rem;
      }
    }
  }
`;

export default Navigation;
