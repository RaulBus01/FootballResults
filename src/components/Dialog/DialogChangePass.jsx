import React from "react";
import "./Dialog.css";

import { reauthenticateWithCredential, updatePassword,EmailAuthProvider } from "firebase/auth";
import { toast,ToastContainer } from "react-toastify";
import { auth } from "../../firebase-config";
export default function DialogChangePass(props)
{

    const user = auth.currentUser;
    
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (oldPassword == "" || newPassword == "" || confirmPassword == "") {
          toast.error("Please fill all the fields!");
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        if (newPassword.length < 6) {
          toast.error("Password must be at least 6 characters long!");
          return;
        }
      
        try {
          event.preventDefault();

          const credentials = {
            email: user.email,
            password: oldPassword,
          }
      
          await reauthenticateWithCredential(user, EmailAuthProvider.credential(credentials.email, credentials.password));
        
          if (oldPassword === newPassword) {
            toast.error("New password must be different from the old one!");
            return;
          }
      
          await updatePassword(user, newPassword);

          toast.success("Password changed successfully!");
          props.toggleDialog("changePassword");
        } catch (error) {
          if(error.code === "auth/invalid-login-credentials")
          {
            toast.error("Wrong password!");
            return;
          }
          toast.error(error.message);
        }
      };
      const [oldPasswordVisible, setOldPasswordVisible] = React.useState(false);
      const [newPasswordVisible, setNewPasswordVisible] = React.useState(false);
      const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
      const toggleOld = () => {
        setOldPasswordVisible(!oldPasswordVisible);

      }
      const toggleNew = () => {
        setNewPasswordVisible(!newPasswordVisible);

      }
      const toggleConfirm = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);

      }
    

    return (
        <div className="dialog-container">
            <div className="dialog">
                <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            closeOnClick={true}
            theme="dark"
            limit={1}
            pauseOnHover={false}
        />
                <h2 className="dialog-title">Change password</h2>
                <div className="dialog-input-container">
                    <label className="dialog-label" htmlFor="oldPassword">Old password</label>
                    <div className="dialog-form-container">
                      <input className="dialog-input" type={oldPasswordVisible ? "text" : "password"} id="oldPassword" placeholder="Old password" onChange={(event)=>setOldPassword(event.target.value)} />
                       <button className="dialog-input-unhide" onClick={toggleOld}>
                          <i className={oldPasswordVisible ? "fa fa-eye" : "fa fa-eye-slash"} id="iconEye"></i>
                       </button>
                    </div>
                    <label className="dialog-label" htmlFor="newPassword">New password</label>
                    <div className="dialog-form-container">
                      <input className="dialog-input" type={newPasswordVisible ? "text" : "password"} id="newPassword" placeholder="New password" onChange={(event) =>setNewPassword(event.target.value)} />
                       <button className="dialog-input-unhide" onClick={toggleNew}>
                          <i className={newPasswordVisible ? "fa fa-eye" : "fa fa-eye-slash"} id="iconEye"></i>
                       </button>
                    </div>
                    <label className="dialog-label" htmlFor="confirmPassword">Confirm password</label>
                    <div className="dialog-form-container">
                      <input className="dialog-input" type={confirmPasswordVisible ? "text" : "password"} id="confirmPassword" placeholder="Confirm password" onChange={(event)=>setConfirmPassword(event.target.value)}/>
                       <button className="dialog-input-unhide" onClick={toggleConfirm}>
                          <i className={confirmPasswordVisible ? "fa fa-eye" : "fa fa-eye-slash"} id="iconEye"></i>
                       </button>
                    </div>
                   
                </div>
                <div className="dialog-buttons">
                    <button className="dialog-button-cancel" onClick={()=>props.toggleDialog("changePassword")}>Cancel</button>
                    <button className="dialog-button-delete" onClick={handleChangePassword}>Change</button>
                </div>
            </div>
        </div>
    )
}
