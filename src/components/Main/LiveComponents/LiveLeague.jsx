import React from "react";
import "./LiveLeague.css";
import LiveMatch from "./LiveMatch.jsx";
export default function LiveLeague(props)
{
    const [dropdown, setDropdown] = React.useState(true);

    function toggleDropdown()
    {
        setDropdown(!dropdown);
    }
     

    return (
        <div className="container">
        <div className="container-LiveLeague">
            
            <div className="country">
                <img src={props.countryFlag} alt="country-flag" className="country-flag"/>
            </div>
            <div className="league">
                <div className="league-name">
                {props.competitionName}
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
              startTime={match.utcDate}
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
              date={match.utcDate}
                matchId={match.id}
            
              />
          ))
          }
          </div> }
          </div>
    )
}