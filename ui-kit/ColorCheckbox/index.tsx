import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  label: string;
  color: string | undefined;
  checked?: boolean;
  style?: Object;
  onChange?: (value: boolean) => void;
};

const ColorCheckbox: React.FC<Props> = ({
  label,
  style,
  color,
  checked,
  onChange,
}) => {
  const [stateChecked, setStateChecked] = useState(checked);
  const nativeCheckboxRef = useRef({} as any);

  const handleClick = () => {
    nativeCheckboxRef.current.click();
  };

  const handleChecked = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }

    setStateChecked(e.target.checked);
  };

  useEffect(() => {
    setStateChecked(checked);
  }, [checked]);

  return (
    <CheckboxWrapper style={style} onClick={handleClick}>
      <Checkbox
        active={!!stateChecked}
        style={{ backgroundColor: color }}
        title={label}
        tabIndex={0}
      >
        <input
          ref={nativeCheckboxRef}
          checked={stateChecked}
          onChange={handleChecked}
          type={'checkbox'}
          hidden
        />
      </Checkbox>
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.button<{
  active: boolean;
}>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #00000078;
  ${(props) => {
    if (props.active) {
      return css`
        &::before {
          content: '✓';
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #ffffff59;
        }
      `;
    }
  }}
`;

export default ColorCheckbox;
