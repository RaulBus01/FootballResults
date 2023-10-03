import React from "react";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from "react-bootstrap";
import './Header.css'
import "bootstrap/js/src/collapse.js";
import { useNavigate } from "react-router-dom";

export default function Header ()
{
    
    const styleNormal = {
        backgroundColor: "#4E6C50",
        maxHeight: '90px',
        width: '100%',

        
        
      };
    const searchStyle = {
        backgroundColor: "transparent",
        maxHeight: '50px',   
    }
   
    const navigate = useNavigate();
 
      return (
      
        
        <nav className="navbar navbar-expand-md bg-body-transparent " fixed="top"  style={styleNormal}>
            <div className="container-fluid">
            <div className="navbar-brand" onClick={()=>navigate("./")}>
            <img className="football-png" src="src\assets\football.svg" alt="logo" />
                <img className="logo-png" src="src\assets\Flash.png" alt="logo" />
            
            </div>
            
             <button
             className="navbar-toggler" 
             type="button" 
             data-bs-toggle="collapse" 
             data-bs-target="#navbarNav" 
             aria-controls="navbarNav"
             aria-expanded="false" 
             aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
             </button> 
             <div className="collapse navbar-collapse" id="navbarNav" >
             <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 ms-auto"
                  aria-label="Search"
                style={searchStyle}
              
                
                />
                <button  className="search-btn" type="button">
                <i className="fas fa-search"></i>
                </button>
                
                <div className="buttons-container"> 
                  <button className="logIn-btn" type="button">
                    <i className="fas fa-user " aria-hidden="true" ></i> 
                    <span className="logIn-btn-text">Log In</span>
                  </button>
                
                </div>
            
                
            </div>
            </div>
          

         
            
            </nav>
        
    )
}