var menuItems = {
  "":{title:"GPS POI Log"},
  " ":{value:"No Fix"},
  "Add Tree" : ()=>addItem("Tree"),
  "Add Gate" : ()=>addItem("Gate"),
  "Add Flower" : ()=>addItem("Flower"),
  "Add Plant" : ()=>addItem("Plant")
};

var menu = E.showMenu(menuItems);
var gps = { fix : 0};
var gpsCount = 0;
// Create the file in append mode
var file = require("Storage").open("gpspoilog.csv","a");

function setStatus(msg) {
  menuItems[" "].value = msg;
  menu.draw();
}

Bangle.on('GPS',function(g) {
  gps = g;
  gpsCount++;
  var msg;
  if (g.fix) {
    msg = g.satellites + " Satellites";
  } else {
    msg = "No Fix";
  }
  setStatus(" "+"-\\|/"[gpsCount&3]);
});


function addItem(name) {
  if (!gps.fix) {
    setStatus("Ignored - no fix");
    return; // don't do anything as no fix
  }
  // The fields we want to put in out CSV file
  var csv = [
    0|getTime(), // Time to the nearest second
    gps.lat,
    gps.lon,
    gps.alt,
    name
  ];
  // Write data here
  file.write(csv.join(",")+"\n");
  setStatus("Written");
}


Bangle.loadWidgets();
Bangle.drawWidgets();
Bangle.setGPSPower(1);

