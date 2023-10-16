import React from "react";
import "./Dialog.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase-config";
export default function DialogDelete(props)
{

    const user = auth.currentUser;
    const navigate = useNavigate();
    const { deleteAccount } = useAuth();
    function handleDelete ()
     {
        if (user) {
            deleteAccount()
                .then(() => {
                navigate("/login");
                toast.success("Account deleted successfully!");
                })
                .catch((error) => {
                console.log(error);
                });
        }
      };
    return (
        <div className="dialog-container">
            <div className="dialog">
                <h2 className="dialog-title">Delete account</h2>
                <p className="dialog-text">Are you sure you want to delete {user.email} account ?</p>
                <div className="dialog-buttons">
                    <button className="dialog-button-cancel" onClick={()=>props.toggleDialog("deleteAccount")}>Cancel</button>
                    <button className="dialog-button-delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
