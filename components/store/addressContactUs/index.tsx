import color from '../lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import MapContainer from './MapContainer';

const AddressContactUs = () => {
  const [viewport, setViewPort]: [any, any] = useState({
    latitude: 55.60373,
    longitude: 37.72169,
    zoom: 18,
    width: 'fit',
  });
  const [viewportUser, setViewPortUser]: [any, any] = useState({
    latitude: 55.60373,
    longitude: 37.72169,
    zoom: 16,
    width: 'fit',
  });
  return (
    <>
      <MapContainer
        viewportUser={viewportUser}
        setViewPortUser={setViewPortUser}
        viewport={viewport}
        setViewPort={setViewPort}
      />
    </>
  );
};

export default AddressContactUs;
