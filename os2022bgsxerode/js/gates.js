var startedFlameSound = false;
/*
################################################################################
## Gate Sounds
##
################################################################################
*/
var gateDropTime;
var gateSoundPositions = [
    [149, 0, 517],
    [166, 0, 534],
    [183, 0, 551]
  ];
  
  var gateSounds = [];
  var gateDropped = false;
  
for (var i = 0; i < gateSoundPositions.length; i++) {
    gateSounds[i] = mx.add_sound("@os2022bgsxobj/sounds/gate/gatedrop.raw");
    mx.set_sound_freq(gateSounds[i], 44100);
    mx.set_sound_vol(gateSounds[i], 0.5);
    mx.set_sound_pos(gateSounds[i], gateSoundPositions[i][0], gateSoundPositions[i][1], gateSoundPositions[i][2]);
}

function gateSound() {
  if (!gateDropped) {
    gateDropTime = mx.get_gate_drop_time();
  }

  if (gateDropTime > 0 && !gateDropped) {
    for (var i = 0; i < gateSounds.length; i++) 
      mx.start_sound(gateSounds[i]);
      
    gateDropped = true;

    if (mainEvent) {
      triggerAllFlameSounds();
    }
  }
  
  if (mainEvent && ((gateDropped && mx.seconds < gateDropTime) || (!gateDropped && !startedFlameSound && mx.seconds > 0))) {
    triggerStartFlameSound("notdropped");
    hideAllFlames();
    gateDropped = false;
    startedFlameSound = true;
  }
}

