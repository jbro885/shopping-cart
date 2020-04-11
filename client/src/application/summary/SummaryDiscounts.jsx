import React from 'react';
import { arrayOf, array } from 'prop-types';
import { SUMMARY_DISCOUNTS_STRINGS } from './locale-en';

function SummaryDiscounts({
    discounts
}) {
    return (
        <div className="summary-discounts wrapper-half border">
            <h2 className="summary-discounts-title">{SUMMARY_DISCOUNTS_STRINGS.DISCOUNTS_SECTION_LABEL}</h2>
            <ul>
                {discounts.map(([label, price]) => {
                    return (
                        <li
                            key={label}
                        >
                            <span>{label} {SUMMARY_DISCOUNTS_STRINGS.OFFER}</span><span>-{price}€</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

SummaryDiscounts.propTypes = {
    discounts: arrayOf(array),
};

export default SummaryDiscounts;