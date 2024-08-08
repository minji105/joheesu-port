import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './component/Container/Menu';
import ScrollTop from './component/Buttons/ScrollTop';
import MainPage from './pages/Main/MainPage';
import List from './pages/AllView/List';
import Project from './pages/AllView/Project';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <ScrollTop />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/list/:category/:title' element={<Project />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
