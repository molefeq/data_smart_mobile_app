import { createStore, applyMiddleware } from 'redux'
import smartApp from '../reducers/reducers';
import thunk from 'redux-thunk';

const store = createStore(smartApp, applyMiddleware(thunk));

export default store;