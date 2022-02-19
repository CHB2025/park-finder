import { FormEvent, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

export type SearchBarProps = {
   onSubmit: (value: string) => void;
   clearSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
   onSubmit,
   clearSearch
}) => {
   const [search, setSearch] = useState('')

   const submitForm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(search);
   }
   const clearForm = () => {
      setSearch('');
      clearSearch()
   }

   return (
      <div className="search-bar-wrapper">
         <form onSubmit={submitForm}>
            <div className="search-bar">
               <FaSearch />
               <input
                  className="search-bar-input"
                  type="search"
                  placeholder="What do you want to do?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
               {
                  search ? <FaTimes onClick={clearForm} /> : null
               }
            </div>
         </form>
      </div>
   )
}