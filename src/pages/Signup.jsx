import { useEffect, useState } from 'react'
import '../css/signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/loading.css'


const Signup = ({setLoad}) => {


    //diabled ku use pandra state variable
    const [disable,setDisable] = useState(false);
    //loading ku use pandra variable
    // const [load,setLoad] = useState(false)
    //navigate ku use pandra state variable
    const [success,setSuccess] = useState(false);
    // navigate the page to auto
    const navigate = useNavigate();
    //store the all form  datas in state variable
    const [data, setData] = useState({username:"",email:"",phone:"",password:"",conpassword:"",checkbox:""});
    //error state variable
    const [err,setErr] = useState("");
    //err backend send
    const [error,setError] = useState("");
    //handle the state in one function
    function HandleValue(e){
        setData({...data, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value})
    }
    //datas send the backend 
    async function HandleSubmit(e){
        e.preventDefault();
        let {password, conpassword, username, phone, email} = data;
        if(username,email,phone,password,conpassword === ""){
            setErr("Please fill all the fields");
            return;
        }else if(email.includes("@") === false || email.includes(".") === false || email.includes("gmail") === false){
            setErr("Please enter a valid email");
            return;
        }else if(phone.length !== 10){
            setErr("Please enter a valid phone number");
            return;
        }else if(password !== conpassword){
            setErr("Password do not match");
            return;
        }else if(password.length < 8){
            setErr("Password should be min 8 characters");
            return;
        }
        else if(!data.checkbox){
            setErr("Please accept the terms and conditions");
            return;
        }
        setErr("");
        
        try{
            const response = await axios.post('https://login-flower-app.onrender.com/api/signup',
                data,
                {withCredentials:true}
            );

            if(!response.data.success){
                setError(response.data.msg);
            }else{
                setError("")
            }

            if(response.status === 201){
                setSuccess(true);
                setLoad(true);
                setDisable(true);
            }

            if(response.data.success){
                setData({username:"",email:"",phone:"",password:"",conpassword:"",checkbox:false});
                setError("");

            }

        }catch(err){
            console.log(err.message)
         }

    }
    useEffect(()=>{
        let timer = null;
        if(success){
           timer = setTimeout(()=>{
                    navigate('/signin');
                    
                    },2000)
        }
        return ()=>{clearTimeout(timer)}
    },[success]);


    let cals = disable?'p-4 col-9  col-md-6 col-lg-5 col-xl-5 disable':'p-4 col-9  col-md-6 col-lg-5 col-xl-5'
  return (
    <div className="row align-items-center justify-content-center" id='signup'>
    <div className={cals} id='container' >
        <h1 className='m-0'>Registration Form</h1>
        <form method="post">
            <p className='err mt-2'>{error}</p>
            <div className="username">
                <label htmlFor="username" >Name</label>
                <input type="text" id='username' name='username' required onChange={HandleValue} value={data.username}/>
            </div>
            <div className="email">
                <label htmlFor="email" >Email</label>
                <input type="email" id='email' name='email' required onChange={HandleValue} value={data.email}/>
            </div>
            <div className="phone">
                <label htmlFor="phone" >Phone</label>
                <input type="number" id='phone' name='phone' required onChange={HandleValue} value={data.phone}/>
            </div>
            <div className="password">
                <label htmlFor="password" >Password</label>
                <input type="password" id='password' name='password' required onChange={HandleValue} value={data.password}/>
            </div>
            <div className="conpassword">
                <label htmlFor="conpassword" >Confirm Password</label>
                <input type="password" id='conpassword' name='conpassword' required onChange={HandleValue} value={data.conpassword}/>
            </div>
            <p className="err">{err}</p>
            <div className="checkbox mb-3">
                <input type="checkbox" name="checkbox" id="checkbox"  onChange={HandleValue} checked={data.checkbox} value={data.checkbox} required/>
                <label htmlFor="checkbox">I accepet all terms and conditions</label>
            </div>
            <div className=' text-center'>
                <button type="submit" className='button' onClick={HandleSubmit} >
                    CREATE ACCOUNT
                </button>
            </div>
            <div className=' text-center'>
                <p>Already have an account? <Link to="/signin" className=' text-decoration-none'>Sign in</Link></p>
            </div> 
        </form>
    </div>
    </div>
  )
}

export default Signup
