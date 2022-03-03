import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ParkPreview } from '../../components/ParkPreview/ParkPreview';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import { Map } from '../../components/Map/Map'
import './SearchResults.css'
import { Marker } from '../../components/Map/Marker';


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
         <Map className="results-map" >
            {
               Object.values(combinedResults).sort((a, b) => b.length - a.length).map((park, index) => {
                  if (park.some((p) => p.location !== undefined)) {
                     const location = park.find((p) => p.location !== undefined)?.location
                     return <Marker
                        label={(index + 1).toString()}
                        position={{
                           lat: parseFloat(location?.latitude || '0'),
                           lng: parseFloat(location?.longitude || '0')
                        }}
                        key={park[0].pmaid}
                     />
                  }
                  return null;
               })
            }
         </Map>
         <div className="results-list">
            {
               Object.values(combinedResults).sort((a, b) => b.length - a.length).map((park, index) => {

                  return <ParkPreview key={park[0].pmaid} index={index} parkFeatures={park} />
               })
            }
         </div>
      </div>
   )
}