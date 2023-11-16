import styled from 'styled-components';
import { content } from './helpers';
import color from 'components/store/lib/ui.colors';
import Link from 'next/link';

type Props = {
  onWhichNav: string;
  setOnWhichNav: any;
};

const ExtraNavBar: React.FC<Props> = ({ onWhichNav, setOnWhichNav }) => {
  return (
    <ExtraNavBarContainer
      onMouseEnter={() =>
        setOnWhichNav(
          onWhichNav == 'service'
            ? 'services'
            : onWhichNav == 'about'
            ? 'about'
            : 'catalog',
        )
      }
      onMouseLeave={() => setOnWhichNav('')}
    >
      <ExtraNavbarWrapper>
        {onWhichNav == 'service'
          ? content.services.map((item, index) => (
              <Link key={index} href={item.url}>
                {item.text}
              </Link>
            ))
          : content.aboutUs.map((item, index) => (
              <Link key={index} href={item.url}>
                {item.text}
              </Link>
            ))}
      </ExtraNavbarWrapper>
    </ExtraNavBarContainer>
  );
};

const ExtraNavBarContainer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 90px;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  z-index: 999;
`;

const ExtraNavbarWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    transition: 300ms;
    &:hover {
      background-color: ${color.glassmorphismSeconderBG};
      color: ${color.textPrimary};
    }
  }
`;

export default ExtraNavBar;
