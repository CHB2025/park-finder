import React from 'react';
import {
   Routes,
   Route
} from "react-router-dom";
import './App.css';
import { Home } from './pages/Home/Home';
import { SearchResults } from './pages/SearchResults/SearchResults';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />}>
               <Route path="search/:query" element={<SearchResults />} />
            </Route>
            <Route path="*" />
         </Routes>
      </div>
   );
}

export default App;
