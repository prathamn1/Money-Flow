import React, { useContext, useState } from "react"
import axios from 'axios'


// const BASE_URL = "https://money-flow-9gf2.onrender.com/api/v1/";
const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [loggedInUser,setLoggedInUser] = useState({})
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        // const response = await axios.post(`${BASE_URL}add-income`, income)
        income.userId = loggedInUser; 
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        
        const response = await axios.get(`${BASE_URL}get-all-incomes/${loggedInUser._id}`)
        setIncomes(response.data)
        console.log(incomes)
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
    const addExpense = async (expense) => {
        expense.userId = loggedInUser;
        await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-all-expenses/${loggedInUser._id}`)
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


    const loginUser = async (user) => {
        try {
          const response = await axios.post(`${BASE_URL}login`, user);
          return response.data;
        } catch (error) {
          return error.response.data;
        }
    }
      
    const registerUser = async (user) => {
          try {
            const response = await axios.post(`${BASE_URL}register`, user);
            
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
        
      
    const getCurrentUser = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${BASE_URL}get-current-user`,{headers: {
                Authorization: `Bearer ${token}`,
              },});
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.log("catch GetCurrentUser()")
            return error.response.data;
            
        }
    }

    

    const logOutUser =  () => {
        localStorage.removeItem('token');
        setLoggedInUser({});
        window.location.href='/login'
    }


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

            getCurrentUser,
            loginUser,
            registerUser,
            logOutUser,
            isLoading,
            showLoader,
            hideLoader,
            loggedInUser,
            setLoggedInUser

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}