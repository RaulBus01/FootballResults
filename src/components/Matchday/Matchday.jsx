import React from "react";
// import LiveMatch from "../Main/LiveComponents/LiveMatch.jsx";
import Fixture from "../League/Fixture.jsx";
import "./Matchday.css";
import { useNavigate } from "react-router-dom";
export default function Matchday(props)
{
  
    const navigate = useNavigate();
    return(
    <div className="matchday-container">
        <div className="matchday-container-body">
        <div className="matchday-header">
            <div className="matchday-header-title">
                {
                props.matchdayType === "league" ? "Matchday " + props.matchday 
                    : (
                        <>
                            {"Matchday "+ props.matchday +" - "}
                            <span className="matchday-header-title-competition" onClick={()=>navigate(`/${props.competition}`)}>
                                {props.competition}
                            </span>
                        </>
                      )
                }
               
            </div>

        </div>
        <div className="matchday-body">
           {
            props.matchdayType !== "league" ? props.match && 
                <Fixture
                key={props.match.key}
                startTime={props.match.utcDate}
                homeTeam={props.match.homeTeam}
                awayTeam={props.match.awayTeam}
                halfTimeHomeTeamScore={props.match.score.halfTime.home}
                halfTimeAwayTeamScore={props.match.score.halfTime.away}
                fullTimeHomeTeamScore={props.match.score.fullTime.home}
                fullTimeAwayTeamScore={props.match.score.fullTime.away}
                status={props.match.status}
                competition={props.match.competition}
                stage={props.match.stage}
                matchday={props.match.matchday}
                group={props.match.group}
                date={props.match.utcDate}
                matchId={props.match.id}
                />
                : props.matches &&
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