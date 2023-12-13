import { useState } from "react";

export const Login = ({headerHeight})=>{
    const loginHandler = event=>{
        event.preventDefault();
    }
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <div style={{height: `calc(100vh - ${headerHeight}px`}} className={`login flex justify-center items-start mx-4`}>
          <form className='flex flex-col bg-white p-12 rounded-lg w-[596px] shadow-lg'>
            <div className="login-input py-2 flex flex-col">
              <label className='inpt-label'>Username</label>
              <input type="text" autoComplete="username"  value={username} onChange={e=>setUsername(e.target.value)} autoFocus placeholder="Enter your username." required className='inpt' />
            </div>
            <div className="password-input flex flex-col pb-2">
              <label className='inpt-label'>Password</label>
              <input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password." required className='inpt'/>
            </div>
            <button onClick={loginHandler} className='btn'>Login</button>
          </form>
      </div>
    );
}