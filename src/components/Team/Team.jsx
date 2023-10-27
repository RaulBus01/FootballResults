import React from "react";
import "./Team.css";
import Matchday from "../Matchday/Matchday.jsx";
import SquadTable from "./SquadTable.jsx";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Main/Loading";

function Team()
{
    const [team,setTeam]=React.useState([]);
    const [loading,setLoading]=React.useState(true);
    const [selectedButton,setSelectedButton]=React.useState('matches');
    const [matches,setMatches]=React.useState([]);
    const [squad,setSquad]=React.useState([]);
    const [coaches,setCoaches]=React.useState([]);
    const [competitions,setCompetitions]=React.useState([]);
    const [playedMatches,setPlayedMatches]=React.useState([]);
    const [upcomingMatches,setUpcomingMatches]=React.useState([]);
    const [selectedMatchType,setSelectedMatchType]=React.useState('played');
    const [selectedCompetition,setSelectedCompetition]=React.useState('');
    
    const {teamId} = useParams();
    
   
    React.useEffect(() => 
    {
        setLoading(true);
        try {
            const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
            const url = `/v4/teams/${teamId}`;
            const query = url;
        
            
            const options = {
            method: 'GET',
            headers: { 'X-Auth-Token': apiKey },
            
            
            };
        fetch(query, options)
        .then(res => res.json())
        .then(data =>{
            if(data)
            {
            setTeam(data);
            
            setCompetitions(data.runningCompetitions);
            data.runningCompetitions.length > 0 && data.runningCompetitions.map((competition) => (
                competition.type==="LEAGUE" ? setSelectedCompetition(competition.name) : null
                
            ))
          
            const goalkeepers = data.squad.filter(player => player.position === 'Goalkeeper');
            const defenders = data.squad.filter(player => player.position === 'Defence');
            const midfielders = data.squad.filter(player => player.position === 'Midfield');
            const attackers = data.squad.filter(player => player.position === 'Offence');

            const squad = {
                goalkeepers: goalkeepers,
                defenders: defenders,
                midfielders: midfielders,
                attackers: attackers
            }
            const primaryCoach = [data.coach];
            const staff = data.staff;
            const coachesList = {
                principal : primaryCoach,
                staff: staff
            }
            
            setCoaches(coachesList);
           
            setSquad(squad);
          
            setLoading(false);
        }
          


        })
        

        }
        catch(error)
        {
            console.log(error);
            
         };
    },[teamId]);

    const handleButton =(buttonName) =>
    {
        setSelectedButton(buttonName);
        
    }
    const handleMatchType = (matchType) =>
    {
        setSelectedMatchType(matchType);
    }
    const handleCompetition = (competition) =>
    {
        setSelectedCompetition(competition);
    }
    function groupByCompetitionFinished(matches) {
        const groupedMatches = [];
        matches.forEach((match ) =>
        {
            const competition = match.competition.name;
            if(!groupedMatches[competition])
            {
                groupedMatches[competition] = [];
            }
            groupedMatches[competition].unshift(
                { 
                match: match,
                key:match.id,
                matchday: match.matchday
                
             });
        }
        )
        return groupedMatches;
    }
    function groupByCompetitionUpcoming(matches) {
        const groupedMatches = [];
        matches.forEach((match ) =>
        {
            const competition = match.competition.name;
            if(!groupedMatches[competition])
            {
                groupedMatches[competition] = [];
            }
            groupedMatches[competition].push(
                { 
                match: match,
                key:match.id,
                matchday: match.matchday
                
             });
        }
        )
        return groupedMatches;
    }
   
    const fetchMatches = () =>  
    {
        setLoading(true);
        try {
            const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
            const url = `/v4/teams/${teamId}/matches`;
            const query = url;
        
            
            const options = {
            method: 'GET',
            headers: { 'X-Auth-Token': apiKey },
            
            
            };
        fetch(query, options)
        .then(res => res.json())
        .then(data =>{
            setMatches(data);
            if (data){
            let finishedMatches = data.matches.filter(match => match.status === 'FINISHED' || match.status === 'IN_PLAY' || match.status === 'PAUSED');
            let upcomingMatches = data.matches.filter(match => match.status === 'SCHEDULED' || match.status === 'TIMED' || match.status === 'POSTPONED' || match.status === 'CANCELED');

            finishedMatches = groupByCompetitionFinished(finishedMatches);
            upcomingMatches = groupByCompetitionUpcoming(upcomingMatches);

            setPlayedMatches(finishedMatches);
            setUpcomingMatches(upcomingMatches);

              
            }

            setLoading(false);
            
           

        })
        

        }
        catch(error)
        {
            console.log(error);
            
        }
    }

    React.useEffect(() =>
    {
        if(selectedButton === "matches")
        {
            fetchMatches();
            // console.log(matches);
        }
    },[selectedButton,teamId])
    if(loading)
    {
        return (
            <>
             <Loading/>
            </>
        )
    }

    return (
        
        <div className="container-team">
            <div className="container-team-header">
                <div className="team-header">
                    <div className="team-header-logo">
                        <img className="team-logo" src={team.crest} alt="logo" width="100px"/>

                    </div>
                    <div className="detail-team">
                        
                        
                        <div className="team-header-name">
                            <div className="team-header-name-text">{team.shortName}</div>
                        
                            <div className="team-header-region-text">{team.area.name}
                                <img className="team-header-flag" src={team.area.flag} alt="logo" width="20px"/>
                            </div>
                        </div>
                       
                    </div>
                    <div className="team-header-info">
                           <div className="team-header-stadium">
                                <i className="fas fa-street-view fa-2xl"></i>
                                 <span className="team-header-stadium-text">Stadium : {team.venue}</span>
                            </div>
                            <div className="team-header-foundation">
                                <i className="fas fa-calendar-days fa-2xl"></i>
                                <span className="team-header-foundation-text">Foundation : {team.founded}</span>
                            </div>
                            
                            <div className="team-header-website">
                                <i className="fa-solid fa-globe fa-2xl"></i>
                                <a className="team-header-link" href={team.website}>Website</a>
                            </div>
                    </div> 
                </div>
            </div>
            <div className="container-team-body">
                <div className="team-body">
                    <div className="team-body-header">
                        <button className={`team-body-button${selectedButton === "matches" ? "-selected" :""}`} onClick={()=>handleButton("matches")}>Matches</button>
                        <button className={`team-body-button${selectedButton === "squad" ? "-selected" : ""}`} onClick={()=>handleButton("squad")}>Squad</button>

                    </div>
                    <div className="team-body-content">
                    { selectedButton === 'matches' ?  
                        <div className="team-body-content-matches">
                            <div className="team-body-content-competition-header">
                                {competitions.length > 0 &&  competitions.map((competition) => (
                                    playedMatches[competition.name] && upcomingMatches[competition.name] &&
                                    <div key={competition.id}>
                                        { competition.name === "Primera Division" ? 
                                        <button className={`team-body-content-competition-button${selectedCompetition === competition.name ? "-selected" : ""}`} onClick={()=>handleCompetition(competition.name)}>La Liga</button> 
                                        :
                                        <button className={`team-body-content-competition-button${selectedCompetition === competition.name ? "-selected" : ""}`} onClick={()=>handleCompetition(competition.name)}>{competition.name}</button>
                                        }   
                                        </div>  ))
                                }
                            </div>
                            <div className="team-body-content-matches-header">
                                <button className={`team-body-content-matches-header-button${selectedMatchType === "played" ? "-selected" :""}`} onClick={()=>handleMatchType("played")}>Played Matches</button>
                                <button className={`team-body-content-matches-header-button${selectedMatchType === "upcoming" ? "-selected":""}`} onClick={()=>handleMatchType("upcoming")}>Upcoming Matches</button>
                            </div>
                            { selectedMatchType === 'played' ?
                                playedMatches && playedMatches[selectedCompetition] && Object.keys(playedMatches[selectedCompetition]).map((matchday) => (
                                
                                <Matchday
                                key={matchday}
                                matchday={playedMatches[selectedCompetition][matchday].matchday}
                                match={playedMatches[selectedCompetition][matchday].match}
                                competition={selectedCompetition}
                            
                                />
                            )):null
                            }

                            {
                                selectedMatchType === 'upcoming' ?
                                upcomingMatches && upcomingMatches[selectedCompetition] && Object.keys(upcomingMatches[selectedCompetition]).map((matchday) => (
                                    <Matchday 
                                    key={matchday}
                                    matchday={upcomingMatches[selectedCompetition][matchday].matchday}
                                    match={upcomingMatches[selectedCompetition][matchday].match}
                                    competition={selectedCompetition}
                                    />
                                )):null                             
                            }
                        </div> : null
                            
                        }
                        { selectedButton === 'squad' ?
                            <div className="team-body-content-squad">
                               <div className="manager-team">
                                    {coaches.principal.length > 0 &&<SquadTable
                                        squad={coaches}
                                        type="principal"
                                    />
                                    }
                                    {coaches.staff.length > 0  &&
                                    <SquadTable 
                                    squad={coaches}
                                    type="staff"
                                    />
                                    }
                                 </div>
                                <div className="players-team">
                                   {squad.goalkeepers.length > 0 && <SquadTable 
                                    squad={squad}
                                    type="goalkeepers"
                                    />
                                   }
                                   {squad.defenders.length > 0 && 
                                    <SquadTable
                                    squad={squad}
                                    type="defenders"
                                    />
                                   }
                                   {squad.midfielders.length > 0 &&
                                    <SquadTable
                                    squad={squad}
                                    type="midfielders"
                                    />
                                   }
                                   { squad.attackers.length > 0 &&
                                    <SquadTable
                                    squad={squad}
                                    type="attackers"
                                    />
                                   }
                                </div>
                                 
                                
                            </div>:null
                        }
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
export default React.memo(Team);