// this variable is for determining if someone is going backwards in the demo
var backwards = false;
var holeshot = false;
var holeshotRiderSlot;
const holeshotGate = 2;

function determineHoleshot(){ 
  var r = globalRunningOrder;
  // this first if is for optimization so the rest isn't called after first is 2 gates away from the holeshot
  if (r[0].position <= (holeshotGate + 3)){ 
    if (r[0].position == (holeshotGate + 1) && !backwards) {
      if (!holeshot){
        holeshotRiderSlot = r[0].slot;
        holeshot = true;
        if (mainEvent) {
          triggerHoleshotPyro();
        }
      }
    }
    else {
      // for demos going backwards in time
      if (r[0].position >= (holeshotGate + 1)) backwards = true;
      else backwards = false;
      holeshot = false;
    }
  }
}

