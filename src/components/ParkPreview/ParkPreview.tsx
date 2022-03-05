import { useNavigate } from 'react-router-dom';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import './ParkPreview.css';

export type ParkPreviewProps = {
   parkFeatures: ParkWithFeature[];
   index: number;
}

export const ParkPreview: React.FC<ParkPreviewProps> = ({ parkFeatures, index }) => {

   const navigate = useNavigate();

   return (
      <details className="park-preview" >
         <summary className="park-name">({index + 1}) {parkFeatures[0].name}</summary>
         <ul className="preview-feature-list">
            {
               parkFeatures.map((park, index) => {
                  return (
                     <li key={index}>{park.feature_desc}</li>
                  )
               })
            }
         </ul>
         <button onClick={() => { navigate(`/park/${parkFeatures[0].pmaid}`) }}>See more</button>
      </details>
   )
}