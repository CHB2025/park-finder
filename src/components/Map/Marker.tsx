import { useEffect, useState } from "react";

export const Marker: React.FC<google.maps.MarkerOptions & { onClick?: (event: google.maps.MapMouseEvent) => void }> = ({ onClick, ...options }) => {
   const [marker, setMarker] = useState<google.maps.Marker>();

   useEffect(() => {
      if (!marker) {
         setMarker(new google.maps.Marker());
      }
      // remove marker from map on unmount
      return () => {
         if (marker) {
            marker.setMap(null);
         }
      };
   }, [marker, onClick]);

   useEffect(() => {
      if (marker) {
         marker.setOptions(options);
      }
      if (marker && onClick) {
         marker.addListener('click', onClick)
      }
   }, [marker, options, onClick]);

   return null;
};