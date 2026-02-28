import  { useEffect, useState } from 'react'
import '../css/dashbord.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Dashbord = ({setLoad}) => {

    const navigate = useNavigate();

    const [user,setUser] = useState();


    //fetch the user data;
    async function handleRes(){
        
        try{

            let response =await axios.get('https://login-flower-app.onrender.com/api/dashbord',{withCredentials:true});
            const {username } = response.data.user;
            console.log(response);
            setUser(username);

        }catch(err){
            console.log(err.response.data.message);
        }

    }
    //first time call 
    useEffect(()=>{
        setLoad(false);
        handleRes();
    },[]);

    async function handlelogout(){
        try{
            let res = await axios.get('https://login-flower-app.onrender.com/api/logout',{withCredentials:true})

            if(res.data.success){
                navigate('/signin');
            }
        }catch(err){
            console.log(err.res.data.message);
        }
    }

  return (
    <div className='' id='dashbord'>
        <Navbar logout = {handlelogout} />
        <h1 className='user mt-5' >Welcome <span className='color'>{user}!</span></h1>
        <div className="container-fulid">
        <div className='row justify-content-center align-items-center'>
            <button className='bon col-5' onClick={()=>{alert('Welcome ')}}>Hello </button>
        </div>
        </div>
    
    </div>
  )
}

export default Dashbord
