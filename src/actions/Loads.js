import { START_LOADING, END_LOADING, FETCH_ALL_LOADS, FETCH_LOAD, FETCH_LOAD_BY_SEARCH, CREATE_LOAD, UPDATE_LOAD, DELETE_LOAD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getLoad = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchLoad(id);
    dispatch({ type: FETCH_LOAD, payload: { load: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getLoads = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchLoads(page);
    dispatch({ type: FETCH_ALL_LOADS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getLoadsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchLoadBySearch(searchQuery);
    dispatch({ type: FETCH_LOAD_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createLoad = (load, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createLoad(load);
    dispatch({ type: CREATE_LOAD, payload: data });
    console.log('createLoad', data);

    // history.push(`/carriers/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateLoad = (id, load) => async (dispatch) => {
  try {
    const { data } = await api.updateLoad(id, load);
    dispatch({ type: UPDATE_LOAD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLoad = (id) => async (dispatch) => {
  try {
    await api.deleteLoad(id);
    dispatch({ type: DELETE_LOAD, payload: id });
  } catch (error) {
    console.log(error);
  }
};