var firstLapGates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]; 
var normalLapGates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]; 
var flaggersArr = [];
var flaggerCount = flaggersArr.length;
var starterIndex = 0;
var finisherIndex = 1;
var firstFlaggerIndex = 2;
var thirtyBoardIndex = firstFlaggerIndex + flaggerCount;
var greenFlagIndex = thirtyBoardIndex + 1;
var whiteFlagIndex = greenFlagIndex + 1;
var checkedFlagIndex = whiteFlagIndex + 1;
var firstYellowFlagIndex;

var starterStartPos = [312.8, 385.2];
var starterEndPos = [284.7, 357.5];
var starterFeetPerSecond = 10.0;
var starterRunVector = [ 0, 0 ];
var starterRunDistance;

movv2(starterRunVector, starterEndPos);
subv2(starterRunVector, starterStartPos);

starterRunDistance = Math.sqrt(dotv2(starterRunVector, starterRunVector));
starterRunDuration = starterRunDistance / starterFeetPerSecond;
starterRunStartTime = 6.5;
starterRunEndTime = starterRunStartTime + starterRunDuration;

function updateStarter() {
	var t = mx.seconds;
	var v = [ 0, 0 ];
	var a, f;


	if (t < starterRunStartTime)
		movv2(v, starterStartPos);
	else if (t > starterRunEndTime) {
		movv2(v, starterEndPos);
		poseAnimate(flaggerIdleAnim, starterIndex, t);
		poseAnimate(flagIdleAnim, thirtyBoardIndex, t);
		return;
	} else {
		movv2(v, starterRunVector);
		scalev2(v, (t - starterRunStartTime) / starterRunDuration);
		addv2(v, starterStartPos);
	}

	a = Math.atan2(starterRunVector[0], starterRunVector[1]) - Math.PI / 2.0;
	a -= Math.PI * 4.0; /* force vertical Y axis */
	mx.move_statue(starterIndex, v[0], 3.9, v[1], a);
	mx.move_statue(thirtyBoardIndex, v[0], 3.9, v[1], a);

	/*
	 turn 0-11
	 show 12-17
	 1st step 18-28
	 run cycle 29-42
	*/

	f = Math.max(0.0, t - 5.0) * 16.0;

	if (f > 42.0)
		f = (f - 29.0) % 13.0 + 29.0;

	poseAnimateFrame(flaggerStartAnim, starterIndex, f);
	poseAnimateFrame(flagStartAnim, thirtyBoardIndex, f);
}

var globalLastLap = 1000000;
var globalHalfwayLap = 1000000;
var gDropTime = -1;

function updateLastLap() {
	var p, l;

	if (globalLastLap < 1000000) {
		/*
		 TODO: incrementally check if the last lap is wrong because of lag.
		 (e.g. leader hits lap x before buzzer but has enough lag that second place
		 temporarily looked like it had the lead and hit lap x after buzzer.)
		*/
		return;
	}

	if (globalFinishTime == 0) {
		globalLastLap = globalFinishLaps;
		globalHalfwayLap = Math.floor(globalLastLap / 2);
		return;
	}

	p = mx.get_running_order_position(0);

	l = mx.index_to_lap(p);

	if (globalHalfwayLap == 1000000 && mx.seconds >= gDropTime + globalFinishTime / 2)
		globalHalfwayLap = l + 1;

	if (globalLastLap == 1000000 && mx.seconds >= gDropTime + globalFinishTime)
		globalLastLap = l + 1 + globalFinishLaps;
}

var lastPlace;
var setLastPlace = false;
var resetLastPlace = false;
function updateFinisher() {
	var p, l, lastLap, timeExpired, nearFinish;

  p = mx.get_running_order_position(0);

  if (p <= firstLapLength - 1 && !setLastPlace) {
    lastPlace = globalRunningOrder.length - 1;
    setLastPlace = true;
    resetLastPlace = false;
  }
  else
    setLastPlace = false;

  if (p > firstLapLength - 1 && globalRunningOrder.length > 1 && !resetLastPlace) {
    var i, j;
    i = 0;
    j = 1;
    while (i == 0) {
      // keep looping until there is a person found with a position > 0
      if (globalRunningOrder[globalRunningOrder.length - j].position > 0) {
        i = 1;
        lastPlace = globalRunningOrder.length - j;
        resetLastPlace = true;
      }
      j++;
    }
  }

	if (gDropTime < 0)
		gDropTime = mx.get_gate_drop_time();

	updateLastLap();

	l = mx.index_to_lap(p + 1);

	lastLap = globalLastLap;

	timeExpired = (mx.seconds >= gDropTime + globalFinishTime);

	nearFinish = (mx.index_to_lap(l) == p);

	if (timeExpired && nearFinish)
		lastLap = Math.min(lastLap, l + globalFinishLaps);

	if (l >= lastLap) {
		/* checkered */
		poseAnimate(flaggerWaveAnim, finisherIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, greenFlagIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, whiteFlagIndex, mx.seconds);
		poseAnimate(flagWaveAnim, checkedFlagIndex, mx.seconds);
	} else if (l == lastLap - 1 && globalRunningOrder[0].position > 0) {
		/* white */
		poseAnimate(flaggerWaveAnim, finisherIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, greenFlagIndex, mx.seconds);
		poseAnimate(flagWaveAnim, whiteFlagIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, checkedFlagIndex, mx.seconds);
	} else if (l == globalHalfwayLap) {
		/* green/white crossed */
		poseAnimate(flaggerCrossedAnim, finisherIndex, mx.seconds);
		poseAnimate(flagCrossedAnim, greenFlagIndex, mx.seconds);
		poseAnimate(flagCrossedAnim2, whiteFlagIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, checkedFlagIndex, mx.seconds);
    // wave green flag until last active rider crosses finish for first lap
	} else if (l == 0 || (globalRunningOrder[lastPlace].position < firstLapLength)) {
		if (p >= firstLapLength + normalLapLength - 2 || p < firstLapLength - 1) {
      // leader came around second lap without everyone crossing the first lap or first hasn't reached the finish on the first lap yet, idleAnimate
			idleAnimate();
			return;
		}
		/* green, first lap */
		poseAnimate(flaggerWaveAnim, finisherIndex, mx.seconds);
		poseAnimate(flagWaveAnim, greenFlagIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, whiteFlagIndex, mx.seconds);
		poseAnimate(flagOnGroundAnim, checkedFlagIndex, mx.seconds);
	} else {
		/* green */
		idleAnimate();
	}
}

function idleAnimate() {
	poseAnimate(flaggerIdleAnim, finisherIndex, mx.seconds);
	poseAnimate(flagIdleAnim, greenFlagIndex, mx.seconds);
	poseAnimate(flagOnGroundAnim, whiteFlagIndex, mx.seconds);
	poseAnimate(flagOnGroundAnim, checkedFlagIndex, mx.seconds);
}

function checkFlaggerGates(f) {
	var i, a;

	a = flaggersArr[f];
	for (i = 0; i < a.length; i++)
		if (yellowGatesArr[a[i]].length > 0)
			return true;

	return false;
}

var statuePosesArr = [];

function poseAnimateFrame(anim, statueIndex, frame) {
	if (!(statueIndex in statuePosesArr))
		statuePosesArr[statueIndex] = { anim:null, frame:-1 };

	if (statuePosesArr[statueIndex].anim === anim
	 && statuePosesArr[statueIndex].frame == frame)
		return;

	statuePosesArr[statueIndex].anim = anim;
	statuePosesArr[statueIndex].frame = frame;

	if ("cached_poses" in anim)
		mx.pose_statue_from_sequence(statueIndex, anim.cached_poses, frame);
	else
		mx.pose_statue(statueIndex, anim.bone_count, anim.rest_centers, anim.poses[frame].centers, anim.poses[frame].rotations);
}

function poseAnimate(anim, statueIndex, seconds) {
	var f;

	f = seconds * anim.fps % (anim.frame_count - 1);

	poseAnimateFrame(anim, statueIndex, f);
}

function cachePoseSequence(anim) {
	if ("cache_pose_sequence" in mx)
		anim.cached_poses = mx.cache_pose_sequence(anim);
}

var activeRiderSlots = null;
var flaggerRiderDown;
var yellowGatesArr;

function initFlaggerStuff() {
	var i;

	activeRiderSlots = mx.get_running_order();
	flaggerRiderDown = [];
	for (i = 0; i < activeRiderSlots.length; i++) {
		activeRiderSlots[i] = activeRiderSlots[i].slot;
		flaggerRiderDown.push([]);
	}

	yellowGatesArr = [];
	for (i = 0; i < firstLapGates.length; i++) {
		yellowGatesArr[firstLapGates[i]] = [];
	}
	for (i = 0; i < normalLapGates.length; i++) {
		yellowGatesArr[normalLapGates[i]] = [];
	}
}

function wrapTimingPosition(t) {
	return firstLapGates.length + (t - firstLapGates.length) % normalLapGates.length;
}

function gateFromTimingPosition(t) {
	if (t < firstLapGates.length)
		return firstLapGates[t];

	return normalLapGates[(t - firstLapGates.length) % normalLapGates.length];
}

function addToArray(a, i) {
	if (a.indexOf(i) == -1)
		a.push(i);
}

function removeFromArray(a, i) {
	var j;

	j = a.indexOf(i);

	if (j >= 0)
		a.splice(j, 1);
}

function checkYellow(i) {
	var j, slot, g;

	if (activeRiderSlots.length <= i)
		return;

	slot = activeRiderSlots[i];

	if (mx.get_rider_down(slot)) {
		if (debugBool && flaggerRiderDown[i].length == 0)
			debugMessage("Slot " + slot.toFixed(0) + " down!");
		g = gateFromTimingPosition(mx.get_timing_position(slot));
		addToArray(yellowGatesArr[g], i);
		addToArray(flaggerRiderDown[i], g);
		
	} else {
		if (debugBool && flaggerRiderDown[i].length > 0)
			debugMessage("Slot " + slot.toFixed(0) + " back up!");
		for (j = 0; j < flaggerRiderDown[i].length; j++) {
			if (debugBool) debugMessage("removing from " + flaggerRiderDown[i][j])
			removeFromArray(yellowGatesArr[flaggerRiderDown[i][j]], i)
		}
		flaggerRiderDown[i].length = 0;
	}
}

var checkYellowProgress = 0;
function checkYellows() {
	var i = checkYellowProgress;

	checkYellow(i++);

	if (i >= activeRiderSlots.length)
		i = 0;

	checkYellowProgress = i;
}

/*
 How many flaggers to update per frame.
 Use flagger count for smoother animation.
 Use smaller number for better FPS.
*/
var flaggersUpdatePerFrame = 1;

var poseFlaggerProgress = 0;
function flaggersFrameHandler(seconds) {
	var i, j, s;
	var n = Math.min(flaggersUpdatePerFrame, flaggerCount);

	if (activeRiderSlots == null)
		initFlaggerStuff();

	try {
		for (j = 0; j < n; j++) {
			i = poseFlaggerProgress;
			poseFlaggerProgress = (i + 1) % flaggerCount;
			s = seconds + i * 0.25; /* small time offset so flaggers won't be synchronized */
			if (checkFlaggerGates(i)) {
				poseAnimate(flaggerWaveAnim, firstFlaggerIndex + i, s);
				poseAnimate(flagWaveAnim, firstYellowFlagIndex + i, s);
			} else {
				poseAnimate(flaggerIdleAnim, firstFlaggerIndex + i, s);
				poseAnimate(flagIdleAnim, firstYellowFlagIndex + i, s);
			}
		}
		updateStarter();
		updateFinisher();
		checkYellows();
	} catch (e) {
		mx.message("flag error: " + e);
	}

	return;
}

/* 2d vector functions */
function movv2(r, a) { r[0] = a[0]; r[1] = a[1]; }
function addv2(r, a) { r[0] += a[0]; r[1] += a[1]; }
function subv2(r, a) { r[0] -= a[0]; r[1] -= a[1]; }
function scalev2(r, a) { r[0] *= a; r[1] *= a; }
function dotv2(a, b) { return a[0] * b[0] + a[1] * b[1]; }

var debugBool = false;
function debugMessage(s) { if (debugBool) mx.message(s); }

