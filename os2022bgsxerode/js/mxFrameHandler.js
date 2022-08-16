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
    doPyro();
    riderAwards();
    updateScreen();
  }

	displayLaptimes();
  moveBales();
  flaggersFrameHandler(seconds);
  resetCurrentTimingGates();
  frameHandlerPrev(seconds);
}

var frameHandlerPrev = mx.frame_handler;
mx.frame_handler = frameHandler;

