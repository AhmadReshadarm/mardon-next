import { useRef, useState } from 'react';
import styled, { css, CSSProp } from 'styled-components';

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

  return (
    <CheckboxWrapper style={style} onClick={handleClick}>
      <Checkbox active={!!stateChecked} style={{ backgroundColor: color }}>
        <input
          ref={nativeCheckboxRef}
          checked={stateChecked}
          onChange={handleChecked}
          type={'checkbox'}
          hidden
        />
      </Checkbox>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.div<{
  active: boolean;
}>`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #ccc;

  ${(props) => {
    if (props.active) {
      return css`
        &::before {
          content: '✓';
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: #ffffff59;
        }
      `;
    } else {
      return css`
        background: green;
      `;
    }
  }}
`;

const CheckboxLabel = styled.div`
  font-size: 14px;
  margin-left: 11px;
`;

export default ColorCheckbox;
