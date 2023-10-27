import React from "react";  

export default function LeagueHeader(props) {

    return (
        <section className="league-container">
            <div className="league-logo-container">
            <img className="league-logo" src={props.logo} alt="logo" />
            </div>
            
            <h1 className="league-name">{props.name}</h1>
        </section>
    )
}

