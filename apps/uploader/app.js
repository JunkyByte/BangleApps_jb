require("Font8x12").add(Graphics);

function swap() {
  g.clear();
  g.drawString('Restarting BT!', 30, 30);
  NRF.sleep();
  
  setTimeout(() => {
    NRF.wake();
  }, 30);
  
  setTimeout(() => {
    g.clear();
    g.drawString('Done!', 30, 30);
    g.drawString('Button to restart BT', 30, 50);
  }, 750);
}

g.setFont("8x12");
setTimeout(swap, 300)
setWatch(swap, BTN1, {repeat:true, edge:"rising"});
