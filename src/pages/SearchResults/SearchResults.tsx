import { stringify } from 'querystring';
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ParkPreview } from '../../components/ParkPreview/ParkPreview';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import './SearchResults.css'


export const SearchResults: React.FC = () => {
   const { query } = useParams();
   const [results, setResults] = useState<ParkWithFeature[]>([]);
   const combinedResults = useMemo(() => {
      return results.reduce((obj, park) => {
         if (!obj.hasOwnProperty(park.pmaid)) {
            obj[park.pmaid] = [];
         }
         obj[park.pmaid].push(park)
         return obj;
      }, {} as Record<string, ParkWithFeature[]>)
   }, [results])

   const updateResults = async (q: string) => {
      const endpoint = 'https://data.seattle.gov/resource/j9km-ydkc.json'
      const params = new URLSearchParams();
      params.append("$q", q)
      const request = await fetch(endpoint + '?' + params.toString())
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
            Object.values(combinedResults).sort((a, b) => b.length - a.length).map((park) => {

               return <ParkPreview key={park[0].pmaid} parkFeatures={park} />
            })
         }
      </div>
   )
}