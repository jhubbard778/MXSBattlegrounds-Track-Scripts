/*
################################################
dynamic crowd for position changes/battles
################################################
*/
// this number is the number of people that the crowd
// will cheer if there is a battle, in this case they will cheer if there is a battle
// within the top 3
var numOfPeopleToCheer = 3;
const timingGateToStartBattles = 14;
var startedBattleFunction = false;

// Index 0 is gap between 1st and 2nd, Index 1 is gap between 2nd and 3rd, etc.
var gapsBetweenRidersArr = [];
var resetCrowdDefaultVol = true;
const maxGapBetweenRiders = 2;
const maxCrowdVol = (((4 * numOfPeopleToCheer) + numOfBleachers)) + (2 * crowdConstantBaseVol);
var currentVolume = 0;
const volFadeTime = 2;
const volResetFadeTime = 5;
var gotTimeStartReset = false;
var timeStartedIncreaseOrDecrease;
var currentCrowdVol = crowdConstantBaseVol;
var setHolder = false;
var setResetHolder = false;
var volHolder;
var resetHolder;
var volDivisor = 1;
function battlesFunction() {

  var r = globalRunningOrder;
  var seconds = mx.seconds;
  var battleBetweenRiders = false;
  var i, currentRiderTimingGate, currentRiderSlot;
  if (r[0].position == timingGateToStartBattles + 1 && !startedBattleFunction) {
    ResetSlotPositionHolder();
    numOfPeopleToCheer++;
    if (r.length < numOfPeopleToCheer) {
      numOfPeopleToCheer = globalRunningOrder.length;
    }

    if (!mainEvent) {
      volDivisor = 2;
    }
    startedBattleFunction = true;
  }

  if (r[0].position < timingGateToStartBattles + 1 && startedBattleFunction) {
    startedBattleFunction = false;
    gotTimeStartReset = false;
    setResetHolder = false;
    resetCrowdVolume();
  }

  if (startedBattleFunction) {
    // checks for a position change
    for (var i = 0; i < numOfPeopleToCheer - 1; i++) {
      currentRiderSlot = r[i].slot;
      currentRiderTimingGate = r[i].position;
      if (currentRiderTimingGate != currentTimingGates[currentRiderSlot]) {
        // if there was a position change, crowd cheers
        if (checkPosChange(currentRiderSlot, i)) {
          var volFactor;

          if (mx.get_rider_down(r[i + 1].slot) == 1) {
            volFactor = (i + 1) * 2;
          } else {
            volFactor = i + 1;
          }
          
          var volume = ((2 / (volFactor)) / volDivisor);
          startRoar(volume);
        }
      }
    }
    // Get gaps between riders and store in gapsBetweenRidersArr array
    for (i = numOfPeopleToCheer - 1; i > 0; i--) {
      currentRiderSlot = r[i].slot;
      currentRiderTimingGate = r[i].position - 1;
      if (currentRiderTimingGate + 1 != currentTimingGates[currentRiderSlot]) {
        var nextRiderSlot = r[i-1].slot;
        // time the rider ahead hit the gate that the rider is currently at
        var timeRiderAheadGate = mx.get_timing(nextRiderSlot, currentRiderTimingGate);

        // if a rider missed a gate, skip iteration
        if (timeRiderAheadGate < 0) continue;

        // current rider hits current gate at current time, therefore
        gapsBetweenRidersArr[i-1] = seconds - timeRiderAheadGate;
      }
    }
    // Get lowest gap
    // if priority battle is 0, there's a battle between 1st and 2nd, if 1, 2nd and 3rd, etc.
    if (gapsBetweenRidersArr.length > 0) {
      var priorityBattle = 0;
      var lowestGap = gapsBetweenRidersArr[0];
      var numOfBattles = 0;

      if (gapsBetweenRidersArr.length > 1) {
        for (var i = 1; i < gapsBetweenRidersArr.length; i++) {
          if (gapsBetweenRidersArr[i] < lowestGap){
            lowestGap = gapsBetweenRidersArr[i];
            priorityBattle = i;
          }
          if (gapsBetweenRidersArr.length > priorityBattle + 2) {
            // number of battles for the same pos
            if (gapsBetweenRidersArr[priorityBattle + 2] - gapsBetweenRidersArr[priorityBattle] <= maxGapBetweenRiders)
              numOfBattles++;
          }
        }
      }
      if (lowestGap <= maxGapBetweenRiders) battleBetweenRiders = true;

      // if someone in the priority battle goes down, check for other battles then set the priority battle and lowest gap
      if (mx.get_rider_down(r[priorityBattle + 1].slot) == 1 || mx.get_rider_down(r[priorityBattle].slot) == 1) {
        if (gapsBetweenRidersArr.length > 1) {
          var secondLowestGap = undefinedTime;
          for (var i = 0; i < gapsBetweenRidersArr.length; i++) {
            if (i == priorityBattle) continue;
            if (gapsBetweenRidersArr[i] < secondLowestGap) {
              secondLowestGap = gapsBetweenRidersArr[i];
              lowestGap = secondLowestGap;
              priorityBattle = i;
            }
          }
          // no other battles
          if (lowestGap > maxGapBetweenRiders) {
            battleBetweenRiders = false;
          }
        }
        // no other battles
        else battleBetweenRiders = false;
      }
    }
    // If there's a battle, set the volume of the crowd constant based on the gap and position
    if (battleBetweenRiders) {
      setCrowdVolume(numOfBattles, lowestGap, priorityBattle);
    }
    else if (!resetCrowdDefaultVol) {
      resetCrowdVolume();
    }
  }
}

function setCrowdVolume(numOfBattles, lowestGap, priorityBattle) {
  var volume = (((((3 * numOfBattles) + numOfBleachers) / ((lowestGap + 0.9) * (priorityBattle + 1))) + (1.5 * crowdConstantBaseVol)) / volDivisor);
  var seconds = mx.seconds;
  // If crowd has already reached desired calculated volume, return
  if (currentCrowdVol == volume) return;

  if (currentCrowdVol < crowdConstantBaseVol) {
    currentCrowdVol = crowdConstantBaseVol;
  }

  // If volume is new, need to fade to new volume, get the time starting the increase/decrease
  if (volume != currentVolume) {
    timeStartedIncreaseOrDecrease = seconds;
    setHolder = false;
  }
  // volume holder
  currentVolume = volume;

  // Another holder that holds the current crowd volume at the start of the fade
  if (!setHolder) {
    volHolder = currentCrowdVol;
    setHolder = true;
    // sets reset values to false because this means that there is a battle fade going on
    gotTimeStartReset = false;
    setResetHolder = false;
    resetCrowdDefaultVol = false;
  }

  // vol/sec calculated by (end vol - start vol) / fade time
  var volPerSec = (currentVolume - volHolder) / volFadeTime;
  // t is time in seconds since the start of the fade
  var t = seconds - timeStartedIncreaseOrDecrease;
  // current crowd volume is the start vol + (vol/sec * time since start of fade)
  // If there's an increase, vol/sec * t will be positive.  If there's a decrease, vol/sec * t will be negative. 
  currentCrowdVol = volHolder + (volPerSec * t);

  for (var i = 0; i < numOfBleachers; i++) {
    mx.set_sound_vol(crowdConstants[i], currentCrowdVol);
  }
}

function resetCrowdVolume() {
  var seconds = mx.seconds;
  if (!gotTimeStartReset) {
    timeStartedIncreaseOrDecrease = seconds;
    gotTimeStartReset = true;
  }
  // sets the start fade vol to the current crowd volume
  if (!setResetHolder) {
    resetHolder = currentCrowdVol;
    setResetHolder = true;
  }

  // vol/sec, t, and current crowd vol calculated just like above when battle fades happen
  var volPerSec = (crowdConstantBaseVol - resetHolder) / volResetFadeTime;
  var t = seconds - timeStartedIncreaseOrDecrease;
  currentCrowdVol = resetHolder + (volPerSec * t);

  // if in the demo and crowd volume somehow exceeds the max crowd vol or is less than the base, reset to the base vol
  if (currentCrowdVol > maxCrowdVol || currentCrowdVol < crowdConstantBaseVol) {
    currentCrowdVol = crowdConstantBaseVol;
  }

  // set all crowd constant sounds to the current crowd volume calculated 
  for (var i = 0; i < numOfBleachers; i++) {
    mx.set_sound_vol(crowdConstants[i], currentCrowdVol);
  }

  // if crowd volume equals the base volume, the volume has been reset
  if (currentCrowdVol <= crowdConstantBaseVol) {
    // set the crowd volume to the base just in case of skipping for demos
    for (var i = 0; i < numOfBleachers; i++) {
      mx.set_sound_vol(crowdConstants[i], crowdConstantBaseVol);
    }
    resetCrowdDefaultVol = true;
  }
}

function startRoar(volume) {
  var randomNum = randomIntFromInterval(0, numOfCheerVariants - 1);;
  if (!stadium) {
    for (var i = 0; i < numOfBleachers; i++) {
      mx.set_sound_vol(allCheerSounds[randomNum][i], volume);
      mx.start_sound(allCheerSounds[randomNum][i]);
    }
    return;
  }

  mx.set_sound_vol(allCheerSounds[randomNum], volume);
  mx.start_sound(allCheerSounds[randomNum]);
}