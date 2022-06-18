var crashSounds = [];
// choose random directories to assign to crashsounds so it's not all the same sound when someone crashes
const crashSoundDirectories = [
  "@os2022bgsxobj/sounds/crashes/crash1.raw",
  "@os2022bgsxobj/sounds/crashes/crash2.raw",
  "@os2022bgsxobj/sounds/crashes/crash3.raw",
  "@os2022bgsxobj/sounds/cheers/roar1.raw",
  "@os2022bgsxobj/sounds/cheers/roar2.raw"
];
const numOfCrashVariants = crashSoundDirectories.length;

addCrashSounds();

function addCrashSounds() {
  if (!stadium) {
    for (var i = 0; i < numOfBleachers; i++) {
      crashSounds.push([]);
      for (var j = 0; j < numOfCrashVariants; j++) {
        crashSounds[i][j] = mx.add_sound(crashSoundDirectories[j]);
        mx.set_sound_freq(crashSounds[i][j], 44100);
        mx.set_sound_pos(crashSounds[i][j], bleacherSoundPositions[i][0], bleacherSoundPositions[i][1], bleacherSoundPositions[i][2]);
      }
    }
    return;
  }

  for (var i = 0; i < numOfCrashVariants; i++) {
    crashSounds[i] = mx.add_sound(crashSoundDirectories[i]);
    mx.set_sound_freq(crashSounds[i], 44100);
  }
}

var setStartDelay = false;
var initializeRiderDown = false;
var riderDownCheckGates = [];
var timesRidersLastCrashed = [];
var startDelay = undefinedTime;
// this number is the top x people the crowd will react to going down
var maxNumRidersDown = 3;
const baseVolFactor = 2.75;

function intializeRiderDownStuff() {
    var r = globalRunningOrder;
    for (var i = 0; i < r.length; i++) {
        timesRidersLastCrashed[r[i].slot] = -1;
        riderDownCheckGates[r[i].slot] = 0;     
    }
    // change the number of riders to cheer for going down if somehow the number is greater than the running order length
    if (r.length < maxNumRidersDown) {
      maxNumRidersDown = r.length;
    }
}

/*
###############################
REWRITE FUNCTION TO WORK WITH ANY NUMBER OF PEOPLE -> DONE
###############################
*/

function isRiderDown() {
  
  var r = globalRunningOrder;
  if (!initializeRiderDown) {
    intializeRiderDownStuff();
    initializeRiderDown = true;
  }
  
  // wait 20 seconds after gate drop until checking for the top 3 riders going down
  if (gateDropped && !setStartDelay) {
    startDelay = gateDropTime + 20;
    setStartDelay = true;
  } 
		
  if (mx.seconds < startDelay) return;

  var seconds = mx.seconds;
  var slotsDownArr = [];
  var sumPositionsDown = 0;

  for (var i = 0; i < maxNumRidersDown; i++) {
    var slot = r[i].slot;
    var timingGate = r[i].position;
    if (mx.get_rider_down(slot) === 1 && timingGate != riderDownCheckGates[slot]) {

      // if rider is down and happened to roll into the next timing gate after their gate check
      if (timingGate === (riderDownCheckGates[slot] + 1) && seconds < (timesRidersLastCrashed[slot] + 4)) {
        riderDownCheckGates[slot] = timingGate;
        return;
      }

      timesRidersLastCrashed[slot] = seconds;
      // store the slot down, and position they're in.
      slotsDownArr[slotsDownArr.length] = [slot, i + 1];
      sumPositionsDown = i + 1;

      // go through again and see if someone's already down and accounted for
      for (var j = 0; j < maxNumRidersDown; j++) {
        if (i == j) continue;
        var slotTwo = r[j].slot;
        var timingGateTwo = r[j].position;
        if (mx.get_rider_down(slotTwo) === 1) {
          // If this is the first time the rider has been caught crashing as well, set their down check gate and time they crashed
          if (timingGateTwo != riderDownCheckGates[slotTwo]) {
            riderDownCheckGates[slotTwo] = timingGateTwo;
            timesRidersLastCrashed[slotTwo] = seconds;
          }
          // store the slot down, and position they're in.  Accumulate sum of positions down
          slotsDownArr[slotsDownArr.length] = [slotTwo, j + 1];
          sumPositionsDown += (j + 1);
        }
      }
      riderDownCheckGates[slot] = timingGate;
    }
  }

  
  const numRidersDown = slotsDownArr.length;
  if (numRidersDown < 1) return;

  var ridersDownTogether = 0;
  var numRidersDownAtSameTime = 0;

  // See how many riders are down at the same time, or same gate
  if (numRidersDown > 1) {
    for (var i = 0; i < numRidersDown; i++) {
      var tg = riderDownCheckGates[slotsDownArr[i][0]];
      
      for (var j = i + 1; j < numRidersDown; j++) {
        var tg2 = riderDownCheckGates[slotsDownArr[j][0]];
        
        /* Have to take the absolute value because the slots down doesn't take into account in which order the riders crashed, just that they crashed and the times
            it happened, and since the gaps can never be less than zero, we can take the absolute value which essentially flip flops the times 
            if someone crashed before the other person */
        if (Math.abs(timesRidersLastCrashed[slotsDownArr[i][0]] - timesRidersLastCrashed[slotsDownArr[j][0]]) <= 2) {
          numRidersDownAtSameTime++;
        }
  
        if (tg === tg2) {
          ridersDownTogether++;
        }
      }
    }
  }

  const avgPositionDown = sumPositionsDown / numRidersDown;
  // volume is determined by what positions are currently down, how many riders are down, how many are down together, how many crashed at the same time
  var volume = (baseVolFactor + ((numRidersDownAtSameTime + ridersDownTogether) / 2)) / (avgPositionDown / numRidersDown);

  playCrashSound(volume);
}

var maxCrashRepetitions = Math.ceil(numOfBleachers / numOfCrashVariants);
var crashVariantCounter = [];
function playCrashSound(multiplier) {
	var volume, randNumber;
	volume = multiplier;
  
	if (!stadium) {
    for (var i = 0; i < numOfCrashVariants; i++) {
      crashVariantCounter[i] = 0;
    }

	  for (var i = 0; i < numOfBleachers; i++) {
      do {
        randNumber = randomIntFromInterval(0, numOfCrashVariants - 1);
      }
      while (crashVariantCounter[randNumber] == maxCrashRepetitions);

      crashVariantCounter[randNumber]++;
	    mx.set_sound_vol(crashSounds[i][randNumber], volume);
	    mx.start_sound(crashSounds[i][randNumber]);
	  }
    return;
	}
		
  // if the sounds are in a stadium, then just play a random variant for all the riders
	randNumber = Math.floor((mx.seconds * 1234) % numOfCrashVariants);
	mx.set_sound_vol(crashSounds[randNumber], volume);
	mx.start_sound(crashSounds[randNumber]);
  
}

