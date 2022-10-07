const storage = require('Storage');

require("Font6x12").add(Graphics);
require("Font8x12").add(Graphics);
require("Font7x11Numeric7Seg").add(Graphics);

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
      return require("heatshrink").decompress(atob("kEgwUBqtVqICBAAgHNqgDCooIDioCBgoREgEVBQQABqEVoImGqEAA4YNBAIIyDFgImBA4UBA4ImEB4NUA4JEDoglCqg7BFoIMDiojBHooFBKgtQFowcBA6ofBQghZCG451BAAYdCoAGCXwRoDEoJbDAoIjFABxCCRQQ6DE4sFLYInEipTBLYQA=="))
  } else if (weather == 'clouds'){
      return require("heatshrink").decompress(atob("kEgwUBqoAQqgHeABsFqsAIYNBA4MBqhPBAgIHBoNQioBBCgIICDYYHFDAIoEqEACAYDBoEVCAYHBFoNQA4gBBqkVA40ABANBBgYpCoBGBDoUBJ4ITCIoRfBJogxBDwYHZoAHGPow0DoDqDCgRIBAALuR"))
  }

  throw '?'
}

function getBackgroundImage() {
  return require("heatshrink").decompress(atob("2GwwcBIf4AHgeOnHgAoPjxwDBh048eABYQFBBYQArj////8AoP//wDBv4JB+EH/kBAoP/4BBsGAX/wEHIIUDBAX+n/gh4GC/BArOgICBPQd/4Ef+EAjlwBAXHgFx/5BsQAMAfwJ6Bv/4j/+nAIFgCGBQdwFDXgPAYoaMEgEBQeAABfwX4IIf+QZPjx0AgeOnEAhyYCnH/BYIOBnEDx/4EwQvBn4aCAQSDLj/xHgQ1Dj6DLgPAjgFCuAKDBAMHAgMGCIQvCAQYUBDQaDIx0//+PIIaABNwKDE8f/QwKDFOgMAvwFBUgJlC8EAR4MBC4U/AQSVBQZcAHYeBOgJ3Bj4ICQYTCBAAJBDPQiJGAQaACQZAaFIJZrCLIRBDQYJBHOgIAFnAIFgZ0KByIA/AH4A/AH4A/AAMCpMkyQCjoAXVwBBBiRB9yUAgg+kILQXXFPZB/IP5BigBB/pBB/AoJB/yEAIP+AgEEIPyCBIP0gIII+3IIxABIP1IIAMBIPtAQYUAgRB7IAYABQf5B9AoOAIAMSIPqCCH2xBJghB9kBBBH25BIgJB/gEJIP0AgQ+4II8SIP8AH3JBGAXpB/IP5B/IP5B/IMUAAH4A/AATd/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4CQwEBAoMAghB6kEAgBEBAYJB6HgIAEiRB/gECIPFIIP5BDhBB/gEJIP8ApMAiRB7HwMAoMgiVAIgJB5AQJBByA+7AQKEBkmAgEEIPY+BAQZB7yCABgEBIPmSYwMAhJB9oBBBH3YCCpBB/AQMAgRB/kA+9AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4C/AX4CXgAA/AH4ACTCkgiSwTwDaqIP5B/IItIb4JB/gmQhJB/yEBIP+SIP5B/IP5BEyBBVgECINMJIKdAgEAF6JrBwRBSFKRBDCwJBUCiBBBTaZBFYqJVCgDyPILGQINUgFKJBCwArBLigCQILCDCF6KDWCgJBTiQpChIXPgUANwJBTF4RBQTAeAFh5BBoAvBIM4sBWYRBQYqtIgmAVqBTEkBBoCgJBVFiLFCkjFSoEEyBBoQaojNIJhZQINrdCDSYCQYrJBBgRBmpBBWgMATyhBUeohBQgA+jIIlJgBB/IILvRKaJBckBB/IP5BrpEEIP9AgBBWFiRBUyEAgBrRINhABAH4A/AEMBVANIIPsJkEApJB9HwUBIgKA5YQoFBQ3dAgGSIILE7gVAgmSAQI+5pK/BIIjFBQ3Q+CYvcBQYNIgEQIIIFCAG0JHYhHCpKF5IgMgAQI+6ZA4A9gmSoBB+AEQ="));;
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

function drawClock() {
  g.setFont("7x11Numeric7Seg", 4);
  quad = [0, 54, 125, 120]
  g.clearRect(quad[0], quad[1], quad[2], quad[3]);
  g.setColor(0, 255, 255);
  g.drawRect(quad[0], quad[1], quad[2], quad[3]);
  g.fillRect(quad[0], quad[1], quad[2], quad[3]);
  g.setColor(0, 0, 0);
  g.drawString(require("locale").time(new Date(), 1), 5, 67);
  g.setFont("8x12", 2);
  g.drawString(require("locale").dow(new Date(), 2).toUpperCase(), 18, 130);
  g.setFont("8x12");
  g.drawString(require("locale").month(new Date(), 2).toUpperCase(), 85, 126);
  g.setFont("8x12", 2);
  const time = new Date().getDate();
  g.drawString(time < 10 ? "0" + time : time, 83, 137);
}

function drawBattery() {
  bigThenSmall(E.getBattery(), "%", 135, 22);
}


// Weather logic
var weather_curr = undefined;
var temp_curr = undefined;
try{
  var weatherJson = storage.readJSON('weather.json');
} catch(ex) {
    weather_curr = 'disabled'
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
    }  // This can be more efficient
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


function draw() {
  queueDraw();

  g.reset();
  g.clear();
  g.setColor(0, 255, 255);
  g.fillRect(0, 0, g.getWidth(), g.getHeight());
  let background = getBackgroundImage();
  g.drawImage(background, 0, 0, { scale: 1 });
  g.setColor(0, 0, 0);
  // g.setFont("6x12");
  // g.drawString("Launching Process", 30, 20);
  // g.setFont("8x12");
  // g.drawString("ACTIVATE", 40, 35);

  g.setFontAlign(0,-1);
  g.setFont("8x12", 2);
  if (weather_curr != 'disabled') {
    if (weather_curr == undefined){
        getWeather();
    }
    g.drawImage(weather_curr, 8, 17, {scale:1});
    g.drawString(temp_curr + 'C', 75, 22);
  }

  heart = 60; //Math.round(Bangle.getHealthStatus('last').bmp);
  offset_h = heart >= 100 ? 162 : 155;
  g.drawString(heart, offset_h, 90);
  g.drawString(getSteps(), 160, 132);

  g.setFontAlign(-1,-1);
  drawClock();
  drawBattery();

  // Hide widgets
  for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
}

if (weather_curr != 'disabled'){
  setInterval(getWeather, 60 * 60 * 1.5 * 1000);
  // setInterval(getWeather, 5 * 1000);
}

Bangle.on("lcdPower", (on) => {
  if (on) {
    draw();
  } else {
    clearIntervals();
  }
});


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


