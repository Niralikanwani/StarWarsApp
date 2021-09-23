import { FC } from "react";

type Props = {
    people: any;
};

const Description: FC<Props> = (props) =>  {
    const { people } = props;
    return (
       <ul>
           <li>
               Name: {people.name}
           </li>
           <li>
               Height: {people.height}
           </li>
           <li>
               Mass: {people.mass}
           </li>
           <li>
               Created: {people.created}
           </li>
       </ul> 
    )
}

export default Description;