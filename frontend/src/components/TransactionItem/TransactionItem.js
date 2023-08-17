import React from "react";
import {styled,keyframes} from "styled-components";
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


  return (
    <IncomeItemStyled>

      
      <div className="transaction-item-container">
        <div className="icon">
          {type === "Expense" ? expenseCatIcon() : incomeCatIcon()}
        </div>
        <div className="info">
          <div className="heading">
            <div className="indicator"
              style={{
                backgroundColor: type === "Income" ? "#00ff00" : "#ff0000",
              }}
            >
            </div>
            <h5>{title}</h5>
          </div>
          <div className="content">
            <p>{ruppee} {amount} </p>
            <p>{calender} {dateFormat(date)} </p>
          </div>
        </div>
        
        <div className="desc">
          {comment}
          <p> {description}</p>
        </div>
        <div className="btn-con">
          <Button
            icon={trash}
            bPad={"clamp(0.5vw,1vw,1.5vw)"}
            bRad={"50%"}
            bg={"var(--primary-color"}
            color={"#fff"}
            iColor={"#fff"}
            hColor={"var(--color-green)"}
            onClick={() => deleteItem(id)}
          />
        </div>
      </div>
    </IncomeItemStyled>
  );
};


const Fade = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`

const IncomeItemStyled = styled.div`
  .transaction-item-container {
    background: whitesmoke;
    max-width: 95%;
    margin :0;
    padding : 1rem 1rem;
    
    display : grid;
    grid-template-columns: 10% 40% 40% 10%;
    grid-template-areas: 'icon info description delete';
    color: #222260;
    .icon {
      grid-area : icon;
      width: fit-content;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;

      i {
        font-size: clamp(2vw,2vw,3vw);
        animation: ${Fade} 2s infinite alternate linear;
      }
      
    } 

    .info {
      align-self: center;
      grid-area : info;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      .heading {
        display: flex;
        justify-content: flex-start;
        .indicator {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
        h5 {
          word-break: break-word;
          color: var(--color-purple);
          font-size: clamp(15px,1.3vw,1.5vw);
          padding-left: 0.4rem;
          font-weight: 700;
          text-transform: capitalize;
        
        }
      }

      .content {
        font-size: clamp(12px,1vw,1.5vw);
        align-self: center;
        display: flex;
        flex-direction: column;
        align-self : baseline;
        margin-left: 5%;
        gap : 5%;
          p {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            opacity: 0.8;
          }
      }
    }

    .desc {
      
      display: flex;
      margin-left : auto 2px;
      grid-area: description;
      i {
        margin-top: 6px;
        margin-right: 2px;
        margin-left : 6px;
      }
      p {
        word-wrap: break-word;
        width: 80%;
        font-size: clamp(13px,1vw,1.5vw);
        letter-spacing: -1px;
        height : 100%;
      }
    }

    .btn-con {
      align-self: center;
      justify-self: flex-end;
      grid-area: delete;
      i {
        font-size: clamp(0.5vw,1vw,1.2vw);
      }
    
    }
  }

  .transaction-item-container:hover .icon>i {
      animation-duration: 0s;
      font-size: clamp(2vw,2.5vw,3vw);
  }
  
`;




export default TransactionItem;
