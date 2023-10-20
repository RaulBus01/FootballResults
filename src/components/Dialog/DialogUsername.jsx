import React from "react";
import { ToastContainer,toast } from "react-toastify";    
import "./Dialog.css";
import { updateProfile,reauthenticateWithCredential,EmailAuthProvider } from "firebase/auth";
export default function DialogUsername(props)
{
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleChangeUsername = async (event) => {
        event.preventDefault();
        if (username == "" || password == "") {
          toast.error("Please fill all the fields!");
          return;
        }
        if(username === props.username)
        {
            toast.error("New username must be different from the old one!");
            return;
        }
        if (username.length < 6) {
          toast.error("Username must be at least 6 characters long!");
          return;
        }
        try {
          event.preventDefault();
          const credentials = {
            email: props.user.email,
            password: password,
          }
      
          await reauthenticateWithCredential(props.user, EmailAuthProvider.credential(credentials.email, credentials.password));
          await updateProfile(props.user, { displayName: username });
          props.toggleDialog("changeUsername");
          toast.success("Username changed successfully!");
        } catch (error) {
          toast.error(error.message);
        }
    }

    return(
        <div className="dialog-container">
            <div className="dialog">

          
            <div className="dialog-title">
                <h2> Change username</h2> 
            </div>
            <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            closeOnClick={true}
            theme="dark"
            limit={1}
            pauseOnHover={false}
        />
            <div className="dialog-input-container">
                <label className="dialog-label">New username</label>
                <input className="dialog-input" type="text" placeholder="New username" onChange={(event)=>setUsername(event.target.value)}></input>
                <label className="dialog-label">Password</label>
                <input className="dialog-input" type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}></input>
                <div className="dialog-buttons">
                    <button className="dialog-button-cancel" onClick={()=>props.toggleDialog("changeUsername")}>Cancel</button>
                    <button className="dialog-button-delete" onClick={handleChangeUsername} >Change</button>
                </div>
            </div>
            </div>
        </div>
    )
}