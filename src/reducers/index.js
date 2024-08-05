import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

import Carriers from './Carriers';
import Invoices from './Invoices';
import Loads from './Loads';

export const reducers = combineReducers(
    { posts, auth, Carriers, Loads, Invoices }
);