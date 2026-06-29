import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const savedUser = localStorage.getItem('user'); // searching for the user
    const token=localStorage.getItem('token');
    if(savedUser && token){
      setUser(JSON.parse(savedUser)); // agar user hai toh usko object mai convert krke set krdiya
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoading(false);
  },[]);

  const Login=(Userdata)=>{
    setUser(Userdata);
  };

  const Logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{user,loading,Login,Logout}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext