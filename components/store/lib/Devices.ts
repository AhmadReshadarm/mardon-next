const sizes = {
  mobileS: '200px',
  mobileM: '260px',
  mobileL: '320px',
  tablet: '768px',
  laptopS: '1024px',
  laptopM: '1240px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  // mobileS: `(min-width: ${sizes.mobileS})`,
  // mobileM: `(min-width: ${sizes.mobileM})`,
  mobileS: `(min-width: ${sizes.mobileS}) and (max-width: ${sizes.mobileM})`,
  mobileM: `(min-width: ${sizes.mobileM}) and (max-width: ${sizes.mobileL})`,
  mobileL: `(min-width: ${sizes.mobileL}) and (max-width: ${sizes.tablet})`,
  // tablet: `(min-width: ${sizes.mobileL}) and (max-width: ${sizes.tablet})`,
  laptopS: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptopS})`,
  laptopM: `(min-width: ${sizes.laptopS}) and (max-width: ${sizes.laptopM})`,
  // laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.laptopL}) and (max-width: ${sizes.desktop})`,
};
