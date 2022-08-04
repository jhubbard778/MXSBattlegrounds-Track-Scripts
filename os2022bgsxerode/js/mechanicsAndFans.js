/* 
timing gate at which to activate mechanic sounds
assuming gates are ordered numerically and zero indexed.
ex. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, etc.
*/
const mechanicGate = 43;

/* this is the number of times the rider needs pass the mechanic gate above
before activating mechanics. Ex. 1 means the first time the rider passes the mechanic gate*/
const lapToActivateMechanics = 1;

// If you want songs enabled on the speakers
const songsEnabled = false;
  
/* This is for boos/cheers on the track, list them in the same order of where the bleacher sound positions are*/
const gatesToCheerOrBoo = [15,16,18,19,30,31,40,41,42];

var crowdConstants;
var crowdRoars = [];
const crowdRoarDirectories = [
  "@os2022bgsxobj/sounds/cheers/cheer1.raw",
  "@os2022bgsxobj/sounds/cheers/cheer3.raw",
  "@os2022bgsxobj/sounds/cheers/cheer4.raw",
  "@os2022bgsxobj/sounds/cheers/roar1.raw",
  "@os2022bgsxobj/sounds/cheers/roar2.raw",
  "@os2022bgsxobj/sounds/cheers/horn2.raw"
];
const numOfRoarVariants = crowdRoarDirectories.length;

var allCheerSounds = [];
var allBooSounds = [];

const cheerVariantDirectories = [
  "@os2022bgsxobj/sounds/cheers/cheer1.raw",
  "@os2022bgsxobj/sounds/cheers/cheer2.raw",
  "@os2022bgsxobj/sounds/cheers/cheer3.raw",
  "@os2022bgsxobj/sounds/cheers/cheer4.raw",
  "@os2022bgsxobj/sounds/cheers/roar1.raw",
  "@os2022bgsxobj/sounds/cheers/roar2.raw",
  "@os2022bgsxobj/sounds/cheers/horn1.raw",
  "@os2022bgsxobj/sounds/cheers/horn2.raw"

];
const numOfCheerVariants = cheerVariantDirectories.length;

const booVariantDirectories = [
  "@os2022bgsxobj/sounds/boos/boo1.raw",
  "@os2022bgsxobj/sounds/boos/boo2.raw",
  "@os2022bgsxobj/sounds/boos/boo3.raw",
  "@os2022bgsxobj/sounds/boos/boo4.raw"
];
const numOfBooVariants = booVariantDirectories.length;

// leave blank
var allMechanicSounds = [];
// to add another variant, make an array of the sound directories to store and add that
// array directory name into all directories array.
const joeSoundDirectories = [
  "@os2022bgsxobj/sounds/mechanic/joe/joe1.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe2.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe3.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe4.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe5.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe6.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe7.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe8.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe9.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe10.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe11.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe12.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe13.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe14.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe15.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe16.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe17.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe18.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe19.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe20.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe21.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe22.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe23.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe24.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe25.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe26.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe27.raw", 
  "@os2022bgsxobj/sounds/mechanic/joe/joe28.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe29.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe30.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/joe31.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe32.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe33.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/joe34.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe35.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe36.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/joe37.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe38.raw", "@os2022bgsxobj/sounds/mechanic/joe/joe39.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/joe40.raw"
];
const sethSoundDirectories = [
  "@os2022bgsxobj/sounds/mechanic/seth/seth1.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth2.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth3.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth4.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth5.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth6.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth7.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth8.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth9.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth10.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth11.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth12.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth13.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth14.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth15.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth16.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth17.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth18.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth19.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth20.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth21.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth22.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth23.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth24.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth25.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth26.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth27.raw", 
  "@os2022bgsxobj/sounds/mechanic/seth/seth28.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth29.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth30.raw",
  "@os2022bgsxobj/sounds/mechanic/seth/seth31.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth32.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth33.raw",
  "@os2022bgsxobj/sounds/mechanic/seth/seth34.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth35.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth36.raw",
  "@os2022bgsxobj/sounds/mechanic/seth/seth37.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth38.raw", "@os2022bgsxobj/sounds/mechanic/seth/seth39.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/seth40.raw"
];
const hubSoundDirectories = [
  "@os2022bgsxobj/sounds/mechanic/hub/hub1.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub2.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub3.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub4.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub5.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub6.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub7.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub8.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub9.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub10.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub11.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub12.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub13.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub14.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub15.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub16.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub17.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub18.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub19.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub20.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub21.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub22.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub23.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub24.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub25.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub26.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub27.raw", 
  "@os2022bgsxobj/sounds/mechanic/hub/hub28.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub29.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub30.raw",
  "@os2022bgsxobj/sounds/mechanic/hub/hub31.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub32.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub33.raw",
  "@os2022bgsxobj/sounds/mechanic/hub/hub34.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub35.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub36.raw",
  "@os2022bgsxobj/sounds/mechanic/hub/hub37.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub38.raw", "@os2022bgsxobj/sounds/mechanic/hub/hub39.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/hub40.raw"
];
const someSoundDirectories = [
  "@os2022bgsxobj/sounds/mechanic/some/some1.raw", "@os2022bgsxobj/sounds/mechanic/some/some2.raw", "@os2022bgsxobj/sounds/mechanic/some/some3.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some4.raw", "@os2022bgsxobj/sounds/mechanic/some/some5.raw", "@os2022bgsxobj/sounds/mechanic/some/some6.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some7.raw", "@os2022bgsxobj/sounds/mechanic/some/some8.raw", "@os2022bgsxobj/sounds/mechanic/some/some9.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some10.raw", "@os2022bgsxobj/sounds/mechanic/some/some11.raw", "@os2022bgsxobj/sounds/mechanic/some/some12.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some13.raw", "@os2022bgsxobj/sounds/mechanic/some/some14.raw", "@os2022bgsxobj/sounds/mechanic/some/some15.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some16.raw", "@os2022bgsxobj/sounds/mechanic/some/some17.raw", "@os2022bgsxobj/sounds/mechanic/some/some18.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some19.raw", "@os2022bgsxobj/sounds/mechanic/some/some20.raw", "@os2022bgsxobj/sounds/mechanic/some/some21.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some22.raw", "@os2022bgsxobj/sounds/mechanic/some/some23.raw", "@os2022bgsxobj/sounds/mechanic/some/some24.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some25.raw", "@os2022bgsxobj/sounds/mechanic/some/some26.raw", "@os2022bgsxobj/sounds/mechanic/some/some27.raw", 
  "@os2022bgsxobj/sounds/mechanic/some/some28.raw", "@os2022bgsxobj/sounds/mechanic/some/some29.raw", "@os2022bgsxobj/sounds/mechanic/some/some30.raw",
  "@os2022bgsxobj/sounds/mechanic/some/some31.raw", "@os2022bgsxobj/sounds/mechanic/some/some32.raw", "@os2022bgsxobj/sounds/mechanic/some/some33.raw",
  "@os2022bgsxobj/sounds/mechanic/some/some34.raw", "@os2022bgsxobj/sounds/mechanic/some/some35.raw", "@os2022bgsxobj/sounds/mechanic/some/some36.raw",
  "@os2022bgsxobj/sounds/mechanic/some/some37.raw", "@os2022bgsxobj/sounds/mechanic/some/some38.raw", "@os2022bgsxobj/sounds/mechanic/some/some39.raw",
  "@os2022bgsxobj/sounds/mechanic/joe/some40.raw"
];

const allMechanicDirectories = [
  joeSoundDirectories,
  sethSoundDirectories,
  hubSoundDirectories,
  someSoundDirectories
];

// Change list to boo or cheer specific riders when they pass by the crowd
const booRiderNames = [
  "brayden tharp",
  "alexis leclair",
  "rogan mcintosh",
  "roborider",
  "spencer turley",
  "larry reyes jr",
  "jr reyes",
  "tyler lang",
  "rasmus balzer"
];

const cheerRiderNames = [
  "cade matherly",
  "alexis leclair",
  "jakob hubbard",
  "braden carter",
  "seth garrett",
  "greg conrad",
  "tanner rogers",
  "colton hansen",
  "maxime vanderbeek",
  "brandon larsen"
];

var slotsToCheer = [];
var slotsToBoo = [];

// ADD POSITIONS FOR MECHANICS X Y Z
// How this works is every slot number will be signed a unique mechanic position
const mechanicPositions = [
  [0, 0, 0], [1, 0, 1], 
  [265, 6, 436], [265, 6, 436], 
  [4, 0, 4], [5, 0, 5], 
  [6, 0, 6], [7, 0, 7], 
  [8, 0, 8], [9, 0, 9], 
  [10, 0, 10], [11, 0, 11], 
  [12, 0, 12], [13, 0, 13], 
  [14, 0, 14], [15, 0, 15], 
  [16, 0, 16], [17, 0, 17], 
  [18, 0, 18], [19, 0, 19], 
  [20, 0, 20], [21, 0, 21]
];
const numOfMechanicPositions = mechanicPositions.length;

/*
####################
CHANGE EVERY TRACK
####################
*/
var speakerPositions = [
  [581.5,30,148],
  [312,30,95],
  [140,30,216]
];
var numOfSpeakers = speakerPositions.length;
var mainEventScreams = [];
if (songsEnabled) {
  var timeToStartSongs = 20;
  var songs = [[]];
  // song lengths in seconds, 1:1 correlation with songDirectories
  var songLengths = [];
  // song files
  var songDirectories = [
  ];
  shuffleSongs(songDirectories, songLengths);
}
var time = globalFinishTime / 60;
var fourFiftyMain = false;
if (time == 20) fourFiftyMain = true;
for (var i = 0; i < numOfSpeakers; i++){
  if (fourFiftyMain)
    mainEventScreams[i] = mx.add_sound("@os2022bgsxobj/sounds/crowd/maineventscream2.raw");
  else
    mainEventScreams[i] = mx.add_sound("@os2022bgsxobj/sounds/crowd/maineventscream.raw");
  
  if (songsEnabled) {
    if (i < numOfSpeakers - 1)
      songs.push([]);

    for (var j = 0; j < songDirectories.length; j++){
      songs[i][j] = mx.add_sound(songDirectories[j]);
      mx.set_sound_freq(songs[i][j], 48000);
      mx.set_sound_vol(songs[i][j], 1);
      mx.set_sound_pos(songs[i][j], speakerPositions[i][0], speakerPositions[i][1], speakerPositions[i][2]);
    }
  }

  mx.set_sound_freq(mainEventScreams[i], 44100);
  mx.set_sound_vol(mainEventScreams[i], 1);
  mx.set_sound_pos(mainEventScreams[i], speakerPositions[i][0], speakerPositions[i][1], speakerPositions[i][2]);
}

function shuffleSongs(directories, lengths) {
    var currentIndex = directories.length;
    var randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // swap elements
      var temp = directories[currentIndex];
      directories[currentIndex] = directories[randomIndex];
      directories[randomIndex] = temp;
  
      temp = lengths[currentIndex];
      lengths[currentIndex] = lengths[randomIndex];
      lengths[randomIndex] = temp;
      
    }
}

function initializeMechanicSounds() {
  for (var i = 0; i < allMechanicDirectories.length; i++) {
    allMechanicSounds.push([]);
    for (var j = 0; j < allMechanicDirectories[i].length; j++){
      allMechanicSounds[i][j] = mx.add_sound(allMechanicDirectories[i][j]);
      mx.set_sound_freq(allMechanicSounds[i][j], 44100);
      mx.set_sound_vol(allMechanicSounds[i][j], 1);
      //mx.message('[' + i.toString() + '][' + j.toString() + '] ' + allMechanicSounds[i][j].toString());
    }
  }
}

function initializeCheerAndBooAllSoundArrays() {
    if (numOfCheerVariants == numOfBooVariants) {
      for (var i = 0; i < numOfCheerVariants; i++) {
        allCheerSounds.push([]);
        allBooSounds.push([]);
      }
      return;
    }

    for (var i = 0; i < numOfCheerVariants; i++)
      allCheerSounds.push([]);
    for (var i = 0; i < numOfBooVariants; i++)
      allBooSounds.push([]);
}

const cheerSoundVol = 5;
const booSoundVol = 5;
function addCheerBooSounds() {
    if (!stadium) {
        initializeCheerAndBooAllSoundArrays();
        // otherwise do two different nested loops
        for (var i = 0; i < numOfBooVariants; i++) {
          for (var j = 0; j < numOfBleachers; j++) {
            allBooSounds[i][j] = mx.add_sound(booVariantDirectories[i]);
            mx.set_sound_freq(allBooSounds[i][j], 44100);
            mx.set_sound_vol(allBooSounds[i][j], booSoundVol);
            mx.set_sound_pos(allBooSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
          }
        }
    
        for (var i = 0; i < numOfCheerVariants; i++) {
          for (var j = 0; j < numOfBleachers; j++) {
            allCheerSounds[i][j] = mx.add_sound(cheerVariantDirectories[i]);
            mx.set_sound_freq(allCheerSounds[i][j], 44100);
            mx.set_sound_vol(allCheerSounds[i][j], cheerSoundVol);
            mx.set_sound_pos(allCheerSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
          }
        }
        return;
    }

    for (var i = 0; i < numOfBooVariants; i++) {
        allBooSounds[i] = mx.add_sound(booVariantDirectories[i]);
        mx.set_sound_freq(allBooSounds[i], 44100);
    }
    for (var i = 0; i < numOfCheerVariants; i++) {
        allCheerSounds[i] = mx.add_sound(cheerVariantDirectories[i]);
        mx.set_sound_freq(allCheerSounds[i], 44100);
    }
}

/*
################################################
dynamic crowd and mechanic sounds based on rider
################################################
*/

// this number determines who the rider's mechanic is
var mechanicNumberIdentifiers = [];
var soundDelay = 0;
const secondsToDelay = 3;
var initializedMechanicIdentifiers = false;
var playedScream = false;
var timeToPlayScream;
var playingSong = false;
var timeStartedSong = 20;
var currentSongIndex = -1;

initializeCrowdSounds();
initializeMechanicSounds();

function dynamicMechanicAndFans() {

  var randNumber, slot, timingGate, i;
  var runningOrder = globalRunningOrder;

  if (!initializedMechanicIdentifiers) {
    initializeMechanicIdentifiers();
    initializedMechanicIdentifiers = true;
  }
  // use time to seed random numbers
  var seconds = mx.seconds;

  if (seconds > timeToPlayScream && !playedScream && mainEvent) {
    for (var i = 0; i < mainEventScreams.length; i++)
      mx.start_sound(mainEventScreams[i]);
    playedScream = true;
  }

  if (playedScream && seconds < timeToPlayScream) {playedScream = false;}

  if (songsEnabled) {songFunction();}

  for (i = 0; i < runningOrder.length; i++) {
      slot = runningOrder[i].slot;
      timingGate = runningOrder[i].position;
      /*
      ###################
      crowds at bleachers
      ###################

      if you do not want boos/cheers just delete this whole if statement section
      */
  
      if (timingGate != currentTimingGates[slot] && (seconds >= soundDelay)) {
          // Runs a loop every time someone hits a gate that's in the gatesToCheerOrBoo array
          for (var x = 0; x < gatesToCheerOrBoo.length; x++) {
            // every lap, and first sound only plays when you hit the first timing gate in the slot
            if ((timingGate - (gatesToCheerOrBoo[x] + 1)) % normalLapLength == 0 && timingGate >= gatesToCheerOrBoo[x] + 1) {
                // make's name comparison, sends in running order, index, and the array
                makeNameComparison(slot, x, seconds);
                break;
            }
          }
        }
      /*
      ##############
      mechanics area
      ##############
      */ 
      if (((timingGate - (mechanicGate + 1)) % normalLapLength == 0) && 
          (timingGate > ((mechanicGate + 1) * (lapToActivateMechanics - 1))) && 
          (timingGate != currentTimingGates[slot])) {

            var position = i + 1;
            // pick from first place prompts
            if (position == 1)
              randNumber = Math.floor((seconds % 5));

            // pick from front running sounds for top 5 that's not first
            else if (position <= 5)
              randNumber = Math.floor((seconds % 6)) + 5;

            // pick from 6th-10th sounds
            else if (position <= 10)
              randNumber = Math.floor((seconds % 5)) + 11;

            // pick from midpack1 sounds (11th-15th)
            else if (position <= 15)
              randNumber = Math.floor((seconds % 4)) + 16;

            // pick from midpack2 sounds (16th-21st)
            else if (position <= 21)
              randNumber = Math.floor((seconds % 5)) + 20;

            // pick from last place prompts
            else if (position == runningOrder.length)
              randNumber = Math.floor((seconds % 5)) + 35;

            // pick from endpack sounds
            else
              randNumber = Math.floor((seconds % 10)) + 25;
    
            if (slot <= numOfMechanicPositions)
              assignPositionsForMechanicsAndPlaySound(slot, mechanicNumberIdentifiers, randNumber);
        }
    }
}

function initializeMechanicIdentifiers() {
    var runningOrder = globalRunningOrder;
    if (mainEvent) {
        // Use last place's slot number to seed a random number between 3 and 6 seconds
        timeToPlayScream = (runningOrder[runningOrder.length-1].slot % 4) + 3;
    }
    if (runningOrder.length > numOfMechanicPositions) {
        mx.message('Warning: Not Every Rider Will Be Assigned a Mechanic');    
    }
      
    for (i = 0; i < runningOrder.length; i++) {
        slot = runningOrder[i].slot;    
        /*
        if the running order is longer than the mechanic positions length,
        not all riders will be assigned a mechanic, only the ones within the confines
        of the mechanic positions length
        */    
        // assign mechanic sounds based on slot num
        if (i <= numOfMechanicPositions) {

            if (slot % 4 == 0) {
              mechanicNumberIdentifiers[slot] = 3;
              continue;
            }

            if (slot % 3 == 0) {
              mechanicNumberIdentifiers[slot] = 2;
              continue;
            }

            if (slot % 2 == 0) {
              mechanicNumberIdentifiers[slot] = 1;
              continue;
            }
            mechanicNumberIdentifiers[slot] = 0;
        }
    }
}

function songFunction() {
  try {
    if (playingSong) {
      if (mx.seconds > songLengths[currentSongIndex] + timeStartedSong || mx.seconds - timeStartedSong < 0) {
        if (mx.seconds - timeStartedSong < 0) {
          currentSongIndex--;
        }
        for (var i = 0; i < numOfSpeakers; i++) {
          mx.stop_sound(songs[i][currentSongIndex]);
        }
        playingSong = false;
      }
    }
  
    if (!playingSong && mainEvent && mx.seconds > timeToStartSongs){
      currentSongIndex++;
      if (currentSongIndex == songs.length)
        currentSongIndex = 0;
      for (var i = 0; i < numOfSpeakers; i++) {
        mx.start_sound(songs[i][currentSongIndex]);
      }
      playingSong = true;
      timeStartedSong = mx.seconds;
    }
  }
  catch(e) {
    mx.message("song error: " + e);
  }
}

function assignPositionsForMechanicsAndPlaySound(slotNumber, mechanicNumberIdentifiers, randNumber) {
  /*var mechNum = mechanicNumberIdentifiers[slotNumber];
  mx.message('slot number: ' + slotNumber);
  mx.message('setting sound position for: [' + mechNum + '][' + randNumber + '] at ' + mechanicPositions[slotNumber]);
  mx.set_sound_pos(allMechanicSounds[mechNum][randNumber], mechanicPositions[slotNumber][0], mechanicPositions[slotNumber][1], mechanicPositions[slotNumber][2]);
  mx.start_sound(allMechanicSounds[mechNum][randNumber]);*/
}

function makeNameComparison(slot, benchPos, seconds) {
  // use time to seed random numbers
  seconds = seconds.toFixed(3);
  var randNumber, randFunc, randFunc2;
  var luckyNumber = 2;

  if (slotsToCheer.indexOf(slot) != -1) {
    // cheer sounds have a 10% chance of playing
    randFunc = seed((seconds * 1000) << 2);
    randNumber = Math.floor(randFunc() * 100) % 10;

    if (randNumber == luckyNumber) {
      randFunc2 = seed((randFunc()) * mx.tics_per_second);
      randNumber = Math.floor(randFunc2() * 100) % numOfCheerVariants;

      mx.set_sound_vol(allCheerSounds[randNumber][benchPos], cheerSoundVol);
      mx.start_sound(allCheerSounds[randNumber][benchPos]);
      // delay so sounds don't overlay
      soundDelay = seconds + secondsToDelay;
    }
  }

  if (slotsToBoo.indexOf(slot) != -1) {
    // boo sounds have a 10% chance of playing
    randFunc = seed((seconds * 1000) << 2);
    randNumber = Math.floor(randFunc() * 100) % 10;

    if (randNumber == luckyNumber) {
      randFunc2 = seed((randFunc()) * mx.tics_per_second);
      randNumber = Math.floor(randFunc2() * 100) % numOfBooVariants;
      
      mx.set_sound_vol(allBooSounds[randNumber][benchPos], booSoundVol);
      mx.start_sound(allBooSounds[randNumber][benchPos]);
      // delay so sounds don't overlay
      soundDelay = seconds + secondsToDelay;
    }
  }
}
  
function addRoarSounds() {
    if (!stadium) {
      for (var i = 0; i < numOfBleachers; i++) {
        crowdRoars.push([]);
        for (var j = 0; j < numOfRoarVariants; j++) {
          crowdRoars[i][j] = mx.add_sound(crowdRoarDirectories[j]);
          mx.set_sound_freq(crowdRoars[i][j], 44100);
          mx.set_sound_pos(crowdRoars[i][j], bleacherSoundPositions[i][0], bleacherSoundPositions[i][1], bleacherSoundPositions[i][2]);
        }
      }
      return;
    }
  
    for (var i = 0; i < numOfRoarVariants; i++) {
      crowdRoars[i] = mx.add_sound(crowdRoarDirectories[i]);
      mx.set_sound_freq(crowdRoars[i], 44100);
    }
}
  
function addCrowdConstant() {
  if (!stadium) {
    crowdConstants = [];
    // Set Sound Positions for crashes and constant sound at all bleacher positions
    for (var j = 0; j < numOfBleachers; j++) {
        // define all crowd constants at each bleacher position
        crowdConstants[j] = mx.add_sound("@os2022bgsxobj/sounds/crowd/crowdconstant.raw");
        mx.set_sound_freq(crowdConstants[j], 44100);

        if (racingEvent) {
          mx.set_sound_vol(crowdConstants[j], crowdConstantBaseVol);
        } else {
          mx.set_sound_vol(crowdConstants[j], crowdConstantBaseVol / 4);
        } 

        mx.set_sound_loop(crowdConstants[j], 1);
        mx.set_sound_pos(crowdConstants[j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
        mx.start_sound(crowdConstants[j]);
    }
    return;
  }

  crowdConstants = mx.add_sound("@os2022bgsxobj/sounds/crowd/constant.raw");
  mx.set_sound_freq(crowdConstants, 44100);
  mx.set_sound_vol(crowdConstants, crowdConstantBaseVol);
  mx.set_sound_loop(crowdConstants, 1);

}

function initializeCrowdSounds() {
  addCheerBooSounds();
  addRoarSounds();
  addCrowdConstant();
}

