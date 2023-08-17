import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Logo from "../components/Logo/Logo";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { loginUser, rotateLogo, setRotateLogo, error, setError } =
    useGlobalContext();

  const login = async () => {
    // showLoader()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      setError("Invalid Email-id entered");
      return;
    }
    setRotateLogo(true);
    try {
      const response = await loginUser(user);
      // console.log(response);
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Client Error! Check your Internet Connection");
    } finally {
      // hideLoader();
      setRotateLogo(false);
    }
  };

  const buttonRef  = useRef(null)

  const handleGlobalKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    // console.log("inside login")
    setError("");
    if (localStorage.getItem("token")) navigate("/");
    document.addEventListener("keydown", handleGlobalKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, []);

  return (
    <LoginPage>
      <div className="login-container bg-black shadow-md p-5 flex flex-col gap-5 w-96">
        <Logo rotate={rotateLogo} />

        <div className="flex gap-2 justify-center">
          <i className="ri-question-answer-line text-black text-2xl "></i>
          <h1
            className="text-2xl  uppercase font-semibold text-black heading"
            style={{
              color: "var(--color-blue)",
              letterSpacing: "2px",
              margin: "20px 0",
            }}
          >
            MONEY FLOW LOGIN
          </h1>
        </div>
        <h1 className="text-xl text-primary ">Email</h1>
        {error.length!==0 && <p className="error">{error}</p>}
        <input
          className=""
          type="email"
          required
          value={user.email}
          onChange={(e) => {
            setError("");
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="Enter Your Email-id"
        />
        <h1 className=" text-xl text-primary ">Password</h1>
        <input
          className=""
          type="password"
          value={user.password}
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Your Password"
        />
        <button
          ref={buttonRef}
          type="button"
          className={
            user.email && user.password && !error
              ? "contained-button "
              : "disabled-button"
          }
          onKeyDown={(e)=>console.log(e)}
          onClick={login}
          disabled={user.email === "" || user.password === "" || error.length !== 0 ? true : false}
        >
          Proceed
        </button>

        <Link
          to="/register"
          className="underline "
          style={{ color: "var(--color-blue)", letterSpacing: "1px" }}
        >
          Don't have an account? Register
        </Link>
      </div>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  font-family: "Roboto Mono";
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .heading {
    text-decoration: underline;
    text-underline-offset: 10px;
  }

  .login-container input {
    background-color: #000000;
    border: 2px solid var(--color-purple);
    color: var(--color-yellow);
    outline: none;
    letter-spacing: 1px;
  }

  .login-container input:focus {
    border-color: var(--color-blue);
  }

  .login-container button {
    margin: 10px auto;
    letter-spacing: 2px;
    height: 40px;
    width: 120px;
  }

  .login-container h1 {
    letter-spacing: 0.8px;
    color: var(--color-purple);
  }

  .contained-button {
    border: 2px solid var(--color-purple);
    color: var(--color-purple);
    transition: all 0.3s linear;
  }

  .contained-button:hover {
    background-color: var(--color-blue);
    color: #000000;
    opacity: 1;
    border: none;
  }

  .disabled-button {
    background-color: var(--color-light-black);
    color: var(--color-purple);
    cursor: not-allowed;
  }

  ::placeholder {
    font-style: italic;
  }

  .error {
    color: red;
  }

  overflow: visible;


`;

export default Login;
