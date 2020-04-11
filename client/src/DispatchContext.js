import {createContext} from 'react';


// This context will prevent the prop drilling with the "dispatch" method.
const DispatchContext = createContext(null);

export default DispatchContext;