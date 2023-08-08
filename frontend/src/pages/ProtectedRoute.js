import React, { useMemo, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {styled} from 'styled-components'
import bg from '../assets/bg.png'
import { MainLayout } from '../styles/Layouts'
import Orb from '../components/Orb/Orb'
import Navigation from '../components/Navigation/Navigation'
import Dashboard from '../components/Dashboard/Dashboard'
import Incomes from '../components/Incomes/Incomes'
import Expenses from '../components/Expenses/Expenses'
import { useGlobalContext } from '../context/GlobalContext'
import {toast} from "react-hot-toast"

const ProtectedRoute = ({ children }) => {
  const {showLoader,hideLoader,loggedInUser,getCurrentUser,setLoggedInUser} = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        showLoader();
        const response = await getCurrentUser();
        
        hideLoader();
        if (response.success) {
            console.log(response.data)
            setLoggedInUser(response.data)
            console.log(loggedInUser)

        } else {
          toast.error(response.message);
          navigate("/login");
        }
      } catch (error) {
        hideLoader();
        toast.error(error.message);
        navigate("/login");
      }
      
    };

    if (localStorage.getItem("token")) {
      getUser();
    } else {
      console.log("line 42")
      navigate("/login");
    }
  }, []);
    
  
  const [active, setActive] = useState(1);
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);
  

  const displayData = () => {

    switch(active) {
      case 1:
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Incomes/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
    }
  }




  return (
    <AppStyled  bg={bg} className='App'>

      {orbMemo}

      <MainLayout>

        <Navigation  active={active} setActive={setActive} />

        <main>
          {displayData()}
        </main>

      </MainLayout>

    </AppStyled>
  )
}

const AppStyled = styled.div `
  height: 100vh;
  background-image: url(${props=>props.bg});
  position : relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;



export default ProtectedRoute