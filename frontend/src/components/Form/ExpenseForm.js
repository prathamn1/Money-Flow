import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
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
    // setError("");
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
      {/* {error && <p className="error">{error}</p>} */}
      <div className="input-control">
        <input
          maxLength={15}
          type="text"
          value={title}
          name={"title"}
          placeholder="Enter Expense Title&#10; [Max 15 Characters]"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          maxLength={10}
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Enter Expense Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control date-cnt">
        <DatePicker
          showIcon={true}
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
          isClearable ={date==="" ? false : true}
        />
      </div>

      <div className="selects input-control">
        <select
          title="Select Expense Category"
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
          style={{
            color: category === "" ? "whitesmoke" : "var(--color-yellow)",
            opacity: category === "" ? "0.8" : "1",
            
          }}
        >
          <option value="" disabled>
            Expense Category
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="fees">Fees</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference&#10;[Max 70 Characters]"
          id="description"
          cols="30"
          rows="4"
          maxLength={70}
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
          isDisabled={title==="" || amount<=0 || category==="" || date==="" ? true : false}
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

  textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
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

  .date-cnt {
    width: fit-content;
    border: 1px solid var(--color-purple);
    background-color: black;
    .react-datepicker {
      font-family: "Roboto Mono";
    }
    .react-datepicker__header {
      background-color: black;
      font-size: medium;
    }
    .react-datepicker__day-name,
    .react-datepicker__current-month,
    .react-datepicker__day {
      color: var(--color-yellow);
      opacity: 0.7;
      font-style: italic;
    }
    .react-datepicker {
      border: 1px solid var(--color-purple);
      border-top: 5px solid var(--color-purple);
      background-color: #000000;
      font-weight: bold;
    }
    .react-datepicker__day--today {
      background-color: var(--color-purple);
      border-radius: 50%;
    }
    .react-datepicker__day:hover {
      border-radius: 50%;
      background-color: white;
      color: black;
    }
    .react-datepicker__day {
      font-size: small;
    }
  }



  .selects {
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    select {
      font-style: italic;
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
    button:disabled{
      opacity: 0.5;
      &:hover {
        background: #000000 !important;
        color : var(--color-blue) !important;
        cursor: not-allowed;
      }
    }
  }
`;

export default Form;
