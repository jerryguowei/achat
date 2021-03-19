import React from 'react';
import Icons from '../../assets/icons/icons.svg';

interface IconProps{
    name: string,
    color : string,
    size : string
}
const Icon = ({name, color, size} :IconProps ) => (
    <svg fill={color} width={size} height={size}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
);
export default Icon;