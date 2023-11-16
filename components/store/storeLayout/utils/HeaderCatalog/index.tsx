import CatalogModal from './CatalogModal';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';

type Props = {
  onWhichNav: string;
  setOnWhichNav: any;
};

const HeaderCatalog: React.FC<Props> = ({ onWhichNav, setOnWhichNav }) => {
  return (
    <CatalogWrapper
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
      <CatalogModal setOnWhichNav={setOnWhichNav} />
    </CatalogWrapper>
  );
};

const CatalogWrapper = styled.div`
  width: 100%;
  height: 80vh;
  position: absolute;
  top: 90px;
  left: 0;
  z-index: 99;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default HeaderCatalog;
