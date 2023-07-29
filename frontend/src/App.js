import React, { useMemo, useState } from 'react'
import {styled} from 'styled-components'
import bg from './assets/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'


const App = () => {


  const [active,setActive] = useState(1);  // for changing the state of links in sidebar
  const orbMemo = useMemo(()=> {
    return <Orb/>
  },[])
 

  


  return (
    <AppStyled  bg={bg} className='App'>

      {orbMemo}

      <MainLayout>

        <Navigation active={active} setActive={setActive} />

      </MainLayout>

    </AppStyled>
  )
}

const AppStyled = styled.div `
  height: 100vh;
  background-image: url(${props=>props.bg});
  position : relative;
`;



export default App