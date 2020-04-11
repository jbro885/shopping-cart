import React, { useState, useContext } from 'react';
import { array, object } from 'prop-types';
import './Products.css';
import { PRODUCT_STRINGS } from './locale-en';
import ProductList from './product-list/ProductList';
import ProductModal from '../products/product-modal/ProductModal';
import { useModal } from "react-modal-hook";
import Modal from '../../components/modal/Modal';
import DispatchContext from '../../DispatchContext';

function Products({
    products,
    cart,
}) {
    const dispatch = useContext(DispatchContext)
    const [modalProduct, setModalProduct] = useState({})
    const [showModal, hideModal] = useModal(() => {
        return (
            <Modal
                contentClassName="product-modal"
            >
                <ProductModal
                    hideModal={hideModal}
                    modalProduct={modalProduct}
                    cart={cart}
                    dispatch={dispatch} // TODO: Try later to put it inside the productmodal
                />
            </Modal>
        );
    }, [cart, modalProduct]);
    const viewProductDetail = (product) => {
        setModalProduct(product);
        showModal();
    };
    return (
        <section className="products">
            <h1 className="main">{PRODUCT_STRINGS.PRODUCT_TITLE}</h1>
            <ProductList
                list={products}
                cart={cart}
                onProductClick={viewProductDetail}
            />
        </section>
    )
}

Products.propTypes = {
    products: array,
    cart: object,
};

export default Products;
