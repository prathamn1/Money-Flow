import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Form() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Enter Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Enter Expense Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control date-cnt">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
            format="DD-MM-YYYY"
            formatDensity="spacious"
          />
        </LocalizationProvider>
      </div>

      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Expense Category
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bg={"#000000"}
          color={"var(--color-blue)"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  input,
  textarea,
  select {
    letter-spacing: 1px;
    padding: 0.5rem 1rem;
    outline: none;
    border: 1px solid var(--color-purple);
    background-color: black;
    resize: none;
    color: var(--color-yellow);
    &::placeholder {
      color: whitesmoke;
      opacity: 0.8;
      font-style: italic;
    }
  }
  input:focus,
  textArea:focus,
  select:focus {
    border-color: var(--color-blue);
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .date-cnt > div {
    border: 1px solid var(--color-purple);
    background-color: black;
  }
  .date-cnt button {
    color: whitesmoke;
    opacity: 0.8;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      font-style: italic;
      color: var(--color-yellow);
      opacity: 1;
      option {
        color: whitesmoke;
        opacity: 0.8;
      }
    }
  }

  .submit-btn {
    button {
      &:hover {
        background: #ff0000 !important;
        color: black !important;
      }
    }
  }
`;
export default Form;
