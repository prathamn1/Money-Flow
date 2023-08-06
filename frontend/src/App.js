import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { useGlobalContext } from './context/GlobalContext'
// import {Dna} from 'react-loader-spinner'
import Loader from './utils/Loader'


const App = () => {

  const {isLoading} = useGlobalContext();

  return (
    <>
      {/* {isLoading && (
        <div className="loader-container">
            <Dna
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                margin: 'auto',
                transform: 'translateY(-50%)'
              }}
              wrapperClass="dna-wrapper"
            />
        </div>
      )} */}
      {isLoading && (<Loader/>)}
      <Toaster position="top-center" reverseOrder={false} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App








































// import React, { useMemo, useState } from 'react'
// import {styled} from 'styled-components'
// import bg from './assets/bg.png'
// import { MainLayout } from './styles/Layouts'
// import Orb from './components/Orb/Orb'
// import Navigation from './components/Navigation/Navigation'
// import Dashboard from './components/Dashboard/Dashboard'
// import Incomes from './components/Incomes/Incomes'
// import Expenses from './components/Expenses/Expenses'
// import { useGlobalContext } from './context/GlobalContext'



// const App = () => {


//   const [active,setActive] = useState(1);  // for changing the state of links in sidebar
//   const orbMemo = useMemo(()=> {
//     return <Orb/>
//   },[])
  

//   // const global = useGlobalContext();
//   useGlobalContext();
//   // console.log(global);


//   const displayData = () => {
//     switch(active) {
//       case 1:
//         return <Dashboard/>
//       case 2:
//         return <Dashboard/>
//       case 3:
//         return <Incomes/>
//       case 4:
//         return <Expenses/>
//       default:
//         return <Dashboard/>
//     }
//   }


//   return (
//     <AppStyled  bg={bg} className='App'>

//       {orbMemo}

//       <MainLayout>

//         <Navigation active={active} setActive={setActive} />

//         <main>
//           {displayData()}
//         </main>

//       </MainLayout>

//     </AppStyled>
//   )
// }

// const AppStyled = styled.div `
//   height: 100vh;
//   background-image: url(${props=>props.bg});
//   position : relative;
//   main{
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar{
//       width: 0;
//     }
//   }
// `;



// export default App




































