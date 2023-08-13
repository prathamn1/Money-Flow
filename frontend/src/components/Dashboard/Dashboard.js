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
    totalExpenses,
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
    // console.log(process.env.NODE_ENV)
    const fetchData = async () => {
      if (loggedInUser.name !== undefined) return;

      showLoader();
      try {
        const userResponse = await getCurrentUser();

        if (userResponse.success) {
          // console.log(userResponse.data);
          await getIncomes(userResponse.data._id);
          await getExpenses(userResponse.data._id);
        } else {
          localStorage.removeItem("token");
          // console.error("User authentication error:", userResponse.message);
        }
      } catch (error) {
        toast.error("Connection Error!");
        // console.error("Error:", error.message);
      } finally {
        hideLoader();
      }
    };

    fetchData();
  });

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
            {ruppee} {totalExpenses()}
          </p>
        </div>
        <div className="balance">
          <h2>Total Balance</h2>
          <p
            style={{
              color: totalIncome() < totalExpenses() ? "#ff0000" : "#00ff00",
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
      /* font-size : 1.5rem; */
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
      max-height: fit-content;
      max-width: 240px;
      margin: 0 13%;
      text-align: center;

      max-height: 80%;
      h2:hover,
      p:hover {
        opacity: 1;
        font-weight: 700;
        font-size: 3vh;
      }
    }

    .income,
    .expense,
    .balance {
      font-size: clamp(2.5vh, 2vh, 3vh);
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #000000;
      border: 0.5px solid var(--color-blue);
      h2,
      p {
        font-weight: 500;
        opacity: 0.7;
      }
    }

    .balance {
      max-height: fit-content;
      grid-column: 1/3;
      text-align: center;

      h2:hover,
      p:hover {
        opacity: 1;
        font-weight: 700;
        font-size: 3.5vh;
      }
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
      font-size: 1rem;
      span {
        color: var(--color-white);
        font-size: clamp(2.5vh, 2vh, 3vh);
      }
    }
    .salary-item {
      opacity: 0.7;
      font-weight: 400;
      font-size: clamp(2.5vh, 2vh, 3vh);
      background: #000000;
      border: 1px solid var(--color-blue);
      padding: clamp(3vh, 2vh, 4vh);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .salary-item:hover {
      opacity: 1;
      font-weight: 700;
      font-size: clamp(2.7vh, 2.2vh, 3.2vh);
    }
  }
`;

export default Dashboard;
