import React from 'react';
import { string } from 'prop-types';
import { LOADING_SPINNER_STRINGS } from './locale';
import './LoadingSpinner.css';

function LoadingSpinner({loadingText}) {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner-rolling">
                <div className="loading-spinner">
                    <div></div>
                </div>
            </div>
            <span className="loading-spinner-text">
                {loadingText || LOADING_SPINNER_STRINGS.LOADING_DEFAULT_TEXT}
            </span>
        </div>
    )
}

LoadingSpinner.propTypes = {
    loadingText: string
}

export default LoadingSpinner
