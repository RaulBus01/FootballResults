import React, { useEffect } from "react";  
import ReactDOM from "react-dom";
import "./Main.css"
import LiveMatch from "./LiveComponents/LiveMatch";
import LiveLeague from "./LiveComponents/LiveLeague";
import { startOfDay, subDays,addDays, set } from "date-fns";
import { ar } from "date-fns/locale";


export default  function mainSection() {
    
    const [date, setDate] = React.useState();
    const [dateArray, setDateArray] = React.useState([""]);
    
    const [matches, setMatches] = React.useState([]);
    const [matchByCompetition, setMatchByCompetition] = React.useState([]);
    const competitions=[
        {id:2000,weight:0}, //World Cup
        {id:2018,weight:0}, //Euro
        {id:2001,weight:0}, //Champions League
        {id:2021,weight:1}, //Premier League
        {id:2002,weight:2}, //Bundesliga
        {id:2015,weight:3}, //Ligue1
        {id:2019,weight:4}, //Serie A
        {id:2003,weight:6}, //Eredivisie
        {id:2014,weight:5}, //La Liga
        {id:2017,weight:7}, //Liga Nos
        {id:2016,weight:8}, //Championship
        {id:2013,weight:9}, //Brasil Seria A
    ]
    
    function formatDate(dateString)
    {
        const date = new Date(dateString);
        const years = date.getFullYear();
        const months = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const days = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${years}-${months}-${days}`;
    }
    
   
   
    React.useEffect(() => {
        
            if(!date) return;

       
          try {
            const apiKey = '8c3dd87f26484a128ebf95024ee0ff3f';
            const url = '/v4/matches/';
         
            const querryDate = formatDate(date);
          
          
            const query = url +`?date=${querryDate}`;
         
            
            const options = {
              method: 'GET',
              headers: { 'X-Auth-Token': apiKey },
              
             
            };
           fetch(query, options)
           .then(res => res.json())
           .then(data => setMatches(data.matches))
        
           

        }catch(error)
        {
            console.log(error);
            
        };
    },[date]);
    
    function getDates() {
        const currentDate = startOfDay(new Date());
        const dates = [];
        for(let i=-4;i<=5;i++)
        {
            const newDate = i < 0 ? subDays(currentDate, Math.abs(i)) : addDays(currentDate, i);
           
            dates.push(newDate.toString().slice(0,16));
        }
        setDateArray(dates);
       
        setDate(dates[4]);
        }
    React.useEffect(() => {
        getDates();
    }
    ,[]);
    function selectDate(e) {
        setDate(e.target.innerText);
    }
    function previousDay() {
        const dates = dateArray;
        const previousDay = dates[dates.indexOf(date) - 1];
        if (previousDay)
        setDate(previousDay);
        

    }
    function nextDay() {
        const dates = dateArray;
        const nextDay = dates[dates.indexOf(date) + 1];
        if (nextDay)
        setDate(nextDay);
       
       
    }
    function getMatchesByCompetition()
    {
        const matchesFiltered = {};
   
       matches && matches.forEach((match) => {
          const competitionId = match.competition.id;
          if (!matchesFiltered[competitionId]) {
            matchesFiltered[competitionId] = [];
          }
          matchesFiltered[competitionId].push(match);
        });
        setMatchByCompetition(matchesFiltered);
    }
    React.useEffect(() => {
        getMatchesByCompetition();
        
     
    },[matches]);


    return(
      <div className="mainBody">
        <div className="liveTable">
            <div className="liveTableHeader">
                <h3>Live Table</h3>
                <div className="calendar">
                    <button className="previousDay" onClick={previousDay}>
                        <i className="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
                    </button>
                        <button className="calendarMenu" aria-expanded="false" id="dropdownButton" type="button" data-bs-toggle="dropdown" aria-haspopup="true">
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                            {date}
                        </button>
                        <button className="nextDay" onClick={nextDay}>
                        <i className="fa fa-chevron-right fa-lg" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-menu " aria-labelledby="dropdownButton">
                            {dateArray.map((date) => (
                                <button className="dropdown-item" type="button" key={date} onClick={selectDate}>
                                    {date}
                                </button>
                            ))}
                            
                             
                    </div>
                </div>
                
            </div>
            <div className="liveTableBody">
                {matchByCompetition && Object.keys(matchByCompetition).map((competitionId) => (
                    <LiveLeague
                    key={competitionId}
                    competitionName={matchByCompetition[competitionId][0].competition.name}
                    competitionLogo={matchByCompetition[competitionId][0].competition.emblem}
                    matches={matchByCompetition[competitionId]}
                    countryFlag={matchByCompetition[competitionId][0].area.flag}
                    id={matchByCompetition[competitionId][0].competition.id}
                    
                    />
                ))}
               
            
                
            </div>            
        </div>
      </div>
    )
    
}