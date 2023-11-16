import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import { verifyUserEmailByToken } from 'redux/slicers/authSlicer';

const VerifyAcountByToken = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.asPath) {
      const regEx = /[^\/]+$/; // get everything after last /
      const token = router.asPath.match(regEx)!.toString();
      dispatch(verifyUserEmailByToken(token));
    }
  }, []);
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    if (counter > 1) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter < 2) {
      router.push('/profile');
    }
  }, [counter]);

  return (
    <>
      <Counter>
        Мы перенаправим вам на страницу Личные кабинет, после: {counter}
      </Counter>
    </>
  );
};

const Counter = styled.h2`
  color: ${color.ok};
  font-family: 'intro';
`;

export default VerifyAcountByToken;
