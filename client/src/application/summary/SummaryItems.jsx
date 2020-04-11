import React from 'react';
import { number } from 'prop-types';
import { SUMMARY_ITEMS_STRINGS } from './locale-en';

function SummaryItems({
    items = 0,
    price
}) {
    return (
        <ul className="summary-items wrapper border">
            <li>
                <span
                    className="summary-items-number-text"
                >
                    <span data-testid="summary-items-number">{items}</span> {SUMMARY_ITEMS_STRINGS.ITEMS}
                </span>
                <span
                    className="summary-items-price"
                >
                    {price}
                    <span className="currency">{/** Use i18n currency */}
                        €
                    </span>
                </span>
            </li>
        </ul>
    )
}

SummaryItems.propTypes = {
    items: number,
    price: number.isRequired,
};

export default SummaryItems;
