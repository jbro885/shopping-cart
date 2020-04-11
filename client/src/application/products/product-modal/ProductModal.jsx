import React from 'react';
import { object, func } from 'prop-types';
import { ReactComponent as CloseSvg } from '../../../images/close.svg';
import { PRODUCT_DETAIL_MODAL_STRINGS } from './locale-en';
import './ProductModal.css';

function ProductModal({
    hideModal,
    modalProduct,
    cart,
    dispatch,
}) {
    const canAddProduct = (currentQuantity = 0, maxItems) => {
        return currentQuantity < maxItems;
    }
    return (
        <>
            <CloseSvg
                className="modal-close-button"
                data-testid="modal-close-button"
                title={PRODUCT_DETAIL_MODAL_STRINGS.CLOSE_BUTTON_TITLE}
                onClick={hideModal}
            />
            <figure className="product-modal-image">
                <img src={modalProduct.fullimageSrc} alt={modalProduct.name} />
            </figure>
            <aside className="product-modal-description">
                <div className="product-modal-description-top">
                    <div className="product-modal-name">{modalProduct.name}</div>
                    <div className="product-price">
                        <span className="product-price-number">
                            {modalProduct.price}
                        </span>
                        <span className="product-currency currency">
                            €
                        </span>
                    </div>
                </div>
                <div className="product-modal-description-text-wrapper">
                    <p className="product-modal-description-text">
                        {modalProduct.description}
                    </p>
                </div>
                <p className="product-code">{PRODUCT_DETAIL_MODAL_STRINGS.PRODUCT_CODE} {modalProduct.code}</p>
                <button
                    type="submit"
                    data-testid="add-to-cart"
                    className="button"
                    disabled={!canAddProduct(cart[modalProduct.code], modalProduct.maxItems)}
                    onClick={() => {
                        if (canAddProduct(cart[modalProduct.code], modalProduct.maxItems)) {
                            dispatch({
                                type: 'ADD_PRODUCT_TO_CART',
                                payload: {code: modalProduct.code}
                            })
                            hideModal();
                        }
                    }}
                >
                    {PRODUCT_DETAIL_MODAL_STRINGS.ADD_TO_CART_BUTTON_TEXT}
                </button>
            </aside>
        </>
    );
};

ProductModal.propTypes = {
    hideModal: func.isRequired,
    cart: object.isRequired,
    modalProduct: object.isRequired,
    dispatch: func.isRequired,
};

export default ProductModal;