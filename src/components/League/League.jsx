import e from "cors";
import React from "react";  
import "./League.css";
import { useState } from "react";

import Matchday from "./Matchday";
import { pl } from "date-fns/locale";
export default function League()   
{
    const [selectedButton, setSelectedButton] = useState("last-results");


    const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);
      
    };
    const [competitionData,setCompetitonData] = useState([]);
    const [playedMatches,setPlayedMatches] = useState([]);
    const [upcomingMatches,setUpcomingMatches] = useState([]);

    function groupByMatchday(matches) {
        const groupedMatches = [];
        matches.forEach((match ) =>
        {
            const matchday = match.matchday;
            if(!groupedMatches[matchday])
            {
                groupedMatches[matchday] = [];
            }
            
          
            groupedMatches[matchday].unshift(
                { 
                match: match,
                key: match.id
             });
            
        }
        )
        
        return groupedMatches;
    }
   

    React.useEffect(() => {
      try {
        const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
        const url = 'v4/competitions/2014/matches?season=2023';
     
        //const querryDate = formatDate(date);
      
        const query = url;
        const options = {
          method: 'GET',
          headers: { 'X-Auth-Token': apiKey },
          
         
        };
        fetch(query, options)
        .then(res => res.json())
        .then(data => {
      
          const finishedMatches = data.matches.filter(match => match.status === 'FINISHED');
          const upcomingMatches = data.matches.filter(match => match.status === 'SCHEDULED' || match.status === 'TIMED');
         
    
       
          setCompetitonData(data);
        
         let groupedMatches = [];  
         groupedMatches = groupByMatchday(finishedMatches)
         groupedMatches.reverse();

         
     
            setPlayedMatches(groupedMatches);
            console.log(groupedMatches);
        
        })
        .catch(error => {
          console.log(error);
        });
    }catch(error)
        {
            console.log(error);
            
        };
    },[]);
    
    
    

   
    
 
   

    return (
        <div className="container-league">
            <div className="container-league-header">
                <div className="league-header">
                    <div className="league-header-logo">
                        <img src="src/assets/LeagueLogo/logo-EPL.png" alt="logo" className="logo-header"/>
                    </div>
                    <div className="detail-league">
                    
                        <div className="league-header-name">
                            <h1>Premier League</h1>
                        </div>
                        <div className="league-header-season">
                            <button className="season-btn">
                                <h2>2023/2024</h2>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container-league-body">
                    <div className="container-league-body-header">
                    <div className="league-body-header">
                        <button
                            className={`last-results ${selectedButton === 'last-results' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('last-results')}
                        >
                            <h3>Last Results</h3>
                        </button>
                        <button
                            className={`next-matches ${selectedButton === 'next-matches' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('next-matches')}
                        >
                            <h3>Next Matches</h3>
                        </button>
                        <button
                            className={`standings ${selectedButton === 'standings' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('standings')}
                        >
                            <h3>Standings</h3>
                        </button>

                        </div>

                        
                        </div>
                </div>
                <div className="container-league-body-content">
                   
                        <div className="league-body-content-last-results">
                        
                        { selectedButton === 'last-results' && 
                            playedMatches && Object.keys(playedMatches).map((matchday) => (
                               
                                <Matchday
                                key={matchday}
                                matchday={playedMatches[matchday][0].match.matchday}
                                matches={playedMatches[matchday]}
                                />
                            ))
                        }
                            
                           
                         
                
                        
                        </div>
                        <div className="league-body-content-next-matches">
                        { selectedButton === 'next-matches' && 
                            upcomingMatches && Object.keys(upcomingMatches).map((matchday) => (

                                <Matchday
                                key={matchday}
                                matchday={upcomingMatches[matchday][0].match.matchday}
                                matches={upcomingMatches[matchday]}
                                />
                            ))
                        }
                        </div>
                </div>
        </div>
        
    )
}

