import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserCoins, setCoinRates, transferCoins } from '../redux/actions';

const Dashboard = ({ currentUser, setCurrentUser, users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const userCoins = useSelector((state) => state.userCoins) || [];
  const coinRates = useSelector((state) => state.coinRates);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user coins and set them in the Redux store
    const currentUserIndex = users.findIndex(u => u.email === currentUser.email);
    const fetchedUserCoins = users[currentUserIndex].coins || [];

    dispatch(setUserCoins(fetchedUserCoins));

    // Fetch coin rates and set them in the Redux store
    fetch('http://api.coinlayer.com/api/live?access_key=ab50b9a95fa9b729758bfe89eb0079c3')
      .then((response) => response.json())
      .then((data) => {
        const rates = data.rates;
        dispatch(setCoinRates(rates));
      })
      .catch((error) => {
        console.error('Error fetching coin rates:', error);
      });
  }, [dispatch]);

  const handlePurchase = (coin) => {
    // Logic for purchasing a coin
    const { symbol, rate } = coin;
  
    // Create a new coin object with unique ID and other details
    const newCoin = {
      id: Date.now(), // Generate a unique ID (you can use a library like uuid for more reliable unique IDs)
      name: symbol, // For now, use the coin symbol as the name
      symbol,
      rate,
    };
  
    // Add the purchased coin to the userCoins array
    const updatedUserCoins = [...userCoins, newCoin];
  
    // Update the Redux store with the updated userCoins array
    dispatch(setUserCoins(updatedUserCoins));

    const currentUserIndex = users.findIndex(u => u.email === currentUser.email);
    users[currentUserIndex].coins = updatedUserCoins;
    setCurrentUser(users[currentUserIndex]);

    // Save the updated userCoins to local storage
    localStorage.setItem('users', JSON.stringify(users));

    setUsers(users);
    setCurrentUser(currentUser);  
  };

  const handleTransfer = (coin) => {
    // Set the selected coin for transfer
    setSelectedCoin(coin);
    // Open the transfer modal
    setShowTransferModal(true);
  };

  const handleTransferConfirm = () => {
    if (selectedUser && selectedCoin) {
      // Transfer the coins from the current user to the selected user
      dispatch(transferCoins(selectedUser, currentUser.email, users, setUsers, selectedCoin));

      const currentUserIndex = users.findIndex(u => u.email === currentUser.email);
      setCurrentUser(users[currentUserIndex]);

      // Close the transfer modal
      setShowTransferModal(false);
    }
  };

  const handleTransferCancel = () => {
    // Close the transfer modal
    setShowTransferModal(false);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3 className='p-3'>User Coins</h3>
      <table className='table table-striped table-dark table-bordered table-hover'>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Rate</th>
            <th>Transfer</th>
          </tr>
        </thead>
        <tbody>
          {userCoins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coinRates[coin.symbol]}</td>
              <td>
                <button className='btn btn-outline-info' onClick={() => handleTransfer(coin)}>Transfer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='p-3'>Coin Rates</h3>
      <table className='table table-striped table-dark table-bordered table-hover'>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Rate</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(coinRates).map(([symbol, rate]) => (
            <tr key={symbol}>
              <td>{symbol}</td>
              <td>{rate}</td>
              <td>
                <button className='btn btn-outline-info' onClick={() => handlePurchase({ symbol, rate })}>Purchase</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className={`modal ${showTransferModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showTransferModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transfer Coins</h5>
                <button type="button" className="close" onClick={handleTransferCancel}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="userSelect">Select User:</label>
                  <select id="userSelect" className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.email} value={user.email}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleTransferConfirm}>
                  Transfer
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleTransferCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}    
    </div>
  );
};

export default Dashboard;
