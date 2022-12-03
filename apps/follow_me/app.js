const STORAGE=require('Storage');

function get_compass_image(){
  return require("heatshrink").decompress(atob("kEqwMB//+v////8n4DJ/EfAZPwh4DF8EHAZPAgYDJwA+BAYsAAYJOBAYn+AYN/AY/8AYM/AY0f/ADG+ADBh4DH8EBwEHKQIBCBoMH4AdBgfAFIIDBHIIVBJIOBwYDB4JxDQIefAYP5A="));
}

function get_bg_image(){
  return require("heatshrink").decompress(atob("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"));
}

function get_altitude_image(){
  return require("heatshrink").decompress(atob("kEgwMB/4AO/l/AYP4j4DB+OfAYPz54DFBYYTD/1+n4gCBAX8CAX5DAU544TBifnBwPD+YDB44DB/Pv/IDBAIOfBoUP8YDBp4ZB/1nEoXnIwZzHN54A=="));
}

function get_diagarrow_image(){
  return require("heatshrink").decompress(atob("kEgwMB/4AkgYCB/wqD8IDC4IDCxIDCjITCnIDB/l7AYP4BwXxAYXjAYXHAYWPAYXfLMo"));
}

function bigThenSmall(big, small, x, y) {
  g.setFont("7x11Numeric7Seg", 2);
  g.drawString(big, x, y);
  x += g.stringWidth(big);
  g.setFont("8x12");
  g.drawString(small, x, y);
}

function drawBattery() {
  bigThenSmall(E.getBattery(), "%", 130, 28);
}

function get_arrow_image(){
  return require("heatshrink").decompress(atob("jkywMB/4AE8ACB/kfAYOBAQPwAwP+gYGB4F///4h4GBDwXgn4aBg4GBwAatCAQXDDwYlCCIYYDD4QmDDl4RC4ICB/wjC/4A="));
}

function get_arrowg_image(){
  return require("heatshrink").decompress(atob("jky4MA///3HWBQXwAQMfAQMDAwV+AQMP8EAgP+AwM/4EAg/4AwP/DQQQBgf8AwN/wAaBEIIaoIwQGDgYNCj4UBgAbCg5fCn4pBgIwCDgd/DlQRCn4CBgIjCh4A=="));
}

function delta_angle(bearing, heading){
  return ((((bearing - heading) % 361) + 540) % 360) - 180;
}

function norm(x){
  var s = 0;
  for (var i=0;i<x.length;i++){
    s+=x[i]*x[i];
  }
  return Math.sqrt(s);
}

function dot(a, b){
  var s = 0;
  for (let i=0;i<a.length;i++)
    s += a[i] * b[i];
  return s;
}

function angular_dist(lat1, lon1, lat2, lon2){
  var deltaphi = radians(lat2 - lat1);
  var deltalambda = radians(lon2 - lon1);
  const a = Math.pow(Math.sin(deltaphi / 2), 2) +
            Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
            Math.pow(Math.sin(deltalambda /2), 2);
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearing(lat1, lon1, lat2, lon2){
  var delta = radians(lon2-lon1);
  var alat = radians(lat1);
  var blat = radians(lat2);
  var y = Math.sin(delta) * Math.cos(blat);
  var x = Math.cos(alat)*Math.sin(blat) -
        Math.sin(alat)*Math.cos(blat)*Math.cos(delta);
  return Math.round(degrees(Math.atan2(y, x)));
}

function distance(lat1, lon1, lat2, lon2){  // Uses equirectangular approx
  var x = radians(lon1-lon2) * Math.cos(radians((lat1+lat2)/2));
  var y = radians(lat2-lat1);
  return Math.round(Math.sqrt(x*x + y*y) * 6371000);
}

function radians(a) {
  return a*Math.PI/180;
}

function degrees(a) {
  var d = a*180/Math.PI;
  return (d+360)%360;
}

function dist_segment(pos_lat, pos_lon, a_lat, a_lon, b_lat, b_lon){
  var d = distance(a_lat, a_lon, pos_lat, pos_lon);
  var alpha = (Math.abs(bearing(a_lat, a_lon, b_lat, b_lon) - bearing(a_lat, a_lon, pos_lat, pos_lon)) / 180) * Math.PI
  return Math.round(Math.abs(Math.sin(alpha) * d));
}

class Node {
  constructor(lat, lon, ele){
    this.lat = parseFloat(lat);
    this.lon = parseFloat(lon);
    this.ele = parseFloat(ele);
  }
}

class Route {
  constructor(routeName, route_json) {
    this.routeName = routeName;
    this.len = route_json.length;
    this.nodes = [];
    for (var idx in route_json) {
      var entry = route_json[idx];
      this.nodes.push(new Node(entry.lat, entry.lon, entry.ele));
    }
  }

  get_node_idx(node) {
    for (var idx in this.nodes)
      if (this.nodes[idx] === node)
        return idx
    throw('Node not present');
  }
}

function indexOfSmallest(a) {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}


class StateHolder {
  constructor(state){
    this.trackName = undefined;
    this.saved = undefined;
    this.gpsTrack = [];
    this.courseTrack = [];
    this.altTrack = [];
    this._lastTime = 0;
    this._elapsedTime = 0;
    this.up = 0;
    this.down = 0;
    this.distanceT = 0;

    // Reload state
    if (state === undefined)
      return;

    for (const key in state) {
      this[key] = state[key];
    }
    this.active = false;
  }

  get elapsedTime(){
    this.updateElapsed();
    return this._elapsedTime;
  }

  updateElapsed(){
    if (!this.active)
      return this._elapsedTime;
    startTime = Date.now();
    this._elapsedTime += this._lastTime? startTime - this._lastTime: 0;
    this._lastTime = startTime;
  }

  enable(){
    this.active = true;
    this._lastTime = 0;
  }

  disable(){
    this.updateState();
    this.active = false;
    this._lastTime = 0;
  }

  updateState(){
    if (!this.active || holder.lat === undefined || holder.lon === undefined)
      return;

    if (this.trackName === undefined){
      this.trackName = holder.route.routeName;
      STORAGE.writeJSON('follow_me.last_track.json', this.trackName)
    }

    var l = this.gpsTrack.length;
    if (this.gpsTrack[-1] === undefined || distance(holder.lat, holder.lon, this.gpsTrack[l-1][0], this.gpsTrack[l-1][1]) > 10){
      console.log('Updating state')
      if (l > 0)
        this.distanceT += distance(this.gpsTrack[l-1][0], this.gpsTrack[l-1][1], holder.lat, holder.lon);
      this.gpsTrack.push([holder.lat, holder.lon])
      this.courseTrack.push(holder.course);
      this.altTrack.push(holder.alt);
    }
    this.updateElapsed();
  }

  getJsonObject(){
    data = {}
    skipKeys = ['active', '_lastTime', 'elapsedTime'];
    this.updateElapsed();

    var skip;
    for (const key in this){
      skip = false;
      for (const idx in skipKeys){
        if (key === skipKeys[idx]){
          skip = true;
          break;
        }
      }

      if (!skip){
        data[key] = this[key];
      }
    }
    return data
  }

  saveState(){
    if (this.trackName === undefined || this.trackName === 'trackback' || this.gpsTrack.length === 0)
      return;
    this.saved = Date.now();

    STORAGE.writeJSON(this.trackName.substring(0, this.trackName.indexOf('.json')) + '.state.json', this.getJsonObject());
    STORAGE.writeJSON('follow_me.last_track.json', this.trackName)
  }
}


var defaultAltitude = undefined;
function onPressure(e) {
  if (!holder.state.active)
    return;
  if (defaultAltitude === undefined){
    defaultAltitude = e.altitude;
  }

  let diff = e.altitude - defaultAltitude;
  if (Math.abs(diff) > 3){
    console.log('got high pressure diff -> ' + diff);
    if (diff > 0){
      holder.state.up += diff;
    } else {
      holder.state.down -= diff;
    }
    defaultAltitude += diff;
  }
}

class Holder {
  constructor(route, state) {
    this.reset(route, state);
    this.lat = undefined;
    this.log = undefined;
    this.alt = 0;
    this.course = undefined;
    this._heading = 0;
    this.speed = undefined;
    this.inmenu = false;
    this.THR_FAR = 26;
    this.THR_CLOSE = 25;
  }

  reset(route, state) {
    this.state = new StateHolder(state);
    this.route = route;
    this.target_pos = undefined;
    this.pnode = undefined;
    this.nnode = undefined;
    this.dpnode = undefined;
    this.dnnode = undefined;
    this.dsegm = undefined;
    this.was_far = false;
    this.did_start = false;
    this.tot_length = 0;
    this.start_length = 0;
    this.min_alt = 0;
    this.max_alt = 0;
    this.tot_up = 0;
    this.tot_down = 0;
    this.update_alt();
    this.update_start_len();
  }

  get heading() {
    return Math.round(this._heading)
  }

  update_alt() {
    // Altitude overview
    // First find max/min
    this.max_alt = Number.NEGATIVE_INFINITY;
    this.min_alt = Number.POSITIVE_INFINITY;
    for (let idx = 0; idx < this.route.len; idx++){
      var node = this.route.nodes[idx];
      if (node.ele > this.max_alt)
        this.max_alt = node.ele;
      if (node.ele < this.min_alt)
        this.min_alt = node.ele;
    }

  }

  find_target() {  // https://stackoverflow.com/a/58883850/7063774
    // We set the target as a linear interpolation between the projection on segment and the current end point
    var delta12 = angular_dist(this.pnode.lat, this.pnode.lon, this.nnode.lat, this.nnode.lon);
    var delta13 = angular_dist(this.pnode.lat, this.pnode.lon, this.lat, this.lon);
    var bear12 = bearing(this.pnode.lat, this.pnode.lon, this.nnode.lat, this.nnode.lon);
    var bear13 = bearing(this.pnode.lat, this.pnode.lon, this.lat, this.lon);
    const ctangd = Math.asin(Math.sin(delta13) * Math.sin(bear13 - bear12));
    const atangd = Math.acos(Math.cos(delta13) / Math.cos(ctangd));
    // Calc intermediate point
    const a = Math.sin(delta12 - atangd) / Math.sin(delta12);
    const b = Math.sin(atangd) / Math.sin(delta12);
    const phi1 = radians(this.pnode.lat);
    const lam1 = radians(this.pnode.lon);
    const phi2 = radians(this.nnode.lat);
    const lam2 = radians(this.nnode.lon);
    const x = a * Math.cos(phi1) * Math.cos(lam1) + b * Math.cos(phi2) * Math.cos(lam2);
    const y = a * Math.cos(phi1) * Math.sin(lam1) + b * Math.cos(phi2) * Math.sin(lam2);
    const z = a * Math.sin(phi1) + b * Math.sin(phi2);
    const lat_p = degrees(Math.atan2(z, Math.sqrt(x*x + y*y)));
    const lon_p = degrees(Math.atan2(y, x));
    // Now linearly interpolate between end point and projected
    // The idea is: - on track -> end point - far from track -> projected point
    // console.log('ppoint: ' + this.pnode.lat + ' ' + this.pnode.lon);
    // console.log('npoint: ' + this.nnode.lat + ' ' + this.nnode.lon);
    // console.log('Proj point: ' + lat_p + ' ' + lon_p);
    // Dot between (current -> Projection) and (prev -> next)
    const curr_to_p = [this.nnode.lat - this.lat, this.nnode.lon - this.lon];
    const prev_to_next = [this.nnode.lat - this.pnode.lat, this.nnode.lon - this.pnode.lon];
    const c = Math.abs(dot(curr_to_p, prev_to_next)) / (norm(curr_to_p) * norm(prev_to_next)); // How correct wrt to segment
    console.log('cos betwen curr->proj and prev->next: ' + c);
    this.target_pos = [this.nnode.lat * (1 - c) + lat_p * c, this.nnode.lon * (1 - c) + lon_p * c];
    return this.target_pos
  }

  update_nodes() {
    // Update the nodes based on distance
    if (!this.was_far && this.dpnode > this.THR_FAR){
      console.log('[FAR PNODE] We are far from pnode, was_far=true');
      this.was_far = true;
    }
    
    if (!this.was_far)  // If we are too close to pnode just ignore
      return;

    // You close to nnode?
    if (this.dnnode < this.THR_CLOSE){
      console.log('[CLOSE NNODE] We are close to nnode, updating to next one');
      this.update_total_len();  // TODO
      // Update nodes p <- n and n <- n + 1
      var n_idx = this.route.get_node_idx(this.nnode);

      if (n_idx == this.route.len - 1){
        console.log('[LAST NODE] nnode is already last node');
        return
      }

      this.pnode = this.route.nodes[n_idx]
      this.nnode = this.route.nodes[n_idx + 1]
      this.was_far = false;
      return
    }

    // You close to pnode? (assuming we were far before)
    if (this.dpnode < this.THR_CLOSE){
      console.log('[CLOSE PNODE] We are close to previous node, updating backwards');
      // Update nodes n <- p and p <- p - 1
      this.update_total_len();  // TODO
      var p_idx = this.route.get_node_idx(this.pnode);

      if (p_idx == 0){
        console.log('[FIRST NODE] pnode is already first node');
        return
      }

      this.pnode = this.route.nodes[p_idx - 1];
      this.nnode = this.route.nodes[p_idx];
      this.was_far = false;
      return
    }
  }

  update_distances() {
    if (this.pnode === undefined || this.nnode === undefined)
      return;
    this.dsegm = dist_segment(this.lat, this.lon, this.pnode.lat, this.pnode.lon, this.nnode.lat, this.nnode.lon);
    this.dpnode = distance(this.lat, this.lon, this.pnode.lat, this.pnode.lon);
    this.dnnode = distance(this.lat, this.lon, this.nnode.lat, this.nnode.lon);
  }

  update_start_len() {
    this.start_length = 0;
    for (let idx = 0; idx < this.route.len - 1; idx++){
      var pnode = this.route.nodes[idx];
      var nnode = this.route.nodes[idx + 1];
      this.start_length += distance(pnode.lat, pnode.lon, nnode.lat, nnode.lon);
    }
  }

  update_total_len() {
    this.tot_length = 0;
    this.tot_up = 0;
    this.tot_down = 0;
    for (let idx = this.route.get_node_idx(holder.pnode); idx < this.route.len - 1; idx++){
      var pnode = this.route.nodes[idx];
      var nnode = this.route.nodes[idx + 1];
      this.tot_length += distance(pnode.lat, pnode.lon, nnode.lat, nnode.lon);
      var delta_alt = nnode.ele - pnode.ele;
      if (delta_alt > 0)
        this.tot_up += delta_alt;
      else if (delta_alt < 0)
        this.tot_down += -delta_alt;
    }
  }

  find_endpoints() {  // Finds current endpoints assuming no previous information
    var distances = [];
    for (let idx = 0; idx < this.route.len; idx++){
      var node = this.route.nodes[idx];
      var d = distance(node.lat, node.lon, this.lat, this.lon);
      distances.push(d);
      // console.log('d from node ' + idx + ': '+ distance(node.lat, node.lon, this.lat, this.lon))
    }

    // Greedy, find minimum distance, take 2 bef and 2 aft for segment calculation
    var min_idx = indexOfSmallest(distances);
    if (min_idx === 0){
      console.log('min idx is 0, increasing to 1')
      min_idx += 1
    }

    // Now distance to each segment
    var dist_segments = [];
    for (let i = -1; i < 2; i++) {  // TODO limit cases for min_idx
      var idx = i + min_idx;
      var pnode = this.route.nodes[idx];
      var nnode = this.route.nodes[idx + 1];
      dist_segments.push(dist_segment(this.lat, this.lon, pnode.lat, pnode.lon, nnode.lat, nnode.lon));
      console.log('d segm ' + idx + '->' + (idx + 1) + ' ' + dist_segments[dist_segments.length - 1]);
    }
    
    var min_segm_idx = indexOfSmallest(dist_segments);
    this.pnode = this.route.nodes[min_idx + min_segm_idx - 1];
    this.dpnode = distances[min_idx + min_segm_idx - 1]; 
    this.nnode = this.route.nodes[min_idx + min_segm_idx];
    this.dnnode = distances[min_idx + min_segm_idx]; 
    this.dsegm = dist_segments[min_segm_idx];
    console.log('picked ' +  (min_idx + min_segm_idx - 1) + '->' + (min_idx + min_segm_idx));
  }
}

function start(){
  if (holder.heading === undefined || holder.lat === undefined || holder.route.len === 0)
    return false;

  // Start by finding end points
  holder.find_endpoints()
  holder.update_total_len()
  return true;
}

function update(){
  if (holder.heading === undefined || holder.lat === undefined){  // TODO: Add indicator that GPS not ready
    // E.showMessage('Sensors not ready')
    console.log('Sensors not ready');
    return;
  }

  if (!holder.did_start){
    holder.did_start = start();
    if (!holder.did_start)
      return;
    draw();
  }

  holder.update_nodes();
  holder.update_distances();
  holder.find_target();
}

function showMenu(){
  var mainmenu = {
    "" : {
      "title" : "Menu"
    },
    "Pick File": () => {pickGPX(openGpx);},
    "Enable fake data": () => {pickGPX(enFakeData);},
    "Enable fake trace": () => {pickGPX((fn)=>{enFakeData(fn, true)}, true);},
    "Disable fake data": disableFakeData,
    "Start": () => {holder.state.enable(); closeMenu();},
    "Pause": () => {holder.state.disable(); closeMenu();},
    "Reset": () => {holder.state = new StateHolder(); closeMenu();},
    "Save": () => {holder.state.saveState(); closeMenu();},
    "Trackback state": () => {pickGPX(trackBack, true)},
    "Recalculate": function() {holder.find_endpoints(); closeMenu();},
    "Calib. mag" : function() {
      mag.docalibrate(false).then(() => {
        closeMenu();
      })},
    "Exit": closeMenu,
  };

  holder.inmenu = true;
  E.showMenu(mainmenu)
}

function stateToRouteJson(state_json){
  // Create fake route from state file, while reversing order for trackback
  var pos;
  var ele;
  var route_json = [];
  for (var idx=state_json['gpsTrack'].length - 1; idx >= 0; idx--){
    pos = state_json['gpsTrack'][idx];
    route_json.push({'lat': pos[0], 'lon': pos[1], 'ele': state_json['altTrack'][idx]});
  }
  return route_json;
}

function trackBack(filename){
  var state_json = STORAGE.readJSON(filename);
  var route_json = stateToRouteJson(state_json)
  delete state_json;

  route = new Route('trackback', route_json);
  holder.reset(route, undefined);
  start();
  closeMenu();
}

function disableFakeData(){
  if (fake_interval !== undefined)
    clearInterval(fake_interval);
  closeMenu();
  Bangle.setGPSPower(1, 'follow_me');
}

function closeMenu(){
  E.showMenu();
  holder.inmenu = false;
  draw();
}

var fake_interval = undefined;
function enFakeData(filename, state){
  var route_trace_json = STORAGE.readJSON(filename);

  var course;
  if (state !== undefined){
    course = route_trace_json['courseTrack']; 
    route_trace_json = stateToRouteJson(route_trace_json);
  }

  var route_trace = new Route(filename, route_trace_json);
  Bangle.setGPSPower(0, "follow_me");

  // Setup fake data
  var nn = 0;
  var tt = -1;
  var nstep = 5;

  fake_interval = setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
    tt += 1;
    if (tt === nstep){
      nn += 1;
      tt = 0;
    }

    if (nn < route_trace.len) {
      holder.lat = route_trace.nodes[nn].lat * (1 - tt/nstep) + route_trace.nodes[nn + 1].lat * tt/nstep;
      holder.lon = route_trace.nodes[nn].lon * (1 - tt/nstep) + route_trace.nodes[nn + 1].lon * tt/nstep;
      holder.ele = route_trace.nodes[nn].ele;
      holder.speed = 0;
      if (course !== undefined){
        holder.course = course[nn] * (1 - tt/nstep) + course[nn + 1] * tt/nstep;
      }
    }

    console.log('Current fake pos: ' + nn + ' Lat ' + holder.lat + ' Lon ' + holder.lon);
  }, 1500);

  closeMenu();
}


function pickGPX(callback, isState) {
  const menu = {
    '': { 'title': 'Tracks' }
  };
  var found = false;
  
  if (isState){
    STORAGE.list(/\.gpx\.state\.json$/).forEach(filename=>{
      found = true;
      menu[filename] = ()=>callback(filename);
    });
  } else {
    STORAGE.list(/\.gpx\.json$/).forEach(filename=>{
      found = true;
      menu[filename] = ()=>callback(filename);
    });
  }

  if (!found)
    menu["No GPX found"] = function(){};
  menu['< Back'] = showMenu;
  return E.showMenu(menu);
}

function openGpx(filename, state){
  var route_json = STORAGE.readJSON(filename);
  if (state !== undefined){
    route_json = stateToRouteJson(route_json);
  }

  route = new Route(filename, route_json);
  state = STORAGE.readJSON(filename.substring(0, filename.indexOf('.json')) + '.state.json') || undefined;
  holder.reset(route, state);

  delete state;
  start();
  closeMenu();
}

var statedict = {
  'default': 0,
  'map': 1,
  'infos': 2,
  'altim': 3
};

var mstate = statedict['map'];
var drawInterval = undefined;
var panOffset = [0, 0];
var scale = 200;
function draw(){
  queueDraw();
  if (holder.inmenu){
    return
  }

  var updateInterval = 30000;  // Default update every 30s
  if (drawInterval !== undefined)
    clearTimeout(drawInterval);
  drawInterval = setTimeout(draw, updateInterval);

  g.setFontAlign(-1, -1);
  g.clear();  // Clear all
  g.drawImage(bg_image, 0, 0);
  draw_frequent(); // Redraw freq informations

  if (mstate === statedict['default']){
    var r = [15, 22, 120, 60];
    g.setFont("7x11Numeric7Seg", 3);
    g.setColor(0, 0, 0);
    g.drawString(require("locale").time(new Date(), 1), 12, 23);

    g.setFont("8x12", 2);
    g.drawString((Math.round(holder.tot_length / 100) / 10).toFixed(1) + 'km', 65, 80); // distance to arrival

    var deltas = parseInt(holder.state.elapsedTime / 1000)
    var deltaM = parseInt(deltas / 60)
    var deltaH = parseInt(deltas / 3600)
    g.setFont("8x12", 2);
    g.drawString('ET ' + (deltaH < 10? '0' + deltaH : deltaH) + ':' + (deltaM < 10? '0' + deltaM : deltaM), 48, 125);

  } else if (mstate === statedict['infos']){
    g.setFont("8x12", 2);
    g.setColor(0, 0, 0);

    g.drawImage(get_altitude_image(), 20, 23);
    g.drawString(holder.alt + 'm', 56, 31);

    var h = 60;
    g.drawImage(get_diagarrow_image(), 10, h - 3);
    g.drawString(parseInt(holder.tot_up), 41, h);
    var w = g.stringWidth(parseInt(holder.tot_up));
    g.drawImage(get_diagarrow_image(), 46 + w + 8, h + 12, {rotate: Math.PI / 2});
    g.drawString(parseInt(holder.tot_down), 51 + w + 16, h);

    h += 26;
    g.drawLine(15, h, 163, h);

    h += 5;  // Elapsed time from state start
    var d = (Math.round(holder.state.distanceT / 100) / 10).toFixed(1)
    g.drawString(d + '/' + (Math.round(holder.start_length / 100) / 10).toFixed(1) + ' km', 20, h);

    h += 25;
    g.drawImage(get_diagarrow_image(), 10, h - 3);
    g.drawString(parseInt(holder.state.up), 41, h);
    var w = g.stringWidth(parseInt(holder.state.up));
    g.drawImage(get_diagarrow_image(), 46 + w + 8, h + 12, {rotate: Math.PI / 2});
    g.drawString(parseInt(holder.state.down), 51 + w + 16, h);
  } else if (mstate === statedict['altim']){
    updateInterval = 10000;
    if (holder.min_alt === 0 && holder.max_alt === 0 || holder.min_alt === undefined && holder.max_alt === undefined){
      g.setColor(0, 0, 0);
      g.setFont("8x12", 2);
      g.drawString('no altitude data', 27, 68);
      return;
    }

    var ox = 45;
    var oy = 135;
    var width = 120;
    var height = 100;
    var delta = holder.max_alt - holder.min_alt
    var jump = Math.ceil(holder.route.len / width);
    var j_size = Math.ceil((width - ox) / holder.route.len);  // TODO
    var curr_node_idx = undefined;
    if (holder.pnode !== undefined)
      curr_node_idx = holder.route.get_node_idx(holder.pnode);
    var curr_x = ox;
    var ele;
    var end_y;
    var prev_y;
    g.setColor(0, 0, 0);
    g.setFont("8x12");
    g.drawString(parseInt(holder.max_alt) + '-', 15, oy - height - 5)
    g.drawString(parseInt(holder.min_alt), 15, oy - 5)
    for (let idx = 0; idx < holder.route.len; idx+=jump){
      ele = holder.route.nodes[idx].ele;
      end_y = oy - ((ele - holder.min_alt) / delta) * height;
      g.drawLine(curr_x, end_y, curr_x, oy);
      if (idx > 0 && holder.route.len < 100){
         g.drawLineAA(curr_x - j_size, prev_y, curr_x, end_y);
      }
      if (curr_node_idx !== undefined && idx - curr_node_idx > 0 && idx - curr_node_idx <= jump) {
        draw_pos_arrow(curr_x, end_y - 30);
        g.setColor(1, 0, 0);
        g.fillCircle(curr_x, end_y, 3)
        g.setColor(0, 0, 0);
      }
      curr_x += j_size;
      prev_y = end_y;
    }
  } else if (mstate === statedict['map']){
    // map display, draw prev, curr, next segment
    updateInterval = 5000;
    if (holder.pnode === undefined){
      g.setColor(0, 0, 0);
      g.setFont("8x12", 2);
      g.drawString('waiting gps', 27, 68);
      return;
    }

    var drawOffset = [88, 88];
    var boundX = [12, 165];
    var boundY = [15, 152];
    var pnodeidx = holder.route.get_node_idx(holder.pnode);
    // TODO: What should be drawn? Here close to position, but if you pan it breaks..
    for (let idx = Math.max(0, pnodeidx - 20); idx < Math.min(pnodeidx + 20, holder.route.len - 1); idx++){
      let pnode = holder.route.nodes[idx];
      let nnode = holder.route.nodes[idx + 1];

      // Length in km of 1° of latitude = always 111.32 km
      // Length in km of 1° of longitude = 40075 km * cos( latitude ) / 360
      let x0 = (pnode.lat - holder.lat) * 111.32;
      let y0 = (pnode.lon - holder.lon) * 40075 * Math.cos(holder.lat) / 360;
      let x1 = (nnode.lat - holder.lat) * 111.32;
      let y1 = (nnode.lon - holder.lon) * 40075 * Math.cos(holder.lat) / 360;
      // console.log(x0 + ' ' + y0 + ' ' + x1 + ' ' + y1);

      // Our position is (0, 0) + draw_offset
      let a = parseInt(x0 * scale) + drawOffset[0] + panOffset[0];
      let b = parseInt(y0 * scale) + drawOffset[1] + panOffset[1];
      let c = parseInt(x1 * scale) + drawOffset[0] + panOffset[0];
      let d = parseInt(y1 * scale) + drawOffset[1] + panOffset[1];
      // console.log(a + ' ' + b + ' ' + c + ' ' + d);

      if (a < boundX[0] || a > boundX[1] || c < boundX[0] || c > boundX[1])
        continue;
      if (b < boundY[0] || b > boundY[1] || d < boundY[0] || d > boundY[1])
        continue;

      g.setColor(0, 0, 0);
      g.drawLine(a, b, c, d);

      if (idx === 0){
        g.setColor(0, 1, 0);
        g.fillCircle(a, b, 3);
      } else if (idx === holder.route.len - 2){
        g.setColor(0, 0, 1);
        g.fillCircle(c, d, 3);
      }
    }

    a = drawOffset[0] + panOffset[0] + 1;
    b = drawOffset[1] + panOffset[1] - 1;
    if (a < boundX[0] || a > boundX[1] || b < boundY[0] || b > boundY[1])
      return;
    let opt = {rotate: radians(holder.course), scale: Math.max(0.2, Math.min(0.7, 0.45 * scale / 200))};
    g.drawImage(get_compass_image(), a, b, opt);
  }

  // Trick to have a custom time interval while using return inside the function
  clearTimeout(drawInterval);
  drawInterval = setTimeout(draw, updateInterval);
}

function draw_pos_arrow(x, y){
  // (x, y) is pixel for arrow head
  var h = 20;
  g.setColor(0, 0, 0);
  g.drawLine(x, y, x, y + h);
  g.drawLine(x + 1, y, x + 1, y + h);
  g.drawLine(x - 1, y, x - 1, y + h);

  g.drawLine(x, y + h, x - 5, y + h - 10);
  g.drawLine(x, y + h, x + 5, y + h - 10);

  g.drawLine(x + 1, y + h, x - 4, y + h - 10);
  g.drawLine(x + 1, y + h, x + 6, y + h - 10);

  g.drawLine(x - 1, y + h, x - 6, y + h - 10);
  g.drawLine(x - 1, y + h, x + 4, y + h - 10);
}

function log_infos(){
  console.log('Lat ' + holder.lat);
  console.log('Lon ' + holder.lon);
  console.log('Alt ' + holder.alt);
  console.log('Course ' + holder.course);
  console.log('Head ' + holder.heading);
  console.log('Speed ' + holder.speed);
  console.log('dp ' + holder.dpnode);
  console.log('dn ' + holder.dnnode);
  console.log('ds ' + holder.dsegm);
  if (holder.nnode !== undefined){
    console.log('nidx ' + holder.route.get_node_idx(holder.nnode));
  }
}

function draw_frequent(){
  if (holder.inmenu){
    return
  }
  g.setFontAlign(-1, -1);

  // Draw Compass
  if (mstate === statedict['default'] || mstate === statedict['infos']){
    var r = [118, 21, 158, 61];
    g.clearRect(r[0], r[1], r[2], r[3]);
    g.setColor(bg_color[0], bg_color[1], bg_color[2]);
    g.fillRect(r[0], r[1], r[2], r[3]);
    g.drawImage(get_compass_image(), 138, 40, {rotate: -radians(holder.heading), scale: 0.75})
  }

  if (mstate === statedict['default']){
    // Draw arrows
    var delta = undefined;
    var b_target = undefined;
    if (holder.target_pos !== undefined){
      b_target = bearing(holder.lat, holder.lon, holder.target_pos[0], holder.target_pos[1]);
      delta = delta_angle(b_target, holder.heading);
      var w;
      var rot;

      var d = (Math.abs(delta) > 30);
      if (d && delta < 30){ // Right arrow
        w = 142;
        rot = 180;
      } else if (d && delta > -30) {
        w = 31;
        rot = 0;
      }

      var r1 = [135, 75, 145, 90];
      var r2 = [31, 75, 50, 90];
      g.setColor(bg_color[0], bg_color[1], bg_color[2]);
      g.clearRect(r1[0], r1[1], r1[2], r1[3]);
      g.fillRect(r1[0], r1[1], r1[2], r1[3]);
      g.clearRect(r2[0], r2[1], r2[2], r2[3]);
      g.fillRect(r2[0], r2[1], r2[2], r2[3]);
      g.drawImage(get_arrowg_image(), 31, 92, {rotate: 0});
      g.drawImage(get_arrowg_image(), 142, 92, {rotate: Math.PI});
      if (d){
        g.drawImage(get_arrow_image(), w, 92, {rotate: radians(rot)});
      }
    }
  }
}

/* GPS event
{ "lat": number,      // Latitude in degrees
  "lon": number,      // Longitude in degrees
  "alt": number,      // altitude in M
  "speed": number,    // Speed in kph
  "course": number,   // Course in degrees
  "time": Date,       // Current Time (or undefined if not known)
  "satellites": 7,    // Number of satellites
  "fix": 1            // NMEA Fix state - 0 is no fix
  "hdop": number,     // Horizontal Dilution of Precision
}
*/
function onGPS(fix) {
  if (!fix.fix){
    return;
  }

  holder.lat = fix.lat;
  holder.lon = fix.lon;
  holder.alt = fix.alt;  // TODO
  holder.speed = fix.speed;
  holder.course = fix.course;
}

var drawTimeout;
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}


/*
 * The idea is to always have the segment you belong to and the distances from both end points and the segment itself.
 * Given this information what you do is always show heading for following end point, if you are on track you
 * should be on the segment so this makes sense.
 * If you become too far from the segment itself the heading must become to the segment so that you can get back on track.
 * The heading should be given by both compass and gps direction, this should allow consistent tracking while you are moving
 * but also decent one when you are still. (maybe is better to have a linear interp between end point and segment so that
 * if you are on track it mostly is about end point, if you are far from track it leads you back to the segment)
 * The coordinates are in lat lon which makes everything a bit more complex
 * When to switch endpoint?
 * End point distance should decrease, when < THRESHOLD -> start point becomes end point and end point -> next end point
 * In case you go back we can do the opposite (take care after ^ you need to get far from start point before it can switch back)
 * to prevent jumps
 * TODO: Fallback if you dont get close enough to end point it should switch to following one if you progress anyway? I guess just manually recalculate
*/

var bg_image = get_bg_image();
var bg_color = [0.917, 0.909, 0.803];
var holder;
function main(){
  // Setup sensors and callbacks updating data
  require("Font7x11Numeric7Seg").add(Graphics);
  require("Font8x12").add(Graphics);

  E.on('kill', function() {
    Bangle.setCompassPower(0, 'follow_me');
    Bangle.setGPSPower(0, 'follow_me');
    Bangle.setBarometerPower(0, 'follow_me');
    holder.state.saveState();
  });

  Bangle.setPollInterval(800); // TODO: This may break the tilt compensation for magnetometer
  Bangle.on('GPS', onGPS);
  Bangle.on("pressure", onPressure);

  Bangle.setGPSPower(1, "follow_me");
  Bangle.setCompassPower(1, "follow_me");
  Bangle.setBarometerPower(1, "follow_me");

  froute = STORAGE.readJSON('fake.gpx.json');
  holder = new Holder(froute, undefined);
  start();
  fileName = STORAGE.readJSON('follow_me.last_track.json') || 'fake.gpx.state.json'
  console.log('Current filename: ' + fileName);
  openGpx(fileName, fileName.includes('.state'));
  update();
  draw();

  setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
    update();
  }, 10000);

  setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
    holder.state.updateState();
  }, 10000);

  setInterval(function() {
    holder._heading = mag.read(holder._heading)
  }, 200);

  setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
    console.log('---- INFOS ----');
    log_infos();
    console.log('---------------');
  }, 5000);

  setTimeout(function() {
    setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
      draw_frequent();
    }, 500);
  }, 5000);
}

// Switch menus on tap
var last_drag = new Date();
Bangle.on('touch', function(btn, xy) {
  var t = new Date();
  if (t - last_drag < 50 || holder.inmenu)
    return;

  if (mstate === statedict['map'] && xy['x'] < 35 && xy['y'] < 35){
    panOffset = [0, 0];
    draw();
    return;
  }

  mstate = (mstate + 1) % Object.keys(statedict).length;
  draw();
});

Bangle.on('drag', function(e) {
  if (e.b === 0 || holder.inmenu || mstate !== statedict['map'])
    return;

  var k = Math.abs(e.dx) < Math.abs(e.dy) ? 1: 0;
  if (e.x > 160 && k === 1){
    scale = Math.max(75, scale + e.dy);
  } else {
    panOffset[k] += 1 / 2 * (k === 0 ? e.dx: e.dy);
  }

  var t = new Date();
  if (t - last_drag > 100){
    last_drag = new Date();
    draw();
  }
});

//
setWatch(() => {
  showMenu();
}, BTN1, {repeat:true});
var mag = require('magn_tilt');
if (!STORAGE.readJSON("magnav.json",1))
  mag.docalibrate(true).then(() => {
    main();
  });
else
  main();

enFakeData('fake.gpx.state.json', true)
