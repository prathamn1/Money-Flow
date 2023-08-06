import React, { useContext, useState } from "react"
import axios from 'axios'


// const BASE_URL = "https://money-flow-9gf2.onrender.com/api/v1/";
const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        // const response = await axios.post(`${BASE_URL}add-income`, income)
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {

        const response = await axios.get(`${BASE_URL}get-all-incomes`)
        setIncomes(response.data)
        // console.log(response.data)
    }

    const deleteIncome = async (id) => {
        // const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        // const response = await axios.post(`${BASE_URL}add-expense`, income)
        await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-all-expenses`)
        setExpenses(response.data)
        // console.log(response.data)
    }

    const deleteExpense = async (id) => {
        // const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }



    ////////////////////////////////////////////////////////////


    const LoginUser = async (user) => {
        try {
          const response = await axios.post(`${BASE_URL}login`, user);
          return response.data;
        } catch (error) {
          return error.response.data;
        }
      };
      
    const RegisterUser = async (user) => {
          try {
            const response = await axios.post(`${BASE_URL}register`, user);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
        };
        
      
    const GetCurrentUser = async () => {
          try {
            const response = await axios.get("/api/users/get-current-user");
            return response.data;
          } catch (error) {
            return error.response.data;
          }
        };

    




    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    ////////////////////////////////////////////////////////////




    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,

            GetCurrentUser,
            LoginUser,
            RegisterUser,
            isLoading,
            showLoader,
            hideLoader

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}