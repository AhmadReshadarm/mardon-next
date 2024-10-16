import styled from 'styled-components';
import color from '../../lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  GeolocationControl,
  Map,
  SearchControl,
  ZoomControl,
} from 'react-yandex-maps';
import { useState, useRef, useEffect } from 'react';
import { initialStateAdress } from './constant';
import LocationPlacemark from '@mui/icons-material/LocationOn';

const mapOptions = {
  modules: ['geocode', 'SuggestView'],
  defaultOptions: { suppressMapOpenBlock: true },
  width: '100%',
  height: '100%',
};

const geolocationOptions = {
  defaultOptions: {
    maxWidth: 300,
  },
  defaultData: { content: 'Определить местоположение' },
};

const MapContainer = (props: any) => {
  const { viewport, setViewPort, setAddress, mapRef, setPostCode } = props;

  const [mapConstructor, setMapConstructor]: [any, any] = useState(null);

  const searchRef = useRef(null);
  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get('text');
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialStateAdress.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setViewPort((prevState) => ({ ...prevState, address: foundAddress }));
      }
    });
  };
  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        'select',
        function (e) {
          const selectedName = e.get('item').value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setViewPort((prevState) => ({ ...prevState, center: newCoords }));
          });
        },
      );
    }
  }, [mapConstructor]);
  useEffect(() => {
    setAddress(viewport.address);
  }, [viewport]);
  return (
    <MapContianerWrapper>
      <input
        style={{ display: 'none' }}
        ref={searchRef}
        placeholder="Search..."
        disabled={!mapConstructor}
      />
      <Map
        {...mapOptions}
        state={viewport}
        onLoad={setMapConstructor}
        onBoundsChange={handleBoundsChange}
        instanceRef={mapRef}
      >
        <LocationPlacemark className="placemark" color="primary" />

        <GeolocationControl {...geolocationOptions} />
        <ZoomControl />
        <SearchControl
          options={{
            float: 'left',
            noSuggestPanel: 'true',
          }}
        />
      </Map>
    </MapContianerWrapper>
  );
};

const MapContianerWrapper = styled.div`
  width: 60%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-contente: center;
  align-items: flex-end;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  .mapboxgl-map {
    width: 100%;
    height: 100%;
  }
  .ymaps-2-1-79-float-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .placemark {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 1200;
    fontsize: 35px !important;
    cursor: grab;
  }

  @media ${devices.laptopS} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.tabletL} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.tabletS} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileL} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileM} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileS} {
    width: 95vw;
    height: 75vh;
  }
`;

export default MapContainer;
