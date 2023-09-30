import React from "react";
import { Container, NavLink, Navbar } from "react-bootstrap";
import LeagueHeader from "../LeagueHeader/LeagueHeader";
import "bootstrap/js/src/dropdown.js";
import { useNavigate } from "react-router-dom";
export default function NavbarMain() {
    const styleNormal = {
        backgroundColor: "#698269",
        maxHeight:'70px',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      
       
       
     
        
    }
    const navigate = useNavigate();
    
    return (
    <nav className="navbar navbar-expand-xl " sticky="top" style={styleNormal}>
        <div className="navbar-nav" style={styleNormal} >
                <NavLink  onClick={()=> navigate("/league")}>
                    <LeagueHeader name="Premier League"logo="src\assets\LeagueLogo\logo-EPL.png" /> 
                </NavLink>
                <NavLink >
                    <LeagueHeader name="La Liga"logo="src\assets\LeagueLogo\logo-LaLiga.png" />
                </NavLink>
                <NavLink >
                    <LeagueHeader name="Serie A"logo="src\assets\LeagueLogo\logo-SerieA.png" />
                </NavLink>
                <NavLink >
                    <LeagueHeader name="Bundesliga"logo="src\assets\LeagueLogo\logo-Bundesliga.png" />
                </NavLink>
                <NavLink >
                    <LeagueHeader name="Ligue 1"logo="src\assets\LeagueLogo\logo-Ligue1.png" />
                </NavLink>
                <NavLink>
                    <LeagueHeader name="Champions League"logo="src\assets\LeagueLogo\logo-UCL.png" />
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
