import variants from 'components/store/lib/variants';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FilterOption } from '../../../../ui-kit/FilterCheckbox/types';
import { TopFilter, TopFilterBody, TopFilterTitle } from '../common';
import { devices } from 'components/store/lib/Devices';
import Image from 'next/image';
type Props = {
  title: string;
  options?: FilterOption[];
  onChange: (selectedOption: FilterOption) => void;
  setSliderChanged: any;
};

const SingleSelectionFilter: React.FC<Props> = ({
  title,
  options,
  onChange,
  setSliderChanged,
}) => {
  const [stateOptions, setStateOptions] = useState(options);

  useEffect(() => {
    setStateOptions(options);
  }, [options]);

  const handleChange = (id: string) => () => {
    const options = [...stateOptions!];
    const activeOption = options?.find((option) => option.checked);

    if (activeOption) {
      activeOption!.checked = false;
    }

    const curOption = options?.find((option) => option.id === id);
    curOption!.checked = true;

    setStateOptions(options);
    onChange(curOption!);
    setSliderChanged(false);
  };

  return (
    <TopFilter>
      <TopFilterTitle
        custom={0.05}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.05 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </TopFilterTitle>
      <TopFilterBody
        custom={0.1}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
        variants={variants.fadInSlideUp}
      >
        {stateOptions?.map((option) => (
          <Selection
            key={`filter-selection-${option.id}`}
            selected={!!option.checked}
            onClick={handleChange(option.id)}
          >
            <Image
              src={option.ImageUrl!}
              width={1080}
              height={1080}
              alt={option.name}
            />
            <span>{option.name}</span>
          </Selection>
        ))}
      </TopFilterBody>
    </TopFilter>
  );
};

const Selection = styled.div<{
  selected: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid #949494;
  box-shadow: 3px 13px 25px 0px #00000012;
  transition: 250ms;
  overflow: hidden;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
  ${(props) => {
    if (props.selected) {
      return css`
        border: 1px solid #c1ab93;
        background-color: #e8d9ca;
      `;
    }
  }}
  span {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 8px;
    font-size: 1rem;
    text-align: center;
  }
  @media ${devices.laptopS} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
  @media ${devices.tabletL} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
  @media ${devices.tabletS} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
  @media ${devices.mobileL} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
  @media ${devices.mobileM} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
  @media ${devices.mobileS} {
    width: unset;
    overflow: unset;
    img {
      border-radius: 30px 30px 0px 0px;
    }
    span {
      white-space: nowrap;
      padding: 8px 20px;
    }
  }
`;

export default SingleSelectionFilter;
