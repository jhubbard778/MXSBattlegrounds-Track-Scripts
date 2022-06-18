/*
###############################
      BALE COORDINATES
###############################
*/
const baleUpStartIndex = 6;
const baleCoordsUp = [
  [266.018646, -5.000000, 438.696808, -0.684825],
  [284.193237, -5.000000, 420.691467, -0.947597],
  [274.541595, -5.000000, 429.045013, -0.758380],
  [251.907822, -5.000000, 460.145142, -0.402116],
  [258.229523, -5.000000, 448.969452, -0.614020],
  [247.455322, -5.000000, 475.834930, -0.112428],
  [309.863434, -5.000000, 407.824677, -1.251727],
  [324.396606, -5.000000, 405.088043, -1.480141],
  [249.374390, -5.000000, 499.992462, 0.270154],
  [319.340118, -5.000000, 345.775848, -0.415814],
  [247.342438, -5.000000, 488.139465, 0.099668],
  [337.289398, -5.000000, 390.421936, 1.176001],
  [328.540283, -5.000000, 385.229401, 0.910669],
  [321.428436, -5.000000, 377.609650, 0.588003],
  [317.138855, -5.000000, 367.675690, 0.276909],
  [316.517975, -5.000000, 356.387115, -0.083836],
  [296.786530, -5.000000, 412.985748, -1.083203]
];
var balesToPushUp = [];
const numOfBalesToPushUp = baleCoordsUp.length;

const baleDownStartIndex = 24;
const baleCoordsDown = [
  [361.818756, 0.000000, 368.099213, -0.692641],
  [346.484894, 0.000000, 387.481903, -0.692641],
  [255.023163, 0.000000, 501.121552, -0.700494],
  [269.041138, 0.000000, 484.039978, -0.700494],
  [276.136200, 0.000000, 475.378845, -0.700494],
  [312.056152, 0.000000, 430.399048, -0.692641],
  [319.359924, 0.000000, 421.059967, -0.692641],
  [327.525818, 0.000000, 410.849426, -0.692641],
  [354.567291, 0.000000, 377.358459, -0.692641],
  [262.296143, 0.000000, 492.341492, -0.700494]
];
var balesToPushDown = [];
const numOfBalesToPushDown = baleCoordsDown.length;

initializeBalesToPushArrays();

function initializeBalesToPushArrays() {
    // balesToPush output: [bale index, x,y,z,a]
    for (var i = 0; i < numOfBalesToPushUp; i++)
      balesToPushUp.push([i + baleUpStartIndex, baleCoordsUp[i]]);
    for (var i = 0; i < numOfBalesToPushDown; i++)
      balesToPushDown.push([i + baleDownStartIndex, baleCoordsDown[i]]);
}
  
/*
###############################
      MOVE BALES FUNCTION
###############################
*/

const delayForBales = 25;
var doneMovingBales = false;
const timeToMoveBales = 2.5;
const unitsToMoveBales = Math.abs(balesToPushUp[0][1][1]);
// speed of the movement of the bales in ft/sec
const speedOfBales = unitsToMoveBales/timeToMoveBales;
var gotDelay = false;
var movedOutside = false;
var moveBalesDelay = undefinedTime;
function moveBales() {
  var seconds = mx.seconds;
  var index,x,y,z,a,t;
  if (gateDropTime > 0 && !gotDelay) { 
    moveBalesDelay = delayForBales + gateDropTime;
    gotDelay = true;
  }
  if ((moveBalesDelay - 1) <= seconds <= (moveBalesDelay + timeToMoveBales + 1) || seconds <= 1) {
    if (seconds > moveBalesDelay) {
      if (seconds >= moveBalesDelay + timeToMoveBales)
        t = timeToMoveBales;
      else
        t = (seconds - moveBalesDelay);
    }
    else
      t = 0;
    // moves statues up y axis
    for (var i = 0; i < numOfBalesToPushUp; i++) {
      index = balesToPushUp[i][0];
      x = balesToPushUp[i][1][0];
      y = balesToPushUp[i][1][1] + (speedOfBales * t);
      z = balesToPushUp[i][1][2];
      a = balesToPushUp[i][1][3];
      mx.move_statue(index, x, y, z, a);
    }
    // move statues down y axis
    for (var i = 0; i < numOfBalesToPushDown; i++) {
      index = balesToPushDown[i][0];
      x = balesToPushDown[i][1][0];
      y = balesToPushDown[i][1][1] - (speedOfBales * t);
      z = balesToPushDown[i][1][2];
      a = balesToPushDown[i][1][3];
      mx.move_statue(index, x, y, z, a);
    }
  }
}

