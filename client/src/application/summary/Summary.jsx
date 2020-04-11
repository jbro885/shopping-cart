import React from 'react';
import { number, arrayOf, array } from 'prop-types';
import './Summary.css';
import { SUMMARY_STRINGS } from './locale-en';
import SummaryItems from './SummaryItems';
import SummaryDiscounts from './SummaryDiscounts';
import SummaryTotal from './SummaryTotal';

function Summary({
    items,
    rawPrice,
    discounts,
    total,
}) {
    return (
        <aside className="summary">
            <h1 className="main">{SUMMARY_STRINGS.SUMMARY_TITLE}</h1>
            <SummaryItems
                items={items}
                price={rawPrice}
            />
            {discounts.length ? (
                <SummaryDiscounts
                    discounts={discounts}
                />
            ) : null}
            <SummaryTotal
                total={total}
            />
        </aside>
    )
}

Summary.propTypes = {
    items: number,
    rawPrice: number.isRequired,
    discounts: arrayOf(array),
    total: number.isRequired,
};

export default Summary;
