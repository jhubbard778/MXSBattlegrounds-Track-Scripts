function resetCurrentTimingGates() {
  var timingGate, slot;
  for (var i = 0; i < globalRunningOrder.length; i++) {
    slot = globalRunningOrder[i].slot;
    timingGate = globalRunningOrder[i].position;
    if (timingGate != currentTimingGates[slot]){
      // for demos going back in time, reset their down check gate
      if (timingGate < currentTimingGates[slot]) {
        currentTimingGates[slot] = timingGate;
        riderDownCheckGates[slot] = 0;
        soundDelay = 0;
      }
      currentTimingGates[slot] = timingGate;
    }
  }
}

function checkPosChange(slot, position) {
  if (slotPositionHolder[position] != slot) {
    ResetSlotPositionHolder(); 
    return true;
  }
  return false;
}

function ResetSlotPositionHolder() {
  for (var i = 0; i < globalRunningOrder.length; i++) {
    slotPositionHolder[i] = globalRunningOrder[i].slot;
  }
}

function checkTopFivePositionChange() {
  var change = false;
  var ppl = 5;
  if (globalRunningOrder.length < ppl) {
    ppl = globalRunningOrder.length;
  }
  for (var i = 0; i < ppl; i++) {
    var slot = globalRunningOrder[i].slot;
    var gate = globalRunningOrder[i].position;
    if (checkPosChange(slot, i) || (gate <= 1 && gate != currentTimingGates[slot])) {
      change = true;
      break;
    }
  }
  return change;
}

function setUpCheerBooSlots() {
  if (!racingEvent) return;

  for (var i = 0; i < globalRunningOrder.length; i++) {
    var slot = globalRunningOrder[i].slot;
    var riderName = mx.get_rider_name(slot).toLowerCase();
    for (var j = 0; j < booRiderNames.length; j++) {
      if (riderName.includes(booRiderNames[j])) {
        slotsToBoo[slotsToBoo.length] = slot;
        break;
      }
    }
    for (var j = 0; j < cheerRiderNames.length; j++) {
      if (riderName.includes(cheerRiderNames[j])) {
        slotsToCheer[slotsToCheer.length] = slot;
        break;
      }
    }
  }
}

function seed(s) {
  var mask = 0xffffffff;
  var m_w  = (123456789 + s) & mask;
  var m_z  = (987654321 - s) & mask;

  return function() {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  }
}

// Updates Cam Position
function updateCamPosition() {
  // gets and stores the camera location into the p and r array variables
  mx.get_camera_location(p, r);
}

function updateSoundPositions() {
  mx.set_sound_pos(crowdConstants, p[0], p[1], p[2]);
    
  // Sets each sound at the camera postition and will be called to play later
  for (var i = 0; i < numOfCrashVariants; i++) {
    mx.set_sound_pos(crashSounds[i], p[0], p[1], p[2]);
  }
  for (var i = 0; i < crowdRoars.length; i++) {
    mx.set_sound_pos(crowdRoars[i], p[0], p[1], p[2]);
  }
  for (var i = 0; i < numOfCheerVariants; i++) {
      mx.set_sound_pos(allCheerSounds[i], p[0], p[1], p[2]);
  }
  for (var i = 0; i < numOfBooVariants; i++) {
    mx.set_sound_pos(allBooSounds[i], p[0], p[1], p[2]);
  }
}

function determineMainEvent() {
  var time = globalFinishTime / 60;
  var laps = globalFinishLaps;
  if ((time == 15 || time == 20) && laps == 1) {
    mainEvent = true;
    racingEvent = true;
  }
  else if ((time == 6 || time == 5) && laps == 1) {
    racingEvent = true;
  }
}

// min and max included 
function randomIntFromInterval(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}

