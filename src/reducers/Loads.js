import { START_LOADING, END_LOADING, FETCH_ALL_LOADS, FETCH_LOAD_BY_SEARCH, FETCH_LOAD, CREATE_LOAD, UPDATE_LOAD, DELETE_LOAD } from '../constants/actionTypes';

export default (state = { isLoading: true, loads: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL_LOADS:
      if (action.payload && action.payload.data) {
        console.log('FETCH_ALL_LOADS:', action.payload.data);
        return {
          ...state,
          loads: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      }
      return state;

    case FETCH_LOAD_BY_SEARCH:
      console.log('FETCH_LOAD_BY_SEARCH');
      return state;

    case FETCH_LOAD:
      if (action.payload && action.payload.load) {
        return { ...state, load: action.payload.load };
      }
      return state;

    case CREATE_LOAD:
      if (action.payload) {
        return { ...state, loads: [...state.loads, action.payload] };
      }
      return state;

    case UPDATE_LOAD:
      if (action.payload) {
        console.log('UPDATE_LOAD:', action.payload); // Log the updated load
        return { ...state, loads: state.loads.map((load) => (load._id === action.payload._id ? action.payload : load)) };
      }
      return state;

    case DELETE_LOAD:
      if (action.payload) {
        return { ...state, loads: state.loads.filter((load) => load._id !== action.payload) };
      }
      return state;

    default:
      return state;
  }
};