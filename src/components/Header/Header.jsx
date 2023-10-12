import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from "react-bootstrap";
import './Header.css'

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase-config";

export default function Header ()
{
  
    const styleNormal = {
        backgroundColor: "#4E6C50",
        maxHeight: '90px',
        width: '100%',

        
        
      };
   
    const user = auth.currentUser;
    
   
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = async (event) => {
      event.preventDefault();
      try {
        await logout();
        navigate("/login");
        toast.success("Logged out successfully!");
        
      }
      catch(error) {
        console.log(error);
      }
    };

 
      return (
      
        
        <nav className="navbar navbar-expand-md bg-body-transparent " fixed="top"  style={styleNormal}>
            <div className="container-fluid">
            <div className="navbar-brand" onClick={()=>navigate("/")}>
            <img className="football-png" src="src\assets\football.svg" alt="logo" />
                <img className="logo-png" src="src\assets\Flash.png" alt="logo" />
            
            </div>
            
             
          
                <div className="buttons-container"> 
                <button className="account-btn" type="button" >
                  <i className="fas fa-user " aria-hidden="true" ></i>
                  {user && <span className="account-btn-text">{user.displayName}</span> }
                </button>
                <form onSubmit={handleLogout}>

                  <button className="logIn-btn" type="submit">
                  <i className="fa-solid fa-right-from-bracket" aria-hidden="true" alt="logout"></i>
                    <span className="logIn-btn-text"></span>
                  </button>
                </form>
                
                  

                
              
            
                
            </div>
            </div>
          

         
            
            </nav>
        
    )
}