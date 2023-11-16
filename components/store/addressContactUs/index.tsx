import color from '../lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import MapContainer from './MapContainer';

const AddressContactUs = () => {
  const [viewport, setViewPort]: [any, any] = useState({
    latitude: 59.98653,
    longitude: 30.22623,
    zoom: 18,
    width: 'fit',
  });
  const [viewportUser, setViewPortUser]: [any, any] = useState({
    latitude: 59.98653,
    longitude: 30.22623,
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

const Headers = styled.h1`
  width: 100%;
  text-aling: start;
  font-family: Anticva;
  font-size: 1.5rem;
`;

const Contents = styled.span`
  width: 100%;
  text-align: start;
  font-size: 1rem;
`;

const Links = styled.span`
  color: ${color.yellow};
  &:hover {
    color: ${color.hover};
  }
`;

export default AddressContactUs;
