import './App.css';
import Router from '../lib/Router';
import Calender from '../components/Calender';

function App() {

  const date = new Date();
  const month = new Date();

  return (
    <div className="App">
      <Router />
      <Calender date={date} month={month} />  
    </div>
  );
}

export default App;
