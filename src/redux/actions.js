export const setUserCoins = (coins) => {
	return {
		type: 'SET_USER_COINS',
		payload: coins,
	};
};

export const setCoinRates = (rates) => {
	return {
		type: 'SET_COIN_RATES',
		payload: rates,
	};
};

export const transferCoins = (selectedUserId, currentUserId, users, setUsers, coin) => {
  return (dispatch, getState) => {
    const state = getState();

    // Find the current user and selected user from the userCoins array
    const currentUserIndex = users.findIndex((user) => user.email === currentUserId);
    const selectedUserIndex = users.findIndex((user) => user.email === selectedUserId);

    // Find the index of the coin to be transferred in the current user's coins array
    const coinIndex = users[currentUserIndex].coins.findIndex((c) => c.id === coin.id);

    if (coinIndex !== -1) {
      // Remove the coin from the current user's coins array
      users[currentUserIndex].coins.splice(coinIndex, 1);

      // Add the coin to the selected user's coins array
      users[selectedUserIndex].coins.push(coin);

      // Update the userCoins array with the modified users
      users = [...users];

      // Save the updated users to local storage
      localStorage.setItem('users', JSON.stringify(users));

			// Dispatch the setUsers action to update the userCoins state in the Redux store
      setUsers(users);
    }
  };
};
