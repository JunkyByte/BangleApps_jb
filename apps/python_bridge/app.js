// Connect to python script by resetting bluetooth state until we receive a connection event
E.showMessage('Waiting for connection');
wait_connection().then(() => {
  E.showMessage('Connected!')
});
