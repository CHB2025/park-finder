import "./InputGroup.css"

export type InputGroupProps = {
   fontSize?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
   fontSize = '1rem',
   children
}) => {

   const wrapperStyle = {
      fontSize,
      padding: `0 calc((${fontSize} * 1.4 + ${fontSize} * 0.8 * 2) / 2)`,
      borderRadius: `calc((${fontSize} * 1.4 + ${fontSize} * 0.8 * 2) / 2)`
   }

   return (
      <div className="group" style={wrapperStyle}>
         {children}
      </div>
   )
}