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

    const editClickHandler = (url: string) => {
        const id = url.split("https://swapi.dev/api/people/");
        return history.push(PEOPLE_DESCRIPTION.replace(':id?', id[1]));
    };

    return (
        <div>
            <ul>
            { people.map((person: any, index: number) =>
                <Button 
                    onClick={() => {editClickHandler(person.url)}}
                    buttonText={person.name}
                    key={index}
                />
            )}
            </ul>
        </div>
    )
};

export default PeopleList