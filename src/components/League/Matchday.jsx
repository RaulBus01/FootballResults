import React from "react";
// import LiveMatch from "../Main/LiveComponents/LiveMatch.jsx";
import Fixture from "./Fixture.jsx";
import "./Matchday.css";

export default function Matchday(props)
{
    // console.log(`Matchady ${props.matchday}` );
    
    return(
    <div className="matchday-container">
        <div className="matchday-container-body">
        <div className="matchday-header">
            <div className="matchday-header-title">
                
                MatchDay {props.matchday}
                
            </div>

        </div>
        <div className="matchday-body">
           {
            props.matches && props.matches.map((matchday) => (
                <Fixture
                key={matchday.key}
                startTime={matchday.match.utcDate}
                homeTeam={matchday.match.homeTeam}
                awayTeam={matchday.match.awayTeam}
                halfTimeHomeTeamScore={matchday.match.score.halfTime.home}
                halfTimeAwayTeamScore={matchday.match.score.halfTime.away}
                fullTimeHomeTeamScore={matchday.match.score.fullTime.home}
                fullTimeAwayTeamScore={matchday.match.score.fullTime.away}
                status={matchday.match.status}
                competition={matchday.match.competition}
                stage={matchday.match.stage}
                matchday={matchday.match.matchday}
                group={matchday.match.group}
                date={matchday.match.utcDate}
                matchId={matchday.match.id}
                />
            ))
            }
        </div>
    </div>
    </div>
    )
}