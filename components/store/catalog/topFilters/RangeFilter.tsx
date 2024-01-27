import { Input, Slider as SliderInit } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TopFilter, TopFilterBody, TopFilterTitle } from '../common';
import debounce from 'lodash/debounce';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';

type Props = {
  title: string;
  min: number;
  max: number;
  onChange: (values: [number, number]) => void;
};

const RangeFilter: React.FC<Props> = ({ title, min, max, onChange }) => {
  const [[minVal, maxVal], setValues] = useState([min, max]);
  const Slider = SliderInit as any;

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleSliderChange = (values: [number, number]) => {
    setValues(values);
    delayedChange(values);
  };

  const handleMinValChange = (e) => {
    setValues([e.target.value, maxVal]);
    delayedChange([e.target.value, maxVal]);
  };

  const handleMaxValChange = (e) => {
    setValues([minVal, e.target.value]);
    delayedChange([minVal, e.target.value]);
  };

  const delayedChange = useCallback(
    debounce((values) => onChange(values), 500),
    [],
  );

  return (
    <TopFilter>
      <TopFilterTitle
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.3 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </TopFilterTitle>
      <TopFilterBody
        custom={0.4}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.4 } }}
        variants={variants.fadInSlideUp}
        style={{ display: 'block', minWidth: '250px', maxWidth: '350px' }}
      >
        <FieldsWrapper>
          <div className="fields-wrapper">
            <span className="field-label">От</span>
            <Input
              min={min}
              max={max}
              value={minVal}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                borderRadius: '30px',
                backgroundColor: '#E9E9E9',
              }}
              onChange={handleMinValChange}
            />
          </div>
          <div className="fields-wrapper">
            <span className="field-label">До</span>
            <Input
              min={min}
              max={max}
              value={maxVal}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                borderRadius: '30px',
                backgroundColor: '#E9E9E9',
              }}
              onChange={handleMaxValChange}
            />
          </div>
        </FieldsWrapper>
        <SliderWrapper>
          <Slider
            range
            step={10}
            min={min}
            max={max}
            handleStyle={{
              borderColor: color.textTertiary,
            }}
            trackStyle={{
              background:
                'linear-gradient(94deg, #c6986a 9.58%, #f2d099  106.37%)',
              height: '5px',
              marginTop: '1px',
            }}
            railStyle={{
              backgroundColor: color.textTertiary,
              height: '5px',
            }}
            defaultValue={[min, max]}
            onChange={handleSliderChange}
            value={[minVal, maxVal]}
          />
        </SliderWrapper>
      </TopFilterBody>
    </TopFilter>
  );
};

const SliderWrapper = styled.div`
  margin-top: 20px;

  .ant-slider-rail {
    height: 2px;
    margin-top: 1px;
  }
  .ant-slider {
    .ant-slider-handle {
      &::after {
        box-shadow: 0 0 0 4px ${color.backgroundSecondery};
      }
    }
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .ant-input-affix-wrapper {
    &:hover {
      border-color: ${color.activeIcons};
    }
    &:focus {
      border-color: ${color.activeIcons};
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${color.activeIcons};
  }
  .fields-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 5px 5px 5px 10px;
    border-radius: 30px;
    box-shadow: 3px 13px 25px 0px #00000026;
    border: 1px solid #c9c9c9;
    input {
      background-color: #e9e9e9;
    }
    .field-label {
      font-size: 14px;
    }
  }
  @media ${devices.laptopS} {
    justify-content: flex-start;
  }
  @media ${devices.tabletL} {
    justify-content: flex-start;
  }
  @media ${devices.tabletS} {
    justify-content: flex-start;
  }
  @media ${devices.mobileL} {
    justify-content: flex-start;
  }
  @media ${devices.mobileM} {
    justify-content: flex-start;
  }
  @media ${devices.mobileS} {
    justify-content: flex-start;
  }
`;

const Suffix = styled.div`
  font-size: 14px;
`;

export default RangeFilter;
