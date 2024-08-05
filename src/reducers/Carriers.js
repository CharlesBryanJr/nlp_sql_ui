import { START_LOADING, END_LOADING, FETCH_ALL_CARRIERS, FETCH_CARRIER_BY_SEARCH, FETCH_CARRIER, CREATE_CARRIER, UPDATE_CARRIER, DELETE_CARRIER } from '../constants/actionTypes';

export default (state = { isLoading: true, carriers: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL_CARRIERS:
      if (action.payload && action.payload.data) {
        return {
          ...state,
          carriers: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      }
      break;

    case FETCH_CARRIER_BY_SEARCH:
      console.log('FETCH_CARRIER_BY_SEARCH');
      break;

    case FETCH_CARRIER:
      if (action.payload && action.payload.carrier) {
        return { ...state, carrier: action.payload.carrier };
      }
      break;

    case CREATE_CARRIER:
      if (action.payload) {
        return { ...state, carriers: [...state.carriers, action.payload] };
      }
      break;

    case UPDATE_CARRIER:
      if (action.payload) {
        console.log('UPDATE_CARRIER:', action.payload); // Log the updated carrier
        return { ...state, carriers: state.carriers.map((carrier) => (carrier._id === action.payload._id ? action.payload : carrier)) };
      }
      break;

    case DELETE_CARRIER:
      if (action.payload) {
        return { ...state, carriers: state.carriers.filter((carrier) => carrier._id !== action.payload) };
      }
      break;

    default:
      return state;
  }
};