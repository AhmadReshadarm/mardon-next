// import styled, { keyframes } from 'styled-components';
// import color from '../../lib/ui.colors';
// import { devices } from 'components/store/lib/Devices';
// import {
//   GeolocationControl,
//   Map,
//   SearchControl,
//   ZoomControl,
// } from 'react-yandex-maps';
// import { useState, useRef, useEffect } from 'react';
// import { initialStateAdress } from './constant';
// import { withYMaps } from 'react-yandex-maps';
// const mapOptions = {
//   modules: ['geocode', 'SuggestView'],
//   defaultOptions: { suppressMapOpenBlock: true },
//   width: '100%',
//   height: '100%',
// };

// const geolocationOptions = {
//   defaultOptions: {
//     maxWidth: 300,
//   },
//   defaultData: { content: 'Определить местоположение' },
// };

// const MapContainer = (props: any) => {
//   const { viewport, setViewPort, setAddress, mapRef, ymaps } =
//     props;

//   const [mapConstructor, setMapConstructor]: [any, any] = useState(null);

//   const searchRef = useRef(null);
//   const handleBoundsChange = (e) => {
//     const newCoords = mapRef.current.getCenter();
//     console.log(mapConstructor);
//     if (!mapConstructor) return;

//     // .geocode(newCoords).then((res) => res)
//     mapConstructor.geocode(newCoords).then((res) => {
//       const nearest = res.geoObjects.get(0);
//       if (!nearest) return;

//       const foundAddress = nearest.properties.get('text');
//       const [centerX, centerY] = nearest.geometry.getCoordinates();
//       const [initialCenterX, initialCenterY] = initialStateAdress.center;
//       if (centerX !== initialCenterX && centerY !== initialCenterY) {
//         setViewPort((prevState) => ({ ...prevState, address: foundAddress }));
//       }
//     });
//   };

//   const handleActionEnd = () => {
//     if (!ymaps || !mapRef.current) return;

//     const newCoords = mapRef.current.getCenter();

//     // Use the global ymaps.geocode, not mapConstructor.geocode

//     Promise.resolve(ymaps.geocode(newCoords))
//       .then((res: any) => {
//         const nearest = res.geoObjects.get(0);
//         if (!nearest) return;

//         const foundAddress = nearest.properties.get('text');
//         if (!foundAddress) return;

//         setViewPort((prev: any) => {
//           if (prev.address === foundAddress) return prev;
//           return { ...prev, address: foundAddress };
//         });
//       })
//       .catch((err: any) => {
//         console.error('Geocode failed with error:', err.message || err);
//       });
//   };
//   // search popup
//   useEffect(() => {
//     if (mapConstructor) {
//       new mapConstructor.SuggestView(searchRef.current).events.add(
//         'select',
//         function (e: any) {
//           const selectedName = e.get('item').value;
//           mapConstructor.geocode(selectedName).then((result: any) => {
//             const newCoords = result.geoObjects
//               .get(0)
//               .geometry.getCoordinates();

//             if (mapRef.current) {
//               mapRef.current.setCenter(newCoords, { duration: 300 });
//               mapRef.current.setZoom(17, { duration: 300 });
//             }

//             setViewPort((prev: any) => ({
//               ...prev,
//               center: newCoords,
//               address: selectedName,
//             }));
//           });
//         },
//       );
//     }
//   }, [mapConstructor]);
//   // useEffect(() => {
//   //   if (mapConstructor) {
//   //     new mapConstructor.SuggestView(searchRef.current).events.add(
//   //       'select',
//   //       function (e) {
//   //         const selectedName = e.get('item').value;
//   //         mapConstructor.geocode(selectedName).then((result) => {
//   //           const newCoords = result.geoObjects
//   //             .get(0)
//   //             .geometry.getCoordinates();
//   //           setViewPort((prevState) => ({ ...prevState, center: newCoords }));
//   //         });
//   //       },
//   //     );
//   //   }
//   // }, [mapConstructor]);
//   useEffect(() => {
//     setAddress(viewport.address ?? '');
//   }, [viewport.address]);

//   return (
//     <MapContianerWrapper>
//       <input
//         style={{ display: 'none' }}
//         ref={searchRef}
//         placeholder="Search..."
//         disabled={!mapConstructor}
//       />
//       <Map
//         {...mapOptions}
//         state={viewport}
//         onLoad={setMapConstructor}
//         // onBoundsChange={handleBoundsChange}
//         onActionEnd={handleActionEnd}
//         instanceRef={mapRef}
//       >
//         <span className="placemark">
//           {/* <svg
//             width="14"
//             height="20"
//             viewBox="0 0 14 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
//               fill="#1976D2"
//             />
//           </svg> */}
//           <svg
//             width="28"
//             height="40"
//             viewBox="0 0 28 40"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g clip-path="url(#clip0_2018_2)">
//               <path
//                 d="M14 0C6.26 0 0 6.26 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.26 21.74 0 14 0ZM14 19C11.24 19 9 16.76 9 14C9 11.24 11.24 9 14 9C16.76 9 19 11.24 19 14C19 16.76 16.76 19 14 19Z"
//                 fill="#D2191C"
//               />
//             </g>
//             <defs>
//               <clipPath id="clip0_2018_2">
//                 <rect width="28" height="40" fill="white" />
//               </clipPath>
//             </defs>
//           </svg>
//         </span>
//         <GeolocationControl {...geolocationOptions} />
//         <ZoomControl />
//         <SearchControl
//           options={{
//             float: 'left',
//             noSuggestPanel: 'true',
//           }}
//         />
//       </Map>
//     </MapContianerWrapper>
//   );
// };

// const placemarkPulse = keyframes`
//   0%   { transform: translate(-50%, -100%) scale(1);   }
//   45%  { transform: translate(-50%, -100%) scale(1.5); }
//   100% { transform: translate(-50%, -100%) scale(1);   }
// `;

// const MapContianerWrapper = styled.div`
//   width: 60%;
//   height: 95vh;
//   display: flex;
//   flex-direction: column;
//   justify-contente: center;
//   align-items: flex-end;
//   box-shadow: 0px 2px 6px ${color.boxShadowBtn};
//   border-radius: 20px;
//   overflow: hidden;
//   position: relative;
//   .mapboxgl-map {
//     width: 100%;
//     height: 100%;
//   }
//   .ymaps-2-1-79-float-button {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }

//   .placemark {
//     width: 28px;
//     height: 40px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -100%);
//     transform-origin: 50% 100%;
//     z-index: 1200;
//     fontsize: 35px !important;
//     cursor: grab;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     animation: ${placemarkPulse} 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s 1 both;
//   }

//   @media ${devices.laptopS} {
//     width: 95vw;
//     height: 75vh;
//   }
//   @media ${devices.tabletL} {
//     width: 95vw;
//     height: 75vh;
//   }
//   @media ${devices.tabletS} {
//     width: 95vw;
//     height: 75vh;
//   }
//   @media ${devices.mobileL} {
//     width: 95vw;
//     height: 75vh;
//   }
//   @media ${devices.mobileM} {
//     width: 95vw;
//     height: 75vh;
//   }
//   @media ${devices.mobileS} {
//     width: 95vw;
//     height: 75vh;
//   }
// `;

// export default withYMaps(MapContainer, true, ['geocode']);

import styled, { keyframes } from 'styled-components';
import color from '../../lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import { GeolocationControl, Map, ZoomControl } from 'react-yandex-maps';
import { useState, useEffect } from 'react';
import { initialStateAdress } from './constant';
import { useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';

const mapOptions = {
  modules: ['geocode'],
  defaultOptions: { suppressMapOpenBlock: true },
  width: '100%',
  height: '100%',
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 300 },
  defaultData: { content: 'Определить местоположение' },
};

const MapContainer = (props: any) => {
  const {
    viewport,
    setViewPort,
    address,
    setAddress,
    mapRef,
    autofill,
    setAutoFill,
    backToFinal,
    setMapDrag,
    mapDrag,
    step,
  } = props;
  const [mapConstructor, setMapConstructor] = useState<any>(null);

  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  const handleActionEnd = () => {
    if (!mapConstructor) return;
    setMapDrag(true);
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get('text');
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialStateAdress.center;
      if (
        centerX !== initialCenterX &&
        centerY !== initialCenterY &&
        !autofill
      ) {
        setAddress(foundAddress);
        setViewPort({ address: foundAddress, zoom: 15 });
      }
    });
  };

  useEffect(() => {
    if (autofill) {
      mapConstructor
        .geocode(address)
        .then((res) => {
          const obj = res.geoObjects.get(0);

          if (!obj) return;

          const coords = obj.geometry.getCoordinates();

          setViewPort({
            center: coords,
            zoom: 15,
          });
          setAutoFill(false);
        })
        .catch(() => {
          console.log('geocoding failure');
        });
    }
  }, [autofill]);

  useEffect(() => {
    if (
      !autofill &&
      deliveryInfo?.address !== '' &&
      !mapDrag &&
      mapConstructor &&
      !backToFinal
    ) {
      console.log('this is in deliveryinfo : ' + backToFinal);
      mapConstructor
        .geocode(deliveryInfo?.address)
        .then((res) => {
          const obj = res.geoObjects.get(0);
          if (!obj) return;
          const coords = obj.geometry.getCoordinates();

          setViewPort({
            center: coords,
            zoom: 15,
          });
        })
        .catch(() => {
          console.log('geocoding failure');
        });
    }
  }, [deliveryInfo, mapConstructor]);

  useEffect(() => {
    if (!autofill && backToFinal && !mapDrag && mapConstructor) {
      console.log('this is in back to final: ' + backToFinal);

      mapConstructor
        .geocode(address)
        .then((res) => {
          const obj = res.geoObjects.get(0);
          if (!obj) return;
          const coords = obj.geometry.getCoordinates();

          setViewPort({
            center: coords,
            zoom: 15,
          });
        })
        .catch(() => {
          console.log('geocoding failure');
        });
    }
  }, [backToFinal, step]);

  return (
    <MapContianerWrapper>
      <Map
        {...mapOptions}
        state={viewport}
        onLoad={setMapConstructor}
        onActionEnd={handleActionEnd}
        instanceRef={mapRef}
      >
        <span className="placemark">
          <svg
            width="28"
            height="40"
            viewBox="0 0 28 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2018_2)">
              <path
                d="M14 0C6.26 0 0 6.26 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.26 21.74 0 14 0ZM14 19C11.24 19 9 16.76 9 14C9 11.24 11.24 9 14 9C16.76 9 19 11.24 19 14C19 16.76 16.76 19 14 19Z"
                fill="#D2191C"
              />
            </g>
            <defs>
              <clipPath id="clip0_2018_2">
                <rect width="28" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <GeolocationControl {...geolocationOptions} />
        <ZoomControl />
      </Map>
    </MapContianerWrapper>
  );
};

const placemarkPulse = keyframes`
  0%   { transform: translate(-50%, -100%) scale(1);   }
  45%  { transform: translate(-50%, -100%) scale(1.5); }
  100% { transform: translate(-50%, -100%) scale(1);   }
`;

const MapContianerWrapper = styled.div`
  width: 60%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    width: 28px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    transform-origin: 50% 100%;
    z-index: 1200;
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${placemarkPulse} 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s 1 both;
  }
  @media ${devices.laptopS},
    ${devices.tabletL},
    ${devices.tabletS},
    ${devices.mobileL},
    ${devices.mobileM},
    ${devices.mobileS} {
    width: 95vw;
    height: 75vh;
  }
`;

export default MapContainer;
