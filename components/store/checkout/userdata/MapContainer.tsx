import styled from 'styled-components';
import color from '../../lib/ui.colors';
// import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { coordToAddress } from './helpers';
import { MAPBOX_TOKEN } from './constant';
import { devices } from 'components/store/lib/Devices';
import {
  GeolocationControl,
  Map,
  ZoomControl,
  Placemark,
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
  defaultData: { content: 'Определить ваше местоположение' },
};

const MapContainer = (props: any) => {
  const { viewport, setViewPort, setAddress, mapRef, setPostCode } = props;
  // const initialStateAdress = {
  //   address: '',
  //   center: [59.98653, 30.22623],
  //   zoom: 12,
  // };
  // const mapOptions = {
  //   modules: ['geocode', 'SuggestView'],
  //   defaultOptions: { suppressMapOpenBlock: true },
  //   width: '100%',
  //   height: '100%',
  // };
  // const geolocationOptions = {
  //   defaultOptions: { maxWidth: 128 },
  //   defaultData: { content: 'Determine' },
  // };

  const [mapConstructor, setMapConstructor]: [any, any] = useState(null);
  // const mapRef: any = useRef(null);
  const searchRef = useRef(null);
  // change title
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
    <MapContianer>
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
        {/* <Placemark
          geometry={[viewport.center[0], viewport.center[1]]}
          // defaultGeometry={[55.749451, 37.542824]}
        /> */}

        <GeolocationControl {...geolocationOptions} />
        <ZoomControl />
      </Map>
      {/* <Map
        {...viewport}
        onMove={(evt) => setViewPort(evt.viewState)}
        onDragEnd={() => {
          coordToAddress(viewport, 'drag', 0, 0, setAddress, setPostCode);
        }}
        // style={{ width: '75vw', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          color={color.btnPrimary}
        />

        <GeolocateControl
          onGeolocate={(position) => {
            coordToAddress(
              viewport,
              'geo',
              position.coords.longitude,
              position.coords.latitude,
              setAddress,
              setPostCode,
            );
            setViewPort({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }}
          positionOptions={{ enableHighAccuracy: true }}
        />

        <NavigationControl />
      </Map> */}
    </MapContianer>
  );
};

const MapContianer = styled.div`
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
  // .ymaps-2-1-79-zoom__icon {
  //   bottom: 0px;
  //   top: 5px;
  //   right: 0;
  //   left: 5px;
  // }
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
  @media (min-width: 768px) and (max-width: 1100px) {
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
