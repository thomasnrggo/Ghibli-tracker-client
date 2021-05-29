import React, { createContext, useReducer } from 'react';

const initialState = {
  isOpen: false,
  authModal: false,
  modal: '',
  isSearchActive: false,
};
const store = createContext(initialState);
const { Provider } = store;

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'MODAL_TRIGGER':
        return {
          ...state,
          isOpen: !state.isOpen,
          modal: action.modal,
        };
      case 'AUTH_TRIGGER':
        return { ...state, authModal: !state.authModal };
      case 'SEARCH_TRIGGER':
        return { ...state, isSearchActive: !state.isSearchActive };
      case 'SET_USER':
        return state;
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, ContextProvider };
