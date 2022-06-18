// Make name comparison at the finish to determine if the rider should be booed or not when they win
function makeNameComparisonFinish(slot) {
    var randNumber;
    if (!stadium) {
        if (slotsToBoo.indexOf(slot) != -1) {
            for (var i = 0; i < numOfBleachers; i++) {
                  randNumber = randomIntFromInterval(0, (allBooSounds.length - 1));
                  mx.set_sound_vol(allBooSounds[randNumber][i], booSoundVol);
                  mx.start_sound(allBooSounds[randNumber][i]);
            }
            return;
        }
        
        for (var i = 0; i < numOfBleachers; i++) {
          randNumber = randomIntFromInterval(0, (allCheerSounds.length - 1));
          mx.set_sound_vol(allCheerSounds[randNumber][i], cheerSoundVol);
          mx.start_sound(allCheerSounds[randNumber][i]);
        }
        return;
    }

    if (slotsToBoo.indexOf(slot) != -1) {
        randNumber = randomIntFromInterval(0, allBooSounds.length - 1);
        mx.set_sound_vol(allBooSounds[randNumber], booSoundVol);
        mx.start_sound(allBooSounds[randNumber]);
        return;
    }

    randNumber = randomIntFromInterval(0, allCheerSounds.length - 1);
    mx.set_sound_vol(allCheerSounds[randNumber], cheerSoundVol);
    mx.start_sound(allCheerSounds[randNumber]);

  }
  
var playFinishSoundAndFlame = false;
function lapsRemainingString(l) {
    if (l == 0) {
        if (racingEvent) {
            if (!playFinishSoundAndFlame) {
                if (mainEvent) {
                    triggerAllFlameSounds();
                    triggerFireworkSounds();
                    makeNameComparisonFinish(globalRunningOrder[0].slot);
                }
                // someone wins a heat or lcq
                else triggerCrowdRoar(0.4);
                playFinishSoundAndFlame = true;
            }
        }
        return "Finish";
    }
    if (l == 1) {
        if (mainEvent && playFinishSoundAndFlame) {
            playFinishSoundAndFlame = false;
        }
        return "Final Lap";
    }
    return l.toFixed(0) + " Laps"
}

function timeOrLapsRemaining() {
    var t, l;
  
    if (globalFinishTime == 0) {
        return lapsRemainingString(globalFinishLaps - mx.index_to_lap(globalRunningOrder[0].position));
    }
        
    t = timeRemaining();
  
    if (t == 0) {
        l = lapsRemaining();
        if (l <= globalFinishLaps)
           return lapsRemainingString(l);
    }
  
    return timeToString(t);
}
  
function lapsRemaining() {
    final_lap = lapsBeforeTime(globalFinishTime) + 1 + globalFinishLaps;
    return final_lap - mx.index_to_lap(globalRunningOrder[0].position);
}
  
function lapsBeforeTime(seconds) {
    var r, i, last, t;

    if (seconds == 0)
       return 0;

    seconds += mx.get_gate_drop_time();

    r = globalRunningOrder;

    last = mx.index_to_lap(r[0].position);

    /* search backwards to find leader's last lap before time expired */
    for (i = last; i > 0; i--) {
        t = mx.get_timing(r[0].slot, mx.lap_to_index(i));
        if (t < seconds)
            break;
    }

    /* search entire field forwards to find last lap before time expired */
    for (; i <= last; i++) {
        if (!indexReachedBefore(mx.lap_to_index(i), seconds))
            break;
    }

    return i - 1;
  }
  
function timeRemaining() {
    var drop = mx.get_gate_drop_time();
    var secs = mx.seconds - drop;

    if (drop < 0 || secs < 0)
       return globalFinishTime;

    return Math.max(0.0, globalFinishTime - secs);
}
  
function indexReachedBefore(index, seconds) {
    var i, r, t;
  
    r = globalRunningOrder;
  
    for (i = 0; i < r.length; i++) {
        t = mx.get_timing(r[i].slot, index);
        if (t >= 0 && t < seconds)
            return true;
    }
  
    return false;
}

function breakTime(t) {
   var min, sec, ms;

   ms = Math.floor(t * 1000.0);
   sec = Math.floor(ms / 1000);
   min = Math.floor(sec / 60);

   ms -= sec * 1000;
   sec -= min * 60;

   return { min: min, sec: sec, ms: ms };
}

function leftFillString(s, pad, n) {
    n -= s.length;

    while (n > 0) {
        if (n & 1)
        s = pad + s;

        n >>= 1;
        pad += pad;
    }

   return s;
}

// converts raw seconds to formatted time
function timeToString(t) {
   var s;

   t = breakTime(t);

   s = leftFillString(t.min.toString(), " ", 0) + ":";
   s += leftFillString(t.sec.toString(), "0", 2) + ".";
   s += leftFillString(t.ms.toString(), "0", 3);

   return s;
}

