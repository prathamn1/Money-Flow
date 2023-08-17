import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/DateFormat";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();
  // console.log(history)
  return (
    <HistoryStyled>
      <div className="items-container">
        {history.map((item) => {
          const { _id, title, amount, type, date } = item;
          return (
            <div
              key={_id}
              className={
                item === history[0] ? "first-item history-item" : "history-item"
              }
            >
              <p className="history-title">{title}</p>
              <p className="history-date">{dateFormat(date)}</p>
              <p
                className="history-amount"
                style={{
                  color: type === "Expense" ? "red" : "rgb(0,255,0)",
                }}
              >
                {type === "Expense"
                  ? `-${amount <= 0 ? 0 : amount}`
                  : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })}
      </div>
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  
  .first-item {
    border-top: 5px solid var(--color-blue);
  }
  display: flex;
  flex-direction: column;

  .history-item {
    background-color: #000000;
    height: 10vh;
    min-height: -moz-fit-content;
    /* min-width: 100%; */
    width : 95%;
    border-left: 1px solid var(--color-blue);
    border-right: 1px solid var(--color-blue);
    border-bottom: 1px solid var(--color-blue);
    padding: 3vh 5px;
    font-size: clamp(10px, 1vw, 1.5vw);
    display: grid;
    grid-template-columns: 30% 40% 30%;
    grid-template-areas: 'hst-tit hst-dte hst-amt';
    text-align: center;
    align-content: center;
    opacity: 0.8;
    .history-title {
      text-transform: capitalize;
      word-wrap: break-word;
      grid-area: hst-tit;
      color: rgb(250, 227, 146);
      
    }
    .history-amount {
      grid-area: hst-amt;
      
    }
    .history-date {
      grid-area: hst-dte;
      color: rgb(250, 227, 146);
     
    }
  }
  .history-item:hover {
    font-size: 1.4vw;
    font-weight: 500;
    opacity: 1;
  }

  .items-container {
    overflow-x : hidden;
    overflow-y: scroll;
    max-height: 45vh;
  }

  .items-container::-webkit-scrollbar {
    width: 1rem;
  }
  .items-container::-webkit-scrollbar-track {
    background-color: black;
    border: 1px solid var(--color-blue);
  }
  .items-container::-webkit-scrollbar-thumb {
    background-color: var(--color-purple);
    width: 55px;
  }
`;

export default History;
