import React from "react";
import "./LiveMatch.css";
import LivePreview from "./LivePreview.jsx";

import { collection,setDoc, doc,deleteDoc,onSnapshot } from "firebase/firestore";
import {auth,db} from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

export default function LiveMatch(props)
{
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [favoriteMatches,setFavoriteMatches] = React.useState([]);
    const [isFavorite,setIsFavorite] = React.useState(props.isFavorite);
    React.useEffect(() => {
      function fetchFavoritesMatches() {

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
                updatedMatchesSorted[competitionId].push({
                  ...match,
                  isFavorite: true,
                });
              });
        
              setFavoriteMatches(updatedMatchesSorted);
            });
        
            return () => unsubscribe();
          }
          fetchFavoritesMatches();
          
          
      }, [user]);
      React.useEffect(() => {
        function checkIfFavorite() {
          if (!user) {
            return;
          }
          favoriteMatches &&
            Object.keys(favoriteMatches).forEach((competitionId) => {
              favoriteMatches[competitionId].forEach((match) => {
                if (match.id === props.id) {
                  setIsFavorite(true);
                }
              });
            });
        }
        checkIfFavorite();
      }, [favoriteMatches]);
    function getLocalStartDate(startTime) {
        const matchStartTime = new Date(startTime);

        const localStartDate = matchStartTime.toLocaleDateString([], {
            day: '2-digit',
            month: '2-digit',
        });
        const localStartTime = matchStartTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        const startDate = localStartDate + " " + localStartTime;
        return startDate;
      }
        const [preview, setPreview] = React.useState(false);
        function openPreview()
        {
            console.log("openPreview");
            setPreview(!preview);
        }


    
    
    const addtoFavorites = () =>
    {

        const matchCollectionRef = collection(db, "users", user.uid,"football","favorites","matches");
       
        
        
        try{
         const docRef = doc(matchCollectionRef, props.id.toString());
         setDoc(docRef, {...props,key : props.id,
            score: {
            halfTime: {
              home: props.halfTimeHomeTeamScore,
              away: props.halfTimeAwayTeamScore,
            },
            fullTime: {
              home: props.fullTimeHomeTeamScore,
              away: props.fullTimeAwayTeamScore,
            }},
             isFavorite: true});

        }catch(error)
        {
            console.log(error);
            
        }


    }
    function removeFromFavorites()
    {
        if(isFavorite === true)
        {
        const matchCollectionRef = collection(db, "users", user.uid,"football","favorites","matches");
        try{
            const docRef = doc(matchCollectionRef, props.id.toString());
            deleteDoc(docRef);
            setIsFavorite(false);
        }catch(error)
        {
            console.log(error);
            
        }
        }
    }

   
    return(
    <div className="container-LiveMatch">
        
        {props.status!=="Play" && 
           user && <div className="match-favorite">
          {isFavorite === undefined || isFavorite === false ? (
                <button className="match-favorite-btn" type="button" onClick={addtoFavorites}>
                  <i className="fa-regular fa-star" />
                </button>
              ) : (
                <button className="match-favorite-btn" type="button" onClick={removeFromFavorites}>
                  <i className="fa-solid fa-star" />
                </button>
              )}

        </div> }
        <div className="status-container">
        <div className="status">
            { props.status==="FINISHED" ? "Final" : props.status === "IN_PLAY" ? "Playing" : props.status ==="TIMED" ? getLocalStartDate(props.startTime) : props.status === "SCHEDULED" ? "TBD": props.status ==="PAUSED" ? "Paused" : " " }
        </div>
        </div>

        <div className="team-container">
            <div className="home-team" >
               
                <div className="team-name " onClick={()=>navigate("/" + props.competition.name +"/" + props.homeTeam.id)}>
                <img src={props.homeTeam.crest} alt="home-team" className="logo-Match"/>
                    {props.homeTeam.name}
                </div>
            
            </div>
            <div className="away-team" >
               
                <div className="team-name" onClick={()=>navigate("/" + props.competition.name +"/" + props.awayTeam.id)}>
                <img src={props.awayTeam.crest} alt="away-team" className="logo-Match"/>
                    {props.awayTeam.name}
                </div>
            </div>
        
        </div>
        
        <div className="score-Live">
            <div className="home-score">
                { props.fullTimeHomeTeamScore===null ? "-" : props.fullTimeHomeTeamScore}
            </div>
            <div className="away-score">
                {props.fullTimeAwayTeamScore===null ? "-" : props.fullTimeAwayTeamScore}
            </div>
            
        </div>
        
        
        <div className="score-HalfTime">
            
        <div className="home-score">
            {props.halfTimeHomeTeamScore!==null ?`(${props.halfTimeHomeTeamScore})`:""
            }
            
            </div>
            <div className="away-score" alt="HalfTime Score">
            {props.halfTimeAwayTeamScore!==null ?`(${props.halfTimeAwayTeamScore})`:""
            }
            </div>
          
        </div>
        <div className="preview">
        <button className="preview-title" type="submit" id="preview-btn" onClick={openPreview}>
          Preview
        </button>
        
      </div>
      <div className="live-preview">
          {preview && <LivePreview 

            matchId={props.matchId}
            competition={props.competition}
            stage={props.stage}
            matchday={props.matchday}
            homeTeam={props.homeTeam}
            awayTeam={props.awayTeam}
            startTime={getLocalStartDate(props.startTime)}
            status={props.status}
            group={props.group}
            fullTimeHomeTeamScore={props.fullTimeHomeTeamScore}
            fullTimeAwayTeamScore={props.fullTimeAwayTeamScore}
            date={props.date}
          />}
         
        </div>
        
    </div>
    )
}