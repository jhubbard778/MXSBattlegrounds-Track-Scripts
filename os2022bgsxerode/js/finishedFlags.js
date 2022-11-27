var everyRiderFinished = false;
const timeToGiveUp = 30;
// flags to hold whether a person has finished the race or not
var ridersFinishedArr = [];
var timesUntilGiveUpArr = [];
var setUpRiderFinishFlags = false;
var setSecondsAtFirstFinish = false;

function updateRiderFinishFlags() {
  var r = globalRunningOrder;
  var timingGate, slot, riderLapsRemain;

  // stores rider start / finish positions
  for (var i = 0; i < r.length; i++) {
    slot = r[i].slot;
    timingGate = r[i].position;

    if (!setUpRiderFinishFlags) {
      // Set all active slots to unfinished
      ridersFinishedArr[slot] = false;
      if (i == r.length - 1) {
        setUpRiderFinishFlags = true;
      }
    }
    
    // stores rider positions after lap 1
    if (timingGate == firstLapLength && timingGate != currentTimingGates[slot]) {
      riderPositionsAfterL1[slot] = (i + 1);
    } 
      

    // if time has expired
    if (mx.seconds >= gateDropTime + globalFinishTime || globalFinishTime == 0) {
      
      // get laps that remain
      if (globalFinishTime == 0 && globalFinishLaps == 0) {
        // Finish line is now first timing gate
        riderLapsRemain = 1 - globalRunningOrder[0].position;
      }
      else if (globalFinishTime == 0) {
        riderLapsRemain = globalFinishLaps - mx.index_to_lap(globalRunningOrder[0].position);
      }
      else {
        riderLapsRemain = lapsRemaining();
      }
        

      // if first has finished
      if (riderLapsRemain == 0) {

        // set up all times players have to hit the next timing gate except first
        if (!setSecondsAtFirstFinish) {
          for (var j = 0; j < ridersFinishedArr.length; j++) {
            if (j == r[0].slot) continue;
            timesUntilGiveUpArr[j] = mx.seconds + timeToGiveUp;
          }
          setSecondsAtFirstFinish = true;
        }

        if (timingGate != currentTimingGates[slot]) {
          // if rider hit the finish timing gate, set the position they finished and a flag that they have finished
          if ((timingGate - firstLapLength) % normalLapLength == 0 || globalFinishLaps == 0) {
            riderFinishPositions[slot] = (i + 1);
            ridersFinishedArr[slot] = true;
          }

          // if they haven't finished, but hit a new timing gate reset their time to give up
          else if (!ridersFinishedArr[slot]) {
            timesUntilGiveUpArr[slot] = mx.seconds + timeToGiveUp;
          }

          // if they have hit a new timing gate and have finished it means we've incorrectly assumed they've given up, so reset
          else if (ridersFinishedArr[slot]) {
            ridersFinishedArr[slot] = false;
            timesUntilGiveUpArr[slot] = mx.seconds + timeToGiveUp;
            if (everyRiderFinished && displayedAwards) {
              everyRiderFinished = false;
              displayedAwards = false;
            }
          }
        }

        // if current in game time is greater than the riders time to give up, set flag that they have finished
        else if (mx.seconds > timesUntilGiveUpArr[slot] && ridersFinishedArr[slot] == 0) {
          riderFinishPositions[slot] = (i + 1);
          ridersFinishedArr[slot] = true;
        }
      }
      // if first is the only rider and they haven't finished (going back in demos)
      else if (everyRiderFinished) {
        displayedAwards = false;
        ridersFinishedArr[r[0].slot] = false;
        everyRiderFinished = false;
        setSecondsAtFirstFinish = false;
      }
    }
  }
  if (!everyRiderFinished) {
    everyRiderFinished = true;
    for (var i = 0; i < r.length; i++) {
      slot = r[i].slot;
      if (ridersFinishedArr[slot] == false) {
        everyRiderFinished = false;
        break;
      }
    }
  }
}

