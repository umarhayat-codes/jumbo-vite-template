import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { eraseCookie, getCookie, setCookie } from "@jumbo/utilities/cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user , setUser] = useState("");
  const [userData, setUserData] = useState({
    "email":"",
    "user_id":""
  }); // To store the user data
  const [loading, setLoading] = useState(true);


  
  const checkAuthentication = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    
    console.log("token in auth provider", token);
    try {
      // setLoading(true)
      if (!token) {
        setLoading(false)
       
        return
      }
      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('response', response)
        const userData = response.data.user;
        console.log("userData", userData);
        console.log("response", response);
  
        // Set user data and mark as authenticated
        setUserData(userData);
        setIsAuthenticated(true);
        
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      localStorage.removeItem('token');
      setLoading(false)
      setIsAuthenticated(false); // If error occurs, mark as not authenticated
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    checkAuthentication();
  }, []);
  
  
  
  
  const logout = () => {
    eraseCookie("auth-user");
    localStorage.removeItem("token")
    localStorage.removeItem("enable")
    setIsAuthenticated(false);
    console.log('isAuthenticated on logout', isAuthenticated)
    // setUser("")
    // setUserData("")
  };

  
  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,checkAuthentication, userData, loading, logout, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}

    