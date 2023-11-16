type Props = {
  className: string;
}

export const BottomArrowIcon = ({ className }: Props): JSX.Element => (
  <svg className={className}  width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_0_816)">
    <path d="M18.1424 4.07107L11.0713 11.1421L4.00022 4.07107" stroke="#02FFB9" stroke-width="1.5"/>
    </g>
    <defs>
    <filter id="filter0_d_0_816" x="0.469727" y="0.540771" width="21.2031" height="14.6621" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="1.5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 0.72549 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_816"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_816" result="shape"/>
    </filter>
    </defs>
  </svg>
);
