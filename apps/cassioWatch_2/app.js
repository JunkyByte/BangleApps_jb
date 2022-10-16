const storage = require('Storage');

require("Font6x12").add(Graphics);
require("Font8x12").add(Graphics);
require("Font7x11Numeric7Seg").add(Graphics);
var t_color = [0.196, 0.305, 0.396];

function bigThenSmall(big, small, x, y) {
  g.setFont("8x12", 2);
  g.drawString(big, x, y);
  x += g.stringWidth(big);
  g.setFont("8x12");
  g.drawString(small, x, y);
}

function getWeatherImage(weather){
  if (weather == 'clear') {
      return require("heatshrink").decompress(atob("kEg4MA///tkygEBwAMBAZUEAYMghwJBuEHAYPggeAgPAgOH8IUBj/4BoM8ngVCDIVggwZCDoXAgcA/ADBDIIDCBYYTEDYYjDFYYzCHYZDDJYZTDLYZvP"));
  } else if (weather == 'rain') {
      return require("heatshrink").decompress(atob("kEg4MA///tkyBAIMDAYsQgFAgEIgHABAP8wEAgeGAwMCgfwgEGg0CgEEhgDB8gYBA4MYgOAgvwgP4g4oBxkGBwMGhgDBgYWCgIDHB4cEGwQbDgZcB/kAv//8EAsODBoPDCIQAHmFBLgNgCYXBCYWCFoI"));
  } else if (weather == 'clouds'){
      return require("heatshrink").decompress(atob("kEg4MA///tkyCBEQAYUwAZQAG4H+g0A8P/h0AseDxkABIPAAYXwgEMgf8AYMHx4DBh0DAYMMgOAAYX4g0YgH8g84gEOuf4EQPhEwMDCoIDMg4DCHwccOgQhBn//8BfHA"));
  }

  throw '?'
}

function getDigitBg() {
  return require("heatshrink").decompress(atob("jkq4MA///u/OCRU//8Ag///kAv//mET//nwPP/14j1/5+B+EA/EfgEfwP4gIGBwEPBoIGDBoIGDCgXggH8jl/8eB7//zEPG4QGBkEcgEDGAgiCGAgpCHwY3CIoo3G+P8G4XvwMfMIMD//3wBvCgP/EAIAJA="));
}

function getBackgroundImage() {
  return require("heatshrink").decompress(atob("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"));
}

let settings = storage.readJSON("cassioWatch.settings.json", true) || {};
delete settings;

// schedule a draw for the next minute
var drawTimeout;
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}


function clearIntervals() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = undefined;
}

var bg_digit = getDigitBg();
function drawClock() {
  var height = 58;
  g.setFont("7x11Numeric7Seg", 4);
  g.drawImage(bg_digit, 124, height, {scale:1.23});
  g.drawImage(bg_digit, 96, height, {scale:1.23});
  g.drawImage(bg_digit, 48, height, {scale:1.23});
  g.drawImage(bg_digit, 20, height, {scale:1.23});
  const t = require("locale").time(new Date(), 1);
  if (parseInt(t.slice(0, t.indexOf(':'))) > 18)
    g.setColor(0, 0, 0);
  else
    g.setColor(t_color[0], t_color[1], t_color[2]);
  g.drawString(t, 90, height + 4);

  // Other strings use always blueish color
  g.setFont("8x12", 2);
  g.setColor(t_color[0], t_color[1], t_color[2]);

  g.drawString(require("locale").month(new Date(), 2).toUpperCase(), 65, 28);

  const time = new Date().getDate();
  g.drawString(time < 10 ? "0" + time : time, 96, 28);
}

function drawBattery() {
  var symbol = '%'
  if (Bangle.isCharging()){
    symbol = '+'
    g.setColor(0, 0.5, 0);
  } else
    g.setColor(t_color[0], t_color[1], t_color[2]);
  bigThenSmall(E.getBattery(), symbol, 130, 28);
}


// Weather logic
var weather_curr = undefined;
var temp_curr = undefined;
try{
  var weatherJson = storage.readJSON('weather.json');
  if (weatherJson == undefined)
    throw 'weather disabled'
} catch(ex) {
    weather_curr = 'disabled';
    print('weather is disabled');
}

function getWeather(){
  current_time = Date.now() / 1000;
  var d = Infinity;
  for (var ts in weatherJson) {
    var d_curr = Math.abs(current_time - ts);
    if (d_curr < d){
      current = ts; 
      d = d_curr;
      continue;
    } // This can be more efficient
  }
  // console.log(d + " " + current + " " + weatherJson[current][0]);
  weather_curr = getWeatherImage(weatherJson[current][0]);
  temp_curr = weatherJson[current][1];
}

// Drawing
var background = getBackgroundImage();
function draw() {
  queueDraw();

  g.reset();
  g.clear();
  g.drawImage(background, 0, 0, { scale: 1 });
  
  g.setFontAlign(0,-1);
  g.setFont("7x11Numeric7Seg", 2);
  g.setColor(t_color[0], t_color[1], t_color[2]);
  if (weather_curr != 'disabled') {
     if (weather_curr == undefined){
         getWeather();
     }
     g.drawImage(weather_curr, 41, 113, {scale:1});
     g.drawString(temp_curr, 105, 120);
     g.setFont("8x12", 2);
     g.drawString('C', 135, 122);
  }
  
  drawClock();
  g.setFontAlign(-1,-1);
  g.setFont("7x11Numeric7Seg", 2);
  drawBattery();

  // Hide widgets
  for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
}

if (weather_curr != 'disabled'){
  setInterval(getWeather, 60 * 60 * 1.5 * 1000);
}

Bangle.on("lcdPower", (on) => {
  if (on) {
    draw();
  } else {
    clearIntervals();
  }
});

Bangle.on('charging', function(charging) { draw(); });

Bangle.on("lock", (locked) => {
  clearIntervals();
  draw();
  // if (!locked) {
  //   rocketInterval = setInterval(drawRocket, rocketSpeed);
  // }
});

Bangle.setUI("clock");

// Load widgets, but don't show them
Bangle.loadWidgets();

g.reset();
g.clear();
draw();

