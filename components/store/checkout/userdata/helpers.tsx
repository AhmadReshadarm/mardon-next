import dynamic from 'next/dynamic';
import axios from 'axios';

const AddressAutofill: any = dynamic(
  () =>
    import('@mapbox/search-js-react').then(
      (module: any) => module.AddressAutofill,
    ),
  {
    ssr: false,
  },
);

const geoLocatClick = () => {
  const btn: any = document.querySelector(
    '.ymaps-2-1-79-controls__control_toolbar',
  );
  btn.click();
};

const coordToAddress = async (
  viewPort: any,
  locateType: string,
  long: any,
  lat: any,
  setAddress: any,
  setPostCode: any,
) => {
  await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        locateType == 'drag' ? viewPort.longitude : long
      },${
        locateType == 'drag' ? viewPort.latitude : lat
      }.json?access_token=pk.eyJ1IjoiYXJtcmVzaGFkIiwiYSI6ImNqdm9sdGNkbTF0bDIzeW56bDUwaDFiNncifQ.57fyDZewmXODVxIvNuHjgg`,
    )
    .then((response) => {
      setPostCode(response.data.features[0].context[0].text);

      setAddress(response.data.features[0].place_name);
    });
};

const addressToCoord = async (
  userSelectAddress: any,
  setViewPort: any,
  setAddress: any,
) => {
  setAddress(userSelectAddress);
  await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${userSelectAddress}.json?access_token=pk.eyJ1IjoiYXJtcmVzaGFkIiwiYSI6ImNqdm9sdGNkbTF0bDIzeW56bDUwaDFiNncifQ.57fyDZewmXODVxIvNuHjgg`,
    )
    .then((response) => {
      setViewPort({
        longitude: response.data.features[0].center[0],
        latitude: response.data.features[0].center[1],
        zoom: 12,
      });
    });
};

const handleHiddenInputChange = (evt: any, setAddress: any) => {
  evt.preventDefault();
  setAddress(evt.target.value);
  // const input: any = document.getElementById('address-autofill');
  // const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(
  //   window.HTMLInputElement.prototype,
  //   'value',
  // )?.set;
  // nativeInputValueSetter?.call(input, evt.target.value);
  // let inputEvent = new Event('input', { bubbles: true });
  // input.dispatchEvent(inputEvent);
};

export {
  AddressAutofill,
  geoLocatClick,
  addressToCoord,
  coordToAddress,
  handleHiddenInputChange,
};
