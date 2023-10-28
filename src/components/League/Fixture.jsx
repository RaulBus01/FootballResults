
import React from "react";
import { useNavigate } from "react-router-dom";

import LivePreview from "../LiveComponents/LivePreview.jsx";
export default function Fixture(props)
{
   
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
          
            setPreview(!preview);
        }
       const navigate = useNavigate();
   
    return(
    <div className="container-LiveMatch">
    
        <div className="status-container">
        <div className="status">
        { props.status==="FINISHED" ? "Final" : props.status === "IN_PLAY" ? "Playing" : props.status ==="TIMED" ? getLocalStartDate(props.startTime) : props.status === "SCHEDULED" ? "TBD": props.status ==="PAUSED" ? "Paused" : " " }
        </div>
        </div>

        <div className="team-container">
            <div className="home-team">
               
                <div className="team-name" onClick={()=>navigate("/" + props.competition.name +"/team")}>
                    <img src={props.homeTeam.crest} alt="home-team" className="logo-Match"/>
                    {props.homeTeam.name}
                </div>
            
            </div>
            <div className="away-team">
                
                <div className="team-name" onClick={()=>navigate("/" + props.competition.name +"/team")}>
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