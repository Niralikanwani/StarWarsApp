import axios from 'axios';

axios.interceptors.request.use(function (config) {
  document.body.classList.add('loading-indicator');
  return config
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  document.body.classList.remove('loading-indicator');
  return response;
}, function (error) {
  return Promise.reject(error);
});

class PeopleService {
  getPeople = async (id: string): Promise<any> => {
    try {
      const response = await axios(`https://swapi.dev/api/people/${id}`);
      return await response.data;
    } catch (e) {
      return {};
    }
  }

  loadPeopleData = async (): Promise<any> => {
    try {
      const response = await axios(`https://swapi.dev/api/people/`);
      return await response.data.results;
    } catch (e) {
      return [];
    }
  }
}

export const peopleService = new PeopleService();
