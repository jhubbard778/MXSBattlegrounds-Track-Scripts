var displayedAwards = false;
var mostConsistentRider;
function riderAwards() {
  // If it's not a main event, don't display awards
  if (!mainEvent) return;
  
  if (everyRiderFinished && !displayedAwards) {
    calculatePositionsGained();
    try {
      mostConsistentRider = getRiderConsistency();
    } catch (e) {
      mx.message("consistency calculation error: " + e);
    }
  
    var msg;
    var extraSpace = false;
    
    // Initial Header
    printHeader("\x1b[33m", "Awards:", 11, extraSpace);
    mx.message("Note: Hard Charger / Anchor do not account for cuts.");
    mx.message("");
    msg = "Nobody";
    extraSpace = true;
    
    try {
      // Holeshot
      printHeader("\x1b[36m", "Holeshot Award:", 21, extraSpace);
      
      var riderName = mx.get_rider_name(holeshotRiderSlot);
      if (riderName) msg = riderName.toString();
      mx.message(msg);
      mx.message("");
    } catch (e) {
      mx.message("holeshot error");
    }
    
    msg = "Nobody";
      // Hard Charger Award
      printHeader("\x1b[32m", "Hard Charger Award:", 27, extraSpace)

    var positionsGained = 0;
    if (riderPositionsGained[0]){
      positionsGained = riderPositionsGained[0][0];
      riderName = mx.get_rider_name(riderPositionsGained[0][1]);
      if (positionsGained != 0) {
        msg = "\x1b[32m+" + positionsGained.toString() + ' Positions\x1b[0m - ' + riderName.toString();
      } 
    }

    mx.message(msg);
    mx.message("");
    msg = "Nobody";

    // Anchor Award
    printHeader("\x1b[31m", "Anchor Award:", 19, extraSpace);

    if (riderPositionsGained[riderPositionsGained.length - 1][0] != riderPositionsGained[0][0]) {
      positionsGained = riderPositionsGained[riderPositionsGained.length - 1][0];
      riderName = mx.get_rider_name(riderPositionsGained[riderPositionsGained.length - 1][1]);
      if (positionsGained != 0) {
        msg = "\x1b[31m" + positionsGained.toString() + ' Positions\x1b[0m - ' + riderName.toString();
      } 
    }
    
    mx.message(msg);
    mx.message("");
    msg = "Nobody";

    // On the Clock Award
    printHeader("\x1b[34m", "On The Clock Award:", 26, extraSpace);
    
    var fastestRider = getFastestLap();
    if (fastestRider[0] != undefinedTime) {
      riderName = mx.get_rider_name(fastestRider[1]);
      msg = "\x1b[34m" + timeToString(fastestRider[0], true) + '\x1b[0m - ' + riderName.toString();
    }
   
    mx.message(msg);
    mx.message("");
    msg = "Nobody";

    try {
      // Consistency Award
      printHeader("\x1b[35m", "Consistency Award:", 25, extraSpace);
      if (mostConsistentRider) {
        var stdDeviation = mostConsistentRider[0].toFixed(3);
        riderName = mx.get_rider_name(mostConsistentRider[1]);
        msg = "\x1b[35mStd. Dev: " + stdDeviation.toString() + "\x1b[0m - " + riderName.toString();
      }
      mx.message(msg);
    } catch (e) {
      mx.message("consistency error: " + e);
    }
    displayedAwards = true;
  }
}

function printHeader(color, header, dashLength, space) {
  var dashes = "";
  for (var i = 0; i < dashLength; i++) {
    dashes += "-";
  }
  mx.message(color + dashes);
  mx.message(color + header);
  mx.message(color + dashes);
  if (space) mx.message("");
}

// zero indexed, 0 is 1st, 1 is 2nd, etc.
var riderPositionsAfterL1 = [];
var riderFinishPositions = [];
var riderPositionsGained;

// calculate stats
function calculatePositionsGained () {
  if (riderPositionsAfterL1.length != riderFinishPositions.length) {
    mx.message("Error with array lengths of rider positions!");
    return;
  };

  var numNullArrs = 0;
  // reset the rider positions gained
  riderPositionsGained = [];
  for (var i = 0; i < riderPositionsAfterL1.length; i++) {
    if (riderPositionsAfterL1[i] && riderFinishPositions[i]) {
      riderPositionsGained.push([]);
      // first store the number of positions gained
      riderPositionsGained[i - numNullArrs][0] = riderPositionsAfterL1[i][0] - riderFinishPositions[i][0];
      // then their slot number associated
      riderPositionsGained[i - numNullArrs][1] = riderPositionsAfterL1[i][1];
    } else {
      numNullArrs++;
    }
  }

  // sort in descending order by largest num of positions gained.
  riderPositionsGained.sort(function (a, b) {
    if (a[0] < b[0]) {
      return 1;
    }

    if (a[0] == b[0]) {
      // If the two riders gained or lost the same number of positions but the finish position of A rider was worse then B rider, then A rider gained 'less' positions
      if (riderFinishPositions[a[1]] > riderFinishPositions[b[1]]) {
        return 1;
      }
    }
    return -1;
  });
}

function getFastestLap() {
  // copy bestPlayerLaptimes into temp array
  var bestPlayerLapsSrtd = bestPlayerLaptimes.slice();
  // srt array and return
  bestPlayerLapsSrtd.sort(function (a, b){return a[0] - b[0];});
  return bestPlayerLapsSrtd[0];
}

function getRiderConsistency() {
  // TODO: calculate the std deviation for each rider
  var avgLaps = [];
  var stdDeviations = [];

  // get the player slots
  var playerSlots = [];
  for (var i = 0; i < globalRunningOrder.length; i++) {
    playerSlots.push(globalRunningOrder[i].slot);
  }

  // go through player slots
  for (var i = 0; i < playerSlots.length; i++) {
    var slot = playerSlots[i];
    var sum = 0;
    avgLaps[slot] = undefined;
    stdDeviations[slot] = undefined;
    
    var lapsCounted = 0;
    if (allPlayerLaptimes[slot].length > 0) {      
      var playersInvalidLaps = invalidLaptimes[slot];  
      // calculate average laptime for each player
      for (var j = 0; j < allPlayerLaptimes[slot].length; j++) {
        // if the laptime is valid
        var index = playersInvalidLaps.indexOf(allPlayerLaptimes[slot][j]);
        if (index === -1) {
          sum += allPlayerLaptimes[slot][j];
          lapsCounted++;
        }
      }
      avgLaps[slot] = sum / lapsCounted;

      // std deviation = sqrt((lap - avglap)^2 for all laps / num of laps)
      sum = 0;
      for (var j = 0; j < allPlayerLaptimes[slot].length; j++) {
        // if the laptime is invalid
        var index = playersInvalidLaps.indexOf(allPlayerLaptimes[slot][j]);
        if (index !== -1) {
          // remove from the player invalid laps
          playersInvalidLaps.splice(index, 1);
          continue;
        }
        sum += Math.pow(allPlayerLaptimes[slot][j] - avgLaps[slot], 2);
      }

      var variance = sum / lapsCounted;
      var deviation = Math.sqrt(variance);
      if (deviation > 0) {
        stdDeviations[slot] = [deviation, slot];
      }
    }
  }

  // sort by array by each rider's standard deviation
  stdDeviations.sort(function (a, b){return a[0] - b[0];})
  
  // filter out undefined.
  for (var i = 0; i < playerSlots.length; i++) {
    var slot = playerSlots[i];
    if (!stdDeviations[slot]) {
      stdDeviations.splice(slot,1);
    }
  }

  if (stdDeviations.length > 0) {
    // returns an array with the consistency and slot associated
    return stdDeviations[0];
  }
  
  return undefined
}

