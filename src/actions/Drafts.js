import { START_LOADING, END_LOADING, FETCH_DRAFT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getDraft = (draftDateFrom, draftDateTo) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    console.log('Fetching drafts with date range:', draftDateFrom, draftDateTo);

    const response = await api.fetchDraft(draftDateFrom, draftDateTo);
    console.log('API Response:', response);

    const { newDraft_db } = response.data;
    console.log('newDraft_db:', newDraft_db);
    console.log({ type: FETCH_DRAFT, payload: { draft: newDraft_db } });
    dispatch({ type: FETCH_DRAFT, payload: { draft: newDraft_db } });
    
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error('Error occurred:', error);
  }
};