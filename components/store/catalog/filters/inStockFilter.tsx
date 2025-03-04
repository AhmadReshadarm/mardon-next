import color from 'components/store/lib/ui.colors';
import Checkbox from 'react-custom-checkbox';
import styled from 'styled-components';

type Props = {
  title: string;
  onChange: any; // (values: string) => void;
  setCurrentPage: any;
  setPageSize: any;
};

const InStockFilter: React.FC<Props> = ({
  onChange,
  setPageSize,
  setCurrentPage,
}) => {
  const handleChange = (evt) => {
    setCurrentPage(1);
    setPageSize(12);
    onChange(evt);
  };
  return (
    <Checkbox
      icon={<Checked dimensions={12} />}
      onChange={handleChange}
      borderColor={color.textTertiary}
      size={16}
      borderWidth={1}
      borderRadius={2}
      style={{ cursor: 'pointer' }}
      labelStyle={{
        marginLeft: '10px',
        userSelect: 'none',
        cursor: 'pointer',
        textWrap: 'nowrap',
      }}
      label={'Товары нет в наличии'}
    />
  );
};

const Checked = styled.div<{ dimensions: number }>`
  height: ${(prop) => prop.dimensions}px;
  width: ${(prop) => prop.dimensions}px;
  border-radius: 2px;
  background-color: ${color.activeIcons};
`;

export default InStockFilter;
