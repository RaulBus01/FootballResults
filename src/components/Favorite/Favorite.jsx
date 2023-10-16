import React from "react";
import "./Favorite.css"
import { db } from "../../firebase-config";
import { collection, getDocs,onSnapshot } from "@firebase/firestore";
import { auth } from "../../firebase-config";
import LiveLeague from "../Main/LiveComponents/LiveLeague";

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
          console.log("Updated matchList:", updatedMatches);
      
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
      
      console.log(favoriteMatches[2002]);
      
    return(
        <div className="favorite-container">
            <div className="favorite-container-header">
                <h1>Favorite</h1>
            </div>
            <div className="favorite-container-body">
                { favoriteMatches && Object.keys(favoriteMatches).map((competitionId) => (
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
                    ))}
            </div>
        </div>
    )
}