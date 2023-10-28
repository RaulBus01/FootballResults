import React from "react";
import "./LivePreview.css";
import { useNavigate } from "react-router-dom";
export default function LivePreview(props)
{
    function formatDate(dateString)
    {
        const date = new Date(dateString);
        const years = date.getFullYear();
        const months = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const days = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${years}-${months}-${days}`;
    }
    
    const navigate = useNavigate();
   
    
   
    return (
        <div className="container-livePreview">
           <div className="preview-header">
                <div className="preview-header-title">
                    <div className="preview-header-title-text">
                        {props.competition.name} {props.stage !=="REGULAR_SEASON" ? "Group " + props.group.charAt(props.group.length -1) + " Round " + props.matchday  :  "Matchday " + props.matchday}

                    </div>
                    <div className="preview-header-title-logo">
                        <img src={props.competition.emblem} alt="league-logo" className="preview-header-title-logo-img" width="25px"/>
                    </div>

                </div>
             
            </div>
            <div className="preview-body">
            <div className="preview-container">
                  <div className="homeTeam">
                    <div className="homeTeam-logo">
                        <img src={props.homeTeam.crest} alt="homeTeam-logo" className="homeTeam-logo-img" width="50px"/>
                    </div>
                    <div className="homeTeam-name" onClick={()=>navigate(`/${props.competition.name}/${props.homeTeam.id}`)}>
                        {props.homeTeam.name}
                    </div>
                  </div>
                <div className="awayTeam"> 
                    <div className="awayTeam-logo">
                        <img src={props.awayTeam.crest} alt="awayTeam-logo" className="awayTeam-logo-img" width="50px"/>
                        </div>
                    <div className="awayTeam-name" onClick={()=>navigate(`/${props.competition.name}/${props.awayTeam.id}`)}>
                        {props.awayTeam.name}
                    </div>
                </div>
              
                <div className="preview-Date">
                    <div className="preview-Date">
                        {formatDate(props.date)}
                    </div>
                    <div className="preview-Time">
                        {props.startTime}
                    </div>
                </div>
                <div className="preview-Score">
                    <div className="score-homeTeam">
                        {props.status !=="TIMED" ? props.fullTimeHomeTeamScore : "-"}
                    </div>
                    <div className="score-separator">
                        :
                    </div>
                    <div className="score-awayTeam">
                        {props.status !=="TIMED" ? props.fullTimeAwayTeamScore : "-"}
                    </div>
                </div>
                <div className="preview-footer">
                    <div className="preview-footer-status">
                        {props.status}
                    </div>
                    
                </div>
                </div>
            
            </div>

        </div>
        
    )
}