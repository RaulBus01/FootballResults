import React from "react";
import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import LeagueHeader from "../LeagueHeader/LeagueHeader";
import "bootstrap/js/src/dropdown.js";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import {auth } from "../../firebase-config";



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
                    <LeagueHeader name="Premier League" logo=".\src\assets\LeagueLogo\logo-EPL.png" />
                </NavLink>
                <NavLink onClick={()=> navigate("/La Liga")}>
                    <LeagueHeader name="La Liga"logo=".\src\assets\LeagueLogo\logo-LaLiga.png" />
                </NavLink>
                <NavLink onClick={()=> navigate("/Serie A")}>
                    <LeagueHeader name="Serie A"logo="src\assets\LeagueLogo\logo-SerieA.png" />
                </NavLink>
                <NavLink onClick={()=> navigate("/Bundesliga")}>
                    <LeagueHeader name="Bundesliga"logo="src\assets\LeagueLogo\logo-Bundesliga.png" />
                </NavLink>
                <NavLink onClick={()=> navigate("/Ligue 1")}>
                    <LeagueHeader name="Ligue 1"logo="src\assets\LeagueLogo\logo-Ligue1.png" />
                </NavLink>
        
               
                <div className="dropdown show">
                    <div className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-list-ul"></i>
                    </div>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <NavLink onClick={()=> navigate("/Eredivisie")}>
                        <LeagueHeader name="Eredivisie" />
                    </NavLink>
                    <NavLink onClick={()=> navigate("/Primeira Liga")}>
                        <LeagueHeader name="Primeira Liga" />
                    </NavLink>
                    
                    <NavLink onClick={()=> navigate("/Campeonato Brasileiro Série A")}>
                        <LeagueHeader name="Brasil Seria A" />
                    </NavLink>
                    <NavLink onClick={()=> navigate("/Championship")}>
                        <LeagueHeader name="Championship" />
                    </NavLink>

                    </div>
                    </div>
                
                
        </div>
 
    </>
    )
    }
