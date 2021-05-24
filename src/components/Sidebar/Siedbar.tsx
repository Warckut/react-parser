import React, { useEffect, useState } from 'react'
import Checkbox from './Checkbox';
import './Sidebar.css'

type Sidebar = {
    onChangeShops: (shops: string[]) => void
}

export const Sidebar = ({ onChangeShops} : Sidebar) => {
    const [shops, setShops] = useState<any[]>([
        {title: "Citilink", checked: true},
        {title: "Omega", checked: true}
    ]);
    
    useEffect(() => {
        onChangeShops(shops.map( shop =>{
            return shop.title
        }))

    }, []);
   
    const handleCheckElement = (title: string) => {
        setShops(
            shops.map( shop => {
                    if ( shop.title == title)
                        shop.checked = !shop.checked
                    return shop
                }
            )
        )
    }

    const onClick = () => {
        onChangeShops(
            shops.map ( (shop) => {
                if (shop.checked)
                    return shop.title
            }
        ))
    }

    return (
        <div className="sidebar">
            Магазины:
                <ul>
                    {shops.map( (shop) => {
                        return (
                            <li><Checkbox onChange={handleCheckElement} title={shop.title} /></li>
                        )
                    })}
                </ul>
            <input className="sidebar__button" type="submit" onClick={onClick} value="Показать" />
        </div>
    ) 
}