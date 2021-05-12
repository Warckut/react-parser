import React, { useEffect, useState } from 'react'
import './MainContent.css'

export const MainContent = () => {
  const [videocards, setVideocards] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const responce = await fetch('http://localhost:5000/videocards/citilink');
      const data = await responce.json();
      setVideocards(data);
    } 
    fetchData();
  }, []);

    return (
        <div className="content">
            {/* <div className="product-item">
                <div className="product-item__image">
                    <img src="https://items.s1.citilink.ru/1421448_v01_m.jpg"/>
                </div>
                <div className="product-item__description">
                    <span>Видеокарта MSI nVidia GeForce GT 710 , GT 710 1GD3H LP</span>
                    <ul>
                        <li>shop: Citilink</li>
                        <li>Graphics processor: GeForce GT 710 </li>
                    </ul>
                    <div className="product-item__price">$100</div>
                </div>
            </div> */}
            {
                videocards.map( (videocard) => {
                    return (
                        <div className="product-item">
                        <div className="product-item__image">
                            <img src={videocard.srcImage}/>
                        </div>
                        <div className="product-item__description">
                            <a href={videocard.href}>{videocard.name}</a>
                            <ul>
                                <li>{videocard.shop}</li>
                                <li>{videocard.graphicsProcessor}</li>
                            </ul>
                            <div className="product-item__price">{videocard.price}</div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}