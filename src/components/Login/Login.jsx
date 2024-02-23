import { useState, useContext } from "react";
import { CustomButton } from "../util/Button";
import AuthContext from "../../context/AuthContext";

export const Login = ()=>{
    const { loginUser } = useContext(AuthContext);
    const loginHandler = event=>{
        event.preventDefault();
        loginUser();
    }
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <div className={`login w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6`}>
          <form className='flex flex-col px-4 py-3 bg-white rounded-lg shadow-lg'>
            <div className="login-input py-2 flex flex-col">
              <label className='inpt-label'>Username</label>
              <input type="text" autoComplete="username"  value={username} onChange={e=>setUsername(e.target.value)} autoFocus placeholder="Enter your username." required className='inpt' />
            </div>
            <div className="password-input flex flex-col pb-2">
              <label className='inpt-label'>Password</label>
              <input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password." required className='inpt'/>
            </div>
            <CustomButton onClick={loginHandler} >Login</CustomButton>
          </form>
      </div>
    );
}