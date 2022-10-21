function send_data(data) {
  // This will be called from python and emitted here as an event
  btdatareceiver.emit('python_bridge', data);
}

function send_state(state, value) {
  // This is used to alert device of system states
  Bluetooth.println('received ' + state + ' ' + value);
  btdatareceiver.emit(state, value);
}

function send_to_python(task, msg, options) {
  options = options || {};
  var d = {};
  var prefix = '<python_bridge>';
  d.msg = msg;
  d.options = options;
  d.task = task;
  Bluetooth.println('');
  Bluetooth.println(prefix + JSON.stringify(d));
}

function wait_connection(from_notification, show_messages){
  if (from_notification === undefined)
    from_notification = false
  if (show_messages === undefined)
    show_messages = false

  btdatareceiver.on('disconnect', function(){
    if (show_messages)
      E.showMessage('Disconnected', 'python_bridge');
    NRF.disconnect();
  });

  // We might be connected already
  // Check if the connection is python
  function new_conn() {
    NRF.disconnect();
    var dc_interval = setInterval(() => {
      NRF.disconnect();
    }, 10000);
  
    return new Promise(function(resolve, reject){
      var rej_interval = setTimeout(() => {
        reject('timeout')
      }, 30000);

      btdatareceiver.on('connect', (data) => {
        clearInterval(dc_interval);
        clearInterval(rej_interval);
        send_to_python('connect', '');
        resolve();
      });
    });
  }

  if (NRF.getSecurityStatus().connected && !from_notification) {  // If we have bluetooth connection we send check_connection
    if (show_messages)
      E.showMessage('Checking if connection is python', 'python_bridge');
    send_to_python('check_connection', '');
    var check_conn = setTimeout(() => {  // If nothing happen we create new connection
      return new_conn()
    }, 10000);  // We give python a certain time to answer us then create a new connection

    return new Promise(function(resolve, reject){
      btdatareceiver.on('check_connection', (data) => {  // If we receive answer we are already connected
        Bluetooth.println('python said we are connected');
        clearInterval(check_conn);
        resolve();
      })
    });
  } else {
    if (show_messages)
      E.showMessage('Starting new connection', 'python_bridge');
    return new_conn()
  }
}


// Override Bangle.http requests, python will manage them
Bangle.http = function (url, options) {
  options = options||{};
  if (Bangle.httpRequest === undefined)
    Bangle.httpRequest={};
  if (options.id === undefined) {
    // try and create a unique ID
    do {
      options.id = Math.random().toString().substr(2);
    } while( Bangle.httpRequest[options.id]!==undefined);
  }

  // The actual change
  return btdatareceiver.wait_connection().then(() => {
    // E.showMessage('Sending http request to python', 'python_bridge');
    send_to_python('http', url, options);
    return new Promise(function(resolve, reject){
      // E.showMessage('Waiting http response...', 'python_bridge');
      var rej_interval = setInterval(() => {
        reject('timeout')
      // }, options.timeout || 30000);  // TODO  This must be a pretty long timeout!
      }, 90000);  // TODO  This must be a pretty long timeout!

      btdatareceiver.on('http', (response) => {
        Bangle.httpRequest[options.id]={r:resolve,j:reject,t:setTimeout(()=>{
          //if after "timeoutMillisec" it still hasn't answered -> reject
          delete Bangle.httpRequest[options.id];
          reject("timeout");
        // }, options.timeout || 30000)};
        }, 90000)};  // TODO LONG timeout needed?

        clearInterval(rej_interval);
        response = JSON.parse(response);

        if (response.type === 'json')  // TODO: This is needed to go back to json string to be parsed if original was json
          response.resp = JSON.stringify(response.resp)

        //get the promise and call the promise resolve
        if (Bangle.httpRequest === undefined) return;
        var request=Bangle.httpRequest[response.id];
        if (request === undefined) return; //already timedout or wrong id
        delete Bangle.httpRequest[response.id];
        clearTimeout(request.t); //t = timeout variable
        if(response.err!==null) //if is error // TODO must be null not undefined!
          request.j(response.err); //r = reJect function
        else
          request.r(response); //r = resolve function
      });
    });
  });
}


var btdatareceiver = new Object();
btdatareceiver.wait_connection = wait_connection
// Add a check on pythonista notifications to set to connectable mode the device
E.on("notify", function(event){ 
  if (event.preExisting)
    return

  if (event.appId !== 'com.omz-software.Pythonista3')
    return

  if (event.message === 'connect')
    btdatareceiver.wait_connection(from_notification=true, show_messages=true).then(() => {
      E.showMessage('connected')
    });
});
