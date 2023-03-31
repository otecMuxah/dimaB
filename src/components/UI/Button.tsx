import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import {Link} from "react-router-dom";
interface ButtonProps {
    title: string;
    type?:any;
    onclick?: () => void;
    disabled?:boolean
}

const Button:FC<ButtonProps> = ({title,type,onclick,disabled=false}) => {

    return (
        <button disabled={disabled} onClick={onclick} className={'button'} type={type}>{title}</button>
    );
};

export default Button;

