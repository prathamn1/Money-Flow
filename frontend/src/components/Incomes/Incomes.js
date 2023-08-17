import React, { useEffect,useRef } from "react";
import {styled} from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/IncomeForm";
import TransactionItem from "../TransactionItem/TransactionItem";
import { ruppee } from "../../utils/Icons";
import { toast } from "react-hot-toast";

function Income() {
  const {
    incomes,
    loggedInUser,
    showLoader,
    hideLoader,
    getIncomes,
    deleteIncome,
    totalIncome,
  } = useGlobalContext();

  useEffect(() => {

    if(loggedInUser._id!==undefined) return;

    showLoader();
    try {
      if (loggedInUser._id === undefined) {
        throw new Error("Connection Error");
      }
      getIncomes(loggedInUser._id);
    } catch {
      toast.error("Connection Error! Couldn't fetch incomes");
    } finally {
      hideLoader();
    }
  },[]);


  return (
    <IncomeStyled>
      <div className="heading">
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income :{" "}
          <span>
            {ruppee} {totalIncome()}
          </span>
        </h2>
      </div>

      <div className="income-content">
        <div className="form-container">
          <Form />
        </div>
        <div className="incomes">
          {incomes.map((income) => {
            const { _id, title, amount, date, category, description, type } =
              income;
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
                deleteItem={deleteIncome}
              />
            );
          })}
        </div>
      </div>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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
    .total-income {
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
    .total-income:hover {
      font-size: clamp(1.2vw, 1.5vw, 2vw);
      opacity: 1;
      font-weight: 700;
    }
  }

  .income-content {
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

    .incomes {
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

    .incomes::-webkit-scrollbar {
      width: 1rem;
    }
    .incomes::-webkit-scrollbar-track {
      background-color: black;
      border: 1px solid var(--color-blue);
    }
    .incomes::-webkit-scrollbar-thumb {
      background-color: var(--color-purple);
      width: 55px;
    }
  }
`;


export default Income;
