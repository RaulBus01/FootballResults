import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainContainer from './components/Main/MainContainer';
import LogIn from './components/LogIn/LogIn';
import { AuthProvider } from './Auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
     
            <Route path="*" element={<MainContainer />} />
          
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
