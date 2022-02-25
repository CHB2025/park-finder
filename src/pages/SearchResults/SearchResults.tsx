import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import './SearchResults.css'


export const SearchResults: React.FC = () => {
   const { query } = useParams();
   const [results, setResults] = useState<ParkWithFeature[]>([]);

   const updateResults = async (q: string) => {
      const endpoint = `https://data.seattle.gov/resource/j9km-ydkc.json?`
      const params = new URLSearchParams();
      params.append("$q", q)
      const request = await fetch(endpoint + params.toString())
      const data: ParkWithFeature[] = await request.json()
      console.log(data)
      setResults(data)
   }

   useEffect(() => {
      console.log(query)
      if (query) updateResults(query)
   }, [query])

   return (
      <div className="results-wrapper">
         {
            results.map((park) => {
               return <p key={park.pmaid}>{park.name}: {park.feature_desc}</p>
            })
         }
      </div>
   )
}