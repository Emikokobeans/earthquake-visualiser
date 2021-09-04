import { useEffect, useState } from 'react';
import GMaps from 'gmaps';
import dateFormat from 'dateformat';

const Map = (props) => {
  const { data } = props;
  const [earthquake, setEarthquake] = useState();

  useEffect(() => {
    if (data.features.length) {
      const map = new GMaps({
        el: '#map',
        lat: 53.480759,
        lng: -2.242631,
        zoom: 1
      });

      const earthquakes = [];
      data.features.forEach((earthquake) => {
        const output = {};
        const { coordinates } = earthquake.geometry;

        console.log(earthquake);

        output.lng = coordinates[0];
        output.lat = coordinates[1];
        output.radius = earthquake.properties.mag * 100000;
        output.magnitude = earthquake.properties.mag;
        output.fillColor = 'red';
        output.strokeWeight = '1';
        output.strokeColor = 'white';
        output.place = earthquake.properties.place;
        output.mouseover = () => {
          console.log(output);
          const time = dateFormat(earthquake.properties.time, 'HH:MM:ss');
          setEarthquake({
            place: earthquake.properties.place,
            time: time,
            magnitude: earthquake.properties.mag
          });
        };

        earthquakes.push(output);
      });
      earthquakes.forEach((earthquake) => {
        map.drawCircle(earthquake);
      });
    }
  }, [data]);

  return (
    <section className='map__container'>
      {earthquake && (
        <div class='info_box'>
          <h2>{earthquake.place}</h2>
          <p>Time: {earthquake.time}</p>
          <p>Magnitude: {earthquake.magnitude}</p>
        </div>
      )}
      <div id='map' className='mapDisplay'></div>
    </section>
  );
};

export default Map;
