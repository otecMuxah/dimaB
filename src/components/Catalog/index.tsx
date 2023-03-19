import React, {useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import iconDots from '../../assets/img/icons/dots-9-svgrepo-com.svg'
import {Link} from "react-router-dom";
const Catalog = (props:any) => {
    const {showProduct}=props
    const [open, setOpen] = useState(false);

    return (

        <Menu isOpen={open}  customBurgerIcon={ <img src={iconDots} alt={'dots'} /> }>
            <Link id="Smartphones" className="menu-item" to="/product-block/smartphones"
            >Смартфоны и телефоны</Link>
            <Link id="TVs-and-multimedia" className="menu-item" to="/product/tv-and-multimedia"
            >Телевизоры и мультимедиа</Link>
            <Link id="Tablets-laptops-and-PC" className="menu-item" to="/product/tablets-laptops-and-pc"
            >Ноутбуки,Пк и планшеты</Link>
            <Link onClick={()=>setOpen(!open)} className="menu-item--small" to="">Settings</Link>
        </Menu>

    );
};

export default Catalog;
