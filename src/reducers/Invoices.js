import { START_LOADING, END_LOADING, FETCH_ALL_INVOICES, FETCH_INVOICE_BY_SEARCH, FETCH_INVOICE, CREATE_INVOICE, UPDATE_INVOICE, DELETE_INVOICE } from '../constants/actionTypes';

export default (state = { isLoading: true, invoices: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL_INVOICES:
      console.log('FETCH_ALL_INVOICES:', action.payload.data);
      return {
        ...state,
        invoices: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_INVOICE_BY_SEARCH:
      console.log('FETCH_INVOICE_BY_SEARCH');
      return state;

    case FETCH_INVOICE:
      if (action.payload && action.payload.invoice) {
        return { ...state, invoice: action.payload.invoice };
      }
      return state;

    case CREATE_INVOICE:
      if (action.payload) {
        return { ...state, invoices: [...state.invoices, action.payload] };
      }
      return state;

    case UPDATE_INVOICE:
      if (action.payload) {
        console.log('UPDATE_INVOICE:', action.payload); // Log the updated invoice
        return { ...state, invoices: state.invoices.map((invoice) => (invoice._id === action.payload._id ? action.payload : invoice)) };
      }
      return state;

    case DELETE_INVOICE:
      if (action.payload) {
        return { ...state, invoices: state.invoices.filter((invoice) => invoice._id !== action.payload) };
      }
      return state;

    default:
      return state;
  }
};