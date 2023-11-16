import { useState } from 'react';
const UsePagination = (): [
  number,
  string,
  (newDirection: number, newType: any) => void,
] => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('call');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

export { UsePagination };
