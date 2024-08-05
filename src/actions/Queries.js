import { START_LOADING, END_LOADING, CREATE_QUERY } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const create_query = (query, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log('-'.repeat(30));
    console.log('create_query');

    try {
      const data = await api.askQuestion_local(query);
      // const data = await api.askQuestion_ec2(query);
      console.log('-'.repeat(30));
      dispatch({ type: CREATE_QUERY, payload: query });
      console.log('-'.repeat(30));
      return data.data;
    } catch (apiError) {
      console.error('API request failed:', apiError);
      if (apiError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', apiError.response.data);
        console.error('Response status:', apiError.response.status);
        console.error('Response headers:', apiError.response.headers);
      } else if (apiError.request) {
        // The request was made but no response was received
        console.error('Request data:', apiError.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', apiError.message);
      }
      return;
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    dispatch({ type: END_LOADING });
  }
};