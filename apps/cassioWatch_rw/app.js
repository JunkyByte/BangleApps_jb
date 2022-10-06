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

function getBackgroundImage() {
  return require("heatshrink").decompress(atob("2Gw4cA///A4IDB8EnoEA4EKkEAsEVkmSpIC/AQklilRogFBosUBYOUqNFiQLCAoILCINcpAYNIAoIJBAIOkAwMipQLBCoWJINgDDiVKIIUlB4dSomUAoWRINZ0CHwJ6C0mJlMipMo0QICxUk0WSINiABpL+BPQOkyLOBqIIFkiGBQdwFDXgOJYoaMEA4KDwAoL+CyJBDkiDJosUpMlilRBYKYCqNJBYIOBqIOByImCF4NSDQQCCQZcpkQJDBwQIBQZeJlAFC0QmDBANKAoNLCIQvCAQYUBDQaDIilSAQIMFNwKDEAoKGBQYwIB0gFBUgJlComSR4OSC4VSAQSVBQZdJAYcSOgWSlIICQYTCBCIJBDPQiJGAQiACQY4aGIJRrCLIRBDQYJBHOgIgFqIIFR4IyJByIC/AX4C/AX4C/AQOQgAAlhIWViRBBwBB9gFJkBAmILAXXFPZB/IP5BikhB/gJB/AoJB/gVJIP8SpMgIP2SIP8EIIJA5IIkkIP8BIINIIPsJQYUkyBB7HwJBCySD/IPoABiRBBwBB9QYRA4II8gIPsEIIJA5II1IIP+SoBB+kmQIHRBFwBB/khA7IIgA9IP5B/IP5B/IP5BikmSpIC/AX9Jbn4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/ACESpADBpMgIHUEyVJIgNJkhB6khBBAQeAIP8kyBA4gJB/IIdBIP+SoBB/yUAkmAIPY+ByUIgmAhJEBIPIABIIMCH3YAByVJgESpMgIPY+BAQYA7gSAByVIY3tJkmSoBB9hJBBIHsAgJB/AAMkyBB/ghA/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4AVkmSpIC/AX9JTCkEwAVTiTaqIP5B/IIsBcAJB/kECoBB/gVIIP8AIP5B/IP5BEgRBVkmQINNAIKcJkmSFyJrBiBBSFKRBDpJBVCiBBBTKZBFYqOSKwTyPILECINUEFKJBCiQsBLigAQILCDCFqKDWCgJBTwApCoAXPyFJNwJBTF4RBQTAcSFh5BBhIvBIM4sBWYRBQYqsBkESVqBTEghBoCgJBVFiLFCgDFShMggRBoQaolPIJRZQINrdCDSYAQYrJBByBBmgJBWpEkTyhBUeohBQpI/kIIcAkhB/IILvRKaJBcghB/IP5BrgMgIP8JkhBWACRBUgVJkhrRINmSIIIC/AX4Cgk227d+iRB8nu7kvt4Q+5w3btvv8VJmO7tu2Im89YQNsycuZAVvQ3NNuma7+E2w+5PgVw43b8nXYoPbIOtrHIVw6xBBAQNt25B1pzFD93b0n3tuypjI2m//7d8zt8k027d+4RB2zrFBtwFBmIFBt5B3knJkmd/FM1vZkmEH2oCEne2/aGCH3ACCk9e7fwIPoCjA"));
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
  bigThenSmall(E.getBattery(), "%", 135, 21);
}

function getTemperature(){
  try {
    var weatherJson = storage.readJSON('weather.json');
    var weather = weatherJson.weather;
    return Math.round(weather.temp-273.15);

  } catch(ex) {
    print(ex)
    return "?"
  }
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
  // g.drawString(getTemperature(), 155, 132);
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

