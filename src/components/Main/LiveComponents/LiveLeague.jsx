import React from "react";
import "./LiveLeague.css";
import LiveMatch from "./LiveMatch.jsx";
import { useNavigate } from "react-router-dom";
export default function LiveLeague(props)
{
    const [dropdown, setDropdown] = React.useState(true);

    function toggleDropdown()
    {
        setDropdown(!dropdown);
    }
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
       
        const competition = competitions.find((competition) => competition.id.toString() === (props.competitionId || props.id));
        const competitionName = competition ? competition.name : "Unknown";
        

    const navigate = useNavigate();

    return (
        <div className="container">
        <div className="container-LiveLeague">
            
            <div className="country">
                <img src={props.countryFlag} alt="country-flag" className="country-flag"/>
            </div>
            <div className="league">
                <div className="league-name" onClick={()=>navigate("/"+competitionName)}>
                {competitionName}
                </div>
                <div className="league-logo">
                <img src={props.competitionLogo} alt="league-emblem" className="league-emblem"/>
                </div>
               
            </div>
           <div className="match-dropdown" onClick={toggleDropdown}>
                <button className ="match-dropdown-btn" type="button" >
                    {dropdown ? <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i> : <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>}

                </button>
            </div>
        </div>
        {dropdown && <div className="league-matches">
         { props.matches && props.matches.map((match) => (
              <LiveMatch
              key={match.id}
              area={match.area}
              startTime={match.utcDate===undefined ? match.startTime:match.utcDate}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              halfTimeHomeTeamScore={match.score.halfTime.home}
              halfTimeAwayTeamScore={match.score.halfTime.away}
              fullTimeHomeTeamScore={match.score.fullTime.home}
              fullTimeAwayTeamScore={match.score.fullTime.away}
              status={match.status}
              competition={match.competition}
              stage={match.stage}
              matchday={match.matchday}
              group={match.group}
              date={match.utcDate===undefined ? match.startTime:match.utcDate}
              id={match.id}
              isFavorite={props.isFavorite}
            
              />
          ))
          }
          </div> }
          </div>
    )
}