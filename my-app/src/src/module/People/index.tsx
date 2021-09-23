import React, { useEffect } from 'react';
import PeopleList from './components/PeopleList';
import { peopleService } from '../../service/api/people';
// import Loader from '../../components/Loader';

const People: any = (props: { people: any; }) => {
  const [people, setPeople] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);

  const loadPeopleData = async () => {
    // setLoading(true);
    const res = await peopleService.loadPeopleData();
    setPeople(res);
    // setLoading(false);
  };

  useEffect(() => {
    loadPeopleData();
  }, []);

  return (
    <div>
      {/* <Loader open={loading} /> */}
      <h1>Star Wars People List</h1>
      <PeopleList people={people} />
    </div>
  )
}

export default People;