import { Fragment, useEffect, useState } from "react"
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
         <div className="park-display">
            <h1 className="name">{parkAddress?.name}</h1>
            <div className="address">{parkAddress?.address}<br />Seattle, WA {parkAddress?.zip_code}</div>
            <ParkImages name={parkAddress.name} />

         </div>
      )
   }

   return (
      <div className="park-display">
         Loading ...
      </div>
   )
}