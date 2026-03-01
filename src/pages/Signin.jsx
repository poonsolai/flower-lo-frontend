import { useEffect, useState } from 'react'
import '../css/signin.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signin = ({setLoad, setForget}) => {
    //navigate the other page 
    const navigate = useNavigate();
    //call auth
    async function callAuth(){
        let res = await axios.get('https://login-flower-app.onrender.com/api/auth',{withCredentials:true});
        if(res.data.success){
            navigate('/dashbord');
        }
    }
    //call one time
    useEffect( ()=>{
        setLoad(false);
        // callAuth();
    },[]);

    //error show pannura variable
    const [error,setError] = useState('');
    const [succ,setSucc] = useState('')

    //state variable
    const [success,setSuccess] = useState(false);



    //store the all form  datas in state variable
    const [data, setData] = useState({username:"",password:""});
    //handle the state in one function
    function HandleValue(e){
        setData({...data, [e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        setLoad(true);  
        e.preventDefault();
        try{
            const response = await axios.post('https://login-flower-app.onrender.com/api/signin',
                data,{
                    withCredentials:true
                }
            );
            
            setSucc(response.data.message);

            if(response.data.success){
                setError("")
                setSuccess(true);
            }
        }catch(err){
            setLoad(false);
            setError(err.response.data.message);
        }

    }

    useEffect(()=>{
        let timer = setTimeout(()=>{
            if(success){
                navigate('/dashbord');
            }
        },2000)

        return ()=>{clearTimeout(timer)}
    },[success]);

  return (
    <div className="row align-items-center justify-content-center" id='signin'>
    <div className='p-4 col-9  col-md-6 col-lg-5 col-xl-5 ' id='container'>
        <h1 className=' text-center'>Login</h1>
        <form method="post" >
            <div className="username">
                <label htmlFor="username" >SIGN IN USERNAME</label>
                <input type="text" id='username' name='username' required onChange={HandleValue} value={data.username}/>
            </div>

            <div className="password">
                <label htmlFor="password" >PASSWORD</label>
                <input type="password" id='password' name='password'  required onChange={HandleValue} value={data.password}/>
            </div>
            <div className="forget mt-2 text-danger">
                <Link to={'/signin/forgetpassword'} onClick={()=>{setForget(false)}}>Forget Password</Link>
            </div>
            <div className="err">
                <p>{error}</p>
            </div>
            <div className="suc">
                <h5 style={{color:'green'}}>{succ}</h5>
            </div>
            <div className='btn-box text-center'>
                <button type="submit" onClick={handleSubmit} className='px-5 py-2'>
                    Sign in
                </button>
            </div>
            <div className=' text-center'>
                <p>Dọn't hạve an account?  <Link to="/signup" className=' text-decoration-none'>create a account</Link></p>
            </div> 
        </form>
    </div>
    </div>
  )
}

export default Signin
