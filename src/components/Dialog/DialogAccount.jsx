import React from "react";
import "./Dialog.css";


export default function DialogAccount(props)
{
    
    return (
        <div className="dialog-container">
            <div className="dialog-account">
                <h2 className="dialog-title">Account Info </h2>
                <div className="account-info" >
                    <div className="account-info-email">
                        <p className="dialog-text">Email:{" "+props.email}</p>
                       
                    </div>
                    <div className="account-info-username">
                        <p className="dialog-text">Username:{" " +props.username}</p>
                        <button className="dialog-button-edit" onClick={()=>props.toggleDialog("changeUsername")}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                    <div className="account-info-favorite-team">
                        <p className="dialog-text">Favorite team:{" " +props.favoriteTeam}</p>
                        <button className="dialog-button-edit" onClick={()=>props.toggleDialog("changeFavoriteTeam")}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                   
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