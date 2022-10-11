global btdatareceiver = new Object();

function send_data(data) {
  // This will be called from python and emitted here as an event
  btdatareceiver.emit('py_bt_data', data);
}

function send_state(state, value) {
  // This is used to alert device of system states
  btdatareceiver.emit(state, value);
}

function send_to_python(task, msg) {
  prefix = '<python_bridge>'
  task = '<' + task + '>'
  console.log(prefix + task + msg);
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
      // E.showMessage('Connected!', 30, 30);
      send_to_python('connect', '');
      clearInterval(interval);
      resolve();
    });
  });
}


// Override Bangle.http requests, python will manage them
Bangle.http = function (url, options) {
  options = options||{};
  if (!NRF.getSecurityStatus().connected)
    return Promise.reject("Not connected to Bluetooth");
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
    send_to_python('http', url + ' ' + options);
    return new Promise(function(resolve, reject){
      // E.showMessage('http response waiting');
      btdatareceiver.on('http_response', (event) => {
        // E.showMessage('http response received');
        // console.log(data);
        Bangle.httpRequest[options.id]={r:resolve,j:reject,t:undefined}
        resolve({resp: event});  // TODO REJECT
      });
    });
  });

  // //send the request
  // var req = {t: "http", url:url, id:options.id};
  // if (options.xpath) req.xpath = options.xpath;
  // if (options.method) req.method = options.method;
  // if (options.body) req.body = options.body;
  // if (options.headers) req.headers = options.headers;
  // gbSend(req);
  // //create the promise
  // var promise = new Promise(function(resolve,reject) {
  //   //save the resolve function in the dictionary and create a timeout (30 seconds default)
  //   Bangle.httpRequest[options.id]={r:resolve,j:reject,t:setTimeout(()=>{
  //     //if after "timeoutMillisec" it still hasn't answered -> reject
  //     delete Bangle.httpRequest[options.id];
  //     reject("Timeout");
  //   },options.timeout||30000)};
  // });
  // return promise;
}
