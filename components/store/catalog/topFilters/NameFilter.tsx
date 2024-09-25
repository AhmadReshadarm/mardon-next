import styled from 'styled-components';
import { TopFilter, TopFilterBody, TopFilterTitle } from '../common';
import CloseSVG from '../../../../assets/close_black.svg';
type Props = {
  title: string;
  searchTerm: string;
  setSearchTerm: any;
  setSliderChanged: any;
};

const NameFilter: React.FC<Props> = ({
  title,
  searchTerm,
  setSearchTerm,
  setSliderChanged,
}) => {
  return (
    <TopFilter>
      <TopFilterTitle>{title}</TopFilterTitle>

      <TopFilterBody style={{ gridTemplateColumns: '1fr' }}>
        <SearchWrapper>
          <SearchInput
            value={searchTerm}
            onChange={(evt) => {
              setSearchTerm(evt.target.value);
              setSliderChanged(false);
            }}
            placeholder="Введите ключевые слова"
            type="input"
          />
          {searchTerm !== '' ? (
            <span
              onClick={() => setSearchTerm('')}
              className="search-term-clear-btn"
            >
              <CloseSVG />
            </span>
          ) : (
            ''
          )}
        </SearchWrapper>
      </TopFilterBody>
    </TopFilter>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #949494;
  border-radius: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .search-term-clear-btn {
    position: absolute;
    top: 15px;
    right: 5px;
    width: 25px;
    height: 25px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  background-color: transparent;
`;

export default NameFilter;
