import React from 'react';
import Icons from '../../assets/icons/icons.svg';

interface IconProps{
    name: string,
    color?: string,
    size?: string
    onClick?: React.MouseEventHandler<any>
}
const Icon = ({name, color, size, onClick} :IconProps ) => (
    <svg fill={color} width={size} height={size} onClick={onClick}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
);
export default Icon;