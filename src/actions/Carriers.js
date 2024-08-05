import { START_LOADING, END_LOADING, FETCH_ALL_CARRIERS, FETCH_CARRIER, FETCH_CARRIER_BY_SEARCH, CREATE_CARRIER, UPDATE_CARRIER, DELETE_CARRIER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getCarrier = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCarrier(id);
    dispatch({ type: FETCH_CARRIER, payload: { carrier: data } });
    console.log('getCarrier');

  } catch (error) {
    console.log(error);
  }
};

export const getCarriers = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCarriers(page);
    dispatch({ type: FETCH_ALL_CARRIERS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
    console.log('getCarriers');

  } catch (error) {
    console.log(error);
  }
};

export const getCarrierBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchCarrierBySearch(searchQuery);
    dispatch({ type: FETCH_CARRIER_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
    console.log('getCarrierBySearch');

  } catch (error) {
    console.log(error);
  }
};

export const createCarrier = (carrier, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCarrier(carrier);
    dispatch({ type: CREATE_CARRIER, payload: carrier });

    // history.push(`/carriers/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateCarrier = (id, carrier) => async (dispatch) => {
  try {
    const { data } = await api.updateCarrier(id, carrier);
    dispatch({ type: UPDATE_CARRIER, payload: data });
    console.log('updateCarrier');

  } catch (error) {
    console.log(error);
  }
};

export const deleteCarrier = (id) => async (dispatch) => {
  try {
    await await api.deleteCarrier(id);
    dispatch({ type: DELETE_CARRIER, payload: id });
    console.log('deleteCarrier');

  } catch (error) {
    console.log(error);
  }
};