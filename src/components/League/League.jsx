import e from "cors";
import React from "react";  
import "./League.css";
import { useState } from "react";

import Matchday from "../Matchday/Matchday";
import {useParams} from "react-router-dom";
import { toast } from "react-toastify";
import logoEPL from "../../assets/LeagueLogo/logo-EPL.png"
import logoLaLiga from "../../assets/LeagueLogo/logo-LaLiga.png"
import logoSerieA from "../../assets/LeagueLogo/logo-SerieA.png"
import logoBundesliga from "../../assets/LeagueLogo/logo-Bundesliga.png"
import logoLigue1 from "../../assets/LeagueLogo/logo-Ligue1.png"
import logoEredivisie from "../../assets/LeagueLogo/logo-Eredvisie.png"
import logoPrimeraLiga from "../../assets/LeagueLogo/logo-PrimeraLiga.png"
import logoBrasilSerieA from "../../assets/LeagueLogo/logo-BrasilSerieA.png"
import logoChampionship from "../../assets/LeagueLogo/logo-Championship.png"
import {auth,db}    from "../../firebase-config";
import { collection,onSnapshot,doc,setDoc } from "firebase/firestore";

export default function League()   
{
    const [selectedButton, setSelectedButton] = useState("last-results");
    const [leagueLogo,setLeagueLogo] = useState("");
    const [teams,setTeams] = useState([]);
    
    const {leagueName} = useParams();

    const competitions = [
        { id: 2000, name: "World Cup" },
        { id: 2018, name: "European Championship" },
        { id: 2001, name: "Champions League" },
        { id: 2021, name: "Premier League" },
        { id: 2002, name: "Bundesliga" },
        { id: 2015, name: "Ligue 1" },
        { id: 2019, name: "Serie A" },
        { id: 2003, name: "Eredivisie" },
        { id: 2014, name: "La Liga" },
        { id: 2017, name: "Primeira Liga" },
        { id: 2016, name: "Championship" },
        { id: 2013, name: "Campeonato Brasileiro Série A" },
      ];
      const league = competitions.find((league) => league.name === leagueName);
        
    const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);
      
    };
    const [selectedStandingsButton, setSelectedStandingsButton] = useState("total");
    const [competitionData,setCompetitonData] = useState([]);
    const [playedMatches,setPlayedMatches] = useState([]);
    const [upcomingMatches,setUpcomingMatches] = useState([]);
    const [scorers,setScorers] = useState([]);
    const [standingsData,setStandingsData] = useState([]);
    const [index,setIndex] = useState(0);
    const standingsButton = (buttonName) =>
    {
        setSelectedStandingsButton(buttonName);
        if(buttonName === "total")
        {
            setIndex(0);
        }
        if(buttonName === "home")
        {
            setIndex(1);
        }
        if(buttonName === "away")
        {
            setIndex(2);
        }
        
    }
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
        async function getScorers()
        {
          try {
        
            const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
            const url = `v4/competitions/${league.id}/scorers?season=${season.slice(0,4)}`
         
            //const querryDate = formatDate(date);
          
            const query = url;
            const options = {
              method: 'GET',
              headers: { 'X-Auth-Token': apiKey },
              
             
            };
            fetch(query, options)
            .then(res => res.json())
            .then(data => {
          
                if(data)
                {
                    
                    setScorers(data);
                }
                
    
                    
            })
            .catch(error => {
              console.log(error);
            });
        }catch(error)
            {
                console.log(error);
                
            };
        }

 
     async function getData()
    {
      try {
        
        const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
        const url = `v4/competitions/${league.id}/matches?season=${season.slice(0,4)}`
     
        //const querryDate = formatDate(date);
      
        const query = url;
        const options = {
          method: 'GET',
          headers: { 'X-Auth-Token': apiKey },
          
         
        };
        fetch(query, options)
        .then(res => res.json())
        .then(data => {
      
            if(data)
            {
                const finishedMatches = data.matches.filter(match => match.status === 'FINISHED');
                const upcomingMatches = data.matches.filter(match => match.status === 'SCHEDULED' || match.status === 'TIMED');
               
                setCompetitonData(data);
                selectLogo(data.competition.name);
                    
                let groupedMatches = [];  
                groupedMatches = groupByMatchday(finishedMatches)
                groupedMatches.reverse();
                setPlayedMatches(groupedMatches);
                
                groupedMatches = groupByMatchdayUpcoming(upcomingMatches);
            
                setUpcomingMatches(groupedMatches);
             }
        
        })
        .catch(error => {
          console.log(error);
        });
    }catch(error)
        {
            console.log(error);
            
        };
    }
    function selectLogo(leagueName)
    {
        if(leagueName === "Premier League")
        {
            setLeagueLogo(logoEPL);
        }
        if(leagueName === "Primera Division")
        {
            setLeagueLogo(logoLaLiga);
        }
        if(leagueName === "Serie A")
        {
            setLeagueLogo(logoSerieA);
        }
        if(leagueName === "Bundesliga")
        {
            setLeagueLogo(logoBundesliga);
        }
        if(leagueName === "Ligue 1")
        {
            setLeagueLogo(logoLigue1);
        }
        if(leagueName === "Eredivisie")
        {
            setLeagueLogo(logoEredivisie);
        }
        if(leagueName === "Primeira Liga")
        {
            setLeagueLogo(logoPrimeraLiga);
        }
        if(leagueName === "Campeonato Brasileiro Série A")
        {
            setLeagueLogo(logoBrasilSerieA);
        }
        if(leagueName === "Championship")
        {
            setLeagueLogo(logoChampionship);
        }
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
                toast.error("Error");
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
            if(selectedButton === "standings")
            {
                getStandingsData();
                getScorers();
            }
            const fetchData = async () => {
             await getData();
            
            
            };
            fetchData();
            
        }, [leagueName,season]);
      
        // React.useEffect(() => {
        //     function getTeams() {
        //         try {
                
        //             const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
        //             const url = `v4/competitions/${league.id}/teams?season=${season.slice(0,4)}`
                 
        //             //const querryDate = formatDate(date);
                  
        //             const query = url;
        //             const options = {
        //               method: 'GET',
        //               headers: { 'X-Auth-Token': apiKey },
                      
                     
        //             };
        //             fetch(query, options)
        //             .then(res => res.json())
        //             .then(data => {
                  
        //                 if(data)
        //                 {
                            
        //                     setTeams(data.teams);
                            
        //                     const leagueRef = collection(db, "teams");
        //                     try{
                                
        //                         data.teams.map((team) => {
        //                             const docRef = doc(leagueRef, team.name.toUpperCase());
        //                             setDoc(docRef, {...team,key : team.id,});
        //                         }
        //                         )
        //                     }
        //                     catch(error)
        //                     {
        //                         console.log(error);
        //                      }
        //                 }
                        
            
                            
        //             })
                        

        //             .catch(error => {
        //               console.log(error);
        //             });
        //         }catch(error)
        //             {
        //                 console.log(error);
                        
        //             };
        //         }
        //         getTeams();
               
                
        //     }, [leagueName,season]);
    

    
    
    

        
    
 
   

    return (
        <div className="container-league">
            <div className="container-league-header">
                <div className="league-header">
                    <div className="league-header-logo">
                        <img src={leagueLogo} alt="league-logo" className="logo-header"/>
                    </div>
                    <div className="detail-league">
                    
                        <div className="league-header-name">
                            <h1>{leagueName}</h1>
                        </div>
                        <div className="league-header-season">
                            <button className="season-btn" aria-expanded="false" id="dropdownSeaasonButton"  type="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                <i className="fas fa-calendar-alt"></i>
                                <span className="season-text">{season}</span>
                            </button>
                            <div className="dropdown-menu"  aria-labelledby="dropdownSeasonButton">
                            {seasonArray.map((season) => (
                                <button className="dropdown-item-season" type="button" key={season.id} onClick={selectSeason}>
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
                                matchdayType="league"
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
                                matchdayType="league"
                                />
                            ))
                            }
                        </div>
                        }
                        
                        
                      
                        { 
                            selectedButton === 'standings' && 
                            <div className="league-body-content">
                             <div className="league-body-content-standings-header">
                                <button className={`total-btn ${selectedStandingsButton === "total" ? 'selected' : ""}`} onClick={()=>standingsButton("total")}>Total</button>
                                <button className={`home-btn ${selectedStandingsButton === "home" ? 'selected' : ""}`} onClick={()=>standingsButton("home")}>Home</button>
                                <button className={`away-btn ${selectedStandingsButton === "away" ? 'selected' : ""}`} onClick={()=>standingsButton("away")}>Away</button>
                                <button className={`scorers-btn ${selectedStandingsButton === "scorers" ? 'selected' : ""}`} onClick={()=>standingsButton("scorers")}>Scorers</button>
                            </div>
                            
                            <div className="league-body-content-standings">
                            {selectedStandingsButton !== "scorers" ? 
                                <table className="table table-dark table-striped ">
                                        <thead>
                                            <tr className="standings-header-row">
                                                <th className="position-header-col">Pos</th>
                                                <th className="team-header-col">Team</th>
                                                <th className="matches-header-col">M</th>
                                                <th className="wins-header-col">W</th>
                                                <th className="draws-header-col">D</th>
                                                <th className="loses-header-col">L</th>
                                                <th className="goals-header-col">G</th>
                                                <th className="points-header-col">Pts</th>
                                                {index === 0 && <th className="form-header">Form</th> }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {standingsData.standings[index].table.map((team) => (
                                            
                                                <tr key={team.team.id} className="standings-row">
                                                    <td className="position-row">
                                                        {team.position}
                                                    </td>
                                                    <td className="team-row">
                                                        <img src={team.team.crest} alt="team-logo" className="logo-team-row"/>
                                                        <span className="team-name-row">{team.team.name}</span>
                                                    </td>
                                                    <td className="matches-row">
                                                        <span>{team.playedGames}</span>   
                                                    </td>
                                                    <td className="wins-row">
                                                        <span>{team.won} </span>
                                                    </td>
                                                    <td className="draws-row">{team.draw}</td>
                                                    <td className="losses-row">{team.lost}</td>
                                                    <td className="goals-row">
                                                        {team.goalsFor} : {team.goalsAgainst}
                                                    </td>
                                                    <td className="points-row">{team.points}</td>
                                                    {index === 0 && 
                                                        <td className="form-row" > 
                                                        {team.form.split(',').map((result,index) => (
                                                            <span key={index}className={`form-${result}`}>{result}</span>
                                                        ))}

                                                        </td>
                                                    }
                                                </tr>
                                                        ))} 
                                    
                                        
                                        </tbody>
                                </table>
                                : 
                                <table className="table table-dark table-striped ">
                                    <thead>
                                            <tr className="standings-header-row">
                                                <th className="position-header-col">Pos</th>
                                                <th className="team-header-col">Player</th>
                                                <th className="team-header-col">Team</th>
                                                <th className="matches-header-col">Matches</th>
                                                <th className="wins-header-col">Goals</th>
                                                <th className="draws-header-col">Assissts</th>

                                            </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            scorers && scorers.scorers.map((scorer,index) => (
                                                
                                                <tr key={scorer.player.id} className="standings-row">
                                                    <td className="position-row">
                                                        {index+1}
                                                    </td>
                                                    <td className="player-row">
                                                        <span className="team-name-row">{scorer.player.name}</span>
                                                    </td>
                                                    <td className="team-row">
                                                        <img src={scorer.team.crest} alt="team-logo" className="logo-team-row"/>
                                                        <span className="team-name-row">{scorer.team.name}</span>
                                                    </td>
                                                    <td className="matches-row">
                                                    <span>{scorer.playedMatches}</span>   
                                                    </td>
                                                    <td className="goals-row">
                                                        <span>{scorer.goals} </span>
                                                    </td>
                                                    <td className="assists-row">{scorer.assists !== null ? scorer.assists : 0}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                            </div> 
                        </div>

                        }
                       
                </div>
        </div>
        
    )
}

