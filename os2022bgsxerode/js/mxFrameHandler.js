var doneBeginningWork = false;
function frameHandler(seconds) {
  globalRunningOrder = mx.get_running_order();

  if (!doneBeginningWork) {
    resetCurrentTimingGates();
    ResetSlotPositionHolder();
    setUpCheerBooSlots();
    doneBeginningWork = true;
  }

  updateCamPosition();
  if (stadium) updateSoundPositions();

  gateSound();
  determineHoleshot();
  updateRiderFinishFlags();
  
  if (racingEvent) {
    isRiderDown();
    dynamicMechanicAndFans();
    battlesFunction();
    updateRunningOrderScreen();
    doPyro();
    riderAwards();
  }

	displayLaptimes();
  moveBales();
  timeOrLapsRemaining();
  flaggersFrameHandler(seconds);
  resetCurrentTimingGates();
  frameHandlerPrev(seconds);
}

var frameHandlerPrev = mx.frame_handler;
mx.frame_handler = frameHandler;

