import React from "react";
import "./Dialog.css";


export default function DialogAccount(props)
{
    return (
        <div className="dialog-container">
            <div className="dialog-account">
                <h2 className="dialog-title">Account Info </h2>
                <div className="account-info" >
                    <p className="dialog-text">Email:{props.email}</p>
                    <p className="dialog-text">Username:{props.username}</p>
                </div>
               
             

                <div className="dialog-buttons">
                    <button className="dialog-button-cancel" onClick={()=>props.toggleDialog("accountInfo")}>Cancel</button>
                    <button className="dialog-button-delete" onClick={()=>
                    {
                        props.toggleDialog("accountInfo")
                        props.toggleDialog("changePassword")
                    }
                    }>Change password</button>
                    <button className="dialog-button-delete" onClick={()=>
                    {
                        props.toggleDialog("accountInfo")
                        props.toggleDialog("deleteAccount")
                    }
                    }>Delete account</button>
                </div>
            </div>
        </div>
    )
}