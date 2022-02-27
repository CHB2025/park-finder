import { useMemo } from "react";
import { useFlickr } from "../../hooks/useFlickr"
import { FlickrPhotoResponse } from "../../types/FlickrPhoto";
import ImageGallery from "react-image-gallery";

import "./ParkImages.css"

export type ParkImageProps = {
   name: string
}

export const ParkImages: React.FC<ParkImageProps> = ({ name }) => {

   const [photos, error] = useFlickr<FlickrPhotoResponse>('flickr.photos.search', 'photos', {
      user_id: '48268815@N02',
      content_type: '1',
      text: name,
      safe_search: '1',
      sort: 'interestingness-asc',
      per_page: '20'
   })

   const items = useMemo(() => {
      if (!photos) return [];

      return photos.photo.map((pic) => {
         const base = `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}`
         return {
            original: base + '_b.jpg',
            thumbnail: base + '_q.jpg'
         }
      })
   }, [photos])

   return (
      <div className="gallery">
         {
            photos && items.length > 0 ?
               <ImageGallery
                  items={items}
                  showFullscreenButton={false}
                  showPlayButton={false}
               />
               : error
         }
      </div>
   )
}