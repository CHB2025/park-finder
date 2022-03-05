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
      const groups = results.reduce((obj, park) => {
         if (!obj.hasOwnProperty(park.pmaid)) {
            obj[park.pmaid] = [];
         }
         obj[park.pmaid].push(park)
         return obj;
      }, {} as Record<string, ParkWithFeature[]>)
      // Not great to just filter out results without a location. Not sure how else to deal with them, besides getting the address.
      return Object.keys(groups).filter((pmaid) => groups[pmaid].find((f) => f.location !== undefined) !== undefined).map((pmaid) => {
         const feats = groups[pmaid];
         const fwl = feats.find((f) => f.location !== undefined)
         if (!fwl) { //will never happen because they are filtered out above
            throw new Error('No feature included location in park ' + pmaid)
         }
         const { name, location, hours } = fwl
         const goodLocation = { lat: parseFloat(location!.latitude), lng: parseFloat(location!.longitude) }
         const distance = pos ? google.maps.geometry.spherical.computeDistanceBetween(pos, goodLocation) : Number.MAX_SAFE_INTEGER
         return {
            pmaid,
            name,
            location: goodLocation,
            hours,
            features: feats,
            distance
         }
      })

   }, [results, pos])

   const updateResults = async (q: string) => {
      const endpoint = 'https://data.seattle.gov/resource/j9km-ydkc.json'
      const params = new URLSearchParams();
      params.append("$q", q)
      const request = await fetch(endpoint + '?' + params.toString())
      const data: ParkWithFeature[] = await request.json()
      setResults(data)
   }

   useEffect(() => {
      if (query) updateResults(query)
   }, [query])

   const sorted = combinedResults.sort((a, b) => a.distance - b.distance)

   return (
      <div className="results-wrapper">
         <Map className="results-map" >
            {
               sorted.map((park, index) => {
                  return <Marker
                     label={(index + 1).toString()}
                     position={park.location}
                     title={park.name}
                     key={park.pmaid}
                     clickable={true}
                  />
               })
            }
         </Map>
         <div className="results-list">
            {
               sorted.length > 0 ?
                  sorted.map((park, index) => {
                     return <ParkPreview key={park.pmaid} index={index} parkFeatures={park.features} />
                  }) :
                  <div>
                     <h2 className="park-name">No Results Found</h2>
                  </div>
            }
         </div>
      </div>
   )
}