import React from "react";
import "./Dialog.css";
import {auth,db} from "../../firebase-config";
import { collection,setDoc, doc,deleteDoc,onSnapshot } from "firebase/firestore";

export default function DialogAccount(props)
{
    const user = props.user;
    const [favoriteTeam,setFavoriteTeam] = React.useState(props.favoriteTeam);
    function getFavoriteTeam()
    {
        if(user)
        {
            const favoriteTeamRef = collection(db,"users",user.uid,"football","favorites","team");
            const unsubscribe = onSnapshot(favoriteTeamRef,(snapshot)=>{
                const favoriteTeam = snapshot.docs.map((doc)=>doc.data());
                setFavoriteTeam(favoriteTeam[0]);
            });
            return ()=>unsubscribe();
        }
    }
    React.useEffect(() => {
        getFavoriteTeam();
    }, [user]);
      

    
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
                        <div className="account-info-favorite-team-label">
                        <p className="dialog-text-favorite">Favorite team:</p>
                        {favoriteTeam && <span className="dialog-text-favorite-team-name">{" " + favoriteTeam.name }</span> }
                        
                        {/* <img src={props.favoriteTeam.crest} alt="team-logo" className="logo-Match"/> */}
                        </div>
                        
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