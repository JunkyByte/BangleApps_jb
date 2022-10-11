require("Font8x12").add(Graphics);

function swap(delay) {
  g.clear()
  g.drawString('Restarting BT!', 30, 30)
  NRF.sleep();

  setTimeout(() => {
    NRF.wake();
    g.clear()
    g.setFont("8x12");
    g.drawString('Done!', 30, 30)
    g.drawString('Button to restart BT', 30, 50)
  }, delay)

}

swap(30);
setWatch(function() {swap(750)}, BTN1, {repeat:true, edge:"rising"});
