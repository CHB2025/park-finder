import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ParkImages } from "../../components/ParkImages/ParkImages"
import { ParkAddress } from "../../types/ParkAddress"
import { ParkFeature } from "../../types/ParkFeature"

import "./Park.css"

export const Park: React.FC = () => {
   const { pmaid } = useParams()
   const [parkAddress, setParkAddress] = useState<ParkAddress>()
   const [parkFeatures, setParkFeatures] = useState<ParkFeature[]>()

   useEffect(() => {
      if (pmaid) {
         getAddress(pmaid)
         getParkFeatures(pmaid)
      }
   }, [pmaid])

   const getAddress = async (id: string) => {
      const endpoint = 'https://data.seattle.gov/resource/v5tj-kqhc.json';
      const params = new URLSearchParams();
      params.append('pmaid', id);
      const response = await fetch(endpoint + '?' + params.toString())
      const data: ParkAddress[] = await response.json();
      setParkAddress(data[0])
   }

   const getParkFeatures = async (id: string) => {
      const endpoint = 'https://data.seattle.gov/resource/2cer-njie.json';
      const params = new URLSearchParams();
      params.append('pmaid', id)
      const response = await fetch(endpoint + '?' + params.toString());
      const data: ParkFeature[] = await response.json();
      setParkFeatures(data)
   }

   if (parkAddress) {
      return (
         <section className="park">
            <h1 className="park-name">{parkAddress.name}</h1>
            <div className="park-display">
               <ParkImages name={parkAddress.name} />
               <div className="park-details">
                  <address className="address">{parkAddress.address}<br />Seattle, WA {parkAddress.zip_code}</address>
                  <ul className="features">{parkFeatures?.map((val) => <li>{val.feature_desc}</li>)}</ul>
               </div>
            </div>
         </section>
      )
   }

   return (
      <div className="park-display">
         Loading ...
      </div>
   )
}