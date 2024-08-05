import { START_LOADING, END_LOADING, FETCH_ALL_INVOICES, FETCH_INVOICE, FETCH_INVOICE_BY_SEARCH, CREATE_INVOICE, UPDATE_INVOICE, DELETE_INVOICE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getInvoice = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchInvoice(id);
    dispatch({ type: FETCH_INVOICE, payload: { invoice: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoices = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchInvoices(page);
    dispatch({ type: FETCH_ALL_INVOICES, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchInvoiceBySearch(searchQuery);
    dispatch({ type: FETCH_INVOICE_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createInvoice = (invoice, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createInvoice(invoice);
    dispatch({ type: CREATE_INVOICE, payload: data });
    console.log('data:', data)
    // history.push(`/invoices/${data._id}`);

  } catch (error) {
    console.log(error);
  }
};

export const updateInvoice = (id, invoice) => async (dispatch) => {
  try {
    const { data } = await api.updateInvoice(id, invoice);
    dispatch({ type: UPDATE_INVOICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    await api.deleteInvoice(id);
    dispatch({ type: DELETE_INVOICE, payload: id });
  } catch (error) {
    console.log(error);
  }
};