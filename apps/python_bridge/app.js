// Connect to python script by resetting bluetooth state until we receive a connection event
E.showMessage('Waiting for connection');
wait_connection(show_messages=true).then(() => {
  E.showMessage('Connected!')
});
