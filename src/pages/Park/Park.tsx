import { useParams } from "react-router-dom"

export const Park: React.FC = () => {
   const { pmaid } = useParams()
   return (
      <div>
         Park {pmaid}!
      </div>
   )
}