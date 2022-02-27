import { useNavigate } from 'react-router-dom';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import './ParkPreview.css';

export type ParkPreviewProps = {
   parkFeatures: ParkWithFeature[]
}

export const ParkPreview: React.FC<ParkPreviewProps> = ({ parkFeatures }) => {

   const navigate = useNavigate();

   return (
      <div className="park-preview" onClick={() => { navigate(`/park/${parkFeatures[0].pmaid}`) }}>
         <h2 className="park-name">{parkFeatures[0].name}</h2>
         {
            parkFeatures.map((park, index) => {
               return (
                  <div key={index}>{park.feature_desc}</div>
               )
            })
         }
      </div>
   )
}