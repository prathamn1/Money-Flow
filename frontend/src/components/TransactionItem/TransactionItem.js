import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/DateFormat";
import {
  bitcoin,
  book,
  fees,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  ruppee,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import Button from "../Button/Button";

const TransactionItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
}) => {
  const incomeCatIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "food":
        return food;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "fees":
        return fees;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      case "food":
        return food;
      default:
        return "";
    }
  };

  // console.log('type', type)

  return (
    <IncomeItemStyled>
      <div className="icon">
        {type === "Expense" ? expenseCatIcon() : incomeCatIcon()}
      </div>
      <div className="content">
        <div className="heading">
          <div
            className="indicator"
            style={{
              backgroundColor: type === "Income" ? "#00ff00" : "#ff0000",
            }}
          ></div>
          <h5>{title}</h5>
        </div>
        <div className="inner-content">
          <div className="text">
            <p>
              {ruppee} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
};

const IncomeItemStyled = styled.div`
  background: whitesmoke;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 95%;

  color: #222260;
  .icon {
    width: fit-content;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2px solid #ffffff;

    i {
      font-size: 2rem;
    }
    i:hover {
      font-size: 2.5rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .heading {
      display: flex;
      justify-content: flex-start;
      .indicator {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
      h5 {
        color: var(--color-purple);
        font-size: 1.2rem;
        padding-left: 1rem;
        position: relative;
        font-weight: 700;
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default TransactionItem;
