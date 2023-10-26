import React from "react";
import "./Favorite.css"
import { db } from "../../firebase-config";
import { collection, getDocs,onSnapshot } from "@firebase/firestore";
import { auth } from "../../firebase-config";
import LiveLeague from "../LiveComponents/LiveLeague";


export default function Favorite()
{
    const [favoriteMatches,setFavoriteMatches] = React.useState([]);
    const user = auth.currentUser;
    

    React.useEffect(() => {
        if (!user) {
          return;
        }
      
        const matchCollectionRef = collection(db, "users", user.uid, "football", "favorites", "matches");
      
        const unsubscribe = onSnapshot(matchCollectionRef, (snapshot) => {
          const updatedMatches = snapshot.docs.map((doc) => doc.data());
          
      
          const updatedMatchesSorted = {};
          updatedMatches.forEach((match) => {
            const competitionId = match.competition.id;
            if (!updatedMatchesSorted[competitionId]) {
              updatedMatchesSorted[competitionId] = [];
            }
            updatedMatchesSorted[competitionId].push(match);
          });
      
          setFavoriteMatches(updatedMatchesSorted);
        });
      
        return () => unsubscribe();
      }, [user, db]);
      

      
    return(
        <div className="favorite-container">
            <div className="favorite-container-header">
                <h1>Favorite</h1>
            </div>
            <div className="favorite-container-body">
                { user ? favoriteMatches && Object.keys(favoriteMatches).map((competitionId) => (
                    <LiveLeague 
                    key={competitionId}
                    id={competitionId}
                    competitionName={favoriteMatches[competitionId][0].competition.name}
                    competitionLogo={favoriteMatches[competitionId][0].competition.emblem}
                    matches={favoriteMatches[competitionId]}
                   startTime={favoriteMatches[competitionId][0].utcDate===null ? "":favoriteMatches[competitionId][0].date}
                    countryFlag={favoriteMatches[competitionId][0].area.flag}
                    isFavorite={true}
                    
                     />
                    ))
                  : <div className="favorite-container-body-login">
                      You are not logged in to see your favorite matches. Please log in to see your favorite matches.
                    </div>}
            </div>

        </div>
    )
}