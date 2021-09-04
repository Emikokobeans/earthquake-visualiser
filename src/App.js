import './css/App.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import Map from './components/Map';

const dateFormat = require('dateformat');

function App() {
  const [date, setDate] = useState('2014-01-01');
  const [data, setData] = useState({ features: [] });

  useEffect(() => {
    const endtime = new Date(date);
    const previousDay = endtime.setDate(endtime.getDate() - 1);
    const starttime = dateFormat(previousDay, 'yyyy-mm-dd');

    fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <div className='App'>
      <Header date={date} dateFormat={dateFormat} />
      <Search setDate={setDate} />
      <Map data={data} />
    </div>
  );
}

export default App;
