import React, { useContext } from 'react';
import { number } from 'prop-types';
import { SUMMARY_TOTAL_STRINGS } from './locale-en';
import DispatchContext from '../../DispatchContext';

function SummaryTotal({
    total,
}) {
    const dispatch = useContext(DispatchContext)
    return (
        <div className="summary-total wrapper">
            <ul>
                <li>
                    <span className="summary-total-cost">
                        {SUMMARY_TOTAL_STRINGS.TOTAL_COST}
                    </span>
                    <span className="summary-total-price">
                        {total}<span className="currency">€</span>
                    </span>
                </li>
            </ul>
            <button
                type="submit"
                className="button"
                data-testid="checkout-button"
                onClick={() => {dispatch({type: 'CHECKOUT'})}}
            >
                {SUMMARY_TOTAL_STRINGS.CHECKOUT_BUTTON_TEXT}
            </button>
        </div>
    )
}

SummaryTotal.propTypes = {
    total: number.isRequired,
};

export default SummaryTotal;