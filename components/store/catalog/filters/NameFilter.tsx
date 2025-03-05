import color from 'components/store/lib/ui.colors';
import { useCallback, useEffect } from 'react';
import { debounce } from '@mui/material';
type Props = {
  title: string;
  name: string;
  searchTerm: string;
  setSearchTerm: any;
  onChange: any; // (values: string) => void;
  setPageSize: any;
  setCurrentPage: any;
};

const NameFilterAdmin: React.FC<Props> = ({
  title,
  name,
  searchTerm,
  setSearchTerm,
  onChange,
  setPageSize,
  setCurrentPage,
}) => {
  const handleTermChange = (values: string) => {
    setSearchTerm(values);
    delayedChange(values);
  };
  const delayedChange = useCallback(
    debounce((values) => {
      setCurrentPage(1);
      setPageSize(12);
      onChange(values);
    }, 500),
    [],
  );
  useEffect(() => {
    if (name) {
      setSearchTerm(name);
    }
  }, []);
  return (
    <input
      autoFocus
      autoComplete="on"
      type="text"
      value={searchTerm}
      onChange={(e) => handleTermChange(e.target.value)}
      placeholder="Название товар или артикул"
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        padding: '10px',
        border: `1px solid ${color.activeIcons}`,
      }}
    />
  );
};

export default NameFilterAdmin;
