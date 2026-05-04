import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AppWorking from './AppWorking';

function App() {
  return (
    <Router>
      <AppWorking />
    </Router>
  );
}

export default App;
