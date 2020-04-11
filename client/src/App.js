import React, { useReducer, useEffect, useContext } from 'react';
import './App.css';
import Products from './application/products/Products';
import Summary from './application/summary/Summary';
import { ModalProvider } from "react-modal-hook";
import {
    reducer,
    initialState
} from './reducer';
import DispatchContext from './DispatchContext';
import ApiContext from './api/ApiContext';
import LoadingSpinner from './components/loading-spinner/LoadingSpinner';

function App() {
    const [{
        isLoading,
        products,
        discounts,
        cart,
        cartSize,
        rawCost,
        totalCost,
    }, dispatch] = useReducer(reducer, initialState)
    const api = useContext(ApiContext)
    useEffect(() => {
         const fetchData = async () => {
            dispatch({
                type: 'INITIAL_DATA_FETCHING',
            })
            const products = await api.getProducts();
            const discounts = await api.getDiscounts();
            dispatch({
                type: 'INITIAL_DATA_FETCHED',
                payload: {
                    products,
                    discounts,
                }
            })
        }
        fetchData()
    }, [api])

    return (
        <DispatchContext.Provider value={dispatch}>
            <ModalProvider>
                <main className="App">
                    { isLoading || !products.length ? (
                        <div className="loading-container">
                            <LoadingSpinner
                                loadingText={"Loading products and discounts..."} // TODO: Move to locale.js;
                            />
                        </div>
                    ) : (
                        <>
                            <Products
                                products={products}
                                cart={cart}
                            />
                            <Summary
                                items={cartSize}
                                rawPrice={rawCost}
                                discounts={discounts}
                                total={totalCost}
                            />
                        </>
                    )}
                </main>
            </ModalProvider>
        </DispatchContext.Provider>
    );
}

export default App;
