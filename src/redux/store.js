import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userCoinsReducer, coinRatesReducer } from './reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userCoins: userCoinsReducer,
  coinRates: coinRatesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
