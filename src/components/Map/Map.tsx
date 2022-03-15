import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Children, cloneElement, HTMLAttributes, isValidElement, useEffect, useRef, useState } from "react"
import { usePosition } from "../../hooks/usePosition";

type MapProps = HTMLAttributes<HTMLDivElement> & {

}

export const Map: React.FC<MapProps> = ({ children, ...rest }) => {
   const ref = useRef<HTMLDivElement>(null);
   const [map, setMap] = useState<google.maps.Map>()
   const pos = usePosition();

   useEffect(() => {
      if (ref.current && !map) {
         const options = {
            center: {
               lat: 47.6062,
               lng: -122.3321
            },
            zoom: 11,
            styles: [
               {
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#212121"
                     }
                  ]
               },
               {
                  "elementType": "labels.icon",
                  "stylers": [
                     {
                        "visibility": "off"
                     }
                  ]
               },
               {
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#757575"
                     }
                  ]
               },
               {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                     {
                        "color": "#212121"
                     }
                  ]
               },
               {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#757575"
                     }
                  ]
               },
               {
                  "featureType": "administrative.country",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#9e9e9e"
                     }
                  ]
               },
               {
                  "featureType": "administrative.land_parcel",
                  "stylers": [
                     {
                        "visibility": "off"
                     }
                  ]
               },
               {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#bdbdbd"
                     }
                  ]
               },
               {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#757575"
                     }
                  ]
               },
               {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#181818"
                     }
                  ]
               },
               {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#616161"
                     }
                  ]
               },
               {
                  "featureType": "poi.park",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                     {
                        "color": "#1b1b1b"
                     }
                  ]
               },
               {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": [
                     {
                        "color": "#2c2c2c"
                     }
                  ]
               },
               {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#8a8a8a"
                     }
                  ]
               },
               {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#373737"
                     }
                  ]
               },
               {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#3c3c3c"
                     }
                  ]
               },
               {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#4e4e4e"
                     }
                  ]
               },
               {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#616161"
                     }
                  ]
               },
               {
                  "featureType": "transit",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#757575"
                     }
                  ]
               },
               {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                     {
                        "color": "#000000"
                     }
                  ]
               },
               {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                     {
                        "color": "#3d3d3d"
                     }
                  ]
               }
            ]
         }
         setMap(new google.maps.Map(ref.current, options))
      }
   }, [ref, map])

   useEffect(() => {
      if (pos && map) {
         map.setCenter(pos)
         map.setZoom(12)
      }
   }, [pos, map])

   return (
      <>
         <div ref={ref} {...rest} />
         {
            Children.map(children, (child) => {
               if (isValidElement(child)) {
                  return cloneElement(child, {
                     map,
                     label: { text: child.props.label, color: '#FFFFFF' },
                     onClick: (event: google.maps.MapMouseEvent) => {
                        if (child.props.onClick) child.props.onClick(event);

                        if (event.latLng && map) {
                           map.setCenter(event.latLng)
                           map.setZoom(16)
                        }
                     }
                  })
               }
            })
         }
      </>
   )
}


export const MapWrapper: React.FC = ({ children }) => {
   const render = (status: Status) => <h1>{status}</h1>
   return (
      <Wrapper
         apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
         render={render}
         libraries={['geometry']}
      >
         {children}
      </Wrapper>
   )
}