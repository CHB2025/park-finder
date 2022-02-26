import { useNavigate } from 'react-router-dom';
import { ParkWithFeature } from '../../types/ParkWithFeature';
import './ParkPreview.css';

export type ParkPreviewProps = {
   park: ParkWithFeature
}

export const ParkPreview: React.FC<ParkPreviewProps> = ({ park }) => {

   const navigate = useNavigate();

   return (
      <div className="park-preview" onClick={() => { navigate(`/park/${park.pmaid}`) }}>
         <h2 className="park-name">{park.name}</h2>
         <div className="feature-of-interest">{park.feature_desc}</div>
      </div>
   )
}