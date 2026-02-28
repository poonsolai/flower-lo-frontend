import { useState } from 'react';
import '../css/forget.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Forgetpassword = ({forget, setForget}) => {

    const navigate = useNavigate();
    const [userdata,setUserdata] = useState({username:'',password:''}) 
    const [showpass,setShowpass] = useState(false);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    
    //handle input feild
    function Usernamehandle(e){
        setUserdata({...userdata,[e.target.name]:e.target.value});
        // setData({...data, [e.target.name]:e.target.value})
        
    }


    //handle cancel 
    function HandleCancel(e){
        // e.preventDefault();
        setForget(true);
       if(forget){
         navigate('/signin');
       }

    }
    //handle next btn
    async function HandleNext(e){

        let {username} = userdata;
        e.preventDefault();
        if(username === ""){
            setError("Please enter username");
            return;
        }
        try{
            let res =await axios.get(`https://login-flower-app.onrender.com/api/sigin/forgetpassword/${userdata.username}`,{
                withCredentials:true
            });

            setError(res.data.message);     

            if(res.data.success){
                setShowpass(true);
            }
        }catch(err){
            console.log(err)
        }

    }
    //handle forgetpassword
    async function HabdlePassword(e) {

        let {password} = userdata;
        e.preventDefault();
        if(password === ""){
            setError("Please fill all the fields");
            return;
        }else if(password.length < 8){
            setError("Password should be min 8 characters");
            return;
        }
        setError("");
        try{
            let res = await axios.patch('https://login-flower-app.onrender.com/api/sigin/forgetpassword',{password:password},{
                withCredentials:true
            });
            setSuccess(res.data.message);
            if(res.data.success){
                navigate('/signin')
            }
        }catch(err){
            console.log(err);
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();   // 🔥 MUST
        console.log("Now Enter won't change route");
    };
  return (
    <div id='forget' className='container-fulid'>
        <div className='row align-items-center justify-content-center ' >
            <div className=' border-black border p-2 col-10 col-md-6' id='box'>
                <h1 className='pink pb-4'>Flower </h1>
                <form className="" onSubmit={handleSubmit}>
                    {
                        !showpass && 
                        <input type="text"  id='username' name='username' placeholder='Enter your username' required onChange={Usernamehandle} />
                    }
                    {
                        showpass && 
                        <input type="password"  id='password' name='password' placeholder='Enter new password' className='mt-2' required onChange={Usernamehandle}/>
                    }
                    <div className="errormessage mt-2 ms-1 text-danger" style={{fontWeight:900}}>
                        <p>{error}</p>
                    </div>
                    <div className="errormessage mt-2 ms-1 " style={{fontWeight:900,color:'green'}}>
                        <p>{success}</p>
                    </div>
                    <div className='btnbox'>
                        <button className='buttonf' onClick={HandleCancel}>
                            cancel
                        </button>
                        { !showpass && 
                            <button className='buttonf bg-primary text-light' type='submit' onClick={HandleNext} >
                                next
                            </button>
                        }
                        { showpass && 
                            <button className='buttonf bg-primary text-light' type='submit' onClick={HabdlePassword}>
                                save password
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Forgetpassword
