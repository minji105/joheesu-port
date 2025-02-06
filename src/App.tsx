import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Menu from './component/Container/Menu';
import ScrollTop from './component/Buttons/ScrollTop';

const MainPage = lazy(() => import('./pages/Main/MainPage'));
const List = lazy(() => import('./pages/AllView/List'));
const Project = lazy(() => import('./pages/AllView/Project'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <title>joheesu</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="Photographer Choheesu" />
          <meta name="application-name" content="Photographer Choheesu" />
          <meta name="author" content="Choheesu" />
          <meta name="description" content="사진작가 조희수 포토 갤러리" />
          <meta name="keywords" content="사진작가, 사진작가 사이트" />
          <meta name="google-site-verification" content="HKhVSW28AmCFsv2t3dkz51K1fkct_KK-QzH52GcJjb0" />
          <meta property="og:title" content="Photographer Choheesu" />
          <meta property="og:description" content="사진작가 조희수 포토 갤러리" />
          <meta charSet="UTF-8" />
        </Helmet>
        <div className="App">
          <Suspense fallback={<div>loading . . .</div>}>
            <Menu />
            <ScrollTop />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:category/:title" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
