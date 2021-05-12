type ProductList = {
    children: any
}

const ProductList = ({children} : ProductList) => {
    return (
        <div className="product-list">
            {children}
        </div>
    )
}

export default ProductList