import React from 'react';
import "./Search.css"
import { de } from 'date-fns/locale';

export default function SearchResults(props)
{
    
  return (
    <div className="search-results">
      {props.results.map((team) => (
       
            <li key={team.id} className="team-result" onClick={()=>props.handleFavorite(team)}>
                {team.name} 
                <img src={team.crest} alt="team-logo" className="logo-Match"/>
            </li>
    
      ))}
    </div>
  );
};

