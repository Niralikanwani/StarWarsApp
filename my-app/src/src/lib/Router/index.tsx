import { FC, Suspense } from 'react';
import PeopleRoutes from '../../module/People/PeopleRoutes';

const Router: FC = () => (
    <Suspense fallback={<h1>Loading data...</h1>}>
        <PeopleRoutes />
    </Suspense>

);

export default Router;
