import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";

const ProtectedRoute = () => {
    const { user } = useAuth();
    console.log(user ? "true" : "false");
    return (
      user ? <Outlet/> : <Navigate to="/login"/>
    )};
    
export default ProtectedRoute;