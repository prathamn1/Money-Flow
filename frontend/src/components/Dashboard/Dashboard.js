import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { ruppee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    })

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="stats-con">
                    <h1 className='headline-transaction'>All Transactions</h1>
                    <h1 className='headline-history'>Recent History</h1>
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {ruppee} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {ruppee} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {ruppee} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        
                        <History />

                      
                          <h2 className="salary-title">Min <span>Income</span>Max</h2>
                          <div className="salary-item">
                              <p>
                                  ${Math.min(...incomes.map(item => item.amount))}
                              </p>
                              <p>
                                  ${Math.max(...incomes.map(item => item.amount))}
                              </p>
                          </div>
                          <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                          <div className="salary-item">
                              <p>
                                  ${Math.min(...expenses.map(item => item.amount))}
                              </p>
                              <p>
                                  ${Math.max(...expenses.map(item => item.amount))}
                              </p>
                          </div>
                        </div>
                    </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .headline-transaction {
          grid-column: 1 / 3;
        }

        .headline-history {
          grid-column : 4 / 7;
          grid-row-start: 1;
        }
        
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    max-width: 240px;
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 1rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 1.7rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1rem;
                span{
                    font-size: 1.5rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.2rem;
                }
            }
        }
    }
`;

export default Dashboard