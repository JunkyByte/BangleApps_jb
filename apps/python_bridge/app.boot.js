global btdatareceiver = new Object();

function send_data(data) {
  // This will be called from python and emitted here as an event
  btdatareceiver.emit('python_bridge', data);
}

function send_state(state, value) {
  // This is used to alert device of system states
  btdatareceiver.emit(state, value);
}

function send_to_python(task, msg, options) {
  options = options || {};
  d = {}
  prefix = '<python_bridge>'
  d.msg = msg
  d.options = options
  d.task = task
  Bluetooth.println('');
  Bluetooth.println(prefix + JSON.stringify(d));
}

function wait_connection(){
  // E.showMessage('Waiting for connection', 30, 30);
  var interval = setInterval(() => {
    NRF.sleep();
    setTimeout(() => {
      NRF.wake();
    }, 100);
  }, 3000);
  
  return new Promise(function(resolve, reject){
    btdatareceiver.on('connect', (data) => {
      send_to_python('connect', '');
      clearInterval(interval);
      resolve();
    });
  });
}


// Override Bangle.http requests, python will manage them
Bangle.http = function (url, options) {
  options = options||{};
  // if (!NRF.getSecurityStatus().connected)  // TODO this makes no sense in this situation
  //   return Promise.reject("Not connected to Bluetooth");
  if (Bangle.httpRequest === undefined)
    Bangle.httpRequest={};
  if (options.id === undefined) {
    // try and create a unique ID
    do {
      options.id = Math.random().toString().substr(2);
    } while( Bangle.httpRequest[options.id]!==undefined);
  }

  // The actual change
  return wait_connection().then(() => {
    // E.showMessage('sending to python');
    send_to_python('http', url, options);
    return new Promise(function(resolve, reject){
      // E.showMessage('http response waiting');
      var rej_interval = setInterval(() => {
        reject('timeout')
      // }, options.timeout || 30000);  // TODO  This must be a pretty long timeout!
      }, 90000);  // TODO  This must be a pretty long timeout!

      btdatareceiver.on('http', (response) => {
        Bluetooth.println('well! i received it')
        Bangle.httpRequest[options.id]={r:resolve,j:reject,t:setTimeout(()=>{
          //if after "timeoutMillisec" it still hasn't answered -> reject
          delete Bangle.httpRequest[options.id];
          reject("timeout");
        // }, options.timeout || 30000)};
        }, 90000)};  // TODO LONG timeout needed?

        clearInterval(rej_interval);
        response = JSON.parse(response);
        Bluetooth.println('well! i parsed it')

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
