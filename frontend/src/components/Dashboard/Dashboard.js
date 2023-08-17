import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import History from "../History/History";
import { ruppee } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import { toast } from "react-hot-toast";

function Dashboard() {
  const {
    loggedInUser,
    totalExpense,
    hideLoader,
    showLoader,
    incomes,
    getCurrentUser,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {

    const fetchData = async () => {
      showLoader();
      try {
        if (loggedInUser.name !== undefined) {
          await getIncomes(loggedInUser._id);
          await getExpenses(loggedInUser._id);
        } else {
          toast.error('User Authentication Error! Please Login Again')
          localStorage.removeItem("token");
          window.location.href('/login')
        }
      } catch (error) {
        toast.error("Connection Error!");
      } finally {
        hideLoader();
      }
    }

    if(incomes.length===0 && expenses.length===0) fetchData();



  },[]);

  let minIncome = Math.min(...incomes.map((item) => item.amount));
  let maxIncome = Math.max(...incomes.map((item) => item.amount));
  let minExpense = Math.min(...expenses.map((item) => item.amount));
  let maxExpense = Math.max(...expenses.map((item) => item.amount));

  return (
    <DashboardStyled>
      <div className="chart-con">
        <h2>Incomes and Expenses</h2>
        <Chart />
      </div>

      <div className="amount-con">
        <div className="income">
          <h2>Total Income</h2>
          <p style={{ color: "#00ff00" }}>
            {ruppee} {totalIncome()}
          </p>
        </div>
        <div className="expense">
          <h2>Total Expense</h2>
          <p style={{ color: "#ff0000" }}>
            {ruppee} {totalExpense()}
          </p>
        </div>
        <div className="balance">
          <h2>Total Balance</h2>
          <p
            style={{
              color: totalIncome() < totalExpense() ? "#ff0000" : "#00ff00",
            }}
          >
            {ruppee} {totalBalance()}
          </p>
        </div>
      </div>

      <div className="history-con">
        <h2>Recent Transactions</h2>
        <History />
      </div>
      <div className="stats-con">
        <div className="stat-inc">
          <h2 className="salary-title">
            Min <span>Income</span>Max
          </h2>
          <div className="salary-item" style={{ color: "#00ff00" }}>
            <p>
              {ruppee} {isFinite(minIncome) ? minIncome : 0}
            </p>
            <p>
              {ruppee} {isFinite(maxIncome) ? maxIncome : 0}
            </p>
          </div>
        </div>
        <div className="stat-exp">
          <h2 className="salary-title">
            Min<span>Expense</span>Max
          </h2>
          <div className="salary-item" style={{ color: "#ff0000" }}>
            <p>
              {ruppee} {isFinite(minExpense) ? minExpense : 0}
            </p>
            <p>
              {ruppee} {isFinite(maxExpense) ? maxExpense : 0}
            </p>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  font-family: "Roboto Mono", monospace;
  padding: 1rem;
  height: 100%;
  background-color: #252b48;
  display: grid;
  grid-template-rows: 60% 5% 35%;
  grid-template-columns: 60% 10% 30%;

  .chart-con {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    h2 {
      font-size: 120%;
      color: var(--color-white);
    }
  }

  .amount-con {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 5%;

    h2 {
      color: var(--color-yellow);
    }

    .income,
    .expense {
      min-height: -moz-fit-content;
      min-width : -moz-fit-content;
      width : 18vw;
      margin: 0 13%;
      text-align: center;
      height : 13vh;
      
    }

    .income,
    .expense,
    .balance {
      font-size: clamp(15px, 1.3vw, 2vw);
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #000000;
      border: 0.5px solid var(--color-blue);
      font-weight: 500;
      opacity: 0.8;
    }

    .balance {
      height: 15vh;
      max-height: fit-content;
      grid-column: 1/3;
      text-align: center;
      
    }

    .income:hover,.expense:hover,.balance:hover {
        opacity: 1;
        font-weight: 700;
        font-size: max(18px,1.5vw);
    }
  }

  .history-con {
    display: flex;
    flex-direction: column;
    grid-row: 1 / 2;
    grid-column: 2 / 4;
    margin-left: 1rem;
    h2 {
      color: var(--color-white);
      font-size: 120%;
    }
    gap: 2rem;
  }

  .stats-con {
    min-height: fit-content;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    grid-row: 3 / 4;
    grid-column: 3 / 4;

    .stat-inc,
    .stat-exp {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .salary-title {
      display: flex;
      color: var(--color-yellow);
      justify-content: space-between;
      span {
        color: var(--color-white);
        font-size: clamp(20px, 1.5vw, 2vw);
      }
    }
    .salary-item {
      height : 10vh;
      opacity: 0.7;
      font-weight: 400;
      font-size: clamp(15px, 1.2vw ,1.5vw);
      background: #000000;
      border: 1px solid var(--color-blue);
      padding: clamp(1vw, 2vw, 3vw);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .salary-item:hover {
      opacity: 1;
      font-weight: 700;
      font-size: clamp(16px, 1.4vw, 1.7vw);
    }
  }
`;

export default Dashboard;
