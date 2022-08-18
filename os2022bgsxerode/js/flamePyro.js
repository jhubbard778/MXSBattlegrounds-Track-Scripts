// Booleans and Sound Array Variables
var setStartFlameLoop = false;
var startFlameSoundAdded = false;
var holeshotFlameSoundsAdded = false;
var finishFlameSoundAdded = false;
var finishFlameSound;
var finishWhistleSound;
var holeshotFlameSounds;
var startFlameSound = [];

/*
#################
FLAME COORDINATES
#################
*/
const startFlameCoords = [
  [128.438416, 9.000000, 497.612274],
  [137.961914, 9.000000, 506.996399],
  [153.301193, 9.000000, 522.226196],
  [162.861298, 9.000000, 531.605957],
  [168.705368, 9.000000, 537.329834],
  [178.207001, 9.000000, 546.702881],
  [203.094864, 9.000000, 571.254089],
  [193.566559, 9.000000, 561.846985]
];

const holeshotCoords = [
  [315.363922, 7.250000, 283.171173],
  [323.246948, 7.250000, 291.764801]
];

const finishFlameCoords = [
  [459.547089, 20.500000, 361.974976],
  [459.601410, 20.500000, 395.998230]
];

// Finish Flame Pyro Animation Variables
var triggerFinishFlames = false;
var secondsSinceFinishUpdate = 0;
var currentFinishFrame = 0;
// 3rd arg in first line of sequence file
var finishFramesDelay = 4;
var timeStartedFinishFlame;
var finishFlamesHidden = false;

// Start Shoot Flame Pyro Animation Variables
var triggerStartShootFlames = false;
var secondsSinceStartShootUpdate = 0;
var currentStartShootFrame = 0;
var startShootFramesDelay = 4;
var timeStartedStartFlame;
var startFlamesHidden = false;

// Holeshot Flame Pyro Animation Variables
var triggerHoleshotFlames = false;
var secondsSinceHoleshotUpdate = 0;
var currentHoleshotFrame = 0;
var holeshotFramesDelay = 4;
var timeStartedHoleshotFlame;
var holeshotFlamesHidden = false;

var maxFramesPyro = 69;

/*
####################
SET UP PYRO TEXTURES
####################
*/
var finishFlamesTexture = mx.read_texture("@os2022bgsxobj/js/pyro/finishflames.seq");
var finishFlamesV2Texture = mx.read_texture("@os2022bgsxobj/js/pyro/finishflames2.seq");
var holeshotFlamesTexture = mx.read_texture("@os2022bgsxobj/js/pyro/holeshotflames.seq");
var startFlamesTexture = mx.read_texture("@os2022bgsxobj/js/pyro/holeshotflames.seq");

var startFlameLoopIndices = {start:1,end:8};
var holeshotFlameIndices = {start:9,end:10};
var finishFlameIndices = {start:11,end:12};
var startShootFlameIndices = {start:13,end:20};

// hide flames on start until called upon
hideAllFlames();
var showLoopPyroVal = 0;
if (mainEvent) {showLoopPyroVal = 1}
// hides or shows start flames on start of race
for (var i = startFlameLoopIndices.start - 1; i < startFlameLoopIndices.end; i++) {
  mx.color_billboard(i, 1, 1, 1, showLoopPyroVal);
}

/* 
###################################
        SHOW/HIDE FLAMES
###################################
*/
function hideAllFlames() {
  toggleStartFlames(0);
  toggleHoleshotFlames(0);
  toggleFinishFlames(0); 
}

function toggleStartFlames(value) {
  for (var i = startShootFlameIndices.start - 1; i < startShootFlameIndices.end; i++) mx.color_billboard(i, 1, 1, 1, value);
  startFlamesHidden = false;
  if (value == 0) startFlamesHidden = true;
}

function toggleHoleshotFlames(value) {
  for (var i = holeshotFlameIndices.start - 1; i < holeshotFlameIndices.end; i++) mx.color_billboard(i, 1, 1, 1, value);
  holeshotFlamesHidden = false;
  if (value == 0) holeshotFlamesHidden = true;
}

function toggleFinishFlames(value) {
  for (var i = finishFlameIndices.start - 1; i < finishFlameIndices.end; i++) mx.color_billboard(i, 1, 1, 1, value);
  finishFlamesHidden = false;
  if (value == 0) finishFlamesHidden = true;
}

// The Function that actually does all the work
function doPyro() {
  if (!mainEvent) return;
  doStartPyro();
  doHoleshotPyro();
  doFinishPyro();
}

function doStartPyro() {
  if (triggerStartShootFlames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - timeStartedStartFlame < 0) toggleStartFlames(0);
  
    if (mx.seconds - secondsSinceStartShootUpdate < startShootFramesDelay / 128) return;

    if (startFlamesHidden) toggleStartFlames(1);

    secondsSinceStartShootUpdate = mx.seconds;

    if (currentStartShootFrame <= maxFramesPyro) {
      mx.begin_custom_frame(startFlamesTexture);
      mx.paste_custom_frame(startFlamesTexture, currentStartShootFrame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(startFlamesTexture);
      currentStartShootFrame++;
    } else {
      triggerStartShootFlames = false;
      toggleStartFlames(0);
    }
  }
}

function doHoleshotPyro() {
  if (triggerHoleshotFlames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - timeStartedHoleshotFlame < 0) toggleHoleshotFlames(0);

    if (mx.seconds - secondsSinceHoleshotUpdate < holeshotFramesDelay / 128) return;

    if (holeshotFlamesHidden) toggleHoleshotFlames(1);

    secondsSinceHoleshotUpdate = mx.seconds;
    
    if (currentHoleshotFrame <= maxFramesPyro) {
      mx.begin_custom_frame(holeshotFlamesTexture);
      mx.paste_custom_frame(holeshotFlamesTexture, currentHoleshotFrame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(holeshotFlamesTexture);
      currentHoleshotFrame++;
    }
    else {
      triggerHoleshotFlames = false;
      toggleHoleshotFlames(0);
    }  
  }
}

function doFinishPyro() {
  if (triggerFinishFlames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - timeStartedFinishFlame < 0) toggleFinishFlames(0);

    if (mx.seconds - secondsSinceFinishUpdate < finishFramesDelay / 128) return;

    if (finishFlamesHidden) toggleFinishFlames(1);

    secondsSinceFinishUpdate = mx.seconds;

    if (currentFinishFrame <= maxFramesPyro) {
      mx.begin_custom_frame(finishFlamesTexture);
      mx.begin_custom_frame(finishFlamesV2Texture);
      mx.paste_custom_frame(finishFlamesTexture, currentFinishFrame, 0, 0, 0, 0, 1, 1);
      mx.paste_custom_frame(finishFlamesV2Texture, currentFinishFrame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(finishFlamesTexture);
      mx.end_custom_frame(finishFlamesV2Texture);
      currentFinishFrame++;
    } else {
      triggerFinishFlames = false;
      toggleFinishFlames(0);
    }   
  }
}

function triggerFinishFlameSound() {
  if (!finishFlameSoundAdded) {
    finishFlameSound = [];
    finishWhistleSound = [];
    for (var i = 0; i < finishFlameCoords.length; i++) {
      finishFlameSound[i] = mx.add_sound("@os2022bgsxobj/sounds/pyro/finishlineflame.raw");
      finishWhistleSound[i] = mx.add_sound("@os2022bgsxobj/sounds/pyro/finishlinewhistle.raw");
      mx.set_sound_freq(finishFlameSound[i], 44100);
      mx.set_sound_freq(finishWhistleSound[i], 44100);
      mx.set_sound_vol(finishFlameSound[i], 0.5);
      mx.set_sound_vol(finishWhistleSound[i], 2);
      mx.set_sound_pos(finishFlameSound[i], finishFlameCoords[i][0], finishFlameCoords[i][1], finishFlameCoords[i][2]);
      mx.set_sound_pos(finishWhistleSound[i], finishFlameCoords[i][0], finishFlameCoords[i][1], finishFlameCoords[i][2]);
    }
    finishFlameSoundAdded = true;
  }
  for (var i = 0; i < finishFlameSound.length; i++)
    mx.start_sound(finishFlameSound[i]);

  return;
}

function triggerholeshotFlameSounds() {
    if (!holeshotFlameSoundsAdded) {
      holeshotFlameSounds = [];
      for (var i = 0; i < holeshotCoords.length; i++) {
        holeshotFlameSounds[i] = mx.add_sound("@os2022bgsxobj/sounds/pyro/holeshotflame.raw");
        mx.set_sound_freq(holeshotFlameSounds[i], 44100);
        mx.set_sound_vol(holeshotFlameSounds[i], 2);
        mx.set_sound_pos(holeshotFlameSounds[i], holeshotCoords[i][0], holeshotCoords[i][1], holeshotCoords[i][2]);
      }
      holeshotFlameSoundsAdded = true;
    }

  for (var i = 0; i < holeshotFlameSounds.length; i++) mx.start_sound(holeshotFlameSounds[i]);
  
}

function triggerStartFlameSound(status) {
  if (status == "dropped") {
    if (startFlameSound != null){
      for (var i = 0; i < startFlameSound.length; i++){
        if (startFlameSound[i] != null){
          mx.stop_sound(startFlameSound[i]);
          mx.set_sound_loop(startFlameSound[i], 0);
          mx.set_sound_vol(startFlameSound[i], 20);
          mx.start_sound(startFlameSound[i]);
          setStartFlameLoop = false;
        }
      }
    }
    // hide start loop pyro
    for (var i = startFlameLoopIndices.start - 1; i < startFlameLoopIndices.end; i++) mx.color_billboard(i, 1, 1, 1, 0);
  }
  else {
    // show start loop pyro
    for (var i = startFlameLoopIndices.start - 1; i < startFlameLoopIndices.end; i++) mx.color_billboard(i, 1, 1, 1, 1);
  
    if (!startFlameSoundAdded){
        startFlameSound = [];
        for (var i = 0; i < startFlameCoords.length; i++) {
          startFlameSound[i] = mx.add_sound("@os2022bgsxobj/sounds/pyro/startflameburst.raw");
          mx.set_sound_freq(startFlameSound[i], 44100);
          mx.set_sound_vol(startFlameSound[i], 0.5);
          mx.set_sound_pos(startFlameSound[i], startFlameCoords[i][0], startFlameCoords[i][1], startFlameCoords[i][2]);
          startFlameSoundAdded = true;
        }
    }
    if (!setStartFlameLoop){
        for (var i = 0; i < startFlameSound.length; i++) {
          mx.stop_sound(startFlameSound[i]);
          mx.set_sound_loop(startFlameSound[i], 1);
          mx.set_sound_vol(startFlameSound[i], 0.5);
          mx.start_sound(startFlameSound[i]);
        }
        setStartFlameLoop = true;
    }
  }
  return;
}

function triggerFireworkSounds() {
  for (var i = 0; i < finishWhistleSound.length; i++) mx.start_sound(finishWhistleSound[i]);
}

function triggerAllFlameSounds() {
  triggerCrowdRoar(0.8);
  triggerAllPyro();
}

function triggerCrowdRoar(volume) {
  var randNumber;
  if (!stadium) {
    // Stop all sounds
    for (var i = 0; i < numOfBleachers; i++) {
      for (var j = 0; j < numOfRoarVariants; j++) {
        mx.stop_sound(crowdRoars[i][j]);
      }
    }
    for (var i = 0; i < numOfBleachers; i++) {
      randNumber = randomIntFromInterval(0, (numOfRoarVariants - 1));
      mx.set_sound_vol(crowdRoars[i][randNumber], volume);
      mx.start_sound(crowdRoars[i][randNumber]);
    }
  } else {
    // stop sounds
    for (var i = 0; i < numOfBleachers; i++) {
      mx.stop_sound(crowdRoars[i]);
    }
    randNumber = randomIntFromInterval(0, numOfBleachers - 1);
    mx.set_sound_vol(crowdRoars[randNumber], volume);
    mx.start_sound(crowdRoars[randNumber]);
  }
}

function triggerAllPyro() {
  triggerStartShootPyro();
  triggerFinishPyro();
  triggerHoleshotPyro();
}

function triggerStartShootPyro() {
  currentStartShootFrame = 0;
  secondsSinceStartShootUpdate = 0;
  triggerStartShootFlames = true;
  timeStartedStartFlame = mx.seconds;
  triggerStartFlameSound("dropped");
}

function triggerHoleshotPyro() {
  currentHoleshotFrame = 0;
  secondsSinceHoleshotUpdate = 0;
  triggerHoleshotFlames = true;
  timeStartedHoleshotFlame = mx.seconds;
  triggerholeshotFlameSounds();
}

function triggerFinishPyro() {
  currentFinishFrame = 0;
  secondsSinceFinishUpdate = 0;
  triggerFinishFlames = true;
  timeStartedFinishFlame = mx.seconds;
  triggerFinishFlameSound();
}

