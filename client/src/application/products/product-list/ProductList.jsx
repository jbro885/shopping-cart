import React from 'react';
import { func, array, object } from 'prop-types';
import ProductHeader from './ProductHeader';
import ProductRow from './ProductRow';
import './ProductList.css';

function ProductList({
    list,
    cart,
    onProductClick,
}) {
    return (
        <div>
            <ProductHeader/>
            <ul className="products-list">
                {list.map((product) => {
                    return (
                        <ProductRow
                            key={product.code}
                            product={product}
                            quantity={cart[product.code] || 0}
                            onProductClick={onProductClick}
                        >
                        </ProductRow>
                    );
                })}
            </ul>
        </div>
    )
}

ProductList.propTypes = {
    list: array,
    cart: object,
    onProductClick: func,
};

export default ProductList;
