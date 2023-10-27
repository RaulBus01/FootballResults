import React from "react";
import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import LeagueHeader from "../LeagueHeader/LeagueHeader";
import "bootstrap/js/src/dropdown.js";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import {auth } from "../../firebase-config";

import logoEPL from "../../assets/LeagueLogo/logo-EPL.png"
import logoLaLiga from "../../assets/LeagueLogo/logo-LaLiga.png"
import logoSerieA from "../../assets/LeagueLogo/logo-SerieA.png"
import logoBundesliga from "../../assets/LeagueLogo/logo-Bundesliga.png"
import logoLigue1 from "../../assets/LeagueLogo/logo-Ligue1.png"
import logoEredivisie from "../../assets/LeagueLogo/logo-Eredvisie.png"
import logoPrimeraLiga from "../../assets/LeagueLogo/logo-PrimeraLiga.png"
import logoBrasilSerieA from "../../assets/LeagueLogo/logo-BrasilSerieA.png"
import logoChampionship from "../../assets/LeagueLogo/logo-Championship.png"


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
    const user = auth.currentUser;

    

  
    
    return (
    <>
    <Header/>
 
        <div className="navbar-nav" style={styleNormal} >
                <NavLink className="favorite-header" onClick={ ()=>navigate("/favorite")}>
                    
                    <i className="fa-regular fa-star"></i>
                   <span className="favorite-text">Favorites</span>

                </NavLink>
                <NavLink  onClick={()=> navigate("/Premier League")}>
                    <LeagueHeader name="Premier League" logo={logoEPL} />
                </NavLink>
                <NavLink onClick={()=> navigate("/La Liga")}>
                    <LeagueHeader name="La Liga"logo={logoLaLiga} />
                </NavLink>
                <NavLink onClick={()=> navigate("/Serie A")}>
                    <LeagueHeader name="Serie A"logo={logoSerieA} />
                </NavLink>
                <NavLink onClick={()=> navigate("/Bundesliga")}>
                    <LeagueHeader name="Bundesliga"logo={logoBundesliga} />
                </NavLink>
                <NavLink onClick={()=> navigate("/Ligue 1")}>
                    <LeagueHeader name="Ligue 1"logo={logoLigue1} />
                </NavLink>
        
               
                <div className="dropdown show">
                    <div className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLinkBtn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-list-ul"></i>
                    </div>

                    <div className="dropdown-menu" aria-labelledby="dropdown" id="dropdown-menuLink">
                    <NavLink onClick={()=> navigate("/Eredivisie")}>
                        <LeagueHeader name="Eredivisie" logo={logoEredivisie} />
                    </NavLink>
                    <NavLink onClick={()=> navigate("/Primeira Liga")}>
                        <LeagueHeader name="Primeira Liga" logo={logoPrimeraLiga} />
                    </NavLink>
                    
                    <NavLink onClick={()=> navigate("/Campeonato Brasileiro Série A")}>
                        <LeagueHeader name="Brasil Seria A" logo={logoBrasilSerieA} />
                    </NavLink>
                    <NavLink onClick={()=> navigate("/Championship")}>
                        <LeagueHeader name="Championship" logo={logoChampionship} />
                    </NavLink>

                    </div>
                    </div>
                
                
        </div>
 
    </>
    )
    }
