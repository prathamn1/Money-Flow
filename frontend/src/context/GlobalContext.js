import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

let BASE_URL = "https://money-flow-9gf2.onrender.com/api/v1/";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:5000/api/v1/";
}

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");


  const addIncome = async (income) => {
    showLoader();
    try {
      income.userId = loggedInUser;
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes(loggedInUser._id);
      toast.success("Income Added Successfully", 
        {
          position : 'bottom-right',
          style : {
            color: 'green'
          }
        });
    } catch {
      toast.error("Couldn't add Income");
    }finally {
      hideLoader();
    }
  };

  const getIncomes = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}get-all-incomes/${id}`);
      setIncomes(response.data);
    } catch {
      toast.error("Connection Error! Couldn't fetch Incomes");
    }
  };

  const deleteIncome = async (id) => {
    showLoader();
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes(loggedInUser._id);
      toast.success("Income Added Successfully", 
        {
          position : 'bottom-right',
          style : {
            color: 'green'
          }
        });
    } catch {
      toast.error("Connection Error! Couldn't Delete Income");
    }
    finally {
      hideLoader();
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };


  const addExpense = async (expense) => {
    showLoader();
    try {
      expense.userId = loggedInUser;
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses(loggedInUser._id);
      toast.success("Expense Added Successfully", 
        {
          position : 'bottom-right',
          style : {
            color: 'red'
          }
        });
    } catch {
      toast.error("Connection Error! Couldn't add Expense");
    }
    finally {
      hideLoader();
    }
  };

  const getExpenses = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}get-all-expenses/${id}`);
      setExpenses(response.data);
    } catch {
      toast.error("Connection Error! Couldn't fetch Expenses");
    }
  };

  const deleteExpense = async (id) => {
    showLoader();
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses(loggedInUser._id);
      toast.success("Expense Deleted Successfully", 
        {
          position : 'bottom-right',
          style : {
            color : 'red'
          }
        }
      )
    } catch {
      toast.error("Connection Error! Couldn't delete Expense");
    }
    finally {
      hideLoader();
    }
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((exp) => {
      totalExpense = totalExpense + exp.amount;
    });
    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history;
  };

  ////////////////////////////////////////////////////////////

  


  const loginUser = async (user) => {
    
    try {
      const response = await axios.post(`${BASE_URL}login`, user);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const registerUser = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}register`, user);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}get-current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const logOutUser = async () => {
    showLoader();
    try {
      toast.success("Logged Out Successfully");
      localStorage.removeItem("token");
      setLoggedInUser({});
      window.location.href = "/login";
    } catch (err) {
      toast.error("Failed Logging Out");
      return err.response.data;
    } finally {
      hideLoader();
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [rotateLogo, setRotateLogo] = useState(false);
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  ////////////////////////////////////////////////////////////

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
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
        setLoggedInUser,
        rotateLogo,
        setRotateLogo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
