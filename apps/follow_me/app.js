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


function get_compass_image(){
  return require("heatshrink").decompress(atob("kEqwIEBgOAAYMD4ADJg/gAZMP+ADFj/4AZM//gDJv/+AY3/AYP/AYsBAYOAAY8DAYPAAY3gg4DGh4DB+ADHj/+v/4KQIBCBoP4n4dB/k/FIIDBHIIVBJIN+vgDBnxxDQIdgAYMGA"));
}


function norm(x){
  var s = 0;
  for (var i=0;i<x.length;i++){
    s+=x[i]*x[i];
  }
  return Math.sqrt(s)
}

function dot(a, b){
  var s = 0;
  for (let i=0;i<a.length;i++)
    s += a[i] * b[i];
  return s
}

function angular_dist(lat1, lon1, lat2, lon2){
  var deltaphi = radians(lat2 - lat1)
  var deltalambda = radians(lon2 - lon1)
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
  constructor(lat, lon, ele, time){
    this.lat = parseFloat(lat);
    this.lon = parseFloat(lon);
    this.ele = parseFloat(ele);
    this.time = parseFloat(time);
  }
}

class Route {
  constructor(route_json) {
    this.len = route_json.length;
    this.nodes = [];
    for (var idx in route_json) {
      var entry = route_json[idx];
      this.nodes.push(new Node(entry.lat, entry.lon, entry.ele, entry.time));
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

class Holder {
  constructor(route) {
    this.route = route;
    this.lat = undefined;
    this.log = undefined;
    this.ele = undefined;
    this.heading = undefined;
    this.speed = undefined;
    this.target_pos = undefined;
    this.pnode = undefined;
    this.nnode = undefined;
    this.dpnode = undefined;
    this.dnnode = undefined;
    this.dsegm = undefined;
    this.was_far = false;
    this.did_start = false;
    this.THR_FAR = 26;
    this.THR_CLOSE = 25;
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
      // Update nodes p <- n and n <- n + 1
      var n_idx = route.get_node_idx(this.nnode);

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
      var p_idx = route.get_node_idx(this.pnode);

      if (p_idx == 0){
        console.log('[FIRST NODE] pnode is already first node');
        return
      }

      this.pnode = this.route.nodes[p_idx - 1]
      this.nnode = this.route.nodes[p_idx]
      this.was_far = false;
      return
    }
  }

  update_distances() {
    this.dsegm = dist_segment(this.lat, this.lon, this.pnode.lat, this.pnode.lon, this.nnode.lat, this.nnode.lon);
    this.dpnode = distance(this.lat, this.lon, this.pnode.lat, this.pnode.lon);
    this.dnnode = distance(this.lat, this.lon, this.nnode.lat, this.nnode.lon);
  }

  find_endpoints() {  // Finds current endpoints assuming no previous information
    var distances = [];
    for (let idx = 0; idx < this.route.len; idx++){
      var node = this.route.nodes[idx];
      distances.push(distance(node.lat, node.lon, this.lat, this.lon));
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

var route_json = require("Storage").readJSON('og.json');
var route = new Route(route_json);

var holder = new Holder(route);

// FAKE DATA
var route_trace_json = require("Storage").readJSON('trace.json');  // TODO
var route_trace = new Route(route_trace_json);
//


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

function start(){
  // Start by finding end points
  holder.find_endpoints()
}

var nn = 0;
var tt = -1;
var nstep = 5;
function update(){
  // TODO load fake infos
  tt += 1;
  if (tt === nstep){
    nn += 1;
    tt = 0;
  }

  holder.lat = route_trace.nodes[nn].lat * (1 - tt/nstep) + route_trace.nodes[nn + 1].lat * tt/nstep
  holder.lon = route_trace.nodes[nn].lon * (1 - tt/nstep) + route_trace.nodes[nn + 1].lon * tt/nstep
  holder.ele = route_trace.nodes[nn].ele
  holder.heading = 0; // TODO
  holder.speed = 0
  //

  if (holder.heading === undefined || holder.lat === undefined){
    E.showMessage('Sensors not ready')
    console.log('Sensors not ready');
    return false
  }

  if (!holder.did_start){
    start();
    holder.did_start = true;
  }
  
  holder.update_nodes();
  holder.update_distances();
  holder.find_target();

  // TODO REMOVE
  console.log('Current fake pos: ' + nn + ' Lat ' + holder.lat + ' Lon ' + holder.lon);
  console.log('d pnode ' + holder.dpnode + ' d nnode ' + holder.dnnode + ' d segm ' + holder.dsegm);

  return true
}

function draw(){
  g.clear();
  var h = 10;
  var w = 1;
  var incr = 23;
  g.setFont("8x12", 2);
  g.setFontAlign(-1, 0);
  // g.setColor(0, 0, 0);
  g.drawString('Lat ' + holder.lat, w, h);
  h += incr;
  g.drawString('Lon ' + holder.lon, w, h);
  h += incr;
  g.drawString('Alt ' + holder.alt, w, h);
  h += incr;
  g.drawString('Head ' + holder.heading, w, h);
  h += incr;
  // g.drawString('Speed ' + holder.speed, w, h);
  // h += incr;
  g.drawString('dp ' + holder.dpnode, w, h);
  h += incr;
  g.drawString('dn ' + holder.dnnode, w, h);
  h += incr;
  g.drawString('ds ' + holder.dsegm, w, h);

  // Compass image
  g.drawImage(get_compass_image(), 125, h - 2.2 * incr, {rotate: radians(holder.heading)})
}

function main(){
  // Setup sensors and callbacks updating data
  require("Font8x12").add(Graphics);
  Bangle.on('kill',function() {Bangle.setCompassPower(0); Bangle.setGPSPower(0);});
  // Bangle.setGPSPower(1, "follow_me");
  // Bangle.on('gps', function(e) { console.log('GPS ' + e.course) });
  Bangle.setCompassPower(1, "follow_me");
  Bangle.on("mag", function(e) {holder.heading = mag.read(e.heading);});

  update();
  draw();

  setInterval(function() {  // Every N seconds update internal infos and decide if you want to draw
    var shouldDraw = update();
    if (shouldDraw)
      draw();
  }, 100);
}

var mag = require('magn_tilt');
if (!require("Storage").readJSON("magnav.json",1))
  mag.docalibrate(true).then(() => {
    main();
  });
else
  main();
