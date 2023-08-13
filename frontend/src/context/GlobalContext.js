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
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    try {
      income.userId = loggedInUser;
      await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
        setError(err.response.data.message);
      });
      getIncomes(loggedInUser._id);
    } catch {
      toast.error("Couldn't add Income");
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
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes(loggedInUser._id);
    } catch {
      toast.error("Connection Error! Couldn't Delete Income");
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (expense) => {
    try {
      expense.userId = loggedInUser;
      await axios.post(`${BASE_URL}add-income`, expense).catch((err) => {
        setError(err.response.data.message);
      });
      getIncomes(loggedInUser._id);
    } catch {
      toast.error("Connection Error! Couldn't add Expense");
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
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses(loggedInUser._id);
    } catch {
      toast.error("Connection Error! Couldn't delete Expense");
    }
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
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
      // console.log(response.data)
      return response.data;
    } catch (error) {
      // console.log("catch GetCurrentUser()")
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
