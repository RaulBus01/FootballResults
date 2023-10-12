import e from "cors";
import React from "react";  
import "./League.css";
import { useState } from "react";

import Matchday from "./Matchday";

import {useParams} from "react-router-dom";
export default function League()   
{
    const [selectedButton, setSelectedButton] = useState("last-results");

    const {leagueName} = useParams();

    const competitions = [
        { id: 2000, name: "WorldCup" },
        { id: 2018, name: "Euro" },
        { id: 2001, name: "ChampionsLeague" },
        { id: 2021, name: "PremierLeague" },
        { id: 2002, name: "Bundesliga" },
        { id: 2015, name: "Ligue1" },
        { id: 2019, name: "SerieA" },
        { id: 2003, name: "Eredivisie" },
        { id: 2014, name: "LaLiga" },
        { id: 2017, name: "LigaNos" },
        { id: 2016, name: "Championship" },
        { id: 2013, name: "BrasilSeriaA" },
      ];
      const league = competitions.find((league) => league.name === leagueName);
        
    const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);
      
    };
   
    const [competitionData,setCompetitonData] = useState([]);
    const [playedMatches,setPlayedMatches] = useState([]);
    const [upcomingMatches,setUpcomingMatches] = useState([]);

    const [standingsData,setStandingsData] = useState([]);

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
    function groupByMatchdayUpcoming(matches) {
        const groupedMatches = [];
        matches.forEach((match ) =>
         {
            const matchday = match.matchday;
            if(!groupedMatches[matchday])
            {
                groupedMatches[matchday] = [];
            }
            
            groupedMatches[matchday].push(
                { 
                match: match,
                key: match.id
             });
        
         })
        return groupedMatches;
        }
   

 
     async function getData()
    {
      try {
    
        const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
        const url = `v4/competitions/${league.id}/matches?season=2023`
     
        //const querryDate = formatDate(date);
      
        const query = url;
        const options = {
          method: 'GET',
          headers: { 'X-Auth-Token': apiKey },
          
         
        };
        fetch(query, options)
        .then(res => res.json())
        .then(data => {
      
            console.log(data);
          const finishedMatches = data.matches.filter(match => match.status === 'FINISHED');
          const upcomingMatches = data.matches.filter(match => match.status === 'SCHEDULED' || match.status === 'TIMED');
         
    
       
          setCompetitonData(data);
            
         let groupedMatches = [];  
         groupedMatches = groupByMatchday(finishedMatches)
         groupedMatches.reverse();

         
     
            setPlayedMatches(groupedMatches);
            
            groupedMatches = groupByMatchdayUpcoming(upcomingMatches);
          
            setUpcomingMatches(groupedMatches);

        
        })
        .catch(error => {
          console.log(error);
        });
    }catch(error)
        {
            console.log(error);
            
        };
    }
   

 
      

    async function getStandingsData() {
        try {
            const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
            const startSeason = season.slice(0,4);
            const url = `v4/competitions/${league.id}/standings?season=${startSeason}`;
    
            const query = url;
            const options = {
                method: 'GET',
                headers: { 'X-Auth-Token': apiKey },
            };
    
            const response = await fetch(query, options);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
           
            setStandingsData(data);
        } catch (error) {
            console.error(error);
        }
    }
    const [season,setSeason] = useState("2023 - 2024");
        const seasonArray=[
            {season:"2023 - 2024",id:0},
            {season:"2022 - 2023",id:1},
            {season:"2021 - 2022",id:2},
            {season:"2020 - 2021",id:3},
        ]
        function selectSeason(season)
        {
            setSeason(season.target.innerText);
        }

    
        React.useEffect(() => {
            
            const fetchData = async () => {
             await getData();
             await getStandingsData();
            };
            fetchData();
        }, [leagueName,season]);
      
        
    
    
    
    
    

   
    
 
   

    return (
        <div className="container-league">
            <div className="container-league-header">
                <div className="league-header">
                    <div className="league-header-logo">
                        {/* <img src={competitionData.competition.emblem} alt="logo" className="logo-header"/> */}
                    </div>
                    <div className="detail-league">
                    
                        <div className="league-header-name">
                            <h1>{leagueName}</h1>
                        </div>
                        <div className="league-header-season">
                            <button className="season-btn" aria-expanded="false" id="dropdownSeaasonButton"  type="button" data-bs-toggle="dropdown" aria-haspopup="true">

                                <span className="season-text">{season}</span>
                            </button>
                            <div className="dropdown-menu"  aria-labelledby="dropdownSeasonButton">
                            {seasonArray.map((season) => (
                                <button className="dropdown-item" type="button" key={season.id} onClick={selectSeason}>
                                    {season.season}
                                </button>
                            
                            ))}
                            </div>
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
                            id="last-resultsBtn"
                        >
                            <span className="text">Last Results</span>
                        </button>
                        <button
                            className={`next-matches ${selectedButton === 'next-matches' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('next-matches')}
                            id="next-matchesBtn"
                        >
                            <span className="text">Next Matches</span>
                        </button>
                        <button
                            className={`standings ${selectedButton === 'standings' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('standings')}
                            id="standingsBtn"
                        >
                            <span className="text">Standings</span>
                        </button>

                        </div>

                        
                        </div>
                </div>
                <div className="container-league-body-content">
                   
                       
                        
                        { selectedButton === 'last-results' &&  <div className="league-body-content-last-results">
                            {
                            playedMatches && Object.keys(playedMatches).map((matchday) => (
                               
                                <Matchday
                                key={matchday}
                                matchday={playedMatches[matchday][0].match.matchday}
                                matches={playedMatches[matchday]}
                                />
                            ))
                            }
                            </div>
                            
                        }
                            
                           
                         
                
                        
                       
                       
                         {selectedButton === 'next-matches' && <div className="league-body-content-next-matches">
                            {upcomingMatches && Object.keys(upcomingMatches).map((matchday) => (

                                <Matchday
                                key={matchday}
                                matchday={upcomingMatches[matchday][0].match.matchday}
                                matches={upcomingMatches[matchday]}
                                />
                            ))
                            }
                        </div>
                        }
                        
                        
                        
                        { selectedButton === 'standings' && <div className="league-body-content-standings">
                            <table className="table table-dark table-striped ">
                            <thead>
                                <tr className="standings-header">
                                    <th className="position-header">Pos</th>
                                    <th className="team-header">Team</th>
                                    <th className="matches-header">M</th>
                                    <th className="wins-header">W</th>
                                    <th className="draws-header">D</th>
                                    <th className="loses-header">L</th>
                                    <th className="goals-header">G</th>
                                    <th className="points-header">Pts</th>
                                    <th className="form-header">Form</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standingsData.standings[0].table.map((team) => (
                                 
                                    <tr key={team.team.id} className="standings-row">
                                        <td className="position-row">
                                            {team.position}
                                        </td>
                                        <td className="team-row">
                                            <img src={team.team.crest} alt="team-logo" className="logo-team"/>
                                            <span className="team-name">{team.team.name}</span>
                                        </td>
                                        <td className="matches-row">
                                         <span>{team.playedGames}</span>   
                                        </td>
                                        <td className="wins-row">
                                            <span>{team.won} </span>
                                        </td>
                                        <td className="draws-row">{team.draw}</td>
                                        <td className="loses-row">{team.lost}</td>
                                        <td className="goals-row">
                                            {team.goalsFor} : {team.goalsAgainst}
                                        </td>
                                        <td className="points-row">{team.points}</td>
                                        <td className="form-row" > 
                                            {team.form.split(',').map((result,index) => (

                                               
                                                 <span key={index}className={`form-${result}`}>{result}</span>
                                              
                                            ))}
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                            </table>
                             </div>

                        }
                       
                </div>
        </div>
        
    )
}

