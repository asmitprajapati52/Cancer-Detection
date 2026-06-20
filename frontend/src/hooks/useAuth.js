import {useContext} from 'react';
import AuthContext  from '../context/AuthContext';

const useAuth=()=>{
    return useContext(AuthContext);// resolve prop drilling issue and return the context value
}

export default useAuth;