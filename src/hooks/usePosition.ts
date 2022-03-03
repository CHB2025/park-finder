import { useState } from "react"

export const usePosition = () => {
   const [lat, setLat] = useState<number>();
   const [lng, setLng] = useState<number>();
   return { lat, lng }
}