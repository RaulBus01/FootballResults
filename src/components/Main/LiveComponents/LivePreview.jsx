import React from "react";
import "./LivePreview.css";
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
    const [matchData, setMatchData] = React.useState([]);
    function getMatchDetails(matchId)
    {
        
            try {
                const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
                const url = '/v4/matches/';
             
                // const querryDate = formatDate(date);
              
                const query = url+`${matchId}`;
                const options = {
                  method: 'GET',
                  headers: { 'X-Auth-Token': apiKey },
                  
                 
                };
               fetch(query, options)
               .then(res => res.json())
               .then(data => setMatchData(data))
               
        
            }catch(error)
            {
                console.log(error);
                
            };
       
        
    }
    React.useState(() => {
        getMatchDetails(props.matchId);
    },[matchData]);

   
    
   
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
                    <div className="homeTeam-name">
                        {props.homeTeam.name}
                    </div>
                  </div>
                <div className="awayTeam"> 
                    <div className="awayTeam-logo">
                        <img src={props.awayTeam.crest} alt="awayTeam-logo" className="awayTeam-logo-img" width="50px"/>
                        </div>
                    <div className="awayTeam-name">
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
                {/* <div className="Stadium">
                    <div className="Stadium-name">
                        Stadium : Santiago Bernabeu
                    </div>
                </div> */}
            </div>
            <div className="preview-footer">
                <button className="more-details-preview-btn" type="submit" onClick={()=>getMatchDetails(props.matchId)}>
                    
                    More Details 
                    <i className="fa fa-chevron-down fa-lg" aria-hidden="true" id="more-details-icon"></i>
                </button>
                
            </div>
            
            </div>

        </div>
        
    )
}