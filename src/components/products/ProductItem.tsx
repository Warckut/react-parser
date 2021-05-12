import './Product.css'

export type ProductItem = {
    shop: string,
    name: string,
    srcImage: string,
    price: number,
    href: string
}



export const ProductItem = ({href, shop, name, srcImage, price} : ProductItem) => {

    return (
        <div className="product-item">
            <div className="product-item__image">
                <img src={srcImage}/>
            </div>
            <div className="product-item__description">
                <a href={href}>
                    <ul>
                        <li className="product-item__name">{name}</li>
                        <li>Интернет-магазин: {shop}</li>
                    </ul>
                </a>
            </div>
            <div className="product-item__price">{price} руб.</div>
        </div>
    )
}