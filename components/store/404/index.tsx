import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { Path, PathCircle } from './helpers';
import { useState } from 'react';
import Link from 'next/link';

const NotFoundSvg = () => {
  const [animate, setAnimate] = useState(false);
  return (
    <>
      <Container>
        <img
          style={{ width: '90%', paddingTop: '50px' }}
          src="/404_not_found.png"
          alt="page not found"
        />
      </Container>
      <h1 style={{ fontFamily: 'Anticva', textAlign: 'center' }}>
        Упс..Кажется, что-то пошло не так или{' '}
      </h1>
      <span
        style={{
          color: color.textTertiary,
          textAlign: 'center',
          width: '70%',
          fontSize: '1.2rem',
        }}
      >
        Страница, которую вы искали не существует: она была удалена или
        переименована. Попробуйте зайти позже. Спасибо за Ваш выбор. С
        Уважением, Ваш FINGARDEN
      </span>
      <h2 style={{ textAlign: 'center' }}>
        <Link legacyBehavior href="/">
          <a style={{ color: color.ok }}>
            Нажмите здесь, чтобы вернуться на главную страницу
          </a>
        </Link>
      </h2>
    </>
  );
};

const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const SVG = styled.svg`
  width: 90%;
  height: 100%;
`;

export default NotFoundSvg;
