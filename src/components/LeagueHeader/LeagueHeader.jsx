import React from "react";  

export default function LeagueHeader(props) {

    return (
        <section className="league-container">
            <img className="league-logo" src={props.logo} alt="logo" />
            <h1 className="league-name">{props.name}</h1>
        </section>
    )
}

