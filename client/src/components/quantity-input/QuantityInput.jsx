import React from 'react';
import { func, number } from 'prop-types';
import './QuantityInput.css';

/**
 * Controlled component to increment/decrement a value
 */
function QuantityInput({
    onAdd,
    onRemove,
    quantity,
    maxItems = Infinity,
}) {
    const increaseQuantity = () => {
        if (quantity < maxItems) {
            onAdd && onAdd();
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            onRemove && onRemove();
        }
    }

    return (
        <>
            <button
                className="count"
                data-testid="decrement-button"
                onClick={decreaseQuantity}
            >-</button>
            <input
                type="number"
                className="product-quantity"
                readOnly // In order to the cart to function as a 1 action at a time, only the buttons can modify de quantity
                value={quantity}
            />
            <button
                className="count"
                data-testid="increment-button"
                onClick={increaseQuantity}
            >+</button>
        </>
    )
}

QuantityInput.propTypes = {
    onAdd: func.isRequired,
    onRemove: func.isRequired,
    quantity: number.isRequired,
    maxItems: number,
};

export default QuantityInput;
