import React, { useEffect } from "react";
import {styled} from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/ExpenseForm";
import TransactionItem from "../TransactionItem/TransactionItem";
import { ruppee } from "../../utils/Icons";
import { toast } from "react-hot-toast";

function Expense() {
  const {
    expenses,
    loggedInUser,
    showLoader,
    hideLoader,
    getExpenses,
    deleteExpense,
    totalExpense,
  } = useGlobalContext();

  useEffect(() => {

    if(loggedInUser._id!==undefined) return;

    showLoader();
    try {
      // console.log(loggedInUser._id);
      if (loggedInUser._id === undefined) {
        throw new Error("Connection Error");
      }
      getExpenses(loggedInUser._id);
    } catch {
      console.log("Connection Error! Couldn't fetch expenses");
      toast.error("Connection Error! Couldn't fetch expenses");
    } finally {
      hideLoader();
    }
  },[]);

  return (
    <ExpenseStyled>
      <div className="heading">
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense :{" "}
          <span>
            {ruppee} {totalExpense()}
          </span>
        </h2>
      </div>

      <div className="expense-content">
        <div className="form-container">
          <Form />
        </div>
        <div className="expenses">
          {expenses.map((expense) => {
            const { _id, title, amount, date, category, description, type } =
              expense;
            return (
              <TransactionItem
                key={_id}
                id={_id}
                title={title}
                description={description}
                amount={amount}
                date={date}
                type={type}
                category={category}
                deleteItem={deleteExpense}
              />
            );
          })}
        </div>
      </div>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  font-family: "Roboto Mono";
  padding: 1rem;
  background-color: var(--color-light-dark);
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 5vh;
  .heading {
    display: flex;
    font-size: 4vh;
    align-items: center;
    justify-content: space-around;
    h1 {
      color: var(--color-white);
    }
    .total-expense {
      width: 25vw;
      min-width: fit-content;
      height: 10vh;
      min-height: fit-content;
      opacity: 0.8;
      font-size: clamp(2vh, 2.5vh, 3vh);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000000;
      border: 1px solid var(--color-blue);
      padding: 1rem;
      border-top-width: 5px;
      gap: 0.5rem;
      color: var(--color-yellow);
      span {
        font-weight: 500;
        color: #00ff00;
      }
    }
    .total-expense:hover {
      font-size: clamp(1.2vw, 1.5vw, 2vw);
      opacity: 1;
      font-weight: 700;
    }
  }

  .expense-content {
    display: grid;
    max-height: 100%;
    grid-template-columns: 40% 55%;
    grid-template-areas:
      "frm trs"
      "frm trs";
    column-gap: 5vw;

    .form-container {
      grid-area: frm;
    }

    .expenses {
      /* border : 1px solid var(--color-blue); */
      display: flex;
      flex-direction: column;
      max-height: 70vh;
      overflow-y: scroll;
      overflow-x : hidden;
      grid-area: trs;
      scroll-behavior: smooth;
      gap: 0.7rem;
    }

    .expenses::-webkit-scrollbar {
      width: 1rem;
    }
    .expenses::-webkit-scrollbar-track {
      background-color: black;
      border: 1px solid var(--color-blue);
    }
    .expenses::-webkit-scrollbar-thumb {
      background-color: var(--color-purple);
      width: 55px;
    }
  }
`;


export default Expense;
