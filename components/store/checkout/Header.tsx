import styled from 'styled-components';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { Wrapper } from './common';
import { overrideDefaultIOSZoom } from '../storeLayout/helpers';
import LogoSVG from '../../../assets/fingarden.svg';
import Delivery from '../../../assets/delivery.svg';
import Progress from './Progress';
import Link from 'next/link';
import { useEffect } from 'react';
import Head from 'next/head';

const Header = (props: any) => {
  useEffect(() => overrideDefaultIOSZoom(), []);
  return (
    <>
      <Wrapper
        key={`header-checkout`}
        custom={0.05}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
        variants={variants.fadInSlideUp}
      >
        <Link href="/">
          <span>
            <LogoSVG />
          </span>
        </Link>
      </Wrapper>
      <Progress {...props} />
    </>
  );
};

export default Header;
