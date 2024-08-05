const { combineReducers } = require('redux');
const authReducer = require('./auth');

const rootReducer = combineReducers({
    auth: authReducer
});

module.exports = rootReducer;