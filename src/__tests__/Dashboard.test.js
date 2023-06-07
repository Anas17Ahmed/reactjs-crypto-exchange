import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../Components/Dashboard';

const mockStore = configureStore([]);

const user = { "name": "Anas Ahmed", "email": "anas17ahmed@gmail.com", "password": "rockstar", "address": "NA", "cnic": "", "coins": [{ "id": 1685888704653, "name": "611", "symbol": "611", "rate": 0.389165 }] };

describe('Dashboard', () => {
  test('should renders user coins table and coin rates table', () => {
    const initialState = {
      userCoins: [
        { id: 1, name: 'BTC', symbol: 'Bitcoin', rate: 50000 },
        { id: 2, name: 'ETH', symbol: 'Ethereum', rate: 3000 },
      ],
      coinRates: {
        BTC: 50000,
        ETH: 3000,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Dashboard currentUser={user} setCurrentUser={() => { }} users={[user]} setUsers={() => { }} />
      </Provider>
    );

    setTimeout(() => {
      // Assert that the user coins table is rendered
      expect(screen.getByText('User Coins')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('50000')).toBeInTheDocument();
      // Assert that the coin rates table is rendered
      expect(screen.getByText('Coin Rates')).toBeInTheDocument();
      expect(screen.getby('ETH')).toBeInTheDocument();
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('3000')).toBeInTheDocument();
    }, 1000);
  });
});
