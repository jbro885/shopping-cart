// test-utils.js
import React from 'react';
import { render } from '@testing-library/react'
import { api } from './api/fakeApi'
import ApiContext from './api/ApiContext';

const AllTheProviders = ({ children }) => {
  return (
    <ApiContext.Provider value={api}>
        {children}
    </ApiContext.Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }