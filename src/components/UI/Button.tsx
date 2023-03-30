import React from 'react';
import {Link} from "react-router-dom";
interface ButtonProps {
    title: string;
    type?:string
    onClick?: () => void;
}

const Button = ({title,type,onclick}:any) => {

    return (
        <button onClick={onclick} className={'button'} type={type}>{title}</button>
    );
};

export default Button;


// <div className="button">
//     <div className="button__link">
//         <button type={type}>{title}</button>
//         <div className="button__icon">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
//                 <path
//                     d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
//             </svg>
//         </div>
//     </div>
//
// </div>