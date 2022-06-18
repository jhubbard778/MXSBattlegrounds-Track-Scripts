var doneBeginningWork = false;
function frameHandler(seconds) {
  globalRunningOrder = mx.get_running_order();
  if (!doneBeginningWork) {
    try {
        resetCurrentTimingGates();
    }
    catch (e) {
        mx.message("First Reset Timing Gates Error: " + e);
    }
    try {
        ResetSlotPositionHolder();
    }
    catch (e) {
        mx.message("First Reset Slot Positions Error: " + e);
    }
    try {
        setUpCheerBooSlots();
    }
    catch (e) {
        mx.message("Set up Cheer and Boo Slots Error: " + e);
    }
    doneBeginningWork = true;
  }

  try {
    updateCamPosition();
  }
  catch (e) {
    mx.message("Update Cam Position Error: " + e);
  }
  
  if (stadium) updateSoundPositions();
  try {
    gateSound();
  }
  catch (e) {
    mx.message("Gate Sound Error: " + e);
  }

  try {
    determineHoleshot();
  }
  catch (e) {
    mx.message("Holeshot Error: " + e);
  }
  
  try {
    updateRiderFinishFlags();
  }
  catch (e) {
    mx.message("Update Rider Finish Flags Error: " + e);
  }
  
  if (racingEvent) {
    try {
        isRiderDown();
    }
    catch (e) {
        mx.message("Rider Down Error: " + e);
    }

    try {
      dynamicMechanicAndFans();
    }
    catch (e) {
      mx.message("Mechanic And Fans Error: " + e);
    }
    try {
        battlesFunction();
    }
    catch (e) {
        mx.message("Battles Error: " + e);
    }
    
    try {
        updateRunningOrderScreen();
    }
    catch (e) {
        mx.message("Update Running Order Screen Error: " + e);
    }
    try {
        doPyro();
    }
    catch (e) {
        mx.message("Pyro Error: " + e);
    }
    
    try {
        riderAwards();
    }
    catch (e) {
        mx.message("Awards Error: " + e);
    }
  }
  try {
	  displayLaptimes();
  }
  catch (e) {
	mx.message("Laptimes Error: " + e);
  }
  try {
    moveBales();
  }
  catch (e) {
    mx.message("Move Bales Error: " + e);
  }
  try {
    timeOrLapsRemaining();
  }
  catch (e) {
    mx.message("Time Or Laps Remaining Error: " + e);
  }
  try {
    flaggersFrameHandler(seconds);
  }
  catch (e) {
    mx.message("Flaggers Error: " + e);
  }
  try {
    resetCurrentTimingGates();
  }
  catch (e) {
    mx.message("Reset Timing Gates Error: " + e);
  }
  frameHandlerPrev(seconds);
}

var frameHandlerPrev = mx.frame_handler;
mx.frame_handler = frameHandler;

