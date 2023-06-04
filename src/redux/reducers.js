const initialState = {
  userCoins: [],
  coinRates: {},
};

export const userCoinsReducer = (state = initialState.userCoins, action) => {
  switch (action.type) {
    case 'SET_USER_COINS':
      return action.payload;
    default:
      return state;
  }
};

export const coinRatesReducer = (state = initialState.coinRates, action) => {
  switch (action.type) {
    case 'SET_COIN_RATES':
      return action.payload;
    default:
      return state;
  }
};
