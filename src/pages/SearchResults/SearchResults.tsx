import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ParkPreview } from '../../components/ParkPreview/ParkPreview';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import { Map } from '../../components/Map/Map'
import './SearchResults.css'
import { Marker } from '../../components/Map/Marker';
import { usePosition } from '../../hooks/usePosition';


export const SearchResults: React.FC = () => {
   const { query } = useParams();
   const [results, setResults] = useState<ParkWithFeature[]>([]);
   const pos = usePosition();
   const combinedResults = useMemo(() => {
      return results.reduce((obj, park) => {
         if (!obj.hasOwnProperty(park.pmaid)) {
            obj[park.pmaid] = [];
         }
         obj[park.pmaid].push(park)
         return obj;
      }, {} as Record<string, ParkWithFeature[]>)
   }, [results])
   const [distances, setDistances] = useState<Record<string, number>>({})

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

   useEffect(() => {
      if (pos) {
         const newDistances = Object.keys(combinedResults).reduce((dis, pmaid) => {
            const park = combinedResults[pmaid][0]
            dis[pmaid] = google.maps.geometry.spherical.computeDistanceBetween(pos, { lat: parseFloat(park.location?.latitude || '0'), lng: parseFloat(park.location?.longitude || '0') })
            return dis
         }, {} as Record<string, number>)
         setDistances(newDistances)
      }
   }, [pos, combinedResults])

   const sortedKeys = Object.keys(combinedResults).sort((a, b) => distances[a] - distances[b])

   return (
      <div className="results-wrapper">
         <Map className="results-map" >
            {
               sortedKeys.map((pmaid, index) => {
                  const parks = combinedResults[pmaid]
                  const location = parks.find((p) => p.location !== undefined)?.location
                  return <Marker
                     label={(index + 1).toString()}
                     position={{
                        lat: parseFloat(location?.latitude || '0'),
                        lng: parseFloat(location?.longitude || '0')
                     }}
                     title={parks[0].name}
                     key={pmaid}
                     clickable={true}
                  />
               })
            }
         </Map>
         <div className="results-list">
            {
               sortedKeys.length > 0 ?
                  sortedKeys.map((pmaid, index) => {
                     const park = combinedResults[pmaid]
                     return <ParkPreview key={pmaid} index={index} parkFeatures={park} />
                  }) :
                  <div>
                     <h2 className="park-name">No Results Found</h2>
                  </div>
            }
         </div>
      </div>
   )
}