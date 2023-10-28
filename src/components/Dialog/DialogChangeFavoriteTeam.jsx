import React from 'react';
import "./Dialog.css"

import SearchResults from "../SearchBar/SearchResults.jsx";
import {auth,db} from "../../firebase-config";
import { collection,setDoc,getDocs,doc,deleteDoc } from "firebase/firestore";


export default function DialogChangeFavoriteTeam(props) {
    
    const [results, setResults] = React.useState([]);   
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [changeFavoriteTeam,setChangeFavoriteTeam] = React.useState(false);
    function caseInsensitiveSearch(teams, searchTerm) {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return teams.filter(team => team.name.toLowerCase().includes(lowercaseSearchTerm));
      }
    const fetchTeams = async (searchTerm) => {
        setLoading(true);
        
        const teamsRef = collection(db, 'teams'); 
        const querySnapshot = await getDocs(teamsRef);
  
        const teams = [];
        querySnapshot.forEach((doc) => {
          teams.push({ id: doc.id, ...doc.data() });
        });
  
        const filteredTeams = caseInsensitiveSearch(teams, searchTerm);
        setResults(filteredTeams);
  
        setLoading(false);
    };

        
     
      const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        fetchTeams(newSearchTerm);
      };
      const handleFavorite = async (team) => {
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        try {
         const docRef = doc(userRef,"football","favorites","team","0");
         setDoc(docRef,team);
            props.toggleDialog("changeFavoriteTeam");
            
        }
        catch(error) {
          console.log(error);
        }
        }
  
    
        return (
            <div className="dialog-container">
                <div className="dialog">
                <h2 className="dialog-title">Change favorite team</h2>
                    <div className="dialog-buttons-label">
                    <label className="dialog-label">Search for a team</label>
                    <input
                        type="text"
                        placeholder="Search teams..."
                        value={searchTerm}
                        className="search-bar"
                        onChange={handleInputChange}
                    />

                    {searchTerm ? <SearchResults results={results} handleFavorite={handleFavorite}/> : <div></div>}
                        <button className="dialog-button-cancel" onClick={()=>props.toggleDialog("changeFavoriteTeam")}>Cancel</button>
                        
                    </div>
                </div>
            </div>
        )
}
    
