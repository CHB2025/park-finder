import { createContext, useContext, useEffect, useState } from "react"

const PositionContext = createContext<{ lat: number, lng: number } | undefined>(undefined)

export const PositionProvider: React.FC = ({ children }) => {
   const [lat, setLat] = useState<number>();
   const [lng, setLng] = useState<number>();
   useEffect(() => {
      const geo = navigator.geolocation;
      if (!geo) {
         console.log('Location not supported')
      }
      geo.getCurrentPosition(
         (pos) => {
            setLat(pos.coords.latitude)
            setLng(pos.coords.longitude)
         },
         (error) => {
            console.log('No location.', error)
         }
      )
   }, [])

   const pos = lat && lng ? { lat, lng } : undefined

   return (
      <PositionContext.Provider value={pos}>
         {children}
      </PositionContext.Provider >
   )
}

export const usePosition = () => {
   return useContext(PositionContext)
}