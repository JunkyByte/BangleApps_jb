function swap() {
  NRF.sleep();

  setTimeout(() => {
    NRF.wake();
  }, 500)

  g.clear()
  g.setFont("8x12");
  g.drawString('Bluetooth state:', 30, 30)
}

setWatch(swap, BTN1, {repeat:true, edge:"rising"});
