/*
########################################
get, sort, and display laptimes function
########################################
*/
var bestPlayerLaptimes = [];
var allPlayerLaptimes = [];
var currentPlayerLaps = [];
var invalidLaptimes = [];
var invalidLapNumbers = [];
var gotRunningOrder = false;
var displayLeadLap = false;
var debugLaps = true;
var displayedInvalidLaps = false;

function displayLaptimes() {
	var r, slot, timingGate;

  r = globalRunningOrder;

	if (!gotRunningOrder && mx.seconds >= 0) {
		// sets an unchanging running order for storing unchanging element positions
		for (var i = 0; i < r.length; i++) {
			// best laps set to undefined time for every rider at the start of the session
			bestPlayerLaptimes[r[i].slot] = [undefinedTime, r[i].slot];
      allPlayerLaptimes[r[i].slot] = [undefinedTime];
      invalidLaptimes[r[i].slot] = [];
      invalidLapNumbers[r[i].slot] = [];
      currentPlayerLaps[r[i].slot] = 0;
		}
		// update screen on start
		if (!racingEvent) {
      updateScreen();
    }
      
		gotRunningOrder = true;
	}

	for (var i = 0; i < r.length; i++) {
	  // initialize rider names array
	  slot = r[i].slot;
	  timingGate = r[i].position;

    var lapNumber = mx.index_to_lap(timingGate);
    
    // If going back in a demo and lap number is less than the set lap number, reset their best lap
    if (lapNumber < currentPlayerLaps[slot]) {
      currentPlayerLaps[slot] = lapNumber;
      if (allPlayerLaptimes[slot].length == 1) {
        allPlayerLaptimes[slot] = [undefinedTime];
        bestPlayerLaptimes[slot][0] = undefinedTime;
        updateScreen();
        continue;
      }
      
      
      allPlayerLaptimes[slot].pop();
      var laps = allPlayerLaptimes[slot].slice();
      var prevBest = laps.sort(function(a, b) {return a - b;});
      var index = 0;
      var validLap = false;
      for (var i = 0; !validLap; i++) {
        if (i == allPlayerLaptimes[slot].length) {
          prevBest[0] = undefinedTime;
          index = 0;
          break;
        }

        var allPlayerLapIndex = allPlayerLaptimes[slot].indexOf(prevBest[i]);
        var invalidLapIndex = invalidLapNumbers[slot].indexOf(allPlayerLapIndex + 1);

        if (invalidLapIndex === -1) {
          validLap = true;
          index = i;
        }
      }

      if (prevBest[index] != bestPlayerLaptimes[slot][0]) {
        bestPlayerLaptimes[slot][0] = prevBest[index];
        updateScreen();
      }
    }

    // new lap
	  if (lapNumber > currentPlayerLaps[slot]) {

      if (timingGate == firstLapLength) {
        currentPlayerLaps[slot] = lapNumber;
        continue;
      }

      // For time trial catching
      if (r.length > allPlayerLaptimes.length) {
        for (i = allPlayerLaptimes.length - 1; i < r.length; i++) {
          bestPlayerLaptimes[i] = [undefinedTime, slot];
          allPlayerLaptimes[i] = [undefinedTime, false];
          invalidLaptimes[i] = [];
          invalidLapNumbers[i] = [];
        }
      }

      // client tabbed out during someone crossing the finish line catch up all previous laps then process the current lap
      var difference = lapNumber - currentPlayerLaps[slot] - 1;
      if (difference > 0) {
        catchUpLaps(slot, difference);
      }

      var laptime = getLaptime(slot, timingGate);
      
      currentPlayerLaps[slot] = lapNumber;
      //mx.message("currentPlayerLaps[" + mx.get_rider_name(slot) + "]: " + lapNumber.toString());
      laptimeProcessing(laptime, lapNumber, slot);
      
	  }

    // client tabbed out during and other players did laptimes when client was tabbed out
    var difference = lapNumber - currentPlayerLaps[slot];
    if (difference > 0) {
      catchUpLaps(slot, difference);
    }
  }

  // display invalid laps if everyone finished
  if (!racingEvent && everyRiderFinished && !displayedInvalidLaps) {
    displayInvalidLaptimes();
    displayedInvalidLaps = true;
  }
}

function displayInvalidLaptimes() {
  var printedHeader = false;
  var ridersWithInvalidLaps = 0;
  var output;
  for (var slot = 0; slot < invalidLaptimes.length; slot++) {
    // if we have undefined slot, continue
    if (invalidLaptimes[slot] == undefined) continue;

    // if we have an empty array, where the rider had no invalid laps, continue to next rider
    var riderInvalidLapsArrLen = invalidLaptimes[slot].length;
    if (riderInvalidLapsArrLen == 0) continue;

    
    invalidLaptimes[slot].sort(function(a, b){return a-b});
    var bestRiderLap = bestPlayerLaptimes[slot][0];

    // If their best invalid lap was slower than a lap that counted, continue to next rider
    if (invalidLaptimes[slot][0] > bestRiderLap) continue;
    
    // Increment the number of riders with invalid laps
    ridersWithInvalidLaps++;

    // Print the header of invalid laps if we have at least one person with an invalid laptime
    if (!printedHeader) {
      printHeader("\x1b[31m", "Invalid Laptimes:", 22, true);
      printedHeader = true;
    }
    var riderName = mx.get_rider_name(slot);

    // Add the first invalid lap to the output
    output = riderName + " - (\x1b[31m" + timeToString(invalidLaptimes[slot][0], true);

    // Add out any other invalid laps to the output
    for (var i = 1; i < riderInvalidLapsArrLen; i++) {
      // if we are at a lap that's 1.5 seconds slower than the faster than the slowest lap or it's slower than their best counted, exit loop
      if (invalidLaptimes[slot][i] > invalidLaptimes[slot][0] + 1.5 || invalidLaptimes[slot][i] > bestRiderLap) break;
      output += "\x1b[0m, \x1b[31m" + timeToString(invalidLaptimes[slot][i], true);
    }

    // Finish the output by closing parenthesis and send the message in chat
    output += "\x1b[0m)";
    mx.message(output);
  }

  if (ridersWithInvalidLaps > 0) mx.message("");

}

function isFastestLap(laptime) {

  var bestPlayerLapsSrtd = bestPlayerLaptimes.slice();
  bestPlayerLapsSrtd.sort(function (a, b){return a[0] - b[0];});
  var bestLap = bestPlayerLapsSrtd[0][0];
  if (bestLap == laptime) return true;

  return false;
}

// Calculates the lap time and returns an array with the laptime and a boolean that will determine if the lap was valid or not
function getLaptime(slot, currentGate) {
  var endGate = currentGate - 1;
  var startGate = endGate - normalLapLength;
  var isLapGood = true;
  // If the rider missed a timing gate between the lap, don't count it
  for (var i = startGate + 1; i < endGate; i++) {
    if (mx.get_timing(slot, i) < 0) {
      isLapGood = false;
      break;
    }
  }
  var startLapTime = mx.get_timing(slot, startGate);
  var finishLapTime = mx.get_timing(slot, endGate);
  return [finishLapTime - startLapTime, isLapGood];
}

// Catches up laptimes for when someone was either tabbed out or joined the server mid-session
function catchUpLaps(slot, difference) {

  for (var i = 0; i < difference; i++) {
    if (currentPlayerLaps[slot] == 0) continue;
    var startGate = mx.lap_to_index(i + currentPlayerLaps[slot]);
    var endGate = startGate + normalLapLength;
    
    var isLapGood = true;
    for (var j = startGate + 1; j < endGate; j++) {
      if (mx.get_timing(slot, j) < 0) {
        isLapGood = false;
        break;
      }
    }
    
    var startLapTime = mx.get_timing(slot, startGate);
    var finishLapTime = mx.get_timing(slot, endGate);
    var laptime = [finishLapTime - startLapTime, isLapGood];

    laptimeProcessing(laptime, (i + currentPlayerLaps[slot] + 1), slot);

  }

  currentPlayerLaps[slot] += difference;
}

function laptimeProcessing(laptime, lapNumber, slot) {

  // Lap 2 is the first lap that counts, so take the lap number and subtract 2 to get the index
  allPlayerLaptimes[slot][lapNumber - 2] = laptime[0];
  
  var newPB = false;
	// check to see if lap is faster
	if (bestPlayerLaptimes[slot][0] > laptime[0]) {
    newPB = true;
  }

  // If the rider missed a timing gate and it's there best, don't count the lap as a pb
  if (laptime[1] == false) {

    if (newPB) newPB = false;
    // If this rider has already had this invalid lap number and laptime added, return and don't add
    if (invalidLapNumbers[slot].indexOf(lapNumber - 1) > -1) return;
    // These two arrays have the same length
    invalidLaptimes[slot].push(laptime[0]);
    invalidLapNumbers[slot].push(lapNumber - 1);
  }

  if (newPB) {
    bestPlayerLaptimes[slot][0] = laptime[0];
  
    var riderName = mx.get_rider_name(slot); 
	  // update screen
	  if (!racingEvent) {
      updateScreen();
      // For time trial catching
      if (riderName == "") {
        riderName = "Ghost Rider";
      }
      // Display person ran best lap of the session
      if (isFastestLap(laptime[0])) {
        mx.message("\x1b[32m" + riderName + '\x1b[0m runs fastest lap of the session: \x1b[32m' + timeToString(laptime[0], true));
      }
    }
  }
}
