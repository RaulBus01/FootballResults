import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase-config";
import DialogDelete from "../Dialog/DialogDelete.jsx";
import DialogChangePassword from "../Dialog/DialogChangePass.jsx";
import DialogAccount from "../Dialog/DialogAccount.jsx";
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
   
  
    const [showAccountInfoDialog, setShowAccountInfoDialog] = React.useState(false);
    const [showChangePasswordDialog, setShowChangePasswordDialog] = React.useState(false);
    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = React.useState(false);
  
    const toggleDialog = (dialogType) => {
      switch (dialogType) {
        case 'accountInfo':
          setShowAccountInfoDialog(!showAccountInfoDialog);
          break;
        case 'changePassword':
          setShowChangePasswordDialog(!showChangePasswordDialog);
          break;
        case 'deleteAccount':
          setShowDeleteAccountDialog(!showDeleteAccountDialog);
          break;
        default:
          break;
      }
    }
 
      return (
      
        
        <nav className="navbar navbar-expand-md bg-body-transparent " fixed="top"  style={styleNormal}>
            <div className="container-fluid">
            <div className="navbar-brand" onClick={()=>navigate("/")}>
            <img className="football-png" src="src\assets\football.svg" alt="logo" />
                <img className="logo-png" src="src\assets\Flash.png" alt="logo" />
            
            </div>
            
             
          
            <div className="buttons-container">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="accountDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {user ? <i className="fa-solid fa-user-check"></i> : <i className="fas fa-user" aria-hidden="true"></i> }
                {user && <span className="account-btn-text">{user.displayName}</span>}
              </button>
              {user && 
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li className="dropdown-list-item"> 
                <i className="fa-solid fa-file-invoice"></i> 
                <button className="dropdown-item" type="button" onClick={()=>toggleDialog("accountInfo")}>Account Information</button>
                </li>
                <li className="dropdown-list-item">
                <i className="fa-solid fa-key"></i>
                <button className="dropdown-item" type="button" onClick={()=>toggleDialog("changePassword")}>Change Password</button>
                </li>
                <li className="dropdown-list-item">
                  <i className="fa-regular fa-trash-can"></i>
                  <button className="dropdown-item" type="button" onClick={()=>toggleDialog("deleteAccount")}>Delete Account</button></li>
                <li className="dropdown-list-item">
                  <i className="fa-solid fa-sign-out"></i>
                  <button className="dropdown-item" type="submit" onClick={handleLogout}>Logout</button>
                </li>
              </ul> 
                
              }
            </div>
          </div>

            </div>
              {showDeleteAccountDialog && <DialogDelete toggleDialog={toggleDialog} />}
              {showChangePasswordDialog && <DialogChangePassword toggleDialog={toggleDialog} />}
              {showAccountInfoDialog && <DialogAccount toggleDialog={toggleDialog} />}
            
            </nav>
        
    )
}