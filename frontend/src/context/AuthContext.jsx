import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const savedUser = localStorage.getItem('user'); // searching for the user
    if(savedUser){
      setUser(JSON.parse(savedUser)); // agar user hai toh usko object mai convert krke set krdiya
    }
    setLoading(false);
  },[]);

  const Login=(Userdata)=>{
    setUser(Userdata);
    localStorage.setItem('user',JSON.stringify(Userdata));
  };

  const Logout=()=>{
    setUser(null);
    localStorage.removeItem('user');
  }
  return (
    <AuthContext.Provider value={{user,loading,Login,Logout}}>
      {!loading && children}

    </AuthContext.Provider>
  )
}

export default AuthContext