import React from 'react';
import {
   Routes,
   Route
} from "react-router-dom";
import './App.css';
import { MapWrapper } from './components/Map/Map';
import { PositionProvider } from './hooks/usePosition';
import { Home } from './pages/Home/Home';
import { Park } from './pages/Park/Park';
import { SearchResults } from './pages/SearchResults/SearchResults';

function App() {
   return (
      <div className="App">
         <PositionProvider>
            <MapWrapper>
               <Routes>
                  <Route path="/" element={<Home />}>
                     <Route path="search/:query" element={<SearchResults />} />
                     <Route path="park/:pmaid" element={<Park />} />
                  </Route>
                  <Route path="*" />
               </Routes>
            </MapWrapper>
         </PositionProvider>
      </div>
   );
}

export default App;
