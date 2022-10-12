const storage = require('Storage');

require("Font6x12").add(Graphics);
require("Font8x12").add(Graphics);
require("Font7x11Numeric7Seg").add(Graphics);
var t_color = [0.196, 0.305, 0.396];

function bigThenSmall(big, small, x, y) {
  g.setFont("7x11Numeric7Seg", 2);
  g.drawString(big, x, y);
  x += g.stringWidth(big);
  g.setFont("8x12");
  g.drawString(small, x, y);
}

function getWeatherImage(weather){
  if (weather == 'clear') {
      return require("heatshrink").decompress(atob("kEgwUBqoABqkVAgQHYooHDqIHBFIdVoACEBglQDoVUgoDCCIMBFIlUKAIwEqEFAIIrGGYlBAQgMEHYgcCqACBFYIHDGYYHFC44nJG45HHK45nGOYJ3FQ46XHU463Hb7w"))
  } else if (weather == 'rain') {
      return require("heatshrink").decompress(atob("kEgwUBqtVqICBAAgHNqgDCooIDioCBgoREgEVBQQABqEVoImGqEAA4YNBAIIyDFgImBA4UBA4ImEB4NUA4JEDoglCq7BFoIMDiojBHooFBKgtQFowcBA6ofBQghZCG451BAAYdCoAGCXwRoDEoJbDAoIjFABxCCRQQ6DE4sFLYInEipTBLYQA=="))
  } else if (weather == 'clouds'){
      return require("heatshrink").decompress(atob("kEgwUBqoAQqgHeABsFqsAIYNBA4MBqhPBAgIHBoNQioBBCgIICDYYHFDAIoEqEACAYDBoEVCAYHBFoNQA4gBBqkVA40ABANBBgYpCoBGBDoUBJ4ITCIoRfBJogxBDwYHZoAHGPow0DoDqDCgRIBAALuR"))
  }

  throw '?'
}

function getDigitBg() {
  return require("heatshrink").decompress(atob("jkq4MA///u/OCRU//8Ag///kAv//mET//nwPP/14j1/5+B+EA/EfgEfwP4gIGBwEPBoIGDBoIGDCgXggH8jl/8eB7//zEPG4QGBkEcgEDGAgiCGAgpCHwY3CIoo3G+P8G4XvwMfMIMD//3wBvCgP/EAIAJA="));
}

function getBackgroundImage() {
  return require("heatshrink").decompress(atob("2Gw4n/rPvA4NsmXPvfF+V6+///8wwmfpu/ptHiPfpul8X/pvF/WJ/0RABMoxfdAAfb3YAw3o4EzGCkJNKKpO73ObD4gA2zOb3e4wJWQlvbzIaB7GCkUiiUi1Ua1QAs0OqkURG4MozrpBIQOSKx077AWBKgOhY6QAoLoMo7u4xvSIZcanpWB7EqFSOjm93uYWDkcjmIFCk93BoI1B0QQBjQWBBIYARkWN7BYBB5WoM5wAGiFmAAZSBjQEBsANB0wMDs8RgwCBmwJDCIQARjRYBxeKBpES3JlMABEGs0AgADBtRfCgFmOwMGsEikV2sxXCMwNlgEHC4NxLCu43MhBY8txHYVocf0Ma+IFB/QHB//xiQbB0YKBToQcBgtaVINlJQMBKANjQIUqK4UTs1hBIMXCIWv/8RGAPxFwQCCjTWB0IGCEIONxGCK42o3GdMQgcCC4IbBiMv0P/0ZdBn4oBs1iW4xRBqy1Bkz7BqsAvRXEKQMRAgUa/8f+QwB+fPA4OvGII3C/X/1Q2BDAPZxo5BAAmLxfSA4n6K4mvmOvRAKJBFgILBK4ysBT4M2sAGBuFWLINm0JXJibdC+eq+U/SAIxDn/xMgYuCluYzA2EjHY3uhA4cSDAJXC18f+JUB/Wvl+v+ZXCfIURgEKiFmsEAg1maQIlC0FmuJXDM4MRCgJXE///K4IuBLQKOBiX6K4S0BI4SwBfwkrxKuFZIKkBDIQoBl6AC1X/jgLBJgNzmd1s1q01mVAcBu1g0MakBXDiRnBmd3DYNxRAJLBUQXPbQIxDAQP6KoJXDWAOI2QGD7BeFK4IBBJoIcBFAIlBPoMR/Q1BiJQBAAcKq1gDgMas1iBopsBs5vCBIiDC+IkBVgUvSQPxHoOvdATBCAAMT7GYbQUY3HYKwgATm9wgEHuURud6BQUnuUaBoV3mIIBBoMSu8ABIKMFACmNxIcClGJ2IhZAGutxG6cAOIxp5FjUjm9zmYA9u8zlRKEjHY2ROB3G4KwwWBAH93TAJYEjXYzGhK4PSK4mnu8jqoA/qtXm8H0JMDxuYkMS3PaMQhsBusAAH8AgsHm86JocdV4MYzeBBIcggVwqBV/AAVVmcwWAcY3GBjGdkIICiV3m5W/AAtXu9yK4fYwMZK4mnud1KP4AFgsDu6wCiXYyUpzYHCjUwmCu/ABFwmJXElGZL4cDgpO/WBMKU4XZK4O4AwMR08HV10CkAaYq93KAW5K4swmCVukRXZgE3mJQBxOSxGIK4V3uCuuK7d3uJQB3GIkUqAoMauSEFkQEHK0BXbqcBKIMSkStCiOjK4gsBFoQEEAD4kCDrUHuRTDAAcXmqEFAAyuiEbcFm+hK40QmBXMWD4ifg8hK42nqAtFK8qADETlQV4fM5gDBk6FHK8giDELsxKoXuK4U3K46KDK74jFEjcHuJXB9hXDuZXGGYReEV0CydK5qHCgQ0BAwbkdV4xXjuQyHgEgAQIAiKzpXBgJXGmSIHkAyDK0CxDFIKviK4pTCK4YxbK5IfbV5wvDAQRWgaYZ8cV54wDV0QmDD7hXQcD5XIPjpXQRMB9GabxXRGUAkFEDxXRgBWiK4IkfK6QA/K/5X/K/4A/K/5X/K/5X/K/5X/AH5X/K/5X/AH5X/K/5X/K/5X/K/4A/K/5X/K/4A/K/5X/K/5X/K/5X/AH5X/K/5X/AH5X/K/5X/K/5X/K/4A/K/5X/K/4A/K/5X/K/5X/K/5X/AH5X/K/5X/AH5X/K/5X/K/5X/K/4A/K/5X/K/4A/K/5X/K/5X/K/5X/AH5X/K/5X/AH5X/K/5X/K/5X/K/4A/K/5X/K/4A/K/5X/K/5X/K/5X/AH5X/K/5X/AH5X/K+0iAQMgKv5XVgRaCAH5XPKYIAEK35X/K9AA/V/5XwkEiAIZW/K6RZCgBX/K4UBK50iAAhW/V5NyK/6vWuZXGkABCgBX/V5UzV/5X/K903JP4AOmJXG09QJP4AMq+hK45J/ABsHKIJXFi91JX4ALgt3K48TuBL/ABdXuRXD5hXCjV3qBM/ABUHgJXC5nuoIFBiM3gpM/ABMFkExKAMe9hVCAAMnuCw/ABUw0JTEAAcXgZM/ABNXgZWIiMSg8gJ34AHgsHhRXJiMw0VQKH4AGqFwmJREkUiAoenuV1KH6uGu8HJ4cokWN7AHDiVwm6w/KwtXmd6J4ZVBxG4Wwmnud1qpU/KwVQmd30JODxOSlJXFjV3m6x/AAVQIoNyJwm5yUozJgEWAN3maxBAH9zm9zJoka7BXBzZXFjUiu4A/AAVylRMEiRXB1OdkIKELAJrBmYA+m93nRLFK4WoK44A/ABcY7GKjGbwJF/ACOo3GBiW57RF/ACMtzEhjXY6Qke5gAQ53BGT2NzGhjWIzAjdjnM9wAP9nMGTqrB2QEBlGNkJXd8lEpijC+ioDonM4gMCAYPEK7sY7HaAgOozIECAAuhAIkSN4MqlUR0QCBiUiK4lEon2swAB5nFAYNs5nwKQPPr9MonkSgciFQOiEIIGBAQIEDiWqTxOtxOKAgMS7HYB4/xjXziP6iP/+Mf///iQCE+JXFg1m//04lWLgVEq1v5gMBtnE9wXCn///gqB/4CCFwOhAgYLCAA+bxJjCjWIxppH+QcBjRKB/QCBj8Rifx0MSMQJXHt5XB5lm4n/K4QCBLoNkK4sR14wBAwPzVoJXB/kaXYIPBAA8Y7GYAwcrxPSCA0vj+vj/BKIK0BK4KsB/SvCFoKvGVQVl5nMgpXB+0Fs0GK4svEIKsBFQX/kJXBAgMxK5UtxOyAwcS3GdWAweBAIIjCaAKvDC4Pyl4tBK4sPVQVlonwAgVGssE+xXGlRUBLIMRkMa/RXBP4IJBK5ES7GLJ4uNxawGj6BCboOhAIKvD/8SBoJcBK4Xkon2qsFq3M+tVWgVcp9l+nmrhXEI4OvFoIuBAQPxK4IECK5MtzBOGjCwIACavCpgCBAgVP//05gFB/gCB4lE9gfKVYIEHAAuo7GNJo8txHYDBRXPV4IAQ5yGZiW9xOSBZGJxpYZjnM5igBVwXOL5AQB5hWYjWN3GYfhK7C7ANJABz8BI4ICCfwRcB4lMMgdMFbESI4OdxRlKlIOB7EqbjIAmjUiKwOL2QRMlvbzvdzEi0JV9xPd3G92RDNjUo7eZLIWIwUiAG0oxGL7vZzOZwSaQlAXB7e73fdAG47C3vdxEqY6WqkWIzYfEOoIACxIFEA4eYAYLHBAAgGBxIGDzINFAAgjEzaPE3BVUAAmiaAgABKg4AHzYPOJQgAEBQR0EHAUq0JWXXRIAsISgA=="));
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
  g.setFont("7x11Numeric7Seg", 4);
  g.setColor(t_color[0], t_color[1], t_color[2]);
  g.drawImage(bg_digit, 124, 51, {scale:1.23});
  g.drawImage(bg_digit, 96, 51, {scale:1.23});
  g.drawImage(bg_digit, 48, 51, {scale:1.23});
  g.drawImage(bg_digit, 20, 51, {scale:1.23});
  g.drawString(require("locale").time(new Date(), 1), 90, 55);
  
  g.setFont("8x12");
  g.setColor(t_color[0], t_color[1], t_color[2]);
  g.drawString(require("locale").month(new Date(), 2).toUpperCase(), 56, 107);
  
  g.setFont("7x11Numeric7Seg", 2);
  g.setColor(t_color[0], t_color[1], t_color[2]);
  const time = new Date().getDate();
  g.drawString(time < 10 ? "0" + time : time, 56, 120);
}

function drawBattery() {
  var symbol = '%'
  if (Bangle.isCharging()){
    symbol = '+'
    g.setColor(0, 0.5, 0);
  } else
    g.setColor(t_color[0], t_color[1], t_color[2]);
  bigThenSmall(E.getBattery(), symbol, 120, 23);
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

function getSteps() {
  var steps = 0;
  try{
      if (WIDGETS.wpedom !== undefined) {
          steps = WIDGETS.wpedom.getSteps();
      } else if (WIDGETS.activepedom !== undefined) {
          steps = WIDGETS.activepedom.getSteps();
      } else {
        steps = Bangle.getHealthStatus("day").steps;
      }
  } catch(ex) {
      // In case we failed, we can only show 0 steps.
      return "? k";
  }

  steps = Math.round(steps/1000);
  return steps + "k";
}


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
     g.drawImage(weather_curr, 78, 113, {scale:1});
     g.drawString(temp_curr, 137, 120);
  }
  
  heart = Math.round(Bangle.getHealthStatus('last').bpm);
  offset_h = 63;
  g.drawString(heart, offset_h, 25);
  
  // g.drawString(getSteps(), 160, 132); // TODO disabled

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
