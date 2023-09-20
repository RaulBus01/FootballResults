import React from "react";
import { Container, NavLink, Navbar } from "react-bootstrap";
import LeagueHeader from "../LeagueHeader/LeagueHeader";
import "bootstrap/js/src/dropdown.js";
export default function NavbarMain() {
    const styleNormal = {
        backgroundColor: "#698269",
        maxHeight:'70px',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

       
       
     
        
    }
    return (
    <nav className="navbar navbar-expand-xl " sticky="top" style={styleNormal}>
        <div className="navbar-nav" style={styleNormal} >
                <NavLink href="#Premier League">
                    <LeagueHeader name="Premier League"logo="src\assets\LeagueLogo\logo-EPL.png" /> 
                </NavLink>
                <NavLink href="#La liga">
                    <LeagueHeader name="La Liga"logo="src\assets\LeagueLogo\logo-LaLiga.png" />
                </NavLink>
                <NavLink href="#Seria A">
                    <LeagueHeader name="Serie A"logo="src\assets\LeagueLogo\logo-SerieA.png" />
                </NavLink>
                <NavLink href="#Bundesliga">
                    <LeagueHeader name="Bundesliga"logo="src\assets\LeagueLogo\logo-Bundesliga.png" />
                </NavLink>
                <NavLink href="#Ligue1">
                    <LeagueHeader name="Ligue 1"logo="src\assets\LeagueLogo\logo-Ligue1.png" />
                </NavLink>
                <NavLink href="#UCL">
                    <LeagueHeader name="Champions League"logo="src\assets\LeagueLogo\logo-UCL.png" />
                </NavLink>
                <NavLink href="#UEL">
                    <LeagueHeader name="Europa League"logo="src\assets\LeagueLogo\logo-UEL.png" />
                </NavLink>
                <NavLink>
                <div className="dropdown show">
                    <div className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-list-ul"></i>
                    </div>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      
                    </div>
                    </div>
                </NavLink>
                
        </div>
    </nav>)
    }
