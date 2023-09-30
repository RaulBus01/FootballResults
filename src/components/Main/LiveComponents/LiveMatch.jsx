import React from "react";
import "./LiveMatch.css";
import LivePreview from "./LivePreview.jsx";
export default function LiveMatch(props)
{
    function calculateTimeDifference(startTime) {
        const matchStartTime = new Date(startTime);
    
        const currentTime = new Date();
        const timeDifference = currentTime - matchStartTime;
       
        
      

        const minutes = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds
        return minutes;
      }
      function getLocalStartTime(startTime) {
        const matchStartTime = new Date(startTime);

        const localStartTime = matchStartTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        return localStartTime;
      }
        const [preview, setPreview] = React.useState(false);
        function openPreview()
        {
            console.log("openPreview");
            setPreview(!preview);
        }
       
   
    return(
    <div className="container-LiveMatch">
    
        <div className="status-container">
        <div className="status">
            { props.status==="FINISHED" ? "Final" : props.status === "IN_PLAY" ? "Playing" : props.status==="PAUSED" && calculateTimeDifference(props.startTime) > 45 ? "Half Time" : calculateTimeDifference(props.startTime) > 45 ? "Half Time" : getLocalStartTime(props.startTime) }
        </div>
        </div>

        <div className="team-container">
            <div className="home-team">
                <img src={props.homeTeam.crest} alt="home-team" className="logo-Match"/>
                <div className="team-name">
                    {props.homeTeam.name}
                </div>
            
            </div>
            <div className="away-team">
                <img src={props.awayTeam.crest} alt="away-team" className="logo-Match"/>
                <div className="team-name">
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
            startTime={getLocalStartTime(props.startTime)}
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