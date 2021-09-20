import { RoutePaths } from '../../../lib/routePaths';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import { FC } from 'react';

type Props = {
    people:Array<object>;
  };

const PeopleList: FC<Props> = (props) => {
    const { people } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    const { PeopleRoutes: { PEOPLE_DESCRIPTION } } = RoutePaths;

    const editClickHandler = (id: any) => {
        return history.push(PEOPLE_DESCRIPTION.replace(':id?', id));
    };

    return (
        <div>
            <ul>
            { people.map((person: any, index: number) =>
                <Button 
                    onClick={() => {editClickHandler(index+1)}}
                    buttonText={person.name}
                    key={index}
                />
            )}
            </ul>
        </div>
    )
};

export default PeopleList