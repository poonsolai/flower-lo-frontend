import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Signin'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from './components/Loading'
import { useState } from 'react'
import Dashbord from './pages/Dashbord'
import Forgetpassword from './pages/Forgetpassword'
const App = () => {
  //loading ku use pandra variable
  const [load,setLoad] = useState(false);
  const [forget,setForget] = useState(false);
  const navigate = useNavigate();
  //automaticlly open in signin page empty depadencie for run one time
  useEffect(()=>{
    navigate('/signin');
  },[])
  return (
    <div className='p-0 container-fluid'>
      {load && <Loading/>}
  
        <Routes>
          <Route path='/signup' element={<Signup load = {load} setLoad = {setLoad}/>}></Route>
          <Route path='/signin' element={<Login   setLoad = {setLoad} setForget={setForget}/>}></Route>
          <Route path='/dashbord' element={<Dashbord setLoad={setLoad} />}  ></Route>
          <Route path='/signin/forgetpassword' element={<Forgetpassword setForget={setForget} forget={forget}/>} ></Route>
        </Routes>

    </div>
  )
}

export default App

