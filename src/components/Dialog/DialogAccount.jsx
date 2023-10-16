import React from "react";
import "./Dialog.css";


export default function DialogAccount(props)
{
    return (
        <div className="dialog-container">
            <div className="dialog">
                <h2 className="dialog-title">Account</h2>
                <p className="dialog-text">Account info</p>
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