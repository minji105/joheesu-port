import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './component/Container/Menu';
import ScrollTop from './component/Buttons/ScrollTop';

const MainPage = lazy(() => import('./pages/Main/MainPage'));
const List = lazy(() => import('./pages/AllView/List'));
const Project = lazy(() => import('./pages/AllView/Project'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>loading . . .</div>}>
          <Menu />
          <ScrollTop />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/list' element={<List />} />
            <Route path='/list/:category/:title' element={<Project />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
