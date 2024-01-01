import { useState, useContext } from "react";
import { CustomButton } from "../util/Button";
import AuthContext from "../../context/AuthContext";
import NavigationContext from "../../context/NavigationContext";

export const Login = ({headerHeight})=>{
    const { loginUser } = useContext(AuthContext);
    const { navigate } = useContext(NavigationContext);
    const loginHandler = event=>{
        event.preventDefault();
        loginUser();
        navigate('/home')
    }
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <div style={{height: `calc(100vh - ${headerHeight}px`}} className={`login flex justify-center items-start mx-4`}>
          <form className='flex flex-col bg-white py-10 px-6 xl:p-12 rounded-lg w-[596px] shadow-lg'>
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