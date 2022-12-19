var displayedAwards = false;
var mostConsistentRider;
function riderAwards() {
  // If it's not a main event, don't display awards
  if (!mainEvent) return;

  if (everyRiderFinished && !displayedAwards) {
    displayedAwards = true;
    calculatePositionsGained();
    mostConsistentRider = getRiderConsistency();

    var msg;
    var extraSpace = false;
    
    // Initial Header
    printHeader("\x1b[33m", "Awards:", 11, extraSpace);
    mx.message("Note: Hard Charger / Anchor do not account for cuts.");
    mx.message("");
    msg = "Nobody";
    extraSpace = true;
    
    // Holeshot
    printHeader("\x1b[36m", "Holeshot Award:", 21, extraSpace);

    var riderName = mx.get_rider_name(holeshotRiderSlot);
    if (riderName) msg = riderName.toString();
    
    mx.message(msg);
    mx.message("");
    msg = "Nobody";

    // Hard Charger Award
    printHeader("\x1b[32m", "Hard Charger Award:", 27, extraSpace)

    var positionsGained = 0;
    if (riderPositionsGained[0]){
      positionsGained = riderPositionsGained[0][0];
      riderName = mx.get_rider_name(riderPositionsGained[0][1]);
      if (positionsGained != 0) msg = "\x1b[32m+" + positionsGained.toString() + ' Positions\x1b[0m - ' + riderName.toString();
    }
    
    mx.message(msg);
    mx.message("");
    msg = "Nobody";

    // Anchor Award
    printHeader("\x1b[31m", "Anchor Award:", 19, extraSpace);

    if (riderPositionsGained[riderPositionsGained.length - 1][0] != riderPositionsGained[0][0]) {
      positionsGained = riderPositionsGained[riderPositionsGained.length - 1][0];
      riderName = mx.get_rider_name(riderPositionsGained[riderPositionsGained.length - 1][1]);
      if (positionsGained != 0) msg = "\x1b[31m" + positionsGained.toString() + ' Positions\x1b[0m - ' + riderName.toString();
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

    // Consistency Award
    printHeader("\x1b[35m", "Consistency Award:", 25, extraSpace);

    var stdDeviation = mostConsistentRider[0].toFixed(3);
    riderName = mx.get_rider_name(mostConsistentRider[1]);
    if (mostConsistentRider) msg = "\x1b[35mStd. Dev: " + stdDeviation.toString() + "\x1b[0m - " + riderName.toString();
    mx.message(msg);
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
  var r = globalRunningOrder;
  var numNullArrs = 0;
  // reset the rider positions gained
  riderPositionsGained = [];
  for (var i = 0; i < r.length; i++) {
    var slot = r[i].slot;
    if (riderPositionsAfterL1[slot] && riderFinishPositions[slot]) {
      riderPositionsGained.push([]);
      // first store the number of positions gained
      riderPositionsGained[i - numNullArrs][0] = riderPositionsAfterL1[slot] - riderFinishPositions[slot];
      // then their slot number associated
      riderPositionsGained[i - numNullArrs][1] = slot;
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
  var avgLaps = [];
  var stdDeviations = [];
  var r = globalRunningOrder;

  // go through player slots
  for (var i = 0; i < r.length; i++) {
    var slot = r[i].slot;
    var sum = 0;
    avgLaps[slot] = undefined;
    stdDeviations[slot] = undefined;
    
    if (allPlayerLaptimes[slot].length > 0) {
      const numLaps = allPlayerLaptimes[slot].length;
      // calculate average laptime for each player
      for (var j = 0; j < numLaps; j++) {
        // if the laptime is valid
        sum += allPlayerLaptimes[slot][j];
      }
      avgLaps[slot] = sum / numLaps;

      // std deviation = sqrt((lap - avglap)^2 for all laps / num of laps)
      sum = 0;
      for (var j = 0; j < numLaps; j++) {
        sum += Math.pow(allPlayerLaptimes[slot][j] - avgLaps[slot], 2);
      }

      var variance = sum / numLaps;
      var deviation = Math.sqrt(variance);
      if (deviation > 0) {
        stdDeviations[slot] = [deviation, slot];
      }
    }
  }

  // filter out undefined.
  for (var i = 0; i < r.length; i++) {
    var slot = r[i].slot;
    if (!stdDeviations[slot]) {
      stdDeviations.splice(slot,1);
    }
  }

  // sort by array by each rider's standard deviation
  stdDeviations.sort(function (a, b){return a[0] - b[0];})

  if (stdDeviations.length > 0) {
    // returns an array with the consistency and slot associated
    return stdDeviations[0];
  }
  
  return undefined
}