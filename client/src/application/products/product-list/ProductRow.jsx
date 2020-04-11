import React, {useContext} from 'react';
import { object, number, func } from 'prop-types';
import './ProductRow.css'
import QuantityInput from '../../../components/quantity-input/QuantityInput';
import {PRODUCT_LIST_STRINGS } from './locale-en';
import DispatchContext from '../../../DispatchContext';

function ProductRow({
    product,
    quantity,
    onProductClick,
}) {
    const dispatch = useContext(DispatchContext)
    const handleProductClick = () => {
        onProductClick && onProductClick(product);
    }
    return (
        <li data-testid="product-row" className="product row">
            <div className="col-product">
                <figure className="product-image">
                    <img src={product.imageSrc} alt={product.name} />
                    <div className="product-description">
                        <h1 className="product-name" data-testid="product-name" onClick={handleProductClick}>{product.name}</h1>
                        <p className="product-code">{PRODUCT_LIST_STRINGS.PRODUCT_CODE} {product.code}</p>
                    </div>
                </figure>
            </div>
            <div className="col-quantity">
                <QuantityInput
                    onAdd={() => {
                        dispatch({
                            type: 'ADD_PRODUCT_TO_CART',
                            payload: {code: product.code}
                        })
                    }}
                    onRemove={() => {
                        dispatch({
                            type: 'REMOVE_PRODUCT_FROM_CART',
                            payload: {code: product.code}
                        })
                    }}
                    quantity={quantity}
                    maxItems={product.maxItems}
                />
            </div>
            <div className="col-price">
                <span className="product-price">
                    {product.price}
                </span>
                <span className="product-currency currency">
                    €
                </span>
            </div>
            <div className="col-total">
                <span className="product-price">
                    {quantity * product.price}
                </span>
                <span className="product-currency currency">
                    €
                </span>
            </div>
        </li>
    )
}

ProductRow.propTypes = {
    product: object.isRequired,
    quantity: number,
    onProductClick: func,
};

export default ProductRow;
