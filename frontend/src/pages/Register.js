import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { toast } from "react-hot-toast";
import Logo from "../components/Logo/Logo";
import { styled } from "styled-components";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { registerUser, setRotateLogo, rotateLogo } = useGlobalContext();

  const register = async () => {
    // showLoader();
    setRotateLogo(true);
    try {
      const response = await registerUser(user);

      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      // hideLoader();
      setRotateLogo(false);
    }
  };
  useEffect(() => {
    // console.log("inside register")
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    <RegisterPage>
      <div className="register-container bg-black shadow-md p-5 flex flex-col gap-5 w-96">
        <Logo rotate={rotateLogo} />

        <div className="flex gap-2 justify-center">
          <i className="ri-question-answer-line text-black text-2xl "></i>
          <h1
            className="text-2xl uppercase font-semibold text-black heading"
            style={{
              color: "var(--color-blue)",
              letterSpacing: "2px",
              margin: "20px 0",
            }}
          >
            {" "}
            MONEY FLOW REGISTER
          </h1>
        </div>
        <h1 className="text-xl text-primary ">Full Name</h1>
        <input
          className=""
          type="text"
          required
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter Your Full Name"
        />
        <h1 className="text-xl text-primary ">Email</h1>
        <input
          className=""
          type="text"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Your Email"
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
          type="button"
          className={
            user.email && user.password
              ? "contained-button "
              : "disabled-button"
          }
          onClick={register}
        >
          Proceed
        </button>

        <Link
          to="/login"
          className="underline "
          style={{ color: "var(--color-blue)", letterSpacing: "1px" }}
        >
          Don't have an account? Login
        </Link>
      </div>
    </RegisterPage>
  );
}

const RegisterPage = styled.div`
  font-family: "Roboto Mono";
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .heading {
    text-decoration: underline;
    text-underline-offset: 10px;
  }

  .register-container input {
    background-color: #000000;
    border: 2px solid var(--color-purple);
    color: var(--color-yellow);
    outline: none;
  }

  .register-container input:focus {
    border-color: var(--color-blue);
  }

  .register-container button {
    margin: 10px auto;
    letter-spacing: 2px;
    height: 40px;
    width: 120px;
  }

  .register-container h1 {
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
  }
`;

export default Register;
