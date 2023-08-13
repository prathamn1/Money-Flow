import React, { useEffect } from "react";
import styled from "styled-components";
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
    totalExpenses,
  } = useGlobalContext();

  useEffect(() => {
    showLoader();
    try {
      if (loggedInUser._id === undefined) {
        throw new Error("Connection Error");
      }
      getExpenses(loggedInUser._id);
    } catch {
      toast.error("Connection Error! Couldn't fetch Expenses");
    } finally {
      hideLoader();
    }
  });

  return (
    <ExpenseStyled>
      <div className="heading">
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense :{" "}
          <span>
            {ruppee} {totalExpenses()}
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
  gap: 3vh;
  .heading {
    display: flex;
    font-size: 5vh;
    align-items: center;
    justify-content: space-around;
    h1 {
      color: var(--color-white);
    }
    .total-expense {
      width: max-content;
      opacity: 0.8;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000000;
      border: 1px solid var(--color-blue);
      padding: 1.5rem;
      border-top-width: 5px;
      gap: 0.5rem;
      color: var(--color-yellow);
      span {
        font-weight: 500;
        color: #00ff00;
      }
    }
    .total-expense:hover {
      font-size: 23px;
      opacity: 1;
    }
  }

  .expense-content {
    display: grid;
    max-height: 100%;
    grid-template-areas:
      "frm trs"
      "frm trs";
    column-gap: 5vw;

    .form-container {
      grid-area: frm;
    }

    .expenses {
      max-height: 70vh;
      overflow-y: scroll;
      grid-area: trs;
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column;
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
      background-color: var(--color-yellow);
      width: 55px;
    }
  }
`;

export default Expense;
