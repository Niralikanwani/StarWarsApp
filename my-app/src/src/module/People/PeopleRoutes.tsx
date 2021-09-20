import { Route, Switch } from 'react-router-dom';
import { lazy, FC } from 'react';
import { RoutePaths } from '../../lib/routePaths';

const PeopleList = lazy(() => import('./index'));
const PeopleDescription = lazy(() => import('./components/peopleDescription'));

const {
    PEOPLE_LIST,
    PEOPLE_DESCRIPTION
} = RoutePaths.PeopleRoutes;

const PeopleRoutes: FC = () => (
  <Switch>
    <Route exact path={PEOPLE_LIST} component={PeopleList} />
    <Route exact path={PEOPLE_DESCRIPTION} component={PeopleDescription} />
  </Switch>
);

export default PeopleRoutes;
