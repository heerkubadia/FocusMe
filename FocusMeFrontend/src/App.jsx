import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadImages from './pages/UploadImages';
import GetImages from './pages/GetImages';
import GetAllImages from './pages/GetAllImages';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/images" element={<UploadImages />} />
          <Route exact path="/get" element={<GetImages />} />
          <Route exact path ="/getall" element = {<GetAllImages/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;