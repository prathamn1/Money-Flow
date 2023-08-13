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
  background-color: #000000;
  .first-item {
    border-top: 5px solid var(--color-blue);
  }
  display: flex;
  flex-direction: column;

  .history-item {
    /* margin-right: 1rem; */
    max-width: 100%;
    border-left: 1px solid var(--color-blue);
    border-right: 1px solid var(--color-blue);
    border-bottom: 1px solid var(--color-blue);
    /* border: 2px solid rgba(250, 227,146,.5); */
    /* box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06); */
    padding: 3vh;
    /* border-radius: 20px; */
    font-size: clamp(2.2vh, 2vh, 2.5vh);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .history-title {
      color: rgb(250, 227, 146);
      opacity: 0.8;
    }
    .history-amount {
      opacity: 0.8;
    }
    .history-date {
      color: rgb(250, 227, 146);
      opacity: 0.7;
    }
  }
  .history-item :hover {
    font-size: 120%;
    font-weight: 500;
    opacity: 1;
  }

  .items-container {
    overflow-y: scroll;
    max-height: 45vh;
  }

  .items-container::-webkit-scrollbar {
    width: 0.5rem;
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
