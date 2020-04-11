import {createContext} from 'react';

// This context will allow us to use an api fake in the tests.
const ApiContext = createContext(null);

export default ApiContext;