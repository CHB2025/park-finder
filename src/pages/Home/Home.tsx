import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './Home.css'

export const Home: React.FC = () => {
   const navigate = useNavigate();

   const search = (value: string) => {
      console.log(value);
      navigate('/search')
   }
   return (
      <div className="home">
         <header className="navigation">
            <SearchBar
               onSubmit={search}
               clearSearch={() => navigate('/')}
            />
         </header>
         <Outlet />
      </div>
   )
}