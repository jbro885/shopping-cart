import React from 'react';
import './ProductHeader.css';
import { PRODUCT_LIST_STRINGS } from './locale-en';

export default function ProductHeader() {
    return (
        <div>
            <ul className="products-list tableHead">
                <li className="products-list-title row">
                    <div className="col-product">{PRODUCT_LIST_STRINGS.PRODUCT_DETAILS}</div>
                    <div className="col-quantity">{PRODUCT_LIST_STRINGS.PRODUCT_QUANTITY}</div>
                    <div className="col-price">{PRODUCT_LIST_STRINGS.PRODUCT_PRICE}</div>
                    <div className="col-total">{PRODUCT_LIST_STRINGS.PRODUCT_TOTAL}</div>
                </li>
            </ul>
        </div>
    )
}
