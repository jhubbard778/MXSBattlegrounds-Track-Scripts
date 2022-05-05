/*
################
Global Variables
################
*/
var slot_position_holder = [];
var g_running_order = mx.get_running_order();
// checks to make sure rider switched gates
var current_timing_gates = [];
var started_flame_sound = false;
var soundedStartFlames = false;
var set_start_flame_loop = false;
var startFlameSoundAdded = false;
var startedStartFlameSoundLoop = false;
var holeshotFlameSoundsAdded = false;
var finishFlameSoundAdded = false;
var finishFlameSound;
var finishWhistleSound;
var holeshotFlameSounds = [];
var startFlameSound = [];
var finishFireworkSound;
var gateDropTime;
var mainEvent = false;
var racingEvent = false;
var crowd_constant_base_vol = 1.5;
// p and r store location of rider(s)
var p = [], r = [];
var g_finish_laps = mx.get_finish_laps();
var g_finish_time = mx.get_finish_time();
/*
####################
CHANGE EVERY TRACK
####################
*/
var g_firstlap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]; 
var g_normallap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]; 
var g_flaggers = [];
var g_flagger_count = g_flaggers.length;
var g_starter_index = 0;
var g_finisher_index = 1;
var g_first_flagger_index = 2;
var g_30board_index = g_first_flagger_index + g_flagger_count;
var g_green_flag_index = g_30board_index + 1;
var g_white_flag_index = g_green_flag_index + 1;
var g_checkered_flag_index = g_white_flag_index + 1;
var g_first_yellow_flag_index;
var baleUpStartIndex;
if (g_flagger_count > 0){
  g_first_yellow_flag_index = g_checkered_flag_index + 1;
  baleUpStartIndex = g_first_yellow_flag_index + g_flagger_count;
}
else
  baleUpStartIndex = g_checkered_flag_index + 1;
/*
#########################
CHANGE COORDS EVERY TRACK
#########################
*/
var startFlameCoords = [
  [128.438416, 9.000000, 497.612274],
  [137.961914, 9.000000, 506.996399],
  [153.301193, 9.000000, 522.226196],
  [162.861298, 9.000000, 531.605957],
  [168.705368, 9.000000, 537.329834],
  [178.207001, 9.000000, 546.702881],
  [203.094864, 9.000000, 571.254089],
  [193.566559, 9.000000, 561.846985]
];
var holeshotCoords = [
  [315.363922, 8.000000, 283.171173],
  [323.246948, 8.000000, 291.764801]
];
var finishFlameCoords = [
  [459.547089, 20.500000, 361.974976],
  [459.601410, 20.500000, 395.998230]
];
var baleCoordsUp = [
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
var numOfBalesToPushUp = baleCoordsUp.length;
var baleCoordsDown = [
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
// have at least 1 object in between the two bale sets as a separator
var baleDownStartIndex = baleUpStartIndex + numOfBalesToPushUp + 1;
var numOfBalesToPushDown = baleCoordsDown.length;

// Coordinates of each bleacher
var bleacherSoundPositions = [
  [401, 0, 90],
  [501, 0, 90],
  [175, 0, 177],
  [97, 0, 252],
  [665, 0, 283],
  [238, 0, 584],
  [414, 0, 594],
  [565, 0, 594],
  [664, 0, 425]
];
var numOfBleachers = bleacherSoundPositions.length;
  
/* This is for boos/cheers on the track, if you want that.
Array is written as [element1, element 2]; where each element =
[timing gate,[soundPosX, soundPosY, soundPosZ]]*/
var gatesAndPosCheerOrBoo = [
  [16,bleacherSoundPositions[0]],
  [15,bleacherSoundPositions[1]],
  [18,bleacherSoundPositions[2]],
  [19,bleacherSoundPositions[3]],
  [30,bleacherSoundPositions[4]],
  [42,bleacherSoundPositions[5]],
  [41,bleacherSoundPositions[6]],
  [40,bleacherSoundPositions[7]],
  [31,bleacherSoundPositions[8]],
];

// leave blank
var crashSounds = [];
// choose random directories to assign to crashsounds so it's not all the same sound when someone crashes
var crashSoundDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/crashes/crash1.raw",
  "@sx2022battlegroundsobjectpack/sounds/crashes/crash2.raw",
  "@sx2022battlegroundsobjectpack/sounds/cheers/roar1.raw"
];
var numOfCrashVariants = crashSoundDirectories.length;

var crowdConstants;
var crowdRoars = [];
var crowdRoarDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/cheers/cheer1.raw",
  "@sx2022battlegroundsobjectpack/sounds/cheers/roar1.raw",
  "@sx2022battlegroundsobjectpack/sounds/pretzel1.raw",
];
var numOfRoarVariants = crowdRoarDirectories.length;

var allCheerSounds = [];
var allBooSounds = [];

var cheerVariantDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/cheers/cheer.raw",
  "@sx2022battlegroundsobjectpack/sounds/cheers/cheer1.raw",
  "@sx2022battlegroundsobjectpack/sounds/cheers/roar1.raw"

];
var numOfCheerVariants = cheerVariantDirectories.length;

var booVariantDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/pretzel1.raw",
  "@sx2022battlegroundsobjectpack/sounds/boos/boo.raw"
];
var numOfBooVariants = booVariantDirectories.length;

// leave blank
var allMechanicSounds = [];
// to add another variant, make an array of the sound directories to store and add that
// array directory name into all directories array.
var joeSoundDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe1.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe2.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe3.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe4.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe5.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe6.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe7.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe8.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe9.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe10.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe11.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe12.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe13.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe14.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe15.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe16.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe17.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe18.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe19.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe20.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe21.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe22.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe23.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe24.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe25.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe26.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe27.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe28.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe29.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe30.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe31.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe32.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe33.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe34.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe35.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe36.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe37.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe38.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe39.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/joe40.raw"
];
var sethSoundDirectories = [
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth1.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth2.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth3.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth4.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth5.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth6.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth7.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth8.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth9.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth10.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth11.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth12.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth13.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth14.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth15.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth16.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth17.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth18.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth19.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth20.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth21.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth22.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth23.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth24.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth25.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth26.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth27.raw", 
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth28.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth29.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth30.raw",
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth31.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth32.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth33.raw",
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth34.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth35.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth36.raw",
"@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth37.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth38.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/seth/seth39.raw",
"@sx2022battlegroundsobjectpack/sounds/mechanic/joe/seth40.raw"
];
var hubSoundDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub1.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub2.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub3.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub4.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub5.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub6.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub7.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub8.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub9.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub10.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub11.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub12.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub13.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub14.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub15.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub16.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub17.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub18.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub19.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub20.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub21.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub22.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub23.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub24.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub25.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub26.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub27.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub28.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub29.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub30.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub31.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub32.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub33.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub34.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub35.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub36.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub37.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub38.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/hub/hub39.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/hub40.raw"
];
var someSoundDirectories = [
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some1.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some2.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some3.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some4.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some5.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some6.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some7.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some8.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some9.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some10.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some11.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some12.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some13.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some14.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some15.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some16.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some17.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some18.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some19.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some20.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some21.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some22.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some23.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some24.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some25.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some26.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some27.raw", 
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some28.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some29.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some30.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some31.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some32.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some33.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some34.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some35.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some36.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some37.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some38.raw", "@sx2022battlegroundsobjectpack/sounds/mechanic/some/some39.raw",
  "@sx2022battlegroundsobjectpack/sounds/mechanic/joe/some40.raw"
];

var allDirectories = [
  joeSoundDirectories,
  sethSoundDirectories,
  hubSoundDirectories,
  someSoundDirectories
];

// Change list to boo or cheer specific riders when they pass by the crowd
var booRiderNames = [
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
var cheerRiderNames = [
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

// ADD POSITIONS FOR MECHANICS X Y Z
// How this works is every slot number will be signed a unique mechanic position
var mechanicPositions = [
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
var numOfMechanicPositions = mechanicPositions.length;

/*
############
CONSTANTS
############
*/
const undefinedTime = 999999999;
const normalLapLength = mx.normal_lap_length;
const firstLapLength = mx.first_lap_length;
const holeshotGate = 2;
const songs_on = true;

// true = track is in stadium, false = track is not in stadium
/*
I would recommend just keeping this false even if inside a stadium if you plan
on having multiple variants of the crash sounds that way you can get multiple reactions.
Then just change the coordinates at which to play the crash sounds in bleacherSoundPositions.

If you do not care about just one sound playing, you can set it to true and everyone will hear
the same one sound at their respective camera position on the track.
*/
const stadium = false;

/* 
timing gate at which to activate mechanic sounds
assuming gates are ordered numerically and zero indexed.
ex. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, etc.
*/
const mechanicGate = 43;
const lapToActivateMechanics = 1;
/* this is the number of times the rider needs pass the mechanic gate above
before activating mechanics. Ex. 1 means the first time the rider passes the mechanic gate*/

// if inside a stadium, you only need one sound that updates at the camera position of every rider
if (stadium) {
	crowdConstants = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/crowd/constant.raw");
	mx.set_sound_freq(crowdConstants, 44100);
	mx.set_sound_vol(crowdConstants, crowd_constant_base_vol);
	mx.set_sound_loop(crowdConstants, 1);
}

// initialize arrays
initializeBalesToPushArrays();
initializeMechanicSounds();
determineMainEvent();
initializeCrowdSounds();


/*
#################
SET UP PYRO
#################
*/
var finish_flames_texture = mx.read_texture("@sx2022battlegroundsobjectpack/js/pyro/finishflames.seq");
var finish_flames_2_texture = mx.read_texture("@sx2022battlegroundsobjectpack/js/pyro/finishflames2.seq");
var holeshot_flames_texture = mx.read_texture("@sx2022battlegroundsobjectpack/js/pyro/holeshotflames.seq");
var start_flames_texture = mx.read_texture("@sx2022battlegroundsobjectpack/js/pyro/holeshotflames.seq");

var start_flame_loop_indexes = {start:1,end:8};
var holeshot_flame_indexes = {start:9,end:10};
var finish_flame_indexes = {start:11,end:12};
var start_shoot_flame_indexes = {start:13,end:20};

// hide flames on start until called upon
hide_all_flames();
var show_loop_pyro_val = 0;
if (mainEvent)
  show_loop_pyro_val = 1
for (var i = 0; i < 6; i++) {
  mx.color_billboard(i, 1, 1, 1, show_loop_pyro_val);
}

if (mainEvent) {

  var trigger_finish_flames = false;
  var seconds_since_finish_update = 0;
  var current_finish_frame = 0;
  // 3rd arg in first line of sequence file
  var finish_frames_delay = 4;
  var time_started_finish_flame;
  var finish_flames_hidden = false;

  var trigger_start_shoot_flames = false;
  var seconds_since_start_shoot_update = 0;
  var current_start_shoot_frame = 0;
  // 3rd arg in first line of sequence file
  var start_shoot_frames_delay = 4;
  var time_started_start_flame;
  var start_flames_hidden = false;

  var trigger_holeshot_flames = false;
  var seconds_since_holeshot_update = 0;
  var current_holeshot_frame = 0;
  // 3rd arg in first line of sequence file
  var holeshot_frames_delay = 4;
  var time_started_holeshot_flame;
  var holeshot_flames_hidden = false;

  var max_frames = 69;

  /*
  ####################
  CHANGE EVERY TRACK
  ####################
  */
  var speaker_positions = [
    [581.5,30,148],
    [312,30,95],
    [140,30,216]
  ];
  var numOfSpeakers = speaker_positions.length;
  var main_event_screams = [];
  if (songs_on) {
    var time_to_start_songs = 20;
    var songs = [[]];
    // song lengths in seconds, 1:1 correlation with song_directories
    var song_lengths = [279,239,323];
    // song files
    var song_directories = [
      "@sx2022battlegroundsobjectpack/sounds/songs/calmdownjuliet.raw",
      "@sx2022battlegroundsobjectpack/sounds/songs/somethingwicked.raw",
      "@sx2022battlegroundsobjectpack/sounds/songs/perfectmachine.raw"
    ];
    shuffle_songs();
  }
  var time = g_finish_time / 60;
  var four_fifty = false;
  if (time == 20) four_fifty = true;

  for (var i = 0; i < numOfSpeakers; i++){
    if (four_fifty)
      main_event_screams[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/crowd/maineventscream2.raw");
    else
      main_event_screams[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/crowd/maineventscream.raw");
    
    if (songs_on) {
      if (i < numOfSpeakers - 1)
        songs.push([]);
    
      for (var j = 0; j < song_directories.length; j++){
        songs[i][j] = mx.add_sound(song_directories[j]);
        mx.set_sound_freq(songs[i][j], 48000);
        mx.set_sound_vol(songs[i][j], 1);
        mx.set_sound_pos(songs[i][j], speaker_positions[i][0], speaker_positions[i][1], speaker_positions[i][2]);
      }
    }
    mx.set_sound_freq(main_event_screams[i], 44100);
    mx.set_sound_vol(main_event_screams[i], 1);
    mx.set_sound_pos(main_event_screams[i], speaker_positions[i][0], speaker_positions[i][1], speaker_positions[i][2]);
  }
  
}

function shuffle_songs() {
  var currentIndex = song_directories.length;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap elements
    var temp = song_directories[currentIndex];
    song_directories[currentIndex] = song_directories[randomIndex];
    song_directories[randomIndex] = temp;

    temp = song_lengths[currentIndex];
    song_lengths[currentIndex] = song_lengths[randomIndex];
    song_lengths[randomIndex] = temp;
    
  }
}
/*
################################################################################
## Gate Sounds
##
################################################################################
*/
/*
####################
CHANGE EVERY TRACK
####################
*/
var gateSoundPositions = [
  [149, 0, 517],
  [166, 0, 534],
  [183, 0, 551]
];

var gateSounds = [];
var gateDropped = false;

for (var i = 0; i < gateSoundPositions.length; i++) {
  gateSounds[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/gate/gatedrop.raw");
  mx.set_sound_freq(gateSounds[i], 44100);
  mx.set_sound_vol(gateSounds[i], 0.5);
  mx.set_sound_pos(gateSounds[i], gateSoundPositions[i][0], gateSoundPositions[i][1], gateSoundPositions[i][2]);
}

function determineMainEvent() {
  var time = g_finish_time / 60;
  var laps = g_finish_laps;
  if ((time == 15 || time == 20) && laps == 1) {
    mainEvent = true;
    racingEvent = true;
  }
  else if ((time == 6 || time == 5) && laps == 1)
    racingEvent = true;
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
  if (mainEvent && ((gateDropped && mx.seconds < gateDropTime) || (!gateDropped && !started_flame_sound))) {
    triggerStartFlameSound("notdropped");
    hide_all_flames();
    gateDropped = false;
    started_flame_sound = true;
  }
}

/* 
###################################
        SHOW/HIDE FLAMES
###################################
*/
function hide_all_flames() {
  hide_start_flames();
  hide_holeshot_flames();
  hide_finish_flames(); 
}

function hide_start_flames() {
  for (var i = start_shoot_flame_indexes.start - 1; i < start_shoot_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 0);
  start_flames_hidden = true;
}

function hide_holeshot_flames() {
  for (var i = holeshot_flame_indexes.start - 1; i < holeshot_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 0);
  holeshot_flames_hidden = true;
}

function hide_finish_flames() {
  for (var i = finish_flame_indexes.start - 1; i < finish_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 0);
  finish_flames_hidden = true;
}

function show_start_flames() {
  for (var i = start_shoot_flame_indexes.start - 1; i < start_shoot_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 1);
  start_flames_hidden = false;
}

function show_holeshot_flames() {
  for (var i = holeshot_flame_indexes.start - 1; i < holeshot_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 1);
  holeshot_flames_hidden = false;
}

function show_finish_flames() {
  for (var i = finish_flame_indexes.start - 1; i < finish_flame_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 1);
  finish_flames_hidden = false;
}

function do_pyro() {
  if (!mainEvent) return;
  do_start_pyro();
  do_holeshot_pyro();
  do_finish_pyro();
}

function do_start_pyro() {
  if (trigger_start_shoot_flames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - time_started_start_flame < 0) hide_start_flames();
  
    if (mx.seconds - seconds_since_start_shoot_update < start_shoot_frames_delay / 128) return;

    if (start_flames_hidden) show_start_flames();

    seconds_since_start_shoot_update = mx.seconds;

    if (current_start_shoot_frame <= max_frames) {
      mx.begin_custom_frame(start_flames_texture);
      mx.paste_custom_frame(start_flames_texture, current_start_shoot_frame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(start_flames_texture);
      current_start_shoot_frame++;
    } else {
      trigger_start_shoot_flames = false;
      hide_start_flames();
    }
  }
}

function do_holeshot_pyro() {
  if (trigger_holeshot_flames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - time_started_holeshot_flame < 0) hide_holeshot_flames();

    if (mx.seconds - seconds_since_holeshot_update < holeshot_frames_delay / 128) return;

    if (holeshot_flames_hidden) show_holeshot_flames();

    seconds_since_holeshot_update = mx.seconds;
    if (current_holeshot_frame <= max_frames) {
      mx.begin_custom_frame(holeshot_flames_texture);
      mx.paste_custom_frame(holeshot_flames_texture, current_holeshot_frame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(holeshot_flames_texture);
      current_holeshot_frame++;
    }
    else {
      trigger_holeshot_flames = false;
      hide_holeshot_flames();
    }  
  }
}

function do_finish_pyro() {
  if (trigger_finish_flames) {
    // if we go backwards in the demo and we are before the trigger of the flames we want to hide them
    if (mx.seconds - time_started_finish_flame < 0) hide_finish_flames();

    if (mx.seconds - seconds_since_finish_update < finish_frames_delay / 128) return;

    if (finish_flames_hidden) show_finish_flames();

    seconds_since_finish_update = mx.seconds;

    if (current_finish_frame <= max_frames) {
      mx.begin_custom_frame(finish_flames_texture);
      mx.begin_custom_frame(finish_flames_2_texture);
      mx.paste_custom_frame(finish_flames_texture, current_finish_frame, 0, 0, 0, 0, 1, 1);
      mx.paste_custom_frame(finish_flames_2_texture, current_finish_frame, 0, 0, 0, 0, 1, 1);
      mx.end_custom_frame(finish_flames_texture);
      mx.end_custom_frame(finish_flames_2_texture);
      current_finish_frame++;
    } else {
      trigger_finish_flames = false;
      hide_finish_flames();
    }   
  }
}

function triggerFinishFlameSound()
{
  if (!finishFlameSoundAdded) {
    finishFlameSound = [];
    finishWhistleSound = [];
    for (var i = 0; i < finishFlameCoords.length; i++) {
      finishFlameSound[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/pyro/finishlineflame.raw");
      finishWhistleSound[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/pyro/finishlinewhistle.raw");
      mx.set_sound_freq(finishFlameSound[i], 44100);
      mx.set_sound_freq(finishWhistleSound[i], 44100);
      mx.set_sound_vol(finishFlameSound[i], 0.5);
      mx.set_sound_vol(finishWhistleSound[i], 2);
      mx.set_sound_pos(finishFlameSound[i], finishFlameCoords[i][0], finishFlameCoords[i][1], finishFlameCoords[i][2]);
      mx.set_sound_pos(finishWhistleSound[i], finishFlameCoords[i][0], finishFlameCoords[i][1], finishFlameCoords[i][2]);
      finishFlameSoundAdded = true;
    }
  }
  for (var i = 0; i < finishFlameSound.length; i++)
    mx.start_sound(finishFlameSound[i]);

  return;
}

function triggerholeshotFlameSounds() {
  if (!holeshotFlameSoundsAdded) {
    for (var i = 0; i < holeshotCoords.length; i++) {
      holeshotFlameSounds[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/pyro/holeshotflame.raw");
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
          set_start_flame_loop = false;
        }
      }
    }
    // hide start loop pyro
    for (var i = start_flame_loop_indexes.start - 1; i < start_flame_loop_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 0);
  }
  else {
    // show start loop pyro
    for (var i = start_flame_loop_indexes.start - 1; i < start_flame_loop_indexes.end; i++) mx.color_billboard(i, 1, 1, 1, 1);
  
    if (!startFlameSoundAdded){
      startFlameSound = [];
      for (var i = 0; i < startFlameCoords.length; i++){
        startFlameSound[i] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/pyro/startflameburst.raw");
        mx.set_sound_freq(startFlameSound[i], 44100);
        mx.set_sound_vol(startFlameSound[i], 0.5);
        mx.set_sound_pos(startFlameSound[i], startFlameCoords[i][0], startFlameCoords[i][1], startFlameCoords[i][2]);
        startFlameSoundAdded = true;
      }
    }
    if (!set_start_flame_loop){
      for (var i = 0; i < startFlameSound.length; i++){
        mx.stop_sound(startFlameSound[i]);
        mx.set_sound_loop(startFlameSound[i], 1);
        mx.set_sound_vol(startFlameSound[i], 0.5);
        mx.start_sound(startFlameSound[i]);
      }
      set_start_flame_loop = true;
    }
  }
  return;
}

function triggerFireworkSounds() {
  for (var i = 0; i < finishWhistleSound.length; i++) mx.start_sound(finishWhistleSound[i]);
}

function triggerAllFlameSounds() {
  triggerCrowdRoar(0.8);
  trigger_all_pyro();
}

function triggerCrowdRoar(volume) {
  var randNumber;
  if (!stadium) {
    for (var i = 0; i < numOfBleachers; i++) {
      randNumber = randomIntFromInterval(0, (numOfRoarVariants - 1));
      mx.set_sound_vol(crowdRoars[i][randNumber], volume);
      mx.start_sound(crowdRoars[i][randNumber]);
    }
  }
  else {
    randNumber = randomIntFromInterval(0, numOfBleachers - 1);
    mx.set_sound_vol(crowdRoars[randNumber], volume);
		mx.start_sound(crowdRoars[randNumber]);
  }
}

function trigger_all_pyro() {
  trigger_start_shoot_pyro();
  trigger_finish_pyro();
  trigger_holeshot_pyro();
}

function trigger_start_shoot_pyro() {
  current_start_shoot_frame = 0;
  seconds_since_start_shoot_update = 0;
  trigger_start_shoot_flames = true;
  time_started_start_flame = mx.seconds;
  triggerStartFlameSound("dropped");
}

function trigger_holeshot_pyro() {
  current_holeshot_frame = 0;
  seconds_since_holeshot_update = 0;
  trigger_holeshot_flames = true;
  time_started_holeshot_flame = mx.seconds;
  triggerholeshotFlameSounds();
}

function trigger_finish_pyro() {
  current_finish_frame = 0;
  seconds_since_finish_update = 0;
  trigger_finish_flames = true;
  time_started_finish_flame = mx.seconds;
  triggerFinishFlameSound();
}

// Update Cam Positioning for Constant crowd sounds
function updateCamPosition() {
  // Updates crash sounds to the position of the rider if the track is in a stadium
  // gets and stores the camera location into the p and r array variables
  mx.get_camera_location(p, r);
	// Constant crowd sound
	mx.set_sound_pos(crowdConstants, p[0], p[1], p[2]);
	
	// Sets each crash sound at the camera postition and will be called to play later
	for (var i = 0; i < numOfCrashVariants; i++)
	  mx.set_sound_pos(crashSounds[i], p[0], p[1], p[2]);
  for (var i = 0; i < crowdRoars.length; i++)
    mx.set_sound_pos(crowdRoars[i], p[0], p[1], p[2]);
}

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

function addCrashAndRoarSounds() {
  if (!stadium) {
    try {
      for (var i = 0; i < numOfBleachers; i++) {
        crowdRoars.push([]);
        for (var j = 0; j < numOfRoarVariants; j++) {
          crowdRoars[i][j] = mx.add_sound(crowdRoarDirectories[j]);
          mx.set_sound_freq(crowdRoars[i][j], 44100);
          mx.set_sound_pos(crowdRoars[i][j], bleacherSoundPositions[i][0], bleacherSoundPositions[i][1], bleacherSoundPositions[i][2]);
        }
      }
      for (var i = 0; i < numOfBleachers; i++) {
        crashSounds.push([]);
        for (var j = 0; j < numOfCrashVariants; j++){
          crashSounds[i][j] = mx.add_sound(crashSoundDirectories[j]);
          mx.set_sound_freq(crashSounds[i][j], 44100);
        }
      }
    }
    catch (e) {
      mx.message('sound error: ' + e);
    }
  } else {
      for (var i = 0; i < numOfRoarVariants; i++){
        crowdRoars[i] = mx.add_sound(crowdRoarDirectories[i]);
        mx.set_sound_freq(crowdRoars[i], 44100);
        mx.set_sound_pos(crowdRoars[i], bleacherSoundPositions[i][0], bleacherSoundPositions[i][1], bleacherSoundPositions[i][2]);
      }
      for (var i = 0; i < numOfCrashVariants; i++){
        crashSounds[i] = mx.add_sound(crashSoundDirectories[i]);
        mx.set_sound_freq(crashSounds[i], 44100);
      }
  }
}

function addCrashPositions() {
  for (var i = 0; i < numOfBleachers; i++) {
    for (var j = 0; j < numOfCrashVariants; j++)
      mx.set_sound_pos(crashSounds[i][j], bleacherSoundPositions[i][0], bleacherSoundPositions[i][1], bleacherSoundPositions[i][2]);
  }
}

function initializeAllMechanicSoundsArray() {
  // push a new array to put sounds in every new variant
  for (var i = 0; i < allDirectories.length; i++) allMechanicSounds.push([]);
}

function initializeMechanicSounds() {
  // need to add a new array for every variant
  initializeAllMechanicSoundsArray();

  for (var i = 0; i < allDirectories.length; i++){
    for (var j = 0; j < allDirectories[i].length; j++){
      allMechanicSounds[i][j] = mx.add_sound(allDirectories[i][j]);
      mx.set_sound_freq(allMechanicSounds[i][j], 44100);
      mx.set_sound_vol(allMechanicSounds[i][j], 1);
      //mx.message('[' + i.toString() + '][' + j.toString() + '] ' + allMechanicSounds[i][j].toString());
    }
  }
}

function initializeCrowdSounds()
{
  addCrashAndRoarSounds();
	// if track is not in a stadium, set the crash sound positions equal to the bleacher positions
	if (!stadium){
    addCrashPositions();
    crowdConstants = [];
		// Set Sound Positions for crashes and constant sound at all bleacher positions
		for (var j = 0; j < numOfBleachers; j++){
			// define all crowd constants at each bleacher position
			crowdConstants[j] = mx.add_sound("@sx2022battlegroundsobjectpack/sounds/crowd/crowdconstant.raw");
			mx.set_sound_freq(crowdConstants[j], 44100);

      if (racingEvent)
        mx.set_sound_vol(crowdConstants[j], crowd_constant_base_vol);
      else
        mx.set_sound_vol(crowdConstants[j], crowd_constant_base_vol/4);

			mx.set_sound_loop(crowdConstants[j], 1);
			mx.set_sound_pos(crowdConstants[j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
      mx.start_sound(crowdConstants[j]);
		}
	}
	else
		updateCamPosition();
}

// Gets random integer when called
// min and max included 
function randomIntFromInterval(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}

/*
################################################
dynamic crowd for position changes/battles
################################################
*/
var initialize_gate_and_slot_pos = false;
// this number is the number of people that the crowd
// will cheer if there is a battle, in this case they will cheer if there is a battle
// within the top 3
var numOfPeopleToCheer = 3;
const timing_gate_to_start_battles = 14;
var startedBattleFunction = false;

// Index 0 is gap between 1st and 2nd, Index 1 is gap between 2nd and 3rd, etc.
var gaps_between_riders = [];
var reset_crowd_default_vol = true;
var max_gap_between_riders = 2;
const max_crowd_vol = (((4 * numOfPeopleToCheer) + numOfBleachers)) + (2 * crowd_constant_base_vol);
var current_volume = 0;
const vol_fade_time = 2;
const vol_reset_fade_time = 5;
var got_time_start_reset = false;
var time_started_increase_or_decrease;
var current_crowd_vol = crowd_constant_base_vol;
var set_holder = false;
var set_reset_holder = false;
var vol_holder;
var reset_holder;
var vol_per_sec;
var vol_divisor = 1;
function battlesFunction() {

  var r = g_running_order;
  var seconds = mx.seconds;
  var battle_between_riders = false;
  var i, current_rider_timingGate, current_rider_slot, priority_battle;
  if (r[0].position == timing_gate_to_start_battles + 1 && !startedBattleFunction) {
    ResetSlotPositionHolder();
    numOfPeopleToCheer++;
    if (g_running_order.length < numOfPeopleToCheer)
      numOfPeopleToCheer = g_running_order.length;

    if (!mainEvent) {
      vol_divisor = 2;
    }
    startedBattleFunction = true;
  }

  if (startedBattleFunction){
    // checks for a position change
    for (var i = 0; i < numOfPeopleToCheer - 1; i++) {
      current_rider_slot = r[i].slot;
      current_rider_timingGate = r[i].position;
      if (current_rider_timingGate != current_timing_gates[current_rider_slot]) {
        // if there was a position change, crowd cheers
        if (checkPosChange(current_rider_slot, i)) {
          var vol_factor;

          if (mx.get_rider_down(r[i + 1].slot) == 1)
            vol_factor = (i + 1) * 2;
          else
            vol_factor = i;

          var volume = ((numOfPeopleToCheer / (vol_factor + 1)) / vol_divisor);
          startRoar(volume);
        }
      }
    }
    // Get gaps between riders and store in gap_between_riders array
    for (i = numOfPeopleToCheer - 1; i > 0; i--) {
      current_rider_slot = r[i].slot;
      current_rider_timingGate = r[i].position - 1;
      if (current_rider_timingGate + 1 != current_timing_gates[current_rider_slot]) {
        var next_rider_slot = r[i-1].slot;
        // time the rider ahead hit the gate that the rider is currently at
        var time_rider_ahead_gate = mx.get_timing(next_rider_slot, current_rider_timingGate);

        // if a rider missed a gate, return
        if (time_rider_ahead_gate < 0) return;

        // current rider hits current gate at current time
        var current_time = seconds;
        // therefore
        gaps_between_riders[i-1] = current_time - time_rider_ahead_gate;
      }
    }
    // Get lowest gap
    // if priority battle is 0, there's a battle between 1st and 2nd, if 1, 2nd and 3rd, etc.
    if (gaps_between_riders.length > 0) {
      var priority_battle = 0;
      var lowest_gap = gaps_between_riders[0];
      var numOfBattles = 0;
      if (gaps_between_riders.length > 1) {
        for (var i = 1; i < gaps_between_riders.length; i++) {
          if (gaps_between_riders[i] < lowest_gap){
            lowest_gap = gaps_between_riders[i];
            priority_battle = i;
          }
          if (gaps_between_riders.length > priority_battle + 2) {
            // number of battles for the same pos
            if (gaps_between_riders[priority_battle + 2] - gaps_between_riders[priority_battle] <= max_gap_between_riders)
              numOfBattles++;
          }
        }
      }

      if (lowest_gap <= max_gap_between_riders) battle_between_riders = true;
      // if someone in the priority battle goes down, check for other battles then set the priority battle and lowest gap
      if (mx.get_rider_down(r[priority_battle + 1].slot) == 1 || mx.get_rider_down(r[priority_battle].slot) == 1){
        if (gaps_between_riders.length > 1){
          var second_lowest_gap = gaps_between_riders[priority_battle + 1];
          for (var i = priority_battle; i < gaps_between_riders.length; i++) {
            if (gaps_between_riders[i] < second_lowest_gap) {
              second_lowest_gap = gaps_between_riders[i];
              lowest_gap = second_lowest_gap;
              priority_battle = i;
            }
          }
          // no other battles
          if (lowest_gap > max_gap_between_riders)
            battle_between_riders = false;
        }
        // no other battles
        else
          battle_between_riders = false;
      }
    }
    // If there's a battle, set the volume of the crowd constant based on the gap and position
    if (battle_between_riders) {
      var volume = (((((4 * numOfBattles) + numOfBleachers) / ((lowest_gap + 0.8) * (priority_battle + 1))) + (2 * crowd_constant_base_vol)) / vol_divisor);
      // If crowd has already reached desired calculated volume, return
      if (current_crowd_vol == volume) return;

      if (current_crowd_vol < crowd_constant_base_vol){
        current_crowd_vol = crowd_constant_base_vol;
      }

      // If volume is new, need to fade to new volume, get the time starting the increase/decrease
      if (volume != current_volume){
        time_started_increase_or_decrease = seconds;
        set_holder = false;
      }
      // volume holder
      current_volume = volume;

      // Another holder that holds the current crowd volume at the start of the fade
      if (!set_holder) {
        vol_holder = current_crowd_vol;
        set_holder = true;
        // sets reset values to false because this means that there is a battle fade going on
        got_time_start_reset = false;
        set_reset_holder = false;
        reset_crowd_default_vol = false;
      }

      // vol/sec calculated by (end vol - start vol) / fade time
      vol_per_sec = (current_volume - vol_holder) / vol_fade_time;
      // t is time in seconds since the start of the fade
      var t = seconds - time_started_increase_or_decrease;
      // current crowd volume is the start vol + (vol/sec * time since start of fade)
      // If there's an increase, vol/sec * t will be positive.  If there's a decrease, vol/sec * t will be negative. 
      current_crowd_vol = vol_holder + (vol_per_sec * t);

      for (var i = 0; i < numOfBleachers; i++) mx.set_sound_vol(crowdConstants[i], current_crowd_vol);

    }
    else if (!reset_crowd_default_vol) {
      if (!got_time_start_reset) {
        time_started_increase_or_decrease = seconds;
        got_time_start_reset = true;
      }
      // sets the start fade vol to the current crowd volume
      if (!set_reset_holder) {
        reset_holder = current_crowd_vol;
        set_reset_holder = true;
      }

      // vol/sec, t, and current crowd vol calculated just like above when battle fades happen
      vol_per_sec = (crowd_constant_base_vol - reset_holder) / vol_reset_fade_time;
      var t = seconds - time_started_increase_or_decrease;
      current_crowd_vol = reset_holder + (vol_per_sec * t);

      // if in the demo and crowd volume somehow exceeds the max crowd vol or is less than the base, reset to the base vol
      if (current_crowd_vol > max_crowd_vol || current_crowd_vol < crowd_constant_base_vol)
        current_crowd_vol = crowd_constant_base_vol;
        
      // set all crowd constant sounds to the current crowd volume calculated 
      for (var i = 0; i < numOfBleachers; i++)
        mx.set_sound_vol(crowdConstants[i], current_crowd_vol);

      // if crowd volume equals the base volume, the volume has been reset
      if (current_crowd_vol == crowd_constant_base_vol)
        reset_crowd_default_vol = true;
    }
  }
}

function checkPosChange(slot, position) {
  if (slot_position_holder[position] != slot) {
    ResetSlotPositionHolder(); 
    return true;
  }
  return false;
}

function startRoar(volume) {
  for (var i = 0; i < numOfBleachers; i++) {
    var randomNum = randomIntFromInterval(0, numOfCheerVariants - 1);
    mx.set_sound_vol(allCheerSounds[randomNum][i], volume);
    mx.start_sound(allCheerSounds[randomNum][i]);
  }
}

function initializeCheerAndBooVariantSounds() {
  var i, j;
  initializeCheerAndBooAllSoundArrays();
  // if there are the same number of variants do only one nested loop
  if (numOfBooVariants == numOfCheerVariants) {
    for (i = 0; i < numOfCheerVariants; i++) {
      for (j = 0; j < numOfBleachers; j++) {
        allCheerSounds[i][j] = mx.add_sound(cheerVariantDirectories[i]);
        allBooSounds[i][j] = mx.add_sound(booVariantDirectories[i]);
        mx.set_sound_freq(allCheerSounds[i][j], 44100);
        mx.set_sound_freq(allBooSounds[i][j], 44100);
        mx.set_sound_vol(allCheerSounds[i][j], 5);
        mx.set_sound_vol(allBooSounds[i][j], 5);
        mx.set_sound_pos(allCheerSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
        mx.set_sound_pos(allBooSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
      }
    }
  }
  // otherwise do two different nested loops
  else {
    for (i = 0; i < numOfBooVariants; i++) {
      for (j = 0; j < numOfBleachers; j++) {
        allBooSounds[i][j] = mx.add_sound(booVariantDirectories[i]);
        mx.set_sound_freq(allBooSounds[i][j], 44100);
        mx.set_sound_vol(allBooSounds[i][j], 5);
        mx.set_sound_pos(allBooSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
      }
    }
    for (i = 0; i < numOfCheerVariants; i++) {
      for (j = 0; j < numOfBleachers; j++) {
        allCheerSounds[i][j] = mx.add_sound(cheerVariantDirectories[i]);
        mx.set_sound_freq(allCheerSounds[i][j], 44100);
        mx.set_sound_vol(allCheerSounds[i][j], 5);
        mx.set_sound_pos(allCheerSounds[i][j], bleacherSoundPositions[j][0], bleacherSoundPositions[j][1], bleacherSoundPositions[j][2]);
      }
    }
  }
}

function initializeCheerAndBooAllSoundArrays(){
  var i;
  for (i = 0; i < numOfCheerVariants; i++)
    allCheerSounds.push([]);
  for (i = 0; i < numOfBooVariants; i++)
    allBooSounds.push([]);
}


/*
################################################
dynamic crowd and mechanic sounds based on rider
################################################
*/

// this number determines who the rider's mechanic is
var mechanicNumberIdentifiers = [];
var initialize_mechanic_identifiers = false;
var soundDelay = 0;
var initializeCheerAndBooVariants = false;
var playedScream = false;
var time_to_play_scream;
var playing_song = false;
var time_started_song = 20;
var current_song = -1;
function dynamicMechanicAndFans() {

	var randNumber, slot, timing_gate, i;
	var running_order = g_running_order;

	if (mx.seconds >= 0 && !initialize_mechanic_identifiers){
    if (mainEvent)
      time_to_play_scream = randomIntFromInterval(3,6);

		if (running_order.length > numOfMechanicPositions)
			mx.message('Warning: Not Every Rider Will Be Assigned a Mechanic');

		for (i = 0; i < running_order.length; i++){
      slot = running_order[i].slot;

      /* 
      if the running order is longer than the mechanic positions length,
      not all riders will be assigned a mechanic, only the ones within the confines
      of the mechanic positions length
      */

      // assign mechanic sounds based on slot num
			if (i <= numOfMechanicPositions){
        if (slot % 4 == 0)
          mechanicNumberIdentifiers[slot] = 3;
        else if (slot % 3 == 0)
          mechanicNumberIdentifiers[slot] = 2;
        else if (slot % 2 == 0)
          mechanicNumberIdentifiers[slot] = 1;
        else if (slot % 1 == 0)
          mechanicNumberIdentifiers[slot] = 0;
				
			}
		}
		initialize_mechanic_identifiers = true;
	}

  if (!initializeCheerAndBooVariants){
    initializeCheerAndBooVariantSounds();
    initializeCheerAndBooVariants = true;
  }

  if (mx.seconds > time_to_play_scream && !playedScream && mainEvent){
    for (var i = 0; i < main_event_screams.length; i++)
      mx.start_sound(main_event_screams[i]);
    playedScream = true;
  }

  if (playedScream && mx.seconds < time_to_play_scream) playedScream = false;

  if (songs_on)
    song_function();

	for (i = 0; i < running_order.length; i++){
		slot = running_order[i].slot;
		timing_gate = running_order[i].position;
		/*
		###################
		crowds at bleachers
		###################
		if you do not want boos/cheers just delete this whole if statement section
		*/ 
		if (timing_gate != current_timing_gates[slot] && (mx.seconds > soundDelay)){
			// Runs a loop every time someone hits a gate that's in the gatesAndPosCheerOrBoo array
			for (var x = 0; x < gatesAndPosCheerOrBoo.length; x++){
				// every lap, and first sound only plays when you hit the first timing gate in the slot
				if ((timing_gate - (gatesAndPosCheerOrBoo[x][0] + 1)) % normalLapLength == 0
				&& timing_gate >= gatesAndPosCheerOrBoo[x][0] + 1){
					// make's name comparison, sends in running order, index, and the array
					makeNameComparison(slot, x);
          break;
				}
			}
		}
		/*
		##############
		mechanics area
		##############
		*/ 
		if (((timing_gate - (mechanicGate + 1)) % normalLapLength == 0) && 
    (timing_gate > ((mechanicGate + 1) * (lapToActivateMechanics - 1))) && 
    (timing_gate != current_timing_gates[slot])){
      var position = i + 1;
      // pick from first place prompts
			if (position == 1)
				randNumber = randomIntFromInterval(0,4);
      // pick from front running sounds for top 5 that's not first
			else if (position <= 5)
				randNumber = randomIntFromInterval(5,10);
      // pick from 6th-10th sounds
      else if (position <= 10)
				randNumber = randomIntFromInterval(11,15);
      // pick from midpack1 sounds (11th-15th)
      else if (position <= 15)
				randNumber = randomIntFromInterval(16,19);
      // pick from midpack2 sounds (16th-21st)
      else if (position <= 21)
				randNumber = randomIntFromInterval(20,24);
      // pick from last place prompts
      else if (position == running_order.length)
				randNumber = randomIntFromInterval(35,39);
      // pick from endpack sounds
      else
				randNumber = randomIntFromInterval(25,34);
      
      if (slot <= numOfMechanicPositions)
        assignPositionsForMechanicsAndPlaySound(slot, mechanicNumberIdentifiers, randNumber);
		}
	}
}


function song_function() {
  try {
    if (playing_song){
      if (mx.seconds > song_lengths[current_song] + time_started_song || mx.seconds - time_started_song < 0) {
        if (mx.seconds - time_started_song < 0) {
          current_song--;
        }
        for (var i = 0; i < numOfSpeakers; i++) {
          mx.stop_sound(songs[i][current_song]);
        }
        playing_song = false;
      }
    }
  
    if (!playing_song && mainEvent && mx.seconds > time_to_start_songs){
      current_song++;
      if (current_song == songs.length)
        current_song = 0;
      for (var i = 0; i < numOfSpeakers; i++){
        mx.start_sound(songs[i][current_song]);
      }
      playing_song = true;
      time_started_song = mx.seconds;
    }
  }
  catch(e){
    mx.message('song error' + e);
  }
}

function assignPositionsForMechanicsAndPlaySound(slotNumber, mechanicNumberIdentifiers, randNumber){
  var mechNum = mechanicNumberIdentifiers[slotNumber];
	mx.message('slot number: ' + slotNumber);
  mx.message('setting sound position for: [' + mechNum + '][' + randNumber + '] at ' + mechanicPositions[slotNumber]);
  mx.set_sound_pos(allMechanicSounds[mechNum][randNumber], mechanicPositions[slotNumber][0], mechanicPositions[slotNumber][1], mechanicPositions[slotNumber][2]);
  mx.start_sound(allMechanicSounds[mechNum][randNumber]);
}

function makeNameComparison(slot, benchPos){
	var riderName = mx.get_rider_name(slot).toLowerCase();
  var randNumber;
	for (var i = 0; i < cheerRiderNames.length; i++){
		if (riderName.includes(cheerRiderNames[i])){
      // cheer sounds have a 5% chance of playing
      randNumber = randomIntFromInterval(0, 19);
      if (randNumber == 2){
        randNumber = randomIntFromInterval(0, (numOfCheerVariants - 1));
        mx.start_sound(allCheerSounds[randNumber][benchPos]);
        // delay so sounds don't overlay
        soundDelay = mx.seconds + 3;
      }
      break;
		}
	}
	for (var i = 0; i < booRiderNames.length; i++){
		if (riderName.includes(booRiderNames[i])){
      // boo sounds have a 5% chance of playing
      randNumber = randomIntFromInterval(0, 19);
      if (randNumber == 1){
        randNumber = randomIntFromInterval(0, (numOfBooVariants - 1));
        mx.start_sound(allBooSounds[randNumber][benchPos]);
        // delay so sounds don't overlay
        soundDelay = mx.seconds + 3;
      }
      break;
		}
	}
}

// Make name comparison at the finish to determine if the rider should be booed or not when they win
function makeNameComparisonFinish(name) {
	var booSoundMatch = false;
  var randNumber;
	
	for (var i = 0; i < booRiderNames.length; i++) {
		if (name.includes(booRiderNames[i])){
			booSoundMatch = true;
      break;
		}
	}
	if (booSoundMatch) {
		for (var i = 0; i < numOfBleachers; i++) {
      randNumber = randomIntFromInterval(0, (allBooSounds.length - 1));
			mx.start_sound(allBooSounds[randNumber][i]);
		}		
	}
  else {
		for (var i = 0; i < numOfBleachers; i++) {
      randNumber = randomIntFromInterval(0, (allCheerSounds.length - 1));
			mx.start_sound(allCheerSounds[randNumber][j]);
		}
  }
}

var playFinishSoundAndFlame = false;
function laps_remaining_string(l) {
   if (l == 0) {
     if (racingEvent) {
      if (!playFinishSoundAndFlame) {
        if (mainEvent) {
          var firstPlaceName = mx.get_rider_name(g_running_order[0].slot);
          triggerAllFlameSounds();
          triggerFireworkSounds();
          makeNameComparisonFinish(firstPlaceName);
          mx.message(firstPlaceName + ' wins the race!');
        }
        // someone wins a heat or lcq
        else
          triggerCrowdRoar(0.4);
        playFinishSoundAndFlame = true;
      }
     }
	   return "Finish";
   }
   if (l == 1) {
      if (mainEvent && playFinishSoundAndFlame)
        playFinishSoundAndFlame = false;
      return "Final Lap";
   }
   return l.toFixed(0) + " Laps"
}

function time_or_laps_remaining() {
   var t, l;

   if (g_finish_time == 0)
      return laps_remaining_string(g_finish_laps - mx.index_to_lap(g_running_order[0].position));

   t = time_remaining();

   if (t == 0) {
      l = laps_remaining();
      if (l <= g_finish_laps)
         return laps_remaining_string(l);
   }

   return time_to_string(t);
}
function laps_remaining() {
   final_lap = laps_before_time(g_finish_time) + 1 + g_finish_laps;

   return final_lap - mx.index_to_lap(g_running_order[0].position);
}

function laps_before_time(seconds) {
   var r, i, last, t;

   if (seconds == 0)
      return 0;

   seconds += mx.get_gate_drop_time();

   r = g_running_order;

   last = mx.index_to_lap(r[0].position);

   /* search backwards to find leader's last lap before time expired */
   for (i = last; i > 0; i--) {
      t = mx.get_timing(r[0].slot, mx.lap_to_index(i));
      if (t < seconds)
         break;
   }

   /* search entire field forwards to find last lap before time expired */
   for (; i <= last; i++) {
      if (!index_reached_before(mx.lap_to_index(i), seconds))
         break;
   }

   return i - 1;
}

function time_remaining() {
   var drop = mx.get_gate_drop_time();
   var secs = mx.seconds - drop;

   if (drop < 0 || secs < 0)
      return g_finish_time;

   return Math.max(0.0, g_finish_time - secs);
}

function index_reached_before(index, seconds) {
   var i, r, t;

   r = g_running_order;

   for (i = 0; i < r.length; i++) {
      t = mx.get_timing(r[i].slot, index);
      if (t >= 0 && t < seconds)
         return true;
   }

   return false;
}

/*
########################################
get, sort, and display laptimes function
########################################
*/
var best_player_laps = [];
var all_player_laps = [];
var gotRunningOrder = false;
var displayLeadLap = false;
var debug_laps = true;

function displayLaptimes() {
	var riderName;
	var r, slot, timing_gate;
	var laptimeToString;

  r = g_running_order;

	if (!gotRunningOrder && mx.seconds >= 0) {
		// sets an unchanging running order for storing unchanging element positions
		for (var i = 0; i < r.length; i++) {
			// best laps set to undefined time for every rider at the start of the session
			best_player_laps[r[i].slot] = [undefinedTime, r[i].slot];
      all_player_laps[r[i].slot] = [undefinedTime];
		}
		// update screen on start
		if (!racingEvent)
      update_screen();
  
		gotRunningOrder = true;
	}

	for (var i = 0; i < r.length; i++) {
		// initialize rider names array
		slot = r[i].slot;
		timing_gate = r[i].position;
    riderName = mx.get_rider_name(slot);
  
		if ((timing_gate - firstLapLength) % normalLapLength == 0 && (timing_gate > 0) && (timing_gate != firstLapLength) && (timing_gate != current_timing_gates[slot])) {
      var laptime = get_laptime(slot, timing_gate);

      // store laptime, if its the second lap we want to replace undefinedTime. If not second lap, append.
      if (timing_gate > firstLapLength + normalLapLength)
        all_player_laps[slot][all_player_laps[slot].length] = laptime;
      else
        all_player_laps[slot][0] = laptime;
      
      var new_pb = false;

			// if 2nd lap, replace pb of 0
			if (timing_gate == (firstLapLength + normalLapLength))
        new_pb = true;

			// not 2nd lap, check to see if lap is faster
			else if (best_player_laps[slot][0] > laptime)
        new_pb = true;

      if (new_pb) {
        best_player_laps[slot][0] = laptime;
				laptimeToString = time_to_string(laptime);
      
				// update screen
				if (!racingEvent) {
          update_screen();
          // Display person ran best lap of the session
          if (is_fastest_lap(laptime))
            mx.message("\x1b[42m" + riderName + '\x1b[0m runs fastest lap of the session: \x1b[32m' + laptimeToString);
        }
      }
		}
  }
}

function is_fastest_lap(laptime) {

  var best_player_laps_srtd = best_player_laps.slice();
  best_player_laps_srtd.sort(function (a, b){return a[0] - b[0];});
  var best_lap = best_player_laps_srtd[0][0];
  if (best_lap == laptime)
    return true;
  
  return false;
}

function get_laptime(slot, current_gate) {
  var end_gate = current_gate - 1;
  var start_gate = end_gate - normalLapLength;
  var start_lap = mx.get_timing(slot, start_gate);
  var finish_lap = mx.get_timing(slot, end_gate);
  return finish_lap - start_lap;
}

function break_time(t) {
   var min, sec, ms;

   ms = Math.floor(t * 1000.0);
   sec = Math.floor(ms / 1000);
   min = Math.floor(sec / 60);

   ms -= sec * 1000;
   sec -= min * 60;

   return { min: min, sec: sec, ms: ms };
}

function left_fill_string(s, pad, n) {

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
function time_to_string(t) {
   var s;

   t = break_time(t);

   s = left_fill_string(t.min.toString(), " ", 0) + ":";
   s += left_fill_string(t.sec.toString(), "0", 2) + ".";
   s += left_fill_string(t.ms.toString(), "0", 3);

   return s;
}

var initialize_down_gates = false;
var down_check_gates = [];
var startDelay = undefinedTime;
var crashSoundDelay;
var initializeGateChecksDownedRiders = false;
var initializedSlotsAndNames = false;
var timeFirstCrashed, timeSecondCrashed, timeThirdCrashed;
/*
###############################
is rider in top 3 down function
TODO: REWRITE FUNCTION TO WORK WITH ANY NUMBER OF PEOPLE
###############################
*/
function isRiderDown() {
	var oneHappened = false;
	var bothHappened = false;
	var display123 = false;
	var display12 = false;
	var display13 = false;
	var display23 = false;
  var seconds = mx.seconds;
	var r;
	// runningOrder is stored as the running order
	r = g_running_order;

	// store names and slots in local variables and initialize check gates
  if (!initialize_down_gates) {
    for (var i = 0; i < r.length; i++) {
      down_check_gates[r[i].slot] = 0;
      if (i == r.length - 1) 
        initialize_down_gates = true;
	  }
  }

  // wait 20 seconds after gate drop until checking for the top 3 riders going down
  if (gateDropped) 
		startDelay = gateDropTime + 20;
	
  // Local variables to hold values so api is not referrenced so frequently.
	var firstPlaceGate, secondPlaceGate, thirdPlaceGate, 
	firstPlaceRiderDownValue, secondPlaceRiderDownValue, thirdPlaceRiderDownValue,
  firstPlaceName, secondPlaceName, thirdPlaceName;
	
  try {
    if (r.length > 0) {
      firstPlaceGate = mx.get_timing_position(r[0].slot);
	    firstPlaceRiderDownValue = mx.get_rider_down(r[0].slot);
      firstPlaceName = mx.get_rider_name(r[0].slot);
    }
    if (r.length > 1) {
      secondPlaceGate = mx.get_timing_position(r[1].slot);
	    secondPlaceRiderDownValue = mx.get_rider_down(r[1].slot);
      secondPlaceName = mx.get_rider_name(r[1].slot);
    }
	  if (r.length > 2) {
      thirdPlaceGate = mx.get_timing_position(r[2].slot);
	    thirdPlaceRiderDownValue = mx.get_rider_down(r[2].slot);
      thirdPlaceName = mx.get_rider_name(r[2].slot);
    }
  }
  catch (e) {
    mx.message(e.toString());
  }
	
	/*
	###############################################################
	IF FIRST IS DOWN, KEEP CHECKING FOR SECOND AND THIRD BEING DOWN
	IF SECOND IS DOWN, KEEP CHECKING FOR FIRST AND THIRD BEING DOWN
	IF THIRD IS DOWN, KEEP CHECKING FOR FIRST AND SECOND BEING DOWN
	###############################################################
	*/
	try {	
    //is a rider down?
	  if ((firstPlaceRiderDownValue == 1 || secondPlaceRiderDownValue == 1 || thirdPlaceRiderDownValue == 1) && seconds > startDelay) {	
	  	//if first is down, player slot isn't empty, and rider isn't at down_check_gates
	  	if (firstPlaceRiderDownValue == 1 && (r[0].slot != null) 
	  	&& (firstPlaceGate != down_check_gates[r[0].slot])) {	
	  		// if first place is down and happened to roll into the next timing gate after their gate check
	  		if (firstPlaceGate == (down_check_gates[r[0].slot] + 1) && seconds < (timeFirstCrashed + 4)) {
          down_check_gates[r[0].slot] = firstPlaceGate;
	  			// do not execute function
	  			return;
	  		}
        down_check_gates[r[0].slot] = firstPlaceGate;
	  		timeFirstCrashed = seconds;
	  		if (r.length > 1 && r.length > 2) {
	  				// if second is down, third is down, and have not already displayed 1st 2nd and 3rd down
	  			if (secondPlaceRiderDownValue == 1 && thirdPlaceRiderDownValue == 1 && !display123) {
	  				// if first, second, and third crashed in the same timing gate roughly at the same time
	  				if (firstPlaceGate == secondPlaceGate
	  				&& firstPlaceGate == thirdPlaceGate
	  				&& (timeFirstCrashed - timeThirdCrashed <= 2 && timeFirstCrashed - timeSecondCrashed <= 2)) {
	  					playCrashSound(2);
	  					// first, second, and third crashed together
	  					mx.message('Leader ' + firstPlaceName + ', 2nd place ' + secondPlaceName + ', and 3rd place ' + thirdPlaceName + ' all go down together!');
	  				}
	  				else {
	  					// if first, second, and third crashed within 2 seconds
	  					if ((timeFirstCrashed - timeThirdCrashed <= 2) && (timeFirstCrashed - timeSecondCrashed <= 2)) {
	  						playCrashSound(1.9);
	  						// first, second, and third all crashed at the same time
	  						mx.message('Leader ' + firstPlaceName + ', 2nd place ' + secondPlaceName + ', and 3rd place ' + thirdPlaceName + 
	  						' crash at the same time! Damn this class sucks...');
	  					}
	  					else {
	  						playCrashSound(1.8);
	  						// first crashed while second and third were down
	  						mx.message('Leader ' + firstPlaceName + ' decided to join 2nd ' + secondPlaceName + ' and 3rd ' + thirdPlaceName + ' on the ground');
	  					}

	  				}
	  				bothHappened = true;
	  				display123 = true;
	  			}
        
	  			// if third is down, both others didn't crash, one other didn't crash, and not displayed 1st and 3rd down
	  			if (thirdPlaceRiderDownValue == 1 && !bothHappened && !oneHappened && !display13) {
	  				// if first and third crashed within 2 seconds of each other and in the same timing gate
	  				if (firstPlaceGate == thirdPlaceGate && timeFirstCrashed - timeThirdCrashed <= 2) {
	  					playCrashSound(1.5);
	  					// first and third crashed together
	  					mx.message('Leader ' + firstPlaceName + ' and 3rd place ' + thirdPlaceName + ' crashed together');
	  				}
	  				else {
	  					// if first and third crashed within 2 seconds of each other
	  					if (timeFirstCrashed - timeThirdCrashed <= 2) {
	  						playCrashSound(1.4);
	  						// first and third crashed at the same time
	  						mx.message('Leader ' + firstPlaceName + ' and 3rd place ' + thirdPlaceName + ' crashed at the same time');
	  					}
	  					else {
	  						playCrashSound(1.3);
	  						// first crashed while third was down
	  						mx.message('Leader ' + firstPlaceName + ' decided to throw like 3rd place ' + thirdPlaceName + ' did');
	  					}

	  				}
	  				oneHappened = true;
	  				display13 = true;
	  			}
        
	  			// if second is down, both others didn't crash, one other didn't crash and haven't displayed 1st and 2nd down
	  			if (secondPlaceRiderDownValue == 1 && !bothHappened && !oneHappened && !display12) {
	  				// if first crashed in the same timing gate and within 2 seconds of second crashing
	  				if (firstPlaceGate == secondPlaceGate && (timeSecondCrashed - timeFirstCrashed <= 2)) {
	  					playCrashSound(1.6);
	  					// first and second crashed together
	  					mx.message('Leader ' + firstPlaceName + ' and 2nd place ' + secondPlaceName + ' end their lives together');
	  				}
	  				else {
	  					// if first and second crashed within 2 seconds of each other but weren't in the same timing gate
	  					if (timeFirstCrashed - timeSecondCrashed <= 2) {
	  						playCrashSound(1.5);
	  						// first crashed at the same time as second
	  						mx.message('Leader ' + firstPlaceName + ' and 2nd place ' + secondPlaceName + ' crash at the same time like a bunch of idiots');
	  					}
	  					// first and second crashed at different times at different timing gates
	  					else {
	  						playCrashSound(1.4);
	  						// first crashed while second was down
	  						mx.message('Leader ' + firstPlaceName + ' threw so hard after his spotter said 2nd place ' + secondPlaceName + ' was down');
	  					}

	  				}
	  				oneHappened = true;
	  				display12 = true;
	  			}
	  		}
        // if one other rider wasn't already down or both other riders aren't already down
	  		if (!oneHappened && !bothHappened) {
	  			playCrashSound(1.3);
	  			// first crashed by themselves
	  			mx.message('Leader ' + firstPlaceName + ' crashes hard!');
	  		}
	  	}
    
	  		// second is down, player slot is not null, and rider is not at their down_check_gates
	  	if (secondPlaceRiderDownValue == 1 && r.length > 1 
	  	&& secondPlaceGate != down_check_gates[r[1].slot]) {
	  		// if there was a change where first moved into second, return and do not call the function
	  		if (checkPosChange(r[1].slot, 1)) {
	  			// reset the riders check gate check gate at the timing gate where the rider initially caused the crash
	  			down_check_gates[r[1].slot] = secondPlaceGate;
	  			// No need to set new first places check gate because they have passed the timing gate first was down without crashing
	  			return;
	  		}
	  		// second place is down and happened to roll into the next timing gate after their gate check
	  		if (secondPlaceGate == (down_check_gates[r[1].slot] + 1) && seconds < (timeSecondCrashed + 4)) {
          down_check_gates[r[1].slot] = secondPlaceGate;
	  			return;
	  		}
	  		down_check_gates[r[1].slot] = secondPlaceGate;
	  		// initialize the time that second crashed
	  		timeSecondCrashed = seconds;
      
	  		if (r.length > 2) {
	  				//if first is down, third is down, and have not already done 1st, 2nd, and 3rd down
	  			if (firstPlaceRiderDownValue == 1 && thirdPlaceRiderDownValue == 1 && !display123) {
	  				if (firstPlaceGate == secondPlaceGate 
	  				&& secondPlaceGate == thirdPlaceGate 
	  				&& (timeSecondCrashed - timeThirdCrashed <= 2 && timeSecondCrashed - timeFirstCrashed <= 2)) {
	  					//First, second, and third all crashed together
	  					playCrashSound(1.7);
	  					mx.message('2nd place ' + secondPlaceName + ', Leader ' + 
	  					firstPlaceName + ' and 3rd place ' + thirdPlaceName + ' decided it was a good idea to all crash together');
	  				}
	  				else {
	  					if ((timeSecondCrashed - timeThirdCrashed <= 2) && (timeSecondCrashed - timeFirstCrashed <= 2)) {
	  						// first second and third all crashed at the same time
	  						playCrashSound(1.6);
	  						mx.message('2nd place ' + secondPlaceName + ' sucks just as much as leader ' + 
	  						firstPlaceName + ' and 3rd place ' + thirdPlaceName);
	  					}
	  					else {
	  						// second crashed while first and third were down
	  						playCrashSound(1.5);
	  						mx.message('2nd place ' + secondPlaceName + ' joins leader ' + 
	  						firstPlaceName + ' and 3rd place ' + thirdPlaceName + ' in the dirt');
	  					}
	  				}
	  				bothHappened = true;
	  			}
        
	  			// if third is down, both other riders didn't already go down, and have not done 2nd and 3rd being down
	  			if (thirdPlaceRiderDownValue == 1 && !bothHappened && !display23) {
	  				if (secondPlaceGate == thirdPlaceGate && (timeSecondCrashed - timeThirdCrashed <= 2)) {
	  					playCrashSound(1.5);
	  					// second and third crashed together
	  					mx.message('2nd place ' + secondPlaceName + ' and 3rd place ' + thirdPlaceName + ' decide to crash together');
	  				}
	  				else {
	  					if (timeSecondCrashed - timeThirdCrashed <= 2) {
	  						playCrashSound(1.4);
	  						// second and third crashed at the same time
	  						mx.message('2nd place ' + secondPlaceName + ' and 3rd place ' + thirdPlaceName + ' decide to crash together');
	  					}
	  					else {
	  						playCrashSound(1.3);
	  						// second joined the ground with third
	  						mx.message('2nd place ' + secondPlaceName + ' crashes while 3rd place ' + thirdPlaceName + ' was down');
	  					}
	  				}
	  				oneHappened = true;
	  				display23 = true;
	  			}
        
	  			// if first is down, both other riders didn't already go down, and have not done 1st and 2nd being down
	  			if (firstPlaceRiderDownValue == 1 && !bothHappened && !display12) {
	  				// if 2nd crashed in the same timing gate as 1st and within 2 seconds
	  				if (firstPlaceGate == secondPlaceGate && (timeSecondCrashed - timeFirstCrashed <= 2)) {
	  					playCrashSound(1.5);
	  					// 2nd crashed with 1st
	  					mx.message('2nd place ' + secondPlaceName + ' crashes with leader ' + firstPlaceName);
	  				}
	  				else {
	  					// if 2nd crashed roughly at the same time as first
	  					if (timeSecondCrashed - timeFirstCrashed <= 2) {
	  						playCrashSound(1.4);
	  						// 2nd crashed at the same time as first place
	  						mx.message('2nd place ' + secondPlaceName + ' crashes at the same time as our Leader ' + firstPlaceName);
	  					}
	  					else {
	  						playCrashSound(1.2);
	  						// second crashed while first was down
	  						mx.message('2nd place ' + secondPlaceName + ' chokes realizing the leader ' + firstPlaceName + ' went down');
	  					}
	  				}
	  				oneHappened = true;
	  			}
	  		}
      
	  		if (!oneHappened && !bothHappened) {
	  			// second crashed by themselves
	  			playCrashSound(1.1);
	  			mx.message('2nd place ' + secondPlaceName + ' is down BAADD');
	  		}
	  	}
    
	  	//if third is down, player slot isn't null, and rider is not down in the down_check_gates
	  	if (thirdPlaceRiderDownValue == 1 && r.length > 2
	  	&& thirdPlaceGate != down_check_gates[r[2].slot]) {	
	  		if (checkPosChange(r[2].slot, 2)) {
          down_check_gates[r[2].slot] = thirdPlaceGate;
          return;
        }
	  		// if third place is down and happened to roll into the next timing gate after their gate check
	  		if (thirdPlaceGate == (down_check_gates[r[2].slot] + 1) && seconds < (timeThirdCrashed + 4)) {
          down_check_gates[r[2].slot] = thirdPlaceGate;
	  			// return and do not execute function
	  			return;
	  		}
        down_check_gates[r[2].slot] = thirdPlaceGate;
	  		timeThirdCrashed = seconds;
      
	  		//if first is down, second is down, and not already done 1st, 2nd, and 3rd down
	  		if (firstPlaceRiderDownValue == 1 && secondPlaceRiderDownValue == 1 && !display123) {
	  			// if third crashed in the same timing gate as first and second and within 2 seconds of their crashes
	  			if (thirdPlaceGate == firstPlaceGate 
	  			&& thirdPlaceGate == secondPlaceGate 
	  			&& (timeThirdCrashed - timeFirstCrashed <= 2 && timeThirdCrashed - timeSecondCrashed <= 2)) {
	  				playCrashSound(1.7);
	  				// third crashed together with first and second
	  				mx.message('3rd place ' + thirdPlaceName + ' is now crying that he, 2nd place ' + secondPlaceName +
	  				' and our leader ' + firstPlaceName + ' went down at the same time.');
	  			}
	  			else {
	  				// if time time third crashed is within 2 seconds of first and second
	  				if ((timeThirdCrashed - timeFirstCrashed <= 2) && (timeThirdCrashed - timeSecondCrashed <= 2)) {
	  					playCrashSound(1.6);
	  					// third crashed at the same time as first and second
	  					mx.message('3rd place ' + thirdPlaceName + ' is cheering that 2nd place ' + secondPlaceName +
	  					' and our leader ' + firstPlaceName + ' went down at the same time as him.');
	  				}
	  				else {
	  					playCrashSound(1.5);
	  					// third crashed while first and second were down
	  					mx.message('3rd place ' + thirdPlaceName + ' absolutely obliterates himself while 2nd place ' + secondPlaceName +
	  					' and our leader ' + firstPlaceName + ' are down.');
	  				}
	  			}
	  			bothHappened = true;
	  		}
      
	  		// if second is down, !bothHappened, and 2nd and 3rd down hasn't already been displayed
	  		if (secondPlaceRiderDownValue == 1 && !bothHappened && !display23) {
	  			// if third crashed in the same timing gate as second and within 2 seconds
	  			if (thirdPlaceGate == secondPlaceGate && (timeThirdCrashed - timeSecondCrashed <= 2)) {
	  				playCrashSound(1.4);
	  				// third crashed together with second
	  				mx.message('3rd place ' + thirdPlaceName + ' crashes with 2nd place ' + secondPlaceName);
	  			}
	  			else {
	  				// if third crashed within 2 seconds of second's crash
	  				if (timeThirdCrashed - timeSecondCrashed <= 2) {
	  					playCrashSound(1.3);
	  					// third crashed at the same time as second
	  					mx.message('3rd place ' + thirdPlaceName + ' crashes at the same time as 2nd place ' + secondPlaceName);
	  				}
	  				else {
	  					playCrashSound(1.2);
	  					// third crashed while second was down
	  					mx.message('3rd place ' + thirdPlaceName + ' crashes while 2nd place ' + secondPlaceName + ' is down');
	  				}
	  			}
	  			oneHappened = true;
	  		}
      
	  		// if first is down, !bothHappened, and have not already displayed 1st and 3rd down
	  		if (firstPlaceRiderDownValue == 1 && !bothHappened && !display13) {
	  			// if third crashed in the same timing gate as first and within 2 seconds of first crashing
	  			if (thirdPlaceGate == firstPlaceGate && timeThirdCrashed - timeFirstCrashed <= 2) {
	  				playCrashSound(1.4);
	  				// third crashed with first
	  				mx.message('3rd place ' + thirdPlaceName + ' crashes with the leader ' + firstPlaceName);
	  			}
	  			else {
	  				// if third crashed within 2 seconds of first crashing
	  				if (timeThirdCrashed - timeFirstCrashed <= 2) {
	  					playCrashSound(1.3);
	  					// third crashed at the same time as first
	  					mx.message('3rd place ' + thirdPlaceName + ' crashes at the same time as the leader ' + firstPlaceName);
	  				}
	  				else {
	  					playCrashSound(1.2);
	  					// third crashed while first was down
	  					mx.message('3rd place ' + thirdPlaceName + ' crashes while the leader ' + firstPlaceName + ' is down');
	  				}
	  			}
	  			oneHappened = true;
	  		}
	  		if (!oneHappened && !bothHappened) {
	  			playCrashSound(1);
	  			// third crashed by themselves
	  			mx.message('3rd place ' + thirdPlaceName + ' goes down hard');
	  		}
	  	}
	  }
	}
	catch (e){
		mx.message('chunk rider error: ' + e);
	}
}

function updateRunningOrderScreen() {
  var r = g_running_order;
  var slot, timing_gate;
  if (g_running_order.length > 1) {
    for (i = 0; i < r.length; i++) {
      slot = r[i].slot;
      timing_gate = r[i].position;
      if (timing_gate != current_timing_gates[slot]){
        if (checkPosChange(slot, i) || timing_gate == 1)
          update_screen();
      }
    }
  }
  else {
    timing_gate = r[0].position;
    if (timing_gate == 1 && timing_gate != current_timing_gates[slot])
      update_screen();
  }
}

function ResetSlotPositionHolder() {
  for (var i = 0; i < g_running_order.length; i++)
    slot_position_holder[i] = g_running_order[i].slot;
}

var initializedArrays = false;
function frameHandler(seconds) {
  g_running_order = mx.get_running_order();
  if (!initializedArrays) {
    reset_current_timing_gates();
    ResetSlotPositionHolder();
    initializedArrays = true;
  }

  if (stadium) updateCamPosition();
	gateSound();
  determineHoleshot();
  if (racingEvent) {
    isRiderDown();
    try {
      dynamicMechanicAndFans();
    }
    catch (e) {
      mx.message('dynamic sounds error: ' + e);
    }
    battlesFunction();
    updateRunningOrderScreen();
    do_pyro();
    rider_awards();
  }
  try {
		displayLaptimes();
	}
	catch (e) {
		mx.message('laptimes error: ' + e);
	}
  moveBales();
  time_or_laps_remaining();
	flaggers_frame_handler(seconds);
  reset_current_timing_gates();
  frameHandlerPrev(seconds);
}

var frameHandlerPrev = mx.frame_handler;
mx.frame_handler = frameHandler;

  // zero indexed, 0 is 1st, 1 is 2nd, etc.
var every_rider_finished = false;
var time_to_give_up = 30;
var riders_finished_flags = [];
var times_until_give_up = [];
var set_up_rider_finish_flags = false;
var set_seconds_at_first_finish = false;
var displayed_awards = false;
var first_calculations = true;

var rider_positions_after_L1 = [];
var rider_positions_finish = [];
var rider_positions_gained = [];

var most_consistent_rider;

function rider_awards() {

  if (!mainEvent) return;

  var r = g_running_order;
  var timing_gate, slot, rider_laps_remain;

  // stores rider start / finish positions
  for (var i = 0; i < r.length; i++) {
    slot = r[i].slot;
    timing_gate = r[i].position;

    if (!set_up_rider_finish_flags) {
      // set all to 1 so null slots will get recognized
      riders_finished_flags[slot] = 1;
      if (i == r.length - 1) {
        // set all flags that have a null slot to 1
        for (var j = 0; j < riders_finished_flags.length; j++) {
          if (!riders_finished_flags[j]) {
            riders_finished_flags[j] = 1;
          }
          else {
            riders_finished_flags[j] = 0;
          }
        }
        set_up_rider_finish_flags = true;
      }
    }
    // stores rider positions after lap 1
    if (timing_gate == firstLapLength && timing_gate != current_timing_gates[slot])
      rider_positions_after_L1[slot] = [(i + 1), slot];

    // if time has expired
    if (mx.seconds >= g_drop_time + g_finish_time || g_finish_time == 0) {
      // get laps that remain
      if (g_finish_time == 0 && g_finish_laps == 0)
        rider_laps_remain = 1 - g_running_order[0].position;
      else if (g_finish_time == 0)
        rider_laps_remain = g_finish_laps - mx.index_to_lap(g_running_order[0].position);
      else
        rider_laps_remain = laps_remaining();
      // if first has finished
      if (rider_laps_remain == 0) {
        // set up all times players have to hit the next timing gate except first
        if (!set_seconds_at_first_finish) {
          for (var j = 0; j < riders_finished_flags.length; j++) {
            if (riders_finished_flags[j] == 0 && j != r[0].slot) {
              times_until_give_up[j] = mx.seconds + time_to_give_up;
            }
          }
          set_seconds_at_first_finish = true;
        }
        // if rider has hit a new timing gate
        if (timing_gate != current_timing_gates[slot]) {
          // if rider hit the finish, set the position they finished and a flag that they have finished
          if ((timing_gate - firstLapLength) % normalLapLength == 0 || g_finish_laps == 0) {
            rider_positions_finish[slot] = [(i + 1), slot];
            riders_finished_flags[slot] = 1;
          }
          // if they haven't finished, but hit a new timing gate reset their time to give up
          else if (riders_finished_flags[slot] == 0) {
            times_until_give_up[slot] = mx.seconds + time_to_give_up;
          }
          else if (riders_finished_flags[slot] == 1) {
            riders_finished_flags[slot] = 0;
            times_until_give_up[slot] = undefined;
            if (every_rider_finished && displayed_awards) {
              every_rider_finished = false;
              displayed_awards = false;
            }
          }
        }
        // if current in game time is greater than the riders time to give up, set flag that they have finished
        else if (mx.seconds > times_until_give_up[slot] && riders_finished_flags[slot] == 0) {
          rider_positions_finish[slot] = [(i + 1), slot];
          riders_finished_flags[slot] = 1;
        }
      }
    }
  }

  // check every flag is set to 1, if it is we can now display awards
  if (!every_rider_finished) {
    every_rider_finished = true;
    for (var i = 0; i < riders_finished_flags.length; i++) {
      if (riders_finished_flags[i] != 1) {
        every_rider_finished = false;
        break;
      }
    }
  }

  if (every_rider_finished && !displayed_awards) {
    
    if (first_calculations) calculate_positions_gained();

    mx.message("\x1b[33m-----------");
    mx.message("\x1b[33mAwards:");
    mx.message("\x1b[33m-----------");
    mx.message("Note: Hard Charger / Anchor do not account for cuts.");
    mx.message("");
    
    // Holeshot
    var rider_name = mx.get_rider_name(holeshot_rider_slot);
    mx.message("\x1b[36m---------------------");
    mx.message("\x1b[36mHoleshot Award:");
    mx.message("\x1b[36m---------------------");
    mx.message("");
    if (rider_name)
      mx.message(rider_name.toString());
    else
      mx.message("Nobody");
    mx.message("");

    // Hard Charger Award
    var positions_gained = 0;
    if (rider_positions_gained[0]){
      positions_gained = rider_positions_gained[0][0];
      rider_name = mx.get_rider_name(rider_positions_gained[0][1]);
    }
    mx.message("\x1b[32m--------------------------");
    mx.message("\x1b[32mHard Charger Award:");
    mx.message("\x1b[32m--------------------------");
    mx.message("");
    if (positions_gained != 0)
      mx.message("\x1b[32m+" + positions_gained.toString() + ' Positions\x1b[0m - ' + rider_name.toString());
    else
      mx.message("Nobody");
    mx.message("");

    // Anchor Award
    if (positions_gained > 0) {
      if (rider_positions_gained[rider_positions_gained.length - 1]) {
        positions_gained = rider_positions_gained[rider_positions_gained.length - 1][0];
        rider_name = mx.get_rider_name(rider_positions_gained[rider_positions_gained.length - 1][1]);
      }
    }
    mx.message("\x1b[31m-------------------");
    mx.message("\x1b[31mAnchor Award:");
    mx.message("\x1b[31m-------------------");
    mx.message("");
    if (positions_gained != 0)
      mx.message("\x1b[31m" + positions_gained.toString() + ' Positions\x1b[0m - ' + rider_name.toString());
    else
      mx.message("Nobody");
    mx.message("");

    // On the Clock Award
    var fastest_rider = get_fastest_lap();
    rider_name = mx.get_rider_name(fastest_rider[1]);
    mx.message("\x1b[34m--------------------------");
    mx.message("\x1b[34mOn The Clock Award:");
    mx.message("\x1b[34m--------------------------");
    mx.message("");
    if (fastest_rider[0] != undefinedTime)
      mx.message("\x1b[34m" + time_to_string(fastest_rider[0]) + '\x1b[0m - ' + rider_name.toString());
    else
      mx.message("Nobody");
    mx.message("");

    // Consistency Award
    if (first_calculations) {
      most_consistent_rider = get_rider_consistency();
      first_calculations = false;
    }
    var std_dev = most_consistent_rider[0].toFixed(3);
    rider_name = mx.get_rider_name(most_consistent_rider[1]);
    mx.message("\x1b[35m-------------------------");
    mx.message("\x1b[35mConsistency Award:");
    mx.message("\x1b[35m-------------------------");
    mx.message("");
    if (most_consistent_rider) {
      mx.message('\x1b[35mStd. Dev: ' + std_dev.toString() + '\x1b[0m - ' + rider_name.toString());
    }
    else {
      mx.message("Nobody");
    }
      
    displayed_awards = true;
  }
}

// calculate stats
function calculate_positions_gained () {
  if (rider_positions_after_L1.length != rider_positions_finish.length) return;

  var num_null_arrs = 0;
  for (var i = 0; i < rider_positions_after_L1.length; i++) {
    if (rider_positions_after_L1[i] && rider_positions_finish[i]) {
      rider_positions_gained.push([]);
      // first store the number of positions gained
      rider_positions_gained[i - num_null_arrs][0] = rider_positions_after_L1[i][0] - rider_positions_finish[i][0];
      // then their slot number associated
      rider_positions_gained[i - num_null_arrs][1] = rider_positions_after_L1[i][1];
    } else {
      num_null_arrs++;
    }
  }
  // sort by largest num of positions gained.
  rider_positions_gained.sort(function (a, b){return b[0] - a[0];});
}

function get_fastest_lap() {
  // copy best_player_laps into temp array
  var best_player_laps_srtd = best_player_laps.slice();
  // srt array and return
  best_player_laps_srtd.sort(function (a, b){return a[0] - b[0];});
  return best_player_laps_srtd[0];
}

function get_rider_consistency() {
  // TODO: calculate the std deviation for each rider
  var avg_laps = [];
  var std_devs = [];

  for (var slot = 0; slot < all_player_laps.length; slot++) {
    var sum = 0;
    if (!all_player_laps[slot]) {
      avg_laps[slot] = undefined;
      std_devs[slot] = undefined;
    }
    else {
      // calculate average laptime for each player
      for (var j = 0; j < all_player_laps[slot].length; j++)
        sum += all_player_laps[slot][j];

      avg_laps[slot] = sum / all_player_laps[slot].length;

      // std deviation = sqrt((lap - avglap)^2 for all laps / num of laps)
      sum = 0;
      for (var j = 0; j < all_player_laps[slot].length; j++)
        sum += Math.pow(all_player_laps[slot][j] - avg_laps[slot],2);
      var variance = sum / all_player_laps[slot].length;
      var std_deviation = Math.sqrt(variance);
      std_devs[slot] = [std_deviation, slot];
    }
  }

  // sort by array by each rider's standard deviation
  std_devs.sort(function (a, b){return a[0] - b[0];})
  
  // filter out zeros and undefined.
  for (var i = 0; i < std_devs.length; i++) {
    if (!std_devs[i] || std_devs[i][0] <= 0) {
      std_devs.splice(i,1);
      i--;
    }
 }
  
  // returns an array with the consistency and slot associated
  return std_devs[0];
}

function reset_current_timing_gates(){
  var timingGate, slot;
  for (var i = 0; i < g_running_order.length; i++){
    slot = g_running_order[i].slot;
    timingGate = g_running_order[i].position;
    if (timingGate != current_timing_gates[slot]){
      // for demos going back in time, reset their down check gate
      if (timingGate < current_timing_gates[slot])
        down_check_gates[slot] = 0;
      current_timing_gates[slot] = timingGate;
    }
  }
}

var maxCrashRepetitions;
var maxRepCrashCounter = [];
var setMaxCrashRep = false;
function playCrashSound(multiplier) {
	var volume, randNumber;
	volume = multiplier;
	if (!stadium) {
		volume = multiplier;
    for (var i = 0; i < numOfCrashVariants; i++)
      maxRepCrashCounter[i] = 0;
    if (!setMaxCrashRep){ 
      maxCrashRepetitions = Math.ceil(numOfBleachers / numOfCrashVariants);
      setMaxCrashRep = true;
    }
		for (var i = 0; i < numOfBleachers; i++) {
      do {
        randNumber = randomIntFromInterval(0, numOfCrashVariants - 1);
      }
      while (maxRepCrashCounter[randNumber] >= maxCrashRepetitions)

      maxRepCrashCounter[randNumber]++;
			mx.set_sound_vol(crashSounds[i][randNumber], volume);
			mx.start_sound(crashSounds[i][randNumber]);
		}
	} else {
		// if the sounds are in a stadium, then just play a random variant for all the riders
		randNumber = randomIntFromInterval(0, numOfCrashVariants - 1);
		mx.set_sound_vol(crashSounds[randNumber], volume);
		mx.start_sound(crashSounds[randNumber]);
	}

}

// this variable is for determining if someone is going backwards in the demo
var backwards = false;
var holeshot_rider_slot;
function determineHoleshot(){ 
  var r = g_running_order;
  // this first if is for optimization so the rest isn't called after first is 2 gates away from the holeshot
  if (r[0].position <= (holeshotGate + 3)){ 
    if (r[0].position == (holeshotGate + 1) && !backwards) {
      if (!holeshot){
        holeshot_rider_slot = r[0].slot;
        firstPlaceName = mx.get_rider_name(holeshot_rider_slot);
        holeshot = true;
        if (mainEvent) {
          trigger_holeshot_pyro();
        }
      }
    }
    else {
      // for demos going backwards in time
      if (r[0].position >= (holeshotGate + 1))
        backwards = true;
      else
        backwards = false;
      
      holeshot = false;
    }
  }
}

var g_starter_start_pos = [ 312.8, 385.2 ];
var g_starter_end_pos = [ 284.7, 357.5 ];
var g_starter_feet_per_second = 10.0;
var g_starter_run_vector = [ 0, 0 ];
var g_starter_run_distance;
var g_starter_run_time;

movv2(g_starter_run_vector, g_starter_end_pos);
subv2(g_starter_run_vector, g_starter_start_pos);

g_starter_run_distance = Math.sqrt(dotv2(g_starter_run_vector, g_starter_run_vector));
g_starter_run_duration = g_starter_run_distance / g_starter_feet_per_second;
g_starter_run_start_time = 6.5;
g_starter_run_end_time = g_starter_run_start_time + g_starter_run_duration;

function update_starter() {
	var t = mx.seconds;
	var v = [ 0, 0 ];
	var a, f;


	if (t < g_starter_run_start_time)
		movv2(v, g_starter_start_pos);
	else if (t > g_starter_run_end_time) {
		movv2(v, g_starter_end_pos);
		pose_animate(g_flagger_idle, g_starter_index, t);
		pose_animate(g_flag_idle, g_30board_index, t);
		return;
	} else {
		movv2(v, g_starter_run_vector);
		scalev2(v, (t - g_starter_run_start_time) / g_starter_run_duration);
		addv2(v, g_starter_start_pos);
	}

	a = Math.atan2(g_starter_run_vector[0], g_starter_run_vector[1]) - Math.PI / 2.0;
	a -= Math.PI * 4.0; /* force vertical Y axis */
	mx.move_statue(g_starter_index, v[0], 3.9, v[1], a);
	mx.move_statue(g_30board_index, v[0], 3.9, v[1], a);

	/*
	 turn 0-11
	 show 12-17
	 1st step 18-28
	 run cycle 29-42
	*/

	f = Math.max(0.0, t - 5.0) * 16.0;

	if (f > 42.0)
		f = (f - 29.0) % 13.0 + 29.0;

	pose_animate_frame(g_flagger_start, g_starter_index, f);
	pose_animate_frame(g_flag_start, g_30board_index, f);
}

var g_last_lap = 1000000;
var g_halfway_lap = 1000000;
var g_drop_time = -1;
var g_finish_laps = mx.get_finish_laps();
var g_finish_time = mx.get_finish_time();

function update_last_lap() {
	var p, l;

	if (g_last_lap < 1000000) {
		/*
		 TODO: incrementally check if the last lap is wrong because of lag.
		 (e.g. leader hits lap x before buzzer but has enough lag that second place
		 temporarily looked like it had the lead and hit lap x after buzzer.)
		*/
		return;
	}

	if (g_finish_time == 0) {
		g_last_lap = g_finish_laps;
		g_halfway_lap = Math.floor(g_last_lap / 2);
		return;
	}

	p = mx.get_running_order_position(0);

	l = mx.index_to_lap(p);

	if (g_halfway_lap == 1000000 && mx.seconds >= g_drop_time + g_finish_time / 2)
		g_halfway_lap = l + 1;

	if (g_last_lap == 1000000 && mx.seconds >= g_drop_time + g_finish_time)
		g_last_lap = l + 1 + g_finish_laps;
}

var lastPlace;
var set_last_place = false;
var reset_last_place = false;
function update_finisher() {
	var p, l, last_lap, time_expired, near_finish;

  p = mx.get_running_order_position(0);

  if (p <= firstLapLength - 1 && !set_last_place) {
    lastPlace = g_running_order.length - 1;
    set_last_place = true;
    reset_last_place = false;
  }
  else
    set_last_place = false;

  if (p > firstLapLength - 1 && g_running_order.length > 1 && !reset_last_place) {
    var i, j;
    i = 0;
    j = 1;
    while (i == 0) {
      // keep looping until there is a person found with a position > 0
      if (g_running_order[g_running_order.length - j].position > 0) {
        i = 1;
        lastPlace = g_running_order.length - j;
        reset_last_place = true;
      }
      j++;
    }
  }

	if (g_drop_time < 0)
		g_drop_time = mx.get_gate_drop_time();

	update_last_lap();

	l = mx.index_to_lap(p + 1);

	last_lap = g_last_lap;

	time_expired = (mx.seconds >= g_drop_time + g_finish_time);

	near_finish = (mx.index_to_lap(l) == p);

	if (time_expired && near_finish)
		last_lap = Math.min(last_lap, l + g_finish_laps);

	if (l >= last_lap) {
		/* checkered */
		pose_animate(g_flagger_wave, g_finisher_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_green_flag_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_white_flag_index, mx.seconds);
		pose_animate(g_flag_wave, g_checkered_flag_index, mx.seconds);
	} else if (l == last_lap - 1 && g_running_order[0].position > 0) {
		/* white */
		pose_animate(g_flagger_wave, g_finisher_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_green_flag_index, mx.seconds);
		pose_animate(g_flag_wave, g_white_flag_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_checkered_flag_index, mx.seconds);
	} else if (l == g_halfway_lap) {
		/* green/white crossed */
		pose_animate(g_flagger_crossed, g_finisher_index, mx.seconds);
		pose_animate(g_flag_crossed, g_green_flag_index, mx.seconds);
		pose_animate(g_flag_crossed2, g_white_flag_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_checkered_flag_index, mx.seconds);
    // wave green flag until last active rider crosses finish for first lap
	} else if (l == 0 || (g_running_order[lastPlace].position < firstLapLength)) {
		if (p >= firstLapLength + normalLapLength - 2 || p < firstLapLength - 1) {
      // leader came around second lap without everyone crossing the first lap or first hasn't reached the finish on the first lap yet, idleAnimate
			idleAnimate();
			return;
		}
		/* green, first lap */
		pose_animate(g_flagger_wave, g_finisher_index, mx.seconds);
		pose_animate(g_flag_wave, g_green_flag_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_white_flag_index, mx.seconds);
		pose_animate(g_flag_on_ground, g_checkered_flag_index, mx.seconds);
	} else {
		/* green */
		idleAnimate();
	}
}

function idleAnimate() {
	pose_animate(g_flagger_idle, g_finisher_index, mx.seconds);
	pose_animate(g_flag_idle, g_green_flag_index, mx.seconds);
	pose_animate(g_flag_on_ground, g_white_flag_index, mx.seconds);
	pose_animate(g_flag_on_ground, g_checkered_flag_index, mx.seconds);
}

function check_flagger_gates(f) {
	var i, a;

	a = g_flaggers[f];
	for (i = 0; i < a.length; i++)
		if (g_yellow_gates[a[i]].length > 0)
			return true;

	return false;
}

var g_statue_poses = [];

function pose_animate_frame(anim, statue_index, frame) {
	if (!(statue_index in g_statue_poses))
		g_statue_poses[statue_index] = { anim:null, frame:-1 };

	if (g_statue_poses[statue_index].anim === anim
	 && g_statue_poses[statue_index].frame == frame)
		return;

	g_statue_poses[statue_index].anim = anim;
	g_statue_poses[statue_index].frame = frame;

	if ("cached_poses" in anim)
		mx.pose_statue_from_sequence(statue_index, anim.cached_poses, frame);
	else
		mx.pose_statue(statue_index, anim.bone_count, anim.rest_centers, anim.poses[frame].centers, anim.poses[frame].rotations);
}

function pose_animate(anim, statue_index, seconds) {
	var f;

	f = seconds * anim.fps % (anim.frame_count - 1);

	pose_animate_frame(anim, statue_index, f);
}

function cache_pose_sequence(anim) {
	if ("cache_pose_sequence" in mx)
		anim.cached_poses = mx.cache_pose_sequence(anim);
}

var g_active_slots = null;
var g_rider_down;
var g_yellow_gates;

function init_flagger_stuff() {
	var i;

	g_active_slots = mx.get_running_order();
	g_rider_down = [];
	for (i = 0; i < g_active_slots.length; i++) {
		g_active_slots[i] = g_active_slots[i].slot;
		g_rider_down.push([]);
	}

	g_yellow_gates = [];
	for (i = 0; i < g_firstlap.length; i++) {
		g_yellow_gates[g_firstlap[i]] = [];
	}
	for (i = 0; i < g_normallap.length; i++) {
		g_yellow_gates[g_normallap[i]] = [];
	}
}

function wrap_timing_position(t) {
	return g_firstlap.length + (t - g_firstlap.length) % g_normallap.length;
}

function gate_from_timing_position(t) {
	if (t < g_firstlap.length)
		return g_firstlap[t];

	return g_normallap[(t - g_firstlap.length) % g_normallap.length];
}

function add_to_array(a, i) {
	if (a.indexOf(i) == -1)
		a.push(i);
}

function remove_from_array(a, i) {
	var j;

	j = a.indexOf(i);

	if (j >= 0)
		a.splice(j, 1);
}

function check_yellow(i) {
	var j, slot, g;

	if (g_active_slots.length <= i)
		return;

	slot = g_active_slots[i];

	if (mx.get_rider_down(slot)) {
		if (g_debug && g_rider_down[i].length == 0)
			debug_message("Slot " + slot.toFixed(0) + " down!");
		g = gate_from_timing_position(mx.get_timing_position(slot));
		add_to_array(g_yellow_gates[g], i);
		add_to_array(g_rider_down[i], g);
		
	} else {
		if (g_debug && g_rider_down[i].length > 0)
			debug_message("Slot " + slot.toFixed(0) + " back up!");
		for (j = 0; j < g_rider_down[i].length; j++) {
			if (g_debug) debug_message("removing from " + g_rider_down[i][j])
			remove_from_array(g_yellow_gates[g_rider_down[i][j]], i)
		}
		g_rider_down[i].length = 0;
	}
}

var g_check_yellow_progress = 0;
function check_yellows() {
	var i = g_check_yellow_progress;

	check_yellow(i++);

	if (i >= g_active_slots.length)
		i = 0;

	g_check_yellow_progress = i;
}

/*
 How many flaggers to update per frame.
 Use flagger count for smoother animation.
 Use smaller number for better FPS.
*/
var g_flagger_updates_per_frame = 1;

var g_pose_flagger_progress = 0;
function flaggers_frame_handler(seconds) {
	var i, j, s;
	var n = Math.min(g_flagger_updates_per_frame, g_flagger_count);

	if (g_active_slots == null)
		init_flagger_stuff();

	try {
		for (j = 0; j < n; j++) {
			i = g_pose_flagger_progress;
			g_pose_flagger_progress = (i + 1) % g_flagger_count;
			s = seconds + i * 0.25; /* small time offset so flaggers won't be synchronized */
			if (check_flagger_gates(i)) {
				pose_animate(g_flagger_wave, g_first_flagger_index + i, s);
				pose_animate(g_flag_wave, g_first_yellow_flag_index + i, s);
			} else {
				pose_animate(g_flagger_idle, g_first_flagger_index + i, s);
				pose_animate(g_flag_idle, g_first_yellow_flag_index + i, s);
			}
		}
		update_starter();
		update_finisher();
		check_yellows();
	} catch (e) {
		mx.message("flag error: " + e);
	}

	return;
}

/*
################################################################################
## Exported poses
##
################################################################################
*/
var g_flagger_wave = 
/* Begin pose exported from flagger.blend (flaggerArmature / Wave) */
{
  bone_count: 12,
  frame_count: 22,
  fps: 16.000000,
  rest_centers: [
    -1.460000, 0.880000, 0.009999,
    1.460000, 0.880000, 0.009999,
    -0.560000, 0.880000, 0.010000,
    0.560000, 0.880000, 0.010000,
    3.610000, 0.880000, -1.170632,
    -0.000000, 1.215542, 0.007747,
    0.000000, -0.880241, 0.000000,
    -0.270000, -2.209999, -0.000001,
    0.270000, -2.210001, -0.000002,
    -0.270000, -0.880000, 0.000000,
    0.270000, -0.880000, -0.000000,
    0.000000, -0.202794, -0.000000,
  ],
  poses: [
    {
      centers: [
      -0.860509, 0.033677, 0.068582,
      0.781312, 0.389414, -0.711351,
      -0.560000, 0.880000, 0.010000,
      0.560000, 0.880000, 0.010000,
      -0.876938, 2.087259, -1.446926,
      0.000000, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.010033, 0.939493, 0.342421, -0.745508, 0.221192, -0.628722, -0.666421, -0.261586, 0.698181,
      -0.425459, 0.657003, -0.622361, 0.904958, 0.304314, -0.297395, -0.005997, -0.689740, -0.724033,
      0.333899, 0.940359, -0.065093, -0.745508, 0.221192, -0.628722, -0.576826, 0.258457, 0.774901,
      0.245903, -0.545096, -0.801500, 0.866398, 0.494367, -0.070402, 0.434611, -0.677106, 0.593836,
      -0.966833, -0.237246, 0.094597, -0.097785, 0.001678, -0.995206, 0.235950, -0.971448, -0.024821,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      ]
    },
    {
      centers: [
      -0.861074, 0.033677, 0.061083,
      0.887092, 0.379705, -0.657911,
      -0.560066, 0.880000, 0.005120,
      0.559891, 0.880000, 0.014878,
      -0.631979, 2.014211, -1.777855,
      -0.000067, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.013016, 0.939493, 0.342321, -0.740003, 0.221192, -0.635193, -0.672478, -0.261586, 0.692348,
      -0.343175, 0.600048, -0.722616, 0.929601, 0.327090, -0.169864, 0.134434, -0.730037, -0.670055,
      0.334454, 0.940359, -0.062181, -0.740003, 0.221192, -0.635193, -0.583556, 0.258457, 0.769846,
      0.363557, -0.555883, -0.747543, 0.855185, 0.517385, 0.031173, 0.369439, -0.650620, 0.663482,
      -0.979850, -0.189830, 0.062111, -0.040155, -0.117396, -0.992273, 0.195655, -0.974773, 0.107408,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999962, -0.000000, 0.008712, 0.000000, 1.000000, 0.000000, -0.008712, 0.000000, 0.999962,
      ]
    },
    {
      centers: [
      -0.862157, 0.033677, 0.043183,
      1.117308, 0.374548, -0.466776,
      -0.560051, 0.880000, -0.006515,
      0.559462, 0.880000, 0.026506,
      0.265931, 1.781886, -2.391962,
      -0.000228, 1.215542, 0.007744,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.020124, 0.939493, 0.341977, -0.726648, 0.221192, -0.650428, -0.686715, -0.261586, 0.678229,
      -0.060184, 0.458582, -0.886612, 0.901343, 0.406620, 0.149132, 0.428904, -0.790166, -0.437812,
      0.335673, 0.940359, -0.055220, -0.726648, 0.221192, -0.650428, -0.599422, 0.258457, 0.757558,
      0.619829, -0.561613, -0.548090, 0.766220, 0.583957, 0.268145, 0.169467, -0.586161, 0.792273,
      -0.991449, 0.003324, -0.130449, 0.120266, -0.364643, -0.923348, -0.050637, -0.931141, 0.361125,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999565, -0.000000, 0.029483, 0.000000, 1.000000, 0.000000, -0.029483, 0.000000, 0.999565,
      ]
    },
    {
      centers: [
      -0.862962, 0.033677, 0.021802,
      1.302000, 0.407736, -0.145034,
      -0.559718, 0.880000, -0.020393,
      0.558633, 0.880000, 0.040363,
      1.734625, 1.447116, -2.460026,
      -0.000420, 1.215542, 0.007736,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.028594, 0.939493, 0.341373, -0.710305, 0.221192, -0.668238, -0.703313, -0.261586, 0.661002,
      0.364972, 0.310594, -0.877682, 0.695293, 0.536011, 0.478812, 0.619163, -0.784999, -0.020325,
      0.336939, 0.940359, -0.046884, -0.710305, 0.221192, -0.668238, -0.618013, 0.258457, 0.742469,
      0.825963, -0.524738, -0.205996, 0.550913, 0.673910, 0.492280, -0.119495, -0.520091, 0.845710,
      -0.800317, 0.274446, -0.533078, 0.330031, -0.540636, -0.773817, -0.500572, -0.795231, 0.342105,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.998528, 0.000000, 0.054246, -0.000000, 1.000000, 0.000000, -0.054246, 0.000000, 0.998528,
      ]
    },
    {
      centers: [
      -0.863229, 0.033677, 0.003888,
      1.352247, 0.470306, 0.155902,
      -0.559174, 0.880000, -0.032004,
      0.557675, 0.880000, 0.051948,
      2.895552, 1.231151, -1.789543,
      -0.000581, 1.215542, 0.007725,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.035672, 0.939493, 0.340706, -0.696284, 0.221192, -0.682835, -0.716880, -0.261586, 0.646263,
      0.690341, 0.237004, -0.683563, 0.401344, 0.660663, 0.634388, 0.601957, -0.712288, 0.360962,
      0.337839, 0.940359, -0.039881, -0.696284, 0.221192, -0.682835, -0.633288, 0.258457, 0.729484,
      0.882857, -0.455216, 0.115505, 0.306880, 0.745345, 0.591849, -0.355511, -0.487072, 0.797730,
      -0.404079, 0.438734, -0.802641, 0.546598, -0.587766, -0.596458, -0.733451, -0.679738, -0.002307,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.997187, 0.000000, 0.074957, -0.000000, 1.000000, 0.000000, -0.074957, 0.000000, 0.997187,
      ]
    },
    {
      centers: [
      -0.863230, 0.033677, -0.003621,
      1.350667, 0.522233, 0.285744,
      -0.558875, 0.880000, -0.036867,
      0.557202, 0.880000, 0.056797,
      3.272115, 1.247740, -1.312855,
      -0.000648, 1.215542, 0.007720,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.038634, 0.939493, 0.340383, -0.690318, 0.221192, -0.688866, -0.722474, -0.261586, 0.640003,
      0.797130, 0.246144, -0.551360, 0.210962, 0.742056, 0.636276, 0.565755, -0.623511, 0.539588,
      0.338173, 0.940359, -0.036941, -0.690318, 0.221192, -0.688866, -0.639610, 0.258457, 0.723947,
      0.881627, -0.397519, 0.254386, 0.176807, 0.777960, 0.602925, -0.437576, -0.486577, 0.756154,
      -0.209110, 0.452463, -0.866920, 0.681887, -0.567970, -0.460913, -0.700930, -0.687523, -0.189760,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.996497, -0.000000, 0.083629, 0.000000, 1.000000, 0.000000, -0.083629, 0.000000, 0.996497,
      ]
    },
    {
      centers: [
      -0.863231, 0.033677, -0.003287,
      1.371664, 0.558679, 0.265004,
      -0.558889, 0.880000, -0.036651,
      0.557224, 0.880000, 0.056581,
      3.267495, 1.274451, -1.385894,
      -0.000645, 1.215542, 0.007720,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.038503, 0.939493, 0.340398, -0.690585, 0.221192, -0.688598, -0.722226, -0.261586, 0.640283,
      0.760870, 0.303690, -0.573454, 0.133138, 0.791866, 0.596006, 0.635099, -0.529831, 0.562074,
      0.338159, 0.940359, -0.037072, -0.690585, 0.221192, -0.688598, -0.639329, 0.258457, 0.724195,
      0.904933, -0.357023, 0.231581, 0.158426, 0.787711, 0.595325, -0.394964, -0.502041, 0.769388,
      -0.184849, 0.269771, -0.945015, 0.726189, -0.610413, -0.316299, -0.662178, -0.744728, -0.083070,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.996529, -0.000000, 0.083243, 0.000000, 1.000000, 0.000000, -0.083243, 0.000000, 0.996529,
      ]
    },
    {
      centers: [
      -0.863237, 0.033677, -0.000947,
      1.403499, 0.598948, 0.177891,
      -0.558986, 0.880000, -0.035136,
      0.557375, 0.880000, 0.055070,
      3.274255, 1.136704, -1.551393,
      -0.000624, 1.215542, 0.007722,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.037580, 0.939493, 0.340501, -0.692448, 0.221192, -0.686724, -0.720488, -0.261586, 0.642238,
      0.648533, 0.375204, -0.662290, 0.086707, 0.827998, 0.553987, 0.756233, -0.416704, 0.504451,
      0.338057, 0.940359, -0.037988, -0.692448, 0.221192, -0.686724, -0.637364, 0.258457, 0.725925,
      0.940137, -0.312280, 0.136468, 0.180045, 0.795115, 0.579117, -0.289354, -0.519879, 0.803741,
      -0.039101, -0.139806, -0.989407, 0.735094, -0.674717, 0.066289, -0.676836, -0.724715, 0.129153,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.996751, -0.000000, 0.080541, 0.000000, 1.000000, 0.000000, -0.080541, 0.000000, 0.996751,
      ]
    },
    {
      centers: [
      -0.863221, 0.033677, 0.005405,
      1.426553, 0.646044, 0.029248,
      -0.559230, 0.880000, -0.031022,
      0.557765, 0.880000, 0.050968,
      3.301679, 1.077683, -1.527178,
      -0.000567, 1.215542, 0.007727,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.035073, 0.939493, 0.340768, -0.697483, 0.221192, -0.681610, -0.715743, -0.261586, 0.647522,
      0.452176, 0.436109, -0.778040, 0.062613, 0.854639, 0.515433, 0.889728, -0.281782, 0.359141,
      0.337768, 0.940359, -0.040475, -0.697483, 0.221192, -0.681610, -0.632005, 0.258457, 0.730595,
      0.965320, -0.259952, -0.024132, 0.231207, 0.808312, 0.541457, -0.121247, -0.528259, 0.840382,
      0.319628, -0.601313, -0.732298, 0.629224, -0.443141, 0.638516, -0.708459, -0.664867, 0.236721,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.997317, -0.000000, 0.073205, 0.000000, 1.000000, 0.000000, -0.073205, 0.000000, 0.997317,
      ]
    },
    {
      centers: [
      -0.863054, 0.033677, 0.017778,
      1.413741, 0.698452, -0.170335,
      -0.559617, 0.880000, -0.023003,
      0.558439, 0.880000, 0.042967,
      3.102849, 1.460974, -1.449601,
      -0.000456, 1.215542, 0.007734,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.030185, 0.939493, 0.341236, -0.707181, 0.221192, -0.671542, -0.706388, -0.261586, 0.657715,
      0.176684, 0.461327, -0.869460, 0.055680, 0.877258, 0.476779, 0.982691, -0.132651, 0.129311,
      0.337154, 0.940359, -0.045312, -0.707181, 0.221192, -0.671542, -0.621468, 0.258457, 0.739579,
      0.950336, -0.201720, -0.237002, 0.293552, 0.833941, 0.467300, 0.103383, -0.513664, 0.851740,
      0.733013, -0.638236, -0.235261, 0.291761, -0.017428, 0.956332, -0.614465, -0.769644, 0.173437,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.998264, -0.000000, 0.058902, 0.000000, 1.000000, 0.000000, -0.058902, 0.000000, 0.998264,
      ]
    },
    {
      centers: [
      -0.862393, 0.033677, 0.038178,
      1.339972, 0.747946, -0.398162,
      -0.560004, 0.880000, -0.009765,
      0.559298, 0.880000, 0.029752,
      2.496991, 1.993935, -1.674748,
      -0.000273, 1.215542, 0.007742,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.022109, 0.939493, 0.341854, -0.722861, 0.221192, -0.654635, -0.690640, -0.261586, 0.674232,
      -0.145176, 0.430269, -0.890950, 0.057931, 0.902642, 0.426476, 0.987709, 0.010301, -0.155968,
      0.335988, 0.940359, -0.053271, -0.722861, 0.221192, -0.654635, -0.603808, 0.258457, 0.754066,
      0.867416, -0.146726, -0.475459, 0.338549, 0.874298, 0.347833, 0.364657, -0.462682, 0.808054,
      0.950892, -0.308716, 0.022354, 0.010569, 0.104563, 0.994462, -0.309344, -0.945389, 0.102691,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999377, -0.000000, 0.035283, 0.000000, 1.000000, 0.000000, -0.035283, 0.000000, 0.999377,
      ]
    },
    {
      centers: [
      -0.860509, 0.033677, 0.068582,
      1.194546, 0.780947, -0.620508,
      -0.560000, 0.880000, 0.010000,
      0.560000, 0.880000, 0.010000,
      1.603539, 2.271290, -2.109886,
      0.000000, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.010033, 0.939493, 0.342421, -0.745508, 0.221192, -0.628722, -0.666421, -0.261586, 0.698181,
      -0.457869, 0.333406, -0.824134, 0.050089, 0.935216, 0.350517, 0.887607, 0.119211, -0.444907,
      0.333899, 0.940359, -0.065093, -0.745508, 0.221192, -0.628722, -0.576826, 0.258457, 0.774901,
      0.705051, -0.110059, -0.700564, 0.332255, 0.924014, 0.189220, 0.626505, -0.366176, 0.688045,
      0.996971, 0.023628, -0.074098, 0.073494, 0.025490, 0.996970, 0.025445, -0.999396, 0.023676,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      ]
    },
    {
      centers: [
      -0.855552, 0.033677, 0.114935,
      0.964743, 0.785027, -0.818330,
      -0.558644, 0.880000, 0.040215,
      0.559723, 0.880000, -0.020245,
      0.432012, 2.227974, -2.427972,
      0.000418, 1.215542, 0.007736,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.008466, 0.939493, 0.342464, -0.778361, 0.221192, -0.587561, -0.627760, -0.261586, 0.733137,
      -0.707727, 0.194974, -0.679049, 0.017018, 0.965590, 0.259511, 0.706282, 0.172107, -0.686692,
      0.329898, 0.940359, -0.083022, -0.778361, 0.221192, -0.587561, -0.534154, 0.258457, 0.804909,
      0.450023, -0.105525, -0.886761, 0.259476, 0.965604, 0.016775, 0.854489, -0.237642, 0.461925,
      0.874905, 0.273546, -0.399641, 0.413453, 0.007817, 0.910492, 0.252186, -0.961827, -0.106260,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.998542, -0.000000, -0.053982, 0.000000, 1.000000, 0.000000, 0.053982, 0.000000, 0.998542,
      ]
    },
    {
      centers: [
      -0.846378, 0.033677, 0.169774,
      0.675120, 0.756252, -0.939862,
      -0.554896, 0.880000, 0.076095,
      0.557259, 0.880000, -0.056236,
      -0.761677, 1.933231, -2.260878,
      0.000915, 1.215542, 0.007693,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.030495, 0.939493, 0.341208, -0.814572, 0.221192, -0.536234, -0.579260, -0.261586, 0.772030,
      -0.871212, 0.055151, -0.487800, -0.042294, 0.981542, 0.186510, 0.489083, 0.183120, -0.852798,
      0.323869, 0.940359, -0.104088, -0.814572, 0.221192, -0.536234, -0.481229, 0.258457, 0.837627,
      0.130957, -0.137497, -0.981807, 0.129289, 0.984247, -0.120594, 0.982922, -0.111144, 0.146671,
      0.533866, 0.410862, -0.739040, 0.779431, 0.099746, 0.618497, 0.327833, -0.906225, -0.266987,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.992995, -0.000000, -0.118153, 0.000000, 1.000000, 0.000000, 0.118153, 0.000000, 0.992995,
      ]
    },
    {
      centers: [
      -0.835991, 0.033677, 0.215171,
      0.431478, 0.712090, -0.961956,
      -0.549985, 0.880000, 0.105909,
      0.553415, 0.880000, -0.086206,
      -1.541011, 1.555545, -1.807899,
      0.001329, 1.215542, 0.007632,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.048852, 0.939493, 0.339067, -0.842305, 0.221192, -0.491525, -0.536783, -0.261586, 0.802145,
      -0.946489, -0.058058, -0.317472, -0.109783, 0.982944, 0.147542, 0.303491, 0.174500, -0.936719,
      0.317785, 0.940359, -0.121402, -0.842305, 0.221192, -0.491525, -0.435357, 0.258457, 0.862360,
      -0.135485, -0.186566, -0.973056, -0.005302, 0.982234, -0.187587, 0.990765, -0.020256, -0.134067,
      0.099435, 0.378408, -0.920283, 0.944009, 0.256518, 0.207476, 0.314580, -0.889385, -0.331714,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.985179, -0.000000, -0.171532, 0.000000, 1.000000, 0.000000, 0.171532, 0.000000, 0.985179,
      ]
    },
    {
      centers: [
      -0.830912, 0.033677, 0.234016,
      0.333837, 0.689243, -0.950935,
      -0.547450, 0.880000, 0.118317,
      0.551325, 0.880000, -0.098696,
      -1.875212, 1.234858, -1.571795,
      0.001501, 1.215542, 0.007600,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.056505, 0.939493, 0.337876, -0.853202, 0.221192, -0.472356, -0.518511, -0.261586, 0.814076,
      -0.962555, -0.115048, -0.245464, -0.150267, 0.980075, 0.129894, 0.225629, 0.161915, -0.960664,
      0.314959, 0.940359, -0.128556, -0.853202, 0.221192, -0.472356, -0.415749, 0.258457, 0.871982,
      -0.241652, -0.211951, -0.946932, -0.065268, 0.977194, -0.202069, 0.968166, 0.012974, -0.249975,
      -0.180041, 0.214594, -0.959966, 0.906722, 0.414569, -0.077382, 0.381366, -0.884354, -0.269216,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.981049, 0.000000, -0.193761, -0.000000, 1.000000, 0.000000, 0.193761, 0.000000, 0.981049,
      ]
    },
    {
      centers: [
      -0.833388, 0.033677, 0.225039,
      0.340753, 0.682757, -0.944987,
      -0.548694, 0.880000, 0.112404,
      0.552357, 0.880000, -0.092743,
      -1.977696, 1.012014, -1.561148,
      0.001419, 1.215542, 0.007616,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.052857, 0.939493, 0.338466, -0.848057, 0.221192, -0.481532, -0.527262, -0.261586, 0.808435,
      -0.967994, -0.089415, -0.234503, -0.107026, 0.992229, 0.063454, 0.227007, 0.086521, -0.970042,
      0.316327, 0.940359, -0.125151, -0.848057, 0.221192, -0.481532, -0.425131, 0.258457, 0.867447,
      -0.235115, -0.219159, -0.946937, -0.013433, 0.974887, -0.222292, 0.971875, -0.039544, -0.232155,
      -0.301652, -0.049698, -0.952122, 0.808079, 0.516651, -0.282984, 0.505979, -0.854752, -0.115689,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.983082, 0.000000, -0.183168, -0.000000, 1.000000, 0.000000, 0.183168, 0.000000, 0.983082,
      ]
    },
    {
      centers: [
      -0.839330, 0.033677, 0.201753,
      0.362889, 0.666094, -0.930234,
      -0.551611, 0.880000, 0.097087,
      0.554725, 0.880000, -0.077331,
      -2.004711, 0.955261, -1.466461,
      0.001206, 1.215542, 0.007653,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.043414, 0.939493, 0.339806, -0.834324, 0.221192, -0.504953, -0.549562, -0.261586, 0.793444,
      -0.976039, 0.018514, -0.216806, 0.036403, 0.996225, -0.078810, 0.214528, -0.084814, -0.973028,
      0.319689, 0.940359, -0.116297, -0.834324, 0.221192, -0.504953, -0.449113, 0.258457, 0.855276,
      -0.213151, -0.237673, -0.947670, 0.122425, 0.955818, -0.267252, 0.969319, -0.172983, -0.174636,
      -0.436398, -0.361738, -0.823834, 0.674295, 0.474742, -0.565639, 0.595721, -0.802351, 0.036741,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.987800, 0.000000, -0.155730, -0.000000, 1.000000, 0.000000, 0.155730, 0.000000, 0.987800,
      ]
    },
    {
      centers: [
      -0.846406, 0.033677, 0.169633,
      0.401754, 0.641576, -0.909940,
      -0.554909, 0.880000, 0.076003,
      0.557268, 0.880000, -0.056143,
      -1.963370, 1.107781, -1.298299,
      0.000914, 1.215542, 0.007693,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.030438, 0.939493, 0.341213, -0.814483, 0.221192, -0.536370, -0.579389, -0.261586, 0.771933,
      -0.956862, 0.193129, -0.217062, 0.245096, 0.937745, -0.246095, 0.156021, -0.288680, -0.944628,
      0.323887, 0.940359, -0.104034, -0.814483, 0.221192, -0.536370, -0.481368, 0.258457, 0.837547,
      -0.172793, -0.264916, -0.948663, 0.309211, 0.899869, -0.307611, 0.935164, -0.346490, -0.073576,
      -0.608506, -0.578214, -0.543497, 0.468373, 0.291177, -0.834172, 0.640584, -0.762158, 0.093637,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.993015, 0.000000, -0.117988, -0.000000, 1.000000, 0.000000, 0.117988, 0.000000, 0.993015,
      ]
    },
    {
      centers: [
      -0.852720, 0.033677, 0.134344,
      0.459362, 0.607360, -0.884847,
      -0.557586, 0.880000, 0.052898,
      0.559119, 0.880000, -0.032957,
      -1.813421, 1.432285, -1.138499,
      0.000594, 1.215542, 0.007724,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.016245, 0.939493, 0.342183, -0.791510, 0.221192, -0.569724, -0.610940, -0.261586, 0.747211,
      -0.882424, 0.395588, -0.254632, 0.467565, 0.797336, -0.381625, 0.052061, -0.455812, -0.888552,
      0.327927, 0.940359, -0.090496, -0.791510, 0.221192, -0.569724, -0.515728, 0.258457, 0.816838,
      -0.110840, -0.302933, -0.946544, 0.507427, 0.801668, -0.315986, 0.854537, -0.515326, 0.064859,
      -0.769439, -0.606414, -0.200565, 0.185119, 0.088807, -0.978695, 0.611306, -0.790175, 0.043927,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.997058, 0.000000, -0.076656, -0.000000, 1.000000, 0.000000, 0.076656, 0.000000, 0.997058,
      ]
    },
    {
      centers: [
      -0.857218, 0.033676, 0.101763,
      0.538378, 0.557741, -0.851684,
      -0.559196, 0.880000, 0.031619,
      0.559968, 0.880000, -0.011634,
      -1.540961, 1.794222, -1.070725,
      0.000299, 1.215542, 0.007742,
      0.000000, -0.880241, 0.000000,
      -0.358990, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      -0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      0.003198, 0.939493, 0.342553, -0.769233, 0.221192, -0.599463, -0.638961, -0.261586, 0.723396,
      -0.750645, 0.569690, -0.334643, 0.658766, 0.606549, -0.445114, -0.050599, -0.554574, -0.830595,
      0.331136, 0.940359, -0.077939, -0.769233, 0.221192, -0.599463, -0.546470, 0.258457, 0.796599,
      -0.023989, -0.358066, -0.933388, 0.680274, 0.678315, -0.277698, 0.732565, -0.641621, 0.227311,
      -0.866784, -0.494218, 0.066584, -0.076993, 0.000709, -0.997032, 0.492704, -0.869338, -0.038666,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, -0.000000, -0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999254, 0.000000, -0.038619, -0.000000, 1.000000, 0.000000, 0.038619, 0.000000, 0.999254,
      ]
    },
    {
      centers: [
      -0.860509, 0.033677, 0.068582,
      0.781312, 0.389414, -0.711351,
      -0.560000, 0.880000, 0.010000,
      0.560000, 0.880000, 0.010000,
      -0.876938, 2.087259, -1.446926,
      0.000000, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.010033, 0.939493, 0.342421, -0.745508, 0.221192, -0.628722, -0.666421, -0.261586, 0.698181,
      -0.425459, 0.657003, -0.622361, 0.904958, 0.304314, -0.297395, -0.005997, -0.689740, -0.724033,
      0.333899, 0.940359, -0.065093, -0.745508, 0.221192, -0.628722, -0.576826, 0.258457, 0.774901,
      0.245903, -0.545096, -0.801500, 0.866398, 0.494367, -0.070402, 0.434611, -0.677106, 0.593836,
      -0.966833, -0.237246, 0.094597, -0.097785, 0.001678, -0.995206, 0.235950, -0.971448, -0.024821,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flaggerArmature / Wave) */
cache_pose_sequence(g_flagger_wave);

var g_flag_wave =
/* Begin pose exported from flagger.blend (flagArmature / Wave) */
{
  bone_count: 2,
  frame_count: 22,
  fps: 16.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      -0.876938, 2.087259, -1.446926,
      0.292035, 1.144968, -1.427065,
      ],
      rotations: [
      -0.966833, -0.237246, 0.094597, -0.097785, 0.001678, -0.995206, 0.235950, -0.971448, -0.024821,
      -0.960520, -0.199690, -0.193715, 0.186653, 0.053791, -0.980952, 0.206307, -0.978382, -0.014394,
      ]
    },
    {
      centers: [
      -0.631979, 2.014211, -1.777855,
      0.492441, 1.069761, -1.488918,
      ],
      rotations: [
      -0.979850, -0.189830, 0.062111, -0.040155, -0.117396, -0.992273, 0.195655, -0.974773, 0.107408,
      -0.943962, -0.217047, -0.248648, 0.279956, -0.127524, -0.951505, 0.174813, -0.967796, 0.181141,
      ]
    },
    {
      centers: [
      0.265931, 1.781886, -2.391962,
      1.048096, 0.901919, -1.486379,
      ],
      rotations: [
      -0.991449, 0.003324, -0.130449, 0.120266, -0.364643, -0.923348, -0.050637, -0.931141, 0.361125,
      -0.883171, -0.196284, -0.426006, 0.460553, -0.534990, -0.708292, -0.088882, -0.821741, 0.562887,
      ]
    },
    {
      centers: [
      1.734625, 1.447116, -2.460026,
      1.721718, 0.764920, -1.154369,
      ],
      rotations: [
      -0.800317, 0.274446, -0.533078, 0.330031, -0.540636, -0.773817, -0.500572, -0.795231, 0.342105,
      -0.674592, -0.103828, -0.730853, 0.428929, -0.860906, -0.273606, -0.600788, -0.498056, 0.625295,
      ]
    },
    {
      centers: [
      2.895552, 1.231151, -1.789543,
      2.146138, 0.742862, -0.630196,
      ],
      rotations: [
      -0.404079, 0.438734, -0.802641, 0.546598, -0.587766, -0.596458, -0.733451, -0.679738, -0.002307,
      -0.311770, -0.034598, -0.949528, 0.231691, -0.971939, -0.040659, -0.921476, -0.232674, 0.311038,
      ]
    },
    {
      centers: [
      3.272115, 1.247740, -1.312855,
      2.267365, 0.805299, -0.348321,
      ],
      rotations: [
      -0.209110, 0.452463, -0.866920, 0.681887, -0.567970, -0.460913, -0.700930, -0.687523, -0.189760,
      -0.097261, -0.047633, -0.994118, 0.193877, -0.980626, 0.028018, -0.976193, -0.190012, 0.104611,
      ]
    },
    {
      centers: [
      3.267495, 1.274451, -1.385894,
      2.246664, 0.907923, -0.394469,
      ],
      rotations: [
      -0.184850, 0.269771, -0.945015, 0.726189, -0.610413, -0.316299, -0.662178, -0.744728, -0.083070,
      -0.033501, -0.219677, -0.974997, 0.274590, -0.940026, 0.202362, -0.960977, -0.260945, 0.091813,
      ]
    },
    {
      centers: [
      3.274255, 1.136704, -1.551393,
      2.149310, 1.030434, -0.583742,
      ],
      rotations: [
      -0.039101, -0.139806, -0.989407, 0.735094, -0.674717, 0.066289, -0.676836, -0.724715, 0.129153,
      0.123860, -0.548074, -0.827208, 0.322741, -0.766052, 0.555880, -0.938348, -0.335826, 0.082003,
      ]
    },
    {
      centers: [
      3.301679, 1.077683, -1.527178,
      1.946555, 1.147570, -0.865498,
      ],
      rotations: [
      0.319628, -0.601313, -0.732298, 0.629224, -0.443141, 0.638516, -0.708459, -0.664867, 0.236721,
      0.435752, -0.799405, -0.413608, 0.254715, -0.331220, 0.908522, -0.863273, -0.501243, 0.059291,
      ]
    },
    {
      centers: [
      3.102849, 1.460975, -1.449601,
      1.616927, 1.228979, -1.170214,
      ],
      rotations: [
      0.733013, -0.638236, -0.235261, 0.291761, -0.017428, 0.956332, -0.614465, -0.769644, 0.173437,
      0.756252, -0.652404, 0.049518, 0.041208, 0.123026, 0.991547, -0.652982, -0.747819, 0.119923,
      ]
    },
    {
      centers: [
      2.496991, 1.993935, -1.674748,
      1.173019, 1.242756, -1.422754,
      ],
      rotations: [
      0.950891, -0.308716, 0.022354, 0.010569, 0.104563, 0.994462, -0.309344, -0.945389, 0.102691,
      0.942183, -0.287278, 0.172517, -0.079424, 0.308712, 0.947834, -0.325549, -0.906735, 0.268046,
      ]
    },
    {
      centers: [
      1.603539, 2.271290, -2.109886,
      0.667995, 1.164364, -1.568261,
      ],
      rotations: [
      0.996971, 0.023628, -0.074098, 0.073494, 0.025490, 0.996970, 0.025445, -0.999396, 0.023676,
      0.996662, 0.022676, -0.078428, 0.063129, 0.395081, 0.916475, 0.051767, -0.918366, 0.392330,
      ]
    },
    {
      centers: [
      0.432012, 2.227974, -2.427972,
      0.150856, 1.009248, -1.599236,
      ],
      rotations: [
      0.874905, 0.273546, -0.399641, 0.413453, 0.007817, 0.910492, 0.252186, -0.961827, -0.106260,
      0.807518, 0.211402, -0.550657, 0.361533, 0.560252, 0.745260, 0.466056, -0.800892, 0.375985,
      ]
    },
    {
      centers: [
      -0.761677, 1.933231, -2.260878,
      -0.326774, 0.819675, -1.500832,
      ],
      rotations: [
      0.533866, 0.410861, -0.739040, 0.779431, 0.099746, 0.618497, 0.327833, -0.906225, -0.266987,
      0.315009, 0.221723, -0.922826, 0.518404, 0.774271, 0.362989, 0.795001, -0.592742, 0.128960,
      ]
    },
    {
      centers: [
      -1.541011, 1.555546, -1.807899,
      -0.656984, 0.645324, -1.327048,
      ],
      rotations: [
      0.099435, 0.378408, -0.920283, 0.944009, 0.256518, 0.207476, 0.314580, -0.889385, -0.331714,
      -0.209216, 0.029231, -0.977433, 0.387547, 0.920182, -0.055434, 0.897795, -0.390398, -0.203845,
      ]
    },
    {
      centers: [
      -1.875212, 1.234858, -1.571795,
      -0.773101, 0.556938, -1.233217,
      ],
      rotations: [
      -0.180041, 0.214593, -0.959966, 0.906722, 0.414569, -0.077382, 0.381366, -0.884354, -0.269216,
      -0.438085, -0.228094, -0.869514, 0.140218, 0.938094, -0.316730, 0.887930, -0.260677, -0.378982,
      ]
    },
    {
      centers: [
      -1.977696, 1.012014, -1.561148,
      -0.772441, 0.579929, -1.214664,
      ],
      rotations: [
      -0.301652, -0.049698, -0.952122, 0.808079, 0.516651, -0.282984, 0.505979, -0.854752, -0.115689,
      -0.467981, -0.456201, -0.756885, 0.000922, 0.856206, -0.516634, 0.883738, -0.242473, -0.400267,
      ]
    },
    {
      centers: [
      -2.004711, 0.955261, -1.466461,
      -0.759557, 0.687385, -1.179559,
      ],
      rotations: [
      -0.436398, -0.361738, -0.823834, 0.674295, 0.474742, -0.565639, 0.595721, -0.802351, 0.036741,
      -0.522929, -0.627025, -0.577395, -0.040538, 0.694923, -0.717941, 0.851411, -0.352026, -0.388814,
      ]
    },
    {
      centers: [
      -1.963370, 1.107781, -1.298299,
      -0.698638, 0.863675, -1.159561,
      ],
      rotations: [
      -0.608506, -0.578214, -0.543497, 0.468373, 0.291177, -0.834172, 0.640584, -0.762158, 0.093637,
      -0.631499, -0.685905, -0.361584, -0.045064, 0.498011, -0.865999, 0.774066, -0.530583, -0.345403,
      ]
    },
    {
      centers: [
      -1.813421, 1.432285, -1.138499,
      -0.555427, 1.062287, -1.177673,
      ],
      rotations: [
      -0.769439, -0.606414, -0.200565, 0.185119, 0.088807, -0.978695, 0.611306, -0.790175, 0.043927,
      -0.765432, -0.619794, -0.173120, -0.047381, 0.322571, -0.945359, 0.641771, -0.715405, -0.276273,
      ]
    },
    {
      centers: [
      -1.540961, 1.794222, -1.070725,
      -0.324864, 1.212885, -1.236522,
      ],
      rotations: [
      -0.866784, -0.494218, 0.066584, -0.076994, 0.000709, -0.997032, 0.492704, -0.869338, -0.038666,
      -0.879643, -0.470891, -0.067010, -0.034449, 0.203591, -0.978450, 0.474386, -0.858378, -0.195309,
      ]
    },
    {
      centers: [
      -0.876938, 2.087259, -1.446926,
      0.292035, 1.144968, -1.427065,
      ],
      rotations: [
      -0.966833, -0.237246, 0.094597, -0.097785, 0.001678, -0.995206, 0.235950, -0.971448, -0.024821,
      -0.960520, -0.199690, -0.193715, 0.186653, 0.053791, -0.980952, 0.206307, -0.978382, -0.014394,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / Wave) */
cache_pose_sequence(g_flag_wave);

var g_flagger_start =
/* Begin pose exported from flagger.blend (flaggerArmature / Start) */
{
  bone_count: 12,
  frame_count: 43,
  fps: 16.000000,
  rest_centers: [
    -1.460000, 0.880000, 0.009999,
    1.460000, 0.880000, 0.009999,
    -0.560000, 0.880000, 0.010000,
    0.560000, 0.880000, 0.010000,
    3.610000, 0.880000, -1.170632,
    -0.000000, 1.215542, 0.007747,
    0.000000, -0.880241, 0.000000,
    -0.270000, -2.209999, -0.000001,
    0.270000, -2.210001, -0.000002,
    -0.270000, -0.880000, 0.000000,
    0.270000, -0.880000, -0.000000,
    0.000000, -0.202794, -0.000000,
  ],
  poses: [
    {
      centers: [
      -1.292943, 1.600030, -0.199169,
      1.316650, 1.449222, -0.375104,
      -0.559448, 1.130000, 0.026787,
      0.560048, 1.130000, -0.006796,
      1.860620, 3.700277, -0.797571,
      0.000232, 1.465542, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.235976, -0.819088, 0.522887, 0.072490, 0.521746, 0.850016, -0.969051, 0.238487, -0.063744,
      -0.278644, 0.917495, -0.283833, 0.900354, 0.146700, -0.409685, -0.334246, -0.369707, -0.866947,
      0.814995, -0.522256, 0.251062, 0.072490, 0.521746, 0.850016, -0.574916, -0.674559, 0.463079,
      0.840669, 0.354690, -0.409231, 0.280899, 0.360471, 0.889470, 0.463002, -0.862702, 0.203405,
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999550, -0.000000, -0.029985, 0.000000, 1.000000, 0.000000, 0.029985, 0.000000, 0.999550,
      ]
    },
    {
      centers: [
      -1.292943, 1.600030, -0.199169,
      1.316650, 1.449222, -0.375104,
      -0.559448, 1.130000, 0.026787,
      0.560048, 1.130000, -0.006796,
      1.860620, 3.700277, -0.797571,
      0.000232, 1.465542, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.235976, -0.819088, 0.522887, 0.072490, 0.521746, 0.850016, -0.969051, 0.238487, -0.063744,
      -0.278644, 0.917495, -0.283833, 0.900354, 0.146700, -0.409685, -0.334246, -0.369707, -0.866947,
      0.814995, -0.522256, 0.251062, 0.072490, 0.521746, 0.850016, -0.574916, -0.674559, 0.463079,
      0.840669, 0.354690, -0.409231, 0.280899, 0.360471, 0.889470, 0.463002, -0.862702, 0.203405,
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999550, -0.000000, -0.029985, 0.000000, 1.000000, 0.000000, 0.029985, 0.000000, 0.999550,
      ]
    },
    {
      centers: [
      -1.292943, 1.600030, -0.199169,
      1.316650, 1.449222, -0.375104,
      -0.559448, 1.130000, 0.026787,
      0.560048, 1.130000, -0.006796,
      1.860620, 3.700277, -0.797571,
      0.000232, 1.465542, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.235976, -0.819088, 0.522887, 0.072490, 0.521746, 0.850016, -0.969051, 0.238487, -0.063744,
      -0.278644, 0.917495, -0.283833, 0.900354, 0.146700, -0.409685, -0.334246, -0.369707, -0.866947,
      0.814995, -0.522256, 0.251062, 0.072490, 0.521746, 0.850016, -0.574916, -0.674559, 0.463079,
      0.840669, 0.354690, -0.409231, 0.280899, 0.360471, 0.889470, 0.463002, -0.862702, 0.203405,
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999550, -0.000000, -0.029985, 0.000000, 1.000000, 0.000000, 0.029985, 0.000000, 0.999550,
      ]
    },
    {
      centers: [
      -1.273251, 1.619426, -0.215711,
      1.308278, 1.418756, -0.418539,
      -0.557135, 1.131192, 0.026787,
      0.562359, 1.128801, -0.006796,
      1.906002, 3.606037, -0.889301,
      0.003261, 1.465538, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.231977, -0.818101, 0.526210, 0.070986, 0.525287, 0.847959, -0.970128, 0.234060, -0.063780,
      -0.285981, 0.904079, -0.317580, 0.898826, 0.138208, -0.415947, -0.332156, -0.404402, -0.852134,
      0.795685, -0.542482, 0.269442, 0.070986, 0.525287, 0.847959, -0.601537, -0.655582, 0.456472,
      0.828799, 0.322171, -0.457491, 0.315702, 0.405804, 0.857704, 0.461979, -0.855295, 0.234620,
      -0.950417, 0.030293, 0.309499, -0.303857, 0.121304, -0.944964, -0.066169, -0.992153, -0.106085,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999548, -0.002135, -0.029985, 0.002136, 0.999998, 0.000000, 0.029985, -0.000064, 0.999550,
      ]
    },
    {
      centers: [
      -1.217118, 1.667987, -0.258708,
      1.275132, 1.323670, -0.527720,
      -0.551022, 1.134312, 0.026787,
      0.568440, 1.125617, -0.006796,
      1.998431, 3.309494, -1.125085,
      0.011248, 1.465497, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.220873, -0.815101, 0.535561, 0.067682, 0.534989, 0.842143, -0.972951, 0.222254, -0.062996,
      -0.313010, 0.858991, -0.405165, 0.890853, 0.117653, -0.438793, -0.329250, -0.498289, -0.802061,
      0.740107, -0.592972, 0.317216, 0.067682, 0.534989, 0.842143, -0.669075, -0.601806, 0.436083,
      0.785213, 0.220058, -0.578804, 0.408137, 0.519035, 0.751018, 0.465687, -0.825940, 0.317740,
      -0.927802, 0.170448, 0.331859, -0.305153, 0.165020, -0.937896, -0.214626, -0.971450, -0.101093,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999520, -0.007763, -0.029985, 0.007766, 0.999970, 0.000000, 0.029984, -0.000233, 0.999550,
      ]
    },
    {
      centers: [
      -1.127974, 1.729211, -0.317160,
      1.199810, 1.155364, -0.655596,
      -0.542350, 1.138664, 0.026787,
      0.577007, 1.121058, -0.006796,
      2.045786, 2.776114, -1.416318,
      0.022538, 1.465363, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.204038, -0.809839, 0.550027, 0.064813, 0.549439, 0.833017, -0.976815, 0.205616, -0.059618,
      -0.371497, 0.771677, -0.516241, 0.868167, 0.091663, -0.487732, -0.329052, -0.629374, -0.703998,
      0.650693, -0.656163, 0.382163, 0.064813, 0.549439, 0.833017, -0.756570, -0.517269, 0.400044,
      0.692003, 0.038117, -0.720888, 0.530992, 0.649646, 0.544066, 0.489060, -0.759281, 0.429317,
      -0.857029, 0.371303, 0.357261, -0.287895, 0.229974, -0.929639, -0.427338, -0.899581, -0.090198,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999427, -0.015720, -0.029985, 0.015727, 0.999876, 0.000000, 0.029981, -0.000472, 0.999550,
      ]
    },
    {
      centers: [
      -1.013547, 1.786748, -0.379151,
      1.077677, 0.929715, -0.737834,
      -0.532367, 1.143568, 0.026787,
      0.586784, 1.115747, -0.006796,
      1.960184, 2.042937, -1.632833,
      0.035480, 1.465098, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.183708, -0.802360, 0.567864, 0.064399, 0.566631, 0.821451, -0.980869, 0.187477, -0.052423,
      -0.465377, 0.645881, -0.605196, 0.822244, 0.062379, -0.565707, -0.327628, -0.760886, -0.560101,
      0.534645, -0.714644, 0.451041, 0.064399, 0.566631, 0.821451, -0.842619, -0.410138, 0.348969,
      0.545437, -0.206704, -0.812263, 0.638756, 0.729974, 0.243164, 0.542669, -0.651468, 0.530188,
      -0.720247, 0.585019, 0.372823, -0.237504, 0.297001, -0.924869, -0.651795, -0.754681, -0.074970,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.999242, -0.024840, -0.029985, 0.024851, 0.999691, 0.000000, 0.029976, -0.000745, 0.999550,
      ]
    },
    {
      centers: [
      -0.889047, 1.828993, -0.433966,
      0.935274, 0.701503, -0.733491,
      -0.522339, 1.148381, 0.026787,
      0.596511, 1.110348, -0.006796,
      1.735327, 1.275524, -1.679977,
      0.048418, 1.464715, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.163092, -0.793517, 0.586286, 0.067254, 0.583919, 0.809021, -0.984316, 0.171375, -0.041865,
      -0.576460, 0.512716, -0.636252, 0.752736, 0.030243, -0.657627, -0.317934, -0.858025, -0.403374,
      0.407454, -0.756235, 0.511948, 0.067254, 0.583919, 0.809021, -0.910746, -0.295208, 0.288780,
      0.376404, -0.454273, -0.807438, 0.690285, 0.718805, -0.082617, 0.617921, -0.526265, 0.584139,
      -0.537777, 0.756354, 0.372458, -0.161445, 0.341217, -0.926016, -0.827485, -0.558122, -0.061390,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998973, -0.033959, -0.029985, 0.033974, 0.999423, 0.000000, 0.029968, -0.001019, 0.999550,
      ]
    },
    {
      centers: [
      -0.775093, 1.852550, -0.474746,
      0.813758, 0.527341, -0.664109,
      -0.513556, 1.152504, 0.026787,
      0.604956, 1.105565, -0.006796,
      1.463261, 0.663641, -1.586949,
      0.059702, 1.464285, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.145551, -0.784957, 0.602210, 0.072437, 0.598603, 0.797764, -0.986695, 0.159737, -0.030267,
      -0.673740, 0.409193, -0.615333, 0.674571, 0.000589, -0.738210, -0.301708, -0.912448, -0.276427,
      0.290598, -0.777828, 0.557258, 0.072437, 0.598603, 0.797764, -0.954099, -0.191463, 0.230296,
      0.232003, -0.642471, -0.730346, 0.685027, 0.640976, -0.346247, 0.690588, -0.419977, 0.588819,
      -0.360362, 0.859627, 0.362188, -0.087071, 0.355583, -0.930580, -0.928740, -0.366882, -0.053290,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998671, -0.041910, -0.029985, 0.041929, 0.999121, 0.000000, 0.029959, -0.001257, 0.999550,
      ]
    },
    {
      centers: [
      -0.692978, 1.861661, -0.499234,
      0.737214, 0.426735, -0.588064,
      -0.507324, 1.155379, 0.026787,
      0.610906, 1.102142, -0.006796,
      1.251985, 0.292480, -1.463971,
      0.067680, 1.463926, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.133700, -0.778599, 0.613113, 0.077563, 0.608549, 0.789716, -0.987982, 0.153140, -0.020973,
      -0.736635, 0.349696, -0.578862, 0.612040, -0.019423, -0.790589, -0.287709, -0.936662, -0.199720,
      0.206283, -0.784758, 0.584468, 0.077563, 0.608549, 0.789716, -0.975413, -0.117572, 0.186401,
      0.140344, -0.750452, -0.645852, 0.657174, 0.558506, -0.506156, 0.740558, -0.353401, 0.571561,
      -0.233795, 0.906409, 0.351801, -0.036369, 0.353423, -0.934757, -0.971606, -0.231336, -0.049663,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998420, -0.047533, -0.029985, 0.047554, 0.998869, 0.000000, 0.029951, -0.001426, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.661726, 1.863506, -0.507543,
      0.710971, 0.393989, -0.555250,
      -0.504956, 1.156460, 0.026787,
      0.613157, 1.100835, -0.006796,
      1.170975, 0.167191, -1.408606,
      0.070705, 1.463778, 0.007744,
      0.000000, -0.630241, 0.000000,
      -0.511088, -1.925261, -0.181857,
      0.493819, -1.930979, -0.162053,
      -0.270000, -0.630000, 0.000000,
      0.270000, -0.630000, -0.000000,
      0.000000, 0.047206, -0.000000,
      ],
      rotations: [
      -0.129367, -0.776149, 0.617136, 0.079809, 0.612197, 0.786667, -0.988380, 0.151022, -0.017254,
      -0.758560, 0.330600, -0.561507, 0.587282, -0.026446, -0.808951, -0.282289, -0.943400, -0.174095,
      0.174189, -0.785607, 0.593700, 0.079809, 0.612197, 0.786668, -0.981473, -0.089647, 0.169337,
      0.108682, -0.785385, -0.609392, 0.642465, 0.523286, -0.559831, 0.758569, -0.330669, 0.561454,
      -0.186616, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.944607, -0.176419, -0.276758, 0.136071, 0.977870, -0.158916, 0.298669, 0.112454, 0.947709,
      0.990273, 0.139040, 0.005236, -0.136763, 0.979596, -0.147266, -0.025605, 0.145118, 0.989083,
      0.983027, -0.183434, 0.003292, 0.181270, 0.973882, 0.136734, -0.028288, -0.133816, 0.990603,
      0.985510, 0.169616, -0.000560, -0.168285, 0.978179, 0.121843, 0.021214, -0.119983, 0.992549,
      0.998316, -0.049665, -0.029985, 0.049687, 0.998765, 0.000000, 0.029948, -0.001490, 0.999550,
      ]
    },
    {
      centers: [
      -0.638590, 1.852116, -0.521117,
      0.727282, 0.375614, -0.540852,
      -0.496279, 1.144395, 0.016357,
      0.621987, 1.083067, 0.005430,
      1.203311, 0.146292, -1.384693,
      0.081209, 1.448773, 0.008941,
      0.000000, -0.644861, 0.000000,
      -0.514258, -1.932219, -0.223987,
      0.526496, -1.921173, -0.272030,
      -0.269940, -0.643245, -0.005468,
      0.269942, -0.645996, 0.005468,
      0.003454, 0.032577, -0.000075,
      ],
      rotations: [
      -0.145793, -0.775348, 0.614476, 0.066982, 0.611951, 0.788054, -0.987045, 0.156052, -0.037284,
      -0.745338, 0.334341, -0.576791, 0.603401, -0.029612, -0.796888, -0.283512, -0.941987, -0.179671,
      0.158123, -0.786357, 0.597193, 0.066982, 0.611951, 0.788054, -0.985145, -0.084608, 0.149436,
      0.116995, -0.786059, -0.606979, 0.656330, 0.519886, -0.546763, 0.745348, -0.334410, 0.576738,
      -0.188929, 0.919921, 0.343586, 0.002508, 0.350338, -0.936620, -0.981988, -0.176092, -0.068497,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.999782, -0.005095, 0.020251, 0.005098, 0.999987, -0.000111, -0.020250, 0.000215, 0.999795,
      0.949520, -0.179410, -0.257343, 0.134207, 0.973778, -0.183699, 0.283552, 0.139888, 0.948699,
      0.985945, 0.152468, 0.068305, -0.134995, 0.967910, -0.211959, -0.098430, 0.199759, 0.974889,
      0.981557, -0.189851, 0.022427, 0.183698, 0.969155, 0.164300, -0.052927, -0.157150, 0.986155,
      0.980997, 0.192960, 0.020257, -0.192898, 0.958780, 0.208644, 0.020838, -0.208587, 0.977782,
      0.998452, -0.054757, -0.009756, 0.054769, 0.998499, 0.000895, 0.009693, -0.001428, 0.999952,
      ]
    },
    {
      centers: [
      -0.571432, 1.821606, -0.556015,
      0.770597, 0.324234, -0.502263,
      -0.468753, 1.112602, -0.011249,
      0.647440, 1.034058, 0.037165,
      1.287078, 0.086325, -1.319518,
      0.112949, 1.408046, 0.011743,
      0.000000, -0.684101, 0.000000,
      -0.514086, -1.951927, -0.314574,
      0.618716, -1.890692, -0.431457,
      -0.269214, -0.678340, -0.019771,
      0.269223, -0.689381, 0.019771,
      0.013916, -0.006797, -0.000375,
      ],
      rotations: [
      -0.190111, -0.772072, 0.606435, 0.034569, 0.612053, 0.790061, -0.981154, 0.171163, -0.089668,
      -0.708471, 0.344886, -0.615730, 0.644255, -0.040111, -0.763759, -0.288108, -0.937787, -0.193777,
      0.114088, -0.787782, 0.605296, 0.034569, 0.612053, 0.790061, -0.992869, -0.069212, 0.097061,
      0.136842, -0.788694, -0.599363, 0.692335, 0.508889, -0.511571, 0.708482, -0.344955, 0.615678,
      -0.192640, 0.923244, 0.332432, 0.057552, 0.348824, -0.935419, -0.979580, -0.161067, -0.120332,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.997106, -0.020446, 0.073227, 0.020542, 0.999789, -0.000553, -0.073200, 0.002056, 0.997315,
      0.960896, -0.184898, -0.206135, 0.134307, 0.962184, -0.236985, 0.242158, 0.200032, 0.949393,
      0.955652, 0.195242, 0.220475, -0.122370, 0.944219, -0.305740, -0.267869, 0.265201, 0.926237,
      0.976173, -0.204493, 0.072595, 0.184115, 0.957586, 0.221655, -0.114842, -0.203008, 0.972419,
      0.964746, 0.251303, 0.078182, -0.262776, 0.903242, 0.339268, 0.014641, -0.347852, 0.937436,
      0.996601, -0.070128, 0.043227, 0.070060, 0.997538, 0.003086, -0.043337, -0.000047, 0.999060,
      ]
    },
    {
      centers: [
      -0.463203, 1.776434, -0.601719,
      0.831682, 0.245095, -0.445744,
      -0.419648, 1.067130, -0.049460,
      0.687471, 0.959951, 0.081688,
      1.400869, -0.009250, -1.222013,
      0.166258, 1.347528, 0.015999,
      0.000000, -0.741031, 0.000000,
      -0.503651, -1.981834, -0.416059,
      0.745661, -1.844757, -0.550297,
      -0.266769, -0.728391, -0.039678,
      0.266792, -0.753192, 0.039678,
      0.031553, -0.064320, -0.000664,
      ],
      rotations: [
      -0.254540, -0.764544, 0.592185, -0.008072, 0.614013, 0.789255, -0.967029, 0.196116, -0.162462,
      -0.651715, 0.360693, -0.667209, 0.697762, -0.059710, -0.713837, -0.297315, -0.930771, -0.212764,
      0.048396, -0.788116, 0.613621, -0.008072, 0.614013, 0.789255, -0.998796, -0.043150, 0.023354,
      0.160234, -0.794285, -0.586035, 0.741333, 0.488837, -0.459851, 0.651729, -0.360763, 0.667158,
      -0.192593, 0.929196, 0.315441, 0.135713, 0.343592, -0.929261, -0.971849, -0.136160, -0.192278,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.988076, -0.045927, 0.146955, 0.046577, 0.998914, -0.000980, -0.146751, 0.007813, 0.989143,
      0.973051, -0.187037, -0.134868, 0.140446, 0.944592, -0.296682, 0.182886, 0.269745, 0.945405,
      0.880358, 0.255824, 0.399404, -0.097387, 0.921628, -0.375656, -0.464204, 0.291815, 0.836277,
      0.964099, -0.224694, 0.141515, 0.178107, 0.942440, 0.282993, -0.196956, -0.247628, 0.948625,
      0.932864, 0.322447, 0.160598, -0.360052, 0.820726, 0.443589, 0.011227, -0.471632, 0.881724,
      0.988499, -0.095695, 0.117097, 0.095614, 0.995398, 0.006323, -0.117163, 0.004945, 0.993100,
      ]
    },
    {
      centers: [
      -0.318337, 1.719815, -0.647627,
      0.901682, 0.143348, -0.378631,
      -0.347034, 1.013168, -0.091005,
      0.740648, 0.866562, 0.132279,
      1.523610, -0.136872, -1.103849,
      0.241362, 1.272441, 0.021965,
      0.000000, -0.808721, 0.000000,
      -0.486107, -2.017904, -0.511893,
      0.868426, -1.798865, -0.618662,
      -0.261902, -0.786626, -0.061802,
      0.261942, -0.830337, 0.061801,
      0.056466, -0.133632, -0.000569,
      ],
      rotations: [
      -0.330914, -0.750700, 0.571792, -0.050935, 0.619255, 0.783536, -0.942285, 0.230159, -0.243157,
      -0.580268, 0.379683, -0.720507, 0.751971, -0.089985, -0.653026, -0.312777, -0.920730, -0.233295,
      -0.031884, -0.785163, 0.618468, -0.050935, 0.619255, 0.783536, -0.998193, -0.006520, -0.059737,
      0.178928, -0.803572, -0.567677, 0.794517, 0.458323, -0.398350, 0.580283, -0.379753, 0.720458,
      -0.183690, 0.937729, 0.294825, 0.225039, 0.332080, -0.916013, -0.956878, -0.101916, -0.272026,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.970080, -0.080946, 0.228894, 0.083351, 0.996520, -0.000839, -0.228030, 0.019893, 0.973451,
      0.981675, -0.181944, -0.056648, 0.150766, 0.923376, -0.353054, 0.116543, 0.338044, 0.933886,
      0.776010, 0.309207, 0.549726, -0.066789, 0.906970, -0.415867, -0.627173, 0.286001, 0.724470,
      0.943653, -0.250770, 0.215947, 0.168576, 0.925775, 0.338414, -0.284783, -0.282942, 0.915884,
      0.889904, 0.380494, 0.251585, -0.456003, 0.728217, 0.511626, 0.011462, -0.570022, 0.821550,
      0.971144, -0.130899, 0.199361, 0.131448, 0.991267, 0.010535, -0.198999, 0.015975, 0.979869,
      ]
    },
    {
      centers: [
      -0.143911, 1.654123, -0.685964,
      0.973686, 0.024367, -0.310560,
      -0.250879, 0.955062, -0.129302,
      0.807179, 0.759317, 0.181500,
      1.637460, -0.291999, -0.981810,
      0.338353, 1.187282, 0.029046,
      0.000000, -0.880241, 0.000000,
      -0.470038, -2.054891, -0.594673,
      0.942920, -1.782519, -0.652382,
      -0.254759, -0.846376, -0.082771,
      0.254822, -0.913629, 0.082771,
      0.088638, -0.208618, -0.000000,
      ],
      rotations: [
      -0.411194, -0.728612, 0.547763, -0.083674, 0.628548, 0.773257, -0.907699, 0.272125, -0.319421,
      -0.501917, 0.399708, -0.767015, 0.796599, -0.131807, -0.589963, -0.336911, -0.907117, -0.252251,
      -0.118852, -0.776734, 0.618513, -0.083674, 0.628548, 0.773257, -0.989380, 0.040150, -0.139697,
      0.185009, -0.816612, -0.546733, 0.844888, 0.416319, -0.335922, 0.501933, -0.399780, 0.766968,
      -0.161499, 0.948190, 0.273596, 0.313232, 0.312150, -0.896910, -0.935844, -0.059151, -0.347415,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.943669, -0.124541, 0.306560, 0.130841, 0.991403, 0.000000, -0.303925, 0.040111, 0.951851,
      0.985599, -0.168427, 0.015069, 0.160219, 0.901625, -0.401750, 0.054079, 0.398379, 0.915625,
      0.693532, 0.339172, 0.635590, -0.040431, 0.899177, -0.435714, -0.719290, 0.276484, 0.637321,
      0.916298, -0.283185, 0.283204, 0.161865, 0.908659, 0.384888, -0.366331, -0.306831, 0.878440,
      0.855760, 0.396848, 0.331943, -0.517367, 0.653302, 0.552746, 0.002497, -0.644754, 0.764386,
      0.944694, -0.174772, 0.277502, 0.177568, 0.983991, 0.015232, -0.275722, 0.034886, 0.960604,
      ]
    },
    {
      centers: [
      0.207652, 1.580019, -0.718367,
      1.201538, -0.104021, -0.246930,
      0.021396, 0.895518, -0.164502,
      1.041415, 0.645584, 0.224720,
      1.893391, -0.465716, -0.864808,
      0.609724, 1.096805, 0.034362,
      0.158506, -0.948970, 0.000000,
      -0.341866, -2.100372, -0.619505,
      1.136293, -1.806106, -0.657321,
      -0.087265, -0.902143, -0.101507,
      0.404367, -0.995325, 0.101507,
      0.284582, -0.283359, 0.000195,
      ],
      rotations: [
      -0.490216, -0.697250, 0.523002, -0.104029, 0.642564, 0.759138, -0.865371, 0.317734, -0.387529,
      -0.421650, 0.416581, -0.805402, 0.828612, -0.183711, -0.528823, -0.368259, -0.890343, -0.267722,
      -0.206951, -0.760557, 0.615406, -0.104029, 0.642564, 0.759138, -0.972805, 0.093084, -0.212099,
      0.177914, -0.832895, -0.524054, 0.889126, 0.364259, -0.277074, 0.421665, -0.416654, 0.805356,
      -0.127281, 0.959281, 0.252149, 0.394549, 0.282205, -0.874466, -0.910017, -0.011818, -0.414403,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.910430, -0.172558, 0.375952, 0.186104, 0.982530, 0.000289, -0.369434, 0.069704, 0.926639,
      0.964083, -0.248820, 0.092914, 0.264623, 0.869840, -0.416358, 0.022778, 0.425990, 0.904441,
      0.666903, 0.282312, 0.689594, 0.074412, 0.895592, -0.438609, -0.741419, 0.343824, 0.576265,
      0.871745, -0.338404, 0.354322, 0.191430, 0.900925, 0.389472, -0.451016, -0.271692, 0.850157,
      0.833928, 0.367424, 0.411783, -0.550320, 0.609611, 0.570546, -0.041395, -0.702406, 0.710571,
      0.910732, -0.223155, 0.347520, 0.231111, 0.972742, 0.018968, -0.342280, 0.063041, 0.937481,
      ]
    },
    {
      centers: [
      0.696453, 1.497144, -0.755974,
      1.555800, -0.222403, -0.163745,
      0.425385, 0.835264, -0.209680,
      1.391145, 0.544604, 0.277377,
      2.282419, -0.631375, -0.707827,
      1.002328, 1.011980, 0.039523,
      0.452875, -1.009533, 0.000000,
      -0.116269, -2.156853, -0.579262,
      1.490591, -1.876750, -0.555586,
      0.220210, -0.953048, -0.124805,
      0.685654, -1.065550, 0.124805,
      0.612041, -0.351049, -0.000009,
      ],
      rotations: [
      -0.571139, -0.660442, 0.487460, -0.140823, 0.663876, 0.734464, -0.808683, 0.350836, -0.472171,
      -0.323870, 0.418394, -0.848560, 0.863445, -0.235922, -0.445875, -0.386745, -0.877090, -0.284853,
      -0.301186, -0.735422, 0.606994, -0.140823, 0.663876, 0.734464, -0.943110, 0.135732, -0.303515,
      0.182950, -0.852231, -0.490134, 0.928239, 0.313984, -0.199466, 0.323885, -0.418469, 0.848518,
      -0.101103, 0.969812, 0.221908, 0.487337, 0.242735, -0.838799, -0.867341, 0.023339, -0.497166,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.861934, -0.208337, 0.462240, 0.234949, 0.972008, -0.000013, -0.449298, 0.108614, 0.886755,
      0.892401, -0.401980, 0.205019, 0.451198, 0.801386, -0.392684, -0.006449, 0.442936, 0.896530,
      0.624623, 0.125777, 0.770731, 0.290430, 0.878737, -0.378776, -0.724911, 0.460436, 0.512350,
      0.798444, -0.394783, 0.454569, 0.252993, 0.905118, 0.341697, -0.546335, -0.157823, 0.822563,
      0.782780, 0.339072, 0.521809, -0.605216, 0.609926, 0.511571, -0.144806, -0.716255, 0.682649,
      0.862286, -0.259517, 0.434873, 0.277486, 0.960455, 0.022955, -0.423633, 0.100878, 0.900199,
      ]
    },
    {
      centers: [
      1.038757, 1.410953, -0.800933,
      1.749419, -0.303855, -0.026050,
      0.670309, 0.778202, -0.277605,
      1.544407, 0.483937, 0.357817,
      2.535886, -0.751731, -0.440942,
      1.209132, 0.950712, 0.048131,
      0.611382, -1.056862, 0.000000,
      0.086178, -2.202363, -0.632513,
      1.722243, -1.959421, -0.331687,
      0.401497, -0.999793, -0.159973,
      0.821392, -1.113468, 0.159973,
      0.788409, -0.402954, -0.000000,
      ],
      rotations: [
      -0.656358, -0.626398, 0.420500, -0.227866, 0.695923, 0.681006, -0.719216, 0.351166, -0.599509,
      -0.182323, 0.391860, -0.901778, 0.912394, -0.274404, -0.303709, -0.366463, -0.878151, -0.307501,
      -0.409386, -0.703057, 0.581476, -0.227866, 0.695923, 0.681006, -0.883448, 0.146295, -0.445103,
      0.227792, -0.875325, -0.426517, 0.956484, 0.283181, -0.070329, 0.182342, -0.391937, 0.901741,
      -0.103745, 0.980072, 0.169399, 0.612927, 0.197132, -0.765153, -0.783299, 0.024449, -0.621164,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.777584, -0.210509, 0.592494, 0.261316, 0.965253, -0.000000, -0.571907, 0.154828, 0.805575,
      0.799145, -0.476335, 0.366704, 0.599296, 0.679014, -0.424010, -0.047027, 0.558610, 0.828096,
      0.492413, -0.006092, 0.870341, 0.447320, 0.859572, -0.247064, -0.746615, 0.510978, 0.425990,
      0.695146, -0.413370, 0.588130, 0.237083, 0.904190, 0.355293, -0.678649, -0.107545, 0.726547,
      0.676745, 0.341638, 0.652151, -0.677331, 0.636056, 0.369669, -0.288512, -0.691893, 0.661850,
      0.780445, -0.262737, 0.567341, 0.299629, 0.953601, 0.029439, -0.548752, 0.147016, 0.822957,
      ]
    },
    {
      centers: [
      0.946287, 1.405211, -0.762054,
      1.717722, -0.325633, -0.087429,
      0.617677, 0.754649, -0.234054,
      1.534291, 0.449048, 0.332361,
      2.477158, -0.755030, -0.567152,
      1.176153, 0.921923, 0.059744,
      0.582553, -1.086534, 0.000000,
      0.491363, -2.230056, -0.788568,
      1.629369, -2.120001, 0.024347,
      0.410021, -1.039074, -0.202189,
      0.755212, -1.133531, 0.202189,
      0.761252, -0.433081, 0.000095,
      ],
      rotations: [
      -0.622819, -0.643520, 0.444948, -0.185690, 0.674059, 0.714958, -0.760011, 0.362666, -0.539312,
      -0.244925, 0.416371, -0.875584, 0.891518, -0.258225, -0.372176, -0.381061, -0.871754, -0.307957,
      -0.365121, -0.722847, 0.586667, -0.185690, 0.674059, 0.714958, -0.912253, 0.152108, -0.380339,
      0.203812, -0.860757, -0.466432, 0.947874, 0.292695, -0.125958, 0.244942, -0.416446, 0.875543,
      -0.097974, 0.973895, 0.204769, 0.558867, 0.224093, -0.798405, -0.823450, 0.036215, -0.566233,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.639241, -0.174921, 0.748848, 0.263783, 0.964582, 0.000140, -0.722350, 0.197444, 0.662742,
      0.567136, -0.323703, 0.757346, 0.786663, 0.485264, -0.381679, -0.243962, 0.812241, 0.529856,
      0.254272, -0.151606, 0.955176, 0.612219, 0.789793, -0.037619, -0.748688, 0.594342, 0.293638,
      0.575104, -0.329407, 0.748830, -0.061158, 0.895477, 0.440886, -0.815791, -0.299352, 0.494846,
      0.533328, 0.332370, 0.777876, -0.657260, 0.741707, 0.133715, -0.532513, -0.582581, 0.614027,
      0.818406, -0.272858, 0.505728, 0.295220, 0.954699, 0.037348, -0.493008, 0.118735, 0.861884,
      ]
    },
    {
      centers: [
      0.710797, 1.435543, -0.681581,
      1.597479, -0.313835, -0.234897,
      0.478239, 0.752717, -0.143374,
      1.477390, 0.434647, 0.250236,
      2.272993, -0.704130, -0.853452,
      1.075400, 0.914521, 0.064983,
      0.491885, -1.096694, 0.000000,
      0.940157, -2.189675, -0.576885,
      1.197369, -2.344461, 0.180909,
      0.342510, -1.056006, -0.221205,
      0.641387, -1.136919, 0.221205,
      0.668913, -0.442786, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.226223, -0.222351, 0.948358, 0.908428, 0.399527, -0.123025, -0.351540, 0.889347, 0.292372,
      0.093350, -0.183436, 0.978589, 0.741954, 0.668233, 0.054483, -0.663920, 0.720982, 0.198481,
      0.494870, -0.011722, 0.868888, -0.449359, 0.852384, 0.267429, -0.743761, -0.522785, 0.416552,
      0.518482, 0.211070, 0.828629, -0.418031, 0.907928, 0.030297, -0.745940, -0.362101, 0.558978,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.571135, 1.490884, -0.681581,
      1.457818, -0.258493, -0.234897,
      0.338578, 0.808059, -0.143374,
      1.337729, 0.489988, 0.250236,
      2.133332, -0.648788, -0.853452,
      0.935739, 0.969862, 0.064983,
      0.352224, -1.041353, 0.000000,
      1.096989, -1.918693, -0.577060,
      0.745792, -2.388908, 0.206514,
      0.202849, -1.000664, -0.221205,
      0.501725, -1.081577, 0.221205,
      0.529252, -0.387445, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.265175, -0.144146, 0.953365, 0.777732, 0.616420, -0.123123, -0.569925, 0.774111, 0.275566,
      0.109557, -0.110937, 0.987770, 0.769027, 0.639073, -0.013521, -0.629758, 0.761103, 0.155328,
      0.465926, 0.113659, 0.877494, -0.672286, 0.690249, 0.267560, -0.575278, -0.714590, 0.398016,
      0.564975, 0.096267, 0.819473, -0.183508, 0.982956, 0.011045, -0.804443, -0.156620, 0.573012,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.471804, 1.614787, -0.681581,
      1.358487, -0.134590, -0.234897,
      0.239247, 0.931962, -0.143374,
      1.238397, 0.613891, 0.250236,
      2.034000, -0.524886, -0.853452,
      0.836407, 1.093765, 0.064983,
      0.252893, -0.917450, 0.000000,
      1.096550, -1.669628, -0.613820,
      0.300094, -2.283219, 0.258178,
      0.103518, -0.876762, -0.221205,
      0.402394, -0.957674, 0.221205,
      0.429921, -0.263542, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.361829, -0.037727, 0.931481, 0.463764, 0.874055, -0.144746, -0.808704, 0.484360, 0.333754,
      0.135793, -0.049322, 0.989509, 0.729552, 0.680715, -0.066189, -0.670309, 0.730886, 0.128420,
      0.475328, 0.167643, 0.863689, -0.746641, 0.596141, 0.295199, -0.465393, -0.785182, 0.408532,
      0.577336, -0.021790, 0.816215, 0.076918, 0.996650, -0.027800, -0.812875, 0.078832, 0.577078,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.446710, 1.742274, -0.681581,
      1.333393, -0.007103, -0.234897,
      0.214153, 1.059449, -0.143374,
      1.213303, 0.741378, 0.250236,
      2.008906, -0.397398, -0.853452,
      0.811313, 1.221252, 0.064983,
      0.227799, -0.789963, 0.000000,
      1.024778, -1.622238, -0.554735,
      -0.133208, -2.056992, 0.278043,
      0.078423, -0.749274, -0.221205,
      0.377300, -0.830187, 0.221205,
      0.404826, -0.136055, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.427411, 0.077372, 0.900741, 0.052122, 0.992565, -0.109992, -0.902554, 0.093960, 0.420200,
      0.131696, -0.048900, 0.990083, 0.680929, 0.730317, -0.054504, -0.720410, 0.681355, 0.129477,
      0.493907, 0.213375, 0.842928, -0.711545, 0.656365, 0.250775, -0.499760, -0.723641, 0.476009,
      0.533822, -0.183899, 0.825358, 0.383841, 0.922410, -0.042736, -0.753459, 0.339620, 0.562990,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.443125, 1.801201, -0.681581,
      1.329808, 0.051824, -0.234897,
      0.210568, 1.118376, -0.143374,
      1.209718, 0.800305, 0.250236,
      2.005321, -0.338472, -0.853452,
      0.807728, 1.280179, 0.064983,
      0.224214, -0.731036, 0.000000,
      0.803404, -1.789165, -0.396387,
      -0.091060, -2.016257, 0.274754,
      0.074839, -0.690348, -0.221205,
      0.373715, -0.771260, 0.221205,
      0.401242, -0.077128, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.444446, 0.137820, 0.885141, -0.265382, 0.963996, -0.016844, -0.855593, -0.227415, 0.465019,
      0.113355, -0.059116, 0.991794, 0.803122, 0.593136, -0.056438, -0.584932, 0.802929, 0.114712,
      0.516700, 0.210280, 0.829942, -0.547794, 0.826180, 0.131715, -0.657984, -0.522694, 0.542077,
      0.537786, -0.165204, 0.826737, 0.349456, 0.936087, -0.040264, -0.767246, 0.310561, 0.561146,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.487431, 1.746544, -0.681581,
      1.374113, -0.002833, -0.234897,
      0.254874, 1.063719, -0.143374,
      1.254024, 0.745648, 0.250236,
      2.049627, -0.393128, -0.853452,
      0.852034, 1.225522, 0.064983,
      0.268520, -0.785693, 0.000000,
      0.836973, -1.844866, -0.430780,
      0.326508, -2.152226, 0.259015,
      0.119144, -0.745004, -0.221205,
      0.418021, -0.825917, 0.221205,
      0.445548, -0.131785, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.430006, 0.093958, 0.897924, -0.138816, 0.989624, -0.037076, -0.892090, -0.108703, 0.438587,
      0.090590, -0.062887, 0.993901, 0.944410, 0.322138, -0.065697, -0.316042, 0.944601, 0.088574,
      0.526952, 0.185893, 0.829316, -0.539721, 0.826965, 0.157575, -0.656524, -0.530634, 0.536102,
      0.568823, -0.015806, 0.822308, 0.068808, 0.997225, -0.028429, -0.819577, 0.072752, 0.568332,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.542925, 1.648575, -0.681581,
      1.429607, -0.100802, -0.234897,
      0.310367, 0.965750, -0.143374,
      1.309518, 0.647680, 0.250236,
      2.105121, -0.491097, -0.853452,
      0.907528, 1.127553, 0.064983,
      0.324013, -0.883662, 0.000000,
      0.928112, -1.899959, -0.510950,
      0.712591, -2.232091, 0.239680,
      0.174638, -0.842973, -0.221205,
      0.473515, -0.923886, 0.221205,
      0.501041, -0.229754, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.393126, 0.013895, 0.919380, 0.162248, 0.983149, -0.084236, -0.905056, 0.182282, 0.384247,
      0.087945, -0.053396, 0.994693, 0.980744, 0.179441, -0.077079, -0.174373, 0.982318, 0.068148,
      0.529031, 0.148066, 0.835585, -0.566522, 0.794728, 0.217853, -0.631806, -0.588629, 0.504318,
      0.563609, 0.114554, 0.818060, -0.179756, 0.983613, -0.013892, -0.806246, -0.139221, 0.574965,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.555977, 1.587733, -0.681581,
      1.442659, -0.161645, -0.234897,
      0.323420, 0.904907, -0.143374,
      1.322570, 0.586837, 0.250236,
      2.118173, -0.551940, -0.853452,
      0.920580, 1.066711, 0.064983,
      0.337066, -0.944504, 0.000000,
      0.874999, -1.998310, -0.535186,
      0.953337, -2.230125, 0.217772,
      0.187690, -0.903816, -0.221205,
      0.486567, -0.984729, 0.221205,
      0.514093, -0.290596, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.342733, -0.059096, 0.937572, 0.424611, 0.900004, -0.098491, -0.837997, 0.431859, 0.333554,
      0.102631, -0.045426, 0.993682, 0.970372, 0.224241, -0.089973, -0.218736, 0.973474, 0.067094,
      0.531985, 0.092616, 0.841674, -0.516774, 0.822930, 0.236076, -0.670774, -0.560544, 0.485648,
      0.544125, 0.201692, 0.814401, -0.350954, 0.936389, 0.002580, -0.762075, -0.287221, 0.580297,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.557841, 1.570202, -0.681581,
      1.444524, -0.179175, -0.234897,
      0.325284, 0.887377, -0.143374,
      1.324435, 0.569306, 0.250236,
      2.120038, -0.569470, -0.853452,
      0.922445, 1.049180, 0.064983,
      0.338930, -0.962035, 0.000000,
      0.688250, -2.117348, -0.520836,
      1.225959, -2.108292, 0.180661,
      0.189555, -0.921346, -0.221205,
      0.488431, -1.002259, 0.221205,
      0.515958, -0.308127, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.284818, -0.116653, 0.951458, 0.620033, 0.779391, -0.090049, -0.731052, 0.615583, 0.294313,
      0.133865, -0.028507, 0.990589, 0.911560, 0.395676, -0.111799, -0.388765, 0.917948, 0.078952,
      0.538781, 0.013627, 0.842336, -0.374958, 0.899251, 0.225286, -0.754402, -0.437221, 0.489608,
      0.501047, 0.304413, 0.810114, -0.554531, 0.831604, 0.030483, -0.664415, -0.464507, 0.585480,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.519116, 1.652603, -0.681581,
      1.405798, -0.096774, -0.234897,
      0.286559, 0.969778, -0.143374,
      1.285709, 0.651707, 0.250236,
      2.081312, -0.487069, -0.853452,
      0.883719, 1.131581, 0.064983,
      0.300205, -0.879634, 0.000000,
      0.314721, -2.135075, -0.470367,
      1.480554, -1.752442, 0.106939,
      0.150829, -0.838945, -0.221205,
      0.449706, -0.919858, 0.221205,
      0.477232, -0.225726, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.239317, -0.148959, 0.959447, 0.690595, 0.720719, -0.060362, -0.682499, 0.677035, 0.275350,
      0.186651, 0.036383, 0.981752, 0.675708, 0.720652, -0.155173, -0.713147, 0.692341, 0.109926,
      0.544662, -0.091389, 0.833661, -0.123226, 0.974535, 0.187340, -0.829553, -0.204766, 0.519531,
      0.423944, 0.414373, 0.805336, -0.775073, 0.626004, 0.085913, -0.468544, -0.660617, 0.586560,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.447197, 1.805634, -0.681581,
      1.333879, 0.056256, -0.234897,
      0.214640, 1.122808, -0.143374,
      1.213790, 0.804738, 0.250236,
      2.009393, -0.334039, -0.853452,
      0.811800, 1.284612, 0.064983,
      0.228286, -0.726603, 0.000000,
      -0.100962, -1.990640, -0.406232,
      1.434236, -1.559563, 0.065049,
      0.078910, -0.685915, -0.221205,
      0.377787, -0.766827, 0.221205,
      0.405313, -0.072695, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.214641, -0.162514, 0.963078, 0.666056, 0.745558, -0.022635, -0.714352, 0.646322, 0.268270,
      0.202932, 0.129384, 0.970607, 0.254117, 0.950312, -0.179809, -0.945644, 0.283137, 0.159970,
      0.534113, -0.190443, 0.823683, 0.135244, 0.980997, 0.139118, -0.834525, 0.037093, 0.549720,
      0.435480, 0.423918, 0.794135, -0.794322, 0.596043, 0.117409, -0.423567, -0.681929, 0.596292,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.408471, 1.888035, -0.681581,
      1.295154, 0.138657, -0.234897,
      0.175914, 1.205209, -0.143374,
      1.175064, 0.887139, 0.250236,
      1.970667, -0.251638, -0.853452,
      0.773074, 1.367013, 0.064983,
      0.189560, -0.644202, -0.000000,
      -0.168695, -1.903304, -0.410445,
      1.219297, -1.677553, 0.132984,
      0.040185, -0.603514, -0.221205,
      0.339061, -0.684426, 0.221205,
      0.366588, 0.009706, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.199937, -0.169080, 0.965110, 0.713427, 0.700279, -0.025113, -0.671601, 0.693556, 0.260638,
      0.197208, 0.147659, 0.969178, -0.053108, 0.988749, -0.139835, -0.978922, -0.023895, 0.202832,
      0.526386, -0.204739, 0.825227, 0.157054, 0.977287, 0.142285, -0.835615, 0.054708, 0.546585,
      0.498447, 0.372239, 0.782936, -0.661831, 0.746713, 0.066330, -0.559938, -0.551234, 0.618556,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.460865, 1.854461, -0.681581,
      1.347547, 0.105084, -0.234897,
      0.228307, 1.171636, -0.143374,
      1.227458, 0.853565, 0.250236,
      2.023061, -0.285211, -0.853452,
      0.825468, 1.333439, 0.064983,
      0.241954, -0.677776, -0.000000,
      0.083650, -1.944471, -0.465261,
      1.135803, -1.819211, 0.174508,
      0.092578, -0.637087, -0.221205,
      0.391455, -0.718000, 0.221205,
      0.418981, -0.023868, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.180428, -0.176284, 0.967662, 0.837922, 0.542768, -0.057358, -0.515105, 0.821174, 0.245642,
      0.202539, 0.103364, 0.973804, 0.048553, 0.992130, -0.115408, -0.978070, 0.070656, 0.195927,
      0.522224, -0.159940, 0.837676, 0.006714, 0.982997, 0.183501, -0.852782, -0.090205, 0.514418,
      0.526162, 0.322281, 0.786949, -0.559660, 0.827979, 0.035110, -0.640262, -0.458897, 0.616019,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.513258, 1.780067, -0.681581,
      1.399941, 0.030689, -0.234897,
      0.280701, 1.097241, -0.143374,
      1.279851, 0.779171, 0.250236,
      2.075454, -0.359606, -0.853452,
      0.877861, 1.259045, 0.064983,
      0.294347, -0.752170, 0.000000,
      0.292178, -2.004003, -0.497999,
      1.059770, -1.970911, 0.195910,
      0.144972, -0.711482, -0.221205,
      0.443848, -0.792394, 0.221205,
      0.471375, -0.098262, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.170157, -0.179668, 0.968900, 0.896666, 0.436029, -0.076616, -0.408703, 0.881815, 0.235295,
      0.195402, 0.039137, 0.979942, 0.327535, 0.939227, -0.102822, -0.924413, 0.341057, 0.170708,
      0.515928, -0.122795, 0.847785, -0.110680, 0.971822, 0.208116, -0.849452, -0.201206, 0.487799,
      0.544083, 0.267281, 0.795320, -0.463098, 0.886103, 0.019018, -0.699652, -0.378659, 0.605891,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.502511, 1.700931, -0.681581,
      1.389193, -0.048446, -0.234897,
      0.269954, 1.018106, -0.143374,
      1.269104, 0.700035, 0.250236,
      2.064707, -0.438741, -0.853452,
      0.867114, 1.179909, 0.064983,
      0.283600, -0.831306, 0.000000,
      0.465705, -2.043087, -0.521761,
      0.846200, -2.135748, 0.220532,
      0.134224, -0.790617, -0.221205,
      0.433101, -0.871530, 0.221205,
      0.460627, -0.177398, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.194825, -0.170968, 0.965823, 0.871712, 0.481573, -0.090594, -0.449625, 0.859569, 0.242856,
      0.174623, -0.008225, 0.984601, 0.537573, 0.838577, -0.088336, -0.824937, 0.544720, 0.150856,
      0.518156, -0.067469, 0.852621, -0.249233, 0.941709, 0.225982, -0.818167, -0.329595, 0.471136,
      0.567013, 0.184851, 0.802699, -0.310600, 0.950541, 0.000505, -0.762905, -0.249605, 0.596384,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.482552, 1.639495, -0.681581,
      1.369234, -0.109883, -0.234897,
      0.249994, 0.956669, -0.143374,
      1.249145, 0.638599, 0.250236,
      2.044748, -0.500178, -0.853452,
      0.847155, 1.118473, 0.064983,
      0.263640, -0.892742, 0.000000,
      0.826160, -1.920383, -0.568729,
      0.531683, -2.257451, 0.245502,
      0.114265, -0.852054, -0.221205,
      0.413142, -0.932967, 0.221205,
      0.440668, -0.238834, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.271464, -0.127113, 0.954018, 0.730445, 0.672662, -0.118222, -0.626703, 0.728950, 0.275452,
      0.150871, -0.037628, 0.987837, 0.667089, 0.741329, -0.073645, -0.729541, 0.670086, 0.136946,
      0.506020, 0.057235, 0.860621, -0.535259, 0.803257, 0.261297, -0.676344, -0.592877, 0.437099,
      0.582034, 0.066959, 0.810403, -0.089128, 0.995853, -0.018269, -0.808265, -0.061597, 0.585588,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
    {
      centers: [
      0.446710, 1.742274, -0.681581,
      1.333393, -0.007103, -0.234897,
      0.214153, 1.059449, -0.143374,
      1.213303, 0.741378, 0.250236,
      2.008906, -0.397398, -0.853452,
      0.811313, 1.221252, 0.064983,
      0.227799, -0.789963, 0.000000,
      1.024778, -1.622238, -0.554735,
      -0.133208, -2.056992, 0.278043,
      0.078423, -0.749274, -0.221205,
      0.377300, -0.830187, 0.221205,
      0.404826, -0.136055, -0.000000,
      ],
      rotations: [
      -0.536394, -0.676760, 0.504259, -0.073505, 0.632678, 0.770919, -0.840761, 0.376451, -0.389110,
      -0.387565, 0.456722, -0.800749, 0.821698, -0.222587, -0.524660, -0.417860, -0.861313, -0.289021,
      -0.258396, -0.758695, 0.598008, -0.073505, 0.632678, 0.770919, -0.963239, 0.155246, -0.219249,
      0.133433, -0.831647, -0.539036, 0.912130, 0.315757, -0.261374, 0.387576, -0.456795, 0.800702,
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      0.553475, -0.149838, 0.819277, 0.261316, 0.965253, -0.000000, -0.790809, 0.214090, 0.573399,
      0.427411, 0.077372, 0.900741, 0.052122, 0.992565, -0.109992, -0.902554, 0.093960, 0.420200,
      0.131696, -0.048900, 0.990083, 0.680929, 0.730317, -0.054504, -0.720410, 0.681355, 0.129477,
      0.493907, 0.213375, 0.842928, -0.711545, 0.656365, 0.250775, -0.499760, -0.723641, 0.476009,
      0.533822, -0.183899, 0.825358, 0.383841, 0.922410, -0.042736, -0.753459, 0.339620, 0.562990,
      0.892099, -0.283992, 0.351438, 0.288494, 0.956616, 0.040708, -0.347752, 0.065072, 0.935326,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flaggerArmature / Start) */
cache_pose_sequence(g_flagger_start);

var g_flag_start = 
/* Begin pose exported from flagger.blend (flagArmature / Start) */
{
  bone_count: 2,
  frame_count: 43,
  fps: 16.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      1.860620, 3.700276, -0.797570,
      0.996210, 2.504341, -0.701512,
      ],
      rotations: [
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      -0.999889, 0.012419, -0.008251, 0.008625, 0.030446, -0.999499, -0.012162, -0.999459, -0.030550,
      ]
    },
    {
      centers: [
      1.860620, 3.700276, -0.797570,
      0.996210, 2.504341, -0.701512,
      ],
      rotations: [
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      -0.999889, 0.012419, -0.008251, 0.008625, 0.030446, -0.999499, -0.012162, -0.999459, -0.030550,
      ]
    },
    {
      centers: [
      1.860620, 3.700276, -0.797570,
      0.996210, 2.504341, -0.701512,
      ],
      rotations: [
      -0.953549, -0.021271, 0.300484, -0.301011, 0.105817, -0.947731, -0.011637, -0.994158, -0.107305,
      -0.999889, 0.012419, -0.008251, 0.008625, 0.030446, -0.999499, -0.012162, -0.999459, -0.030550,
      ]
    },
    {
      centers: [
      1.906002, 3.606037, -0.889301,
      0.979400, 2.458447, -0.783755,
      ],
      rotations: [
      -0.950417, 0.030292, 0.309499, -0.303857, 0.121304, -0.944964, -0.066169, -0.992153, -0.106085,
      -0.997803, 0.066244, 0.001178, 0.000767, 0.029337, -0.999569, -0.066250, -0.997372, -0.029323,
      ]
    },
    {
      centers: [
      1.998431, 3.309494, -1.125085,
      0.915171, 2.311511, -0.993659,
      ],
      rotations: [
      -0.927802, 0.170448, 0.331859, -0.305153, 0.165020, -0.937896, -0.214626, -0.971450, -0.101093,
      -0.976730, 0.213051, 0.024628, -0.018868, 0.029029, -0.999400, -0.213638, -0.976610, -0.024334,
      ]
    },
    {
      centers: [
      2.045786, 2.776114, -1.416318,
      0.772589, 2.042794, -1.249272,
      ],
      rotations: [
      -0.857029, 0.371303, 0.357261, -0.287895, 0.229974, -0.929639, -0.427338, -0.899581, -0.090198,
      -0.904131, 0.424159, 0.051341, -0.040746, 0.034018, -0.998590, -0.425307, -0.904949, -0.013474,
      ]
    },
    {
      centers: [
      1.960184, 2.042937, -1.632833,
      0.542494, 1.672478, -1.433809,
      ],
      rotations: [
      -0.720247, 0.585019, 0.372823, -0.237504, 0.297001, -0.924869, -0.651795, -0.754681, -0.074970,
      -0.758505, 0.648150, 0.067618, -0.052532, 0.042609, -0.997710, -0.649547, -0.760320, 0.001729,
      ]
    },
    {
      centers: [
      1.735327, 1.275524, -1.679977,
      0.272346, 1.291127, -1.465180,
      ],
      rotations: [
      -0.537777, 0.756354, 0.372458, -0.161445, 0.341217, -0.926016, -0.827485, -0.558122, -0.061390,
      -0.561475, 0.824784, 0.066917, -0.050365, 0.046655, -0.997640, -0.825960, -0.563520, 0.015345,
      ]
    },
    {
      centers: [
      1.463261, 0.663641, -1.586949,
      0.038957, 0.997915, -1.371741,
      ],
      rotations: [
      -0.360363, 0.859627, 0.362188, -0.087071, 0.355583, -0.930580, -0.928740, -0.366882, -0.053290,
      -0.369760, 0.927454, 0.055740, -0.042510, 0.043042, -0.998168, -0.928154, -0.371452, 0.023511,
      ]
    },
    {
      centers: [
      1.251985, 0.292480, -1.463971,
      -0.109916, 0.828886, -1.253756,
      ],
      rotations: [
      -0.233795, 0.906409, 0.351801, -0.036369, 0.353423, -0.934757, -0.971606, -0.231336, -0.049663,
      -0.233716, 0.971283, 0.044570, -0.036882, 0.036950, -0.998636, -0.971605, -0.235041, 0.027187,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.170975, 0.167191, -1.408606,
      -0.161373, 0.774180, -1.200983,
      ],
      rotations: [
      -0.186617, 0.918908, 0.347538, -0.018245, 0.350450, -0.936404, -0.982264, -0.181089, -0.048635,
      -0.183245, 0.982253, 0.040007, -0.035109, 0.034131, -0.998801, -0.982440, -0.184430, 0.028232,
      ]
    },
    {
      centers: [
      1.203311, 0.146292, -1.384693,
      -0.129857, 0.760107, -1.204161,
      ],
      rotations: [
      -0.188929, 0.919921, 0.343586, 0.002508, 0.350338, -0.936620, -0.981988, -0.176092, -0.068497,
      -0.179007, 0.983182, 0.036179, -0.014701, 0.034095, -0.999311, -0.983738, -0.179416, 0.008351,
      ]
    },
    {
      centers: [
      1.287078, 0.086325, -1.319518,
      -0.044144, 0.720854, -1.210352,
      ],
      rotations: [
      -0.192640, 0.923244, 0.332432, 0.057552, 0.348824, -0.935419, -0.979580, -0.161067, -0.120332,
      -0.165466, 0.985875, 0.025938, 0.038806, 0.032789, -0.998709, -0.985452, -0.164246, -0.043684,
      ]
    },
    {
      centers: [
      1.400869, -0.009250, -1.222013,
      0.082210, 0.659893, -1.213034,
      ],
      rotations: [
      -0.192593, 0.929196, 0.315441, 0.135713, 0.343592, -0.929261, -0.971849, -0.136160, -0.192278,
      -0.141181, 0.989915, 0.011682, 0.113474, 0.027903, -0.993149, -0.983459, -0.138888, -0.116269,
      ]
    },
    {
      centers: [
      1.523610, -0.136872, -1.103849,
      0.234374, 0.579984, -1.207214,
      ],
      rotations: [
      -0.183691, 0.937729, 0.294825, 0.225039, 0.332080, -0.916013, -0.956878, -0.101916, -0.272026,
      -0.105014, 0.994464, -0.003823, 0.196542, 0.016985, -0.980348, -0.974856, -0.103701, -0.197238,
      ]
    },
    {
      centers: [
      1.637460, -0.291999, -0.981810,
      0.396482, 0.484032, -1.192628,
      ],
      rotations: [
      -0.161499, 0.948190, 0.273596, 0.313232, 0.312150, -0.896910, -0.935844, -0.059151, -0.347415,
      -0.056563, 0.998235, -0.018095, 0.274894, -0.001852, -0.961473, -0.959809, -0.059358, -0.274304,
      ]
    },
    {
      centers: [
      1.893391, -0.465716, -0.864808,
      0.716641, 0.375049, -1.173141,
      ],
      rotations: [
      -0.127281, 0.959281, 0.252149, 0.394549, 0.282205, -0.874466, -0.910017, -0.011818, -0.414403,
      0.001190, 0.999502, -0.031536, 0.343379, -0.030027, -0.938717, -0.939196, -0.009712, -0.343243,
      ]
    },
    {
      centers: [
      2.282419, -0.631375, -0.707827,
      1.183350, 0.258751, -1.139589,
      ],
      rotations: [
      -0.101103, 0.969812, 0.221908, 0.487337, 0.242735, -0.838799, -0.867341, 0.023339, -0.497166,
      0.054859, 0.997279, -0.049239, 0.426517, -0.067994, -0.901921, -0.902815, 0.028477, -0.429086,
      ]
    },
    {
      centers: [
      2.535886, -0.751731, -0.440942,
      1.539748, 0.146785, -1.063095,
      ],
      rotations: [
      -0.103745, 0.980072, 0.169399, 0.612927, 0.197132, -0.765153, -0.783299, 0.024449, -0.621164,
      0.091309, 0.992892, -0.076343, 0.552840, -0.114306, -0.825411, -0.828270, 0.033162, -0.559347,
      ]
    },
    {
      centers: [
      2.477158, -0.755030, -0.567151,
      1.436059, 0.153195, -1.094350,
      ],
      rotations: [
      -0.097974, 0.973895, 0.204768, 0.558867, 0.224093, -0.798405, -0.823450, 0.036215, -0.566233,
      0.080024, 0.995382, -0.053019, 0.496726, -0.085937, -0.863643, -0.864210, 0.042776, -0.501309,
      ]
    },
    {
      centers: [
      2.272993, -0.704130, -0.853452,
      1.151780, 0.211397, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.133332, -0.648788, -0.853452,
      1.012119, 0.266738, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.034000, -0.524886, -0.853452,
      0.912788, 0.390641, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.008906, -0.397398, -0.853452,
      0.887694, 0.518128, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.005321, -0.338471, -0.853452,
      0.884109, 0.577055, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.049627, -0.393128, -0.853452,
      0.928415, 0.522398, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.105121, -0.491097, -0.853452,
      0.983908, 0.424429, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.118173, -0.551940, -0.853452,
      0.996961, 0.363587, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.120038, -0.569470, -0.853452,
      0.998825, 0.346056, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.081312, -0.487069, -0.853452,
      0.960100, 0.428457, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.009393, -0.334039, -0.853452,
      0.888181, 0.581488, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      1.970667, -0.251637, -0.853452,
      0.849455, 0.663889, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.023061, -0.285211, -0.853452,
      0.901848, 0.630315, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.075454, -0.359606, -0.853452,
      0.954242, 0.555921, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.064707, -0.438741, -0.853452,
      0.943495, 0.476785, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.044748, -0.500178, -0.853452,
      0.923535, 0.415349, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
    {
      centers: [
      2.008906, -0.397398, -0.853452,
      0.887694, 0.518128, -1.155758,
      ],
      rotations: [
      -0.072496, 0.960067, 0.270216, 0.419850, 0.275130, -0.864887, -0.904694, 0.050749, -0.423030,
      0.061121, 0.998066, -0.011391, 0.350830, -0.032166, -0.935887, -0.934442, 0.053206, -0.352118,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / Start) */
cache_pose_sequence(g_flag_start);

var g_flagger_idle =
/* Begin pose exported from flagger.blend (flaggerArmature / Idle) */
{
  bone_count: 12,
  frame_count: 21,
  fps: 4.000000,
  rest_centers: [
    -1.460000, 0.880000, 0.009999,
    1.460000, 0.880000, 0.009999,
    -0.560000, 0.880000, 0.010000,
    0.560000, 0.880000, 0.010000,
    3.610000, 0.880000, -1.170632,
    -0.000000, 1.215542, 0.007747,
    0.000000, -0.880241, 0.000000,
    -0.270000, -2.209999, -0.000001,
    0.270000, -2.210001, -0.000002,
    -0.270000, -0.880000, 0.000000,
    0.270000, -0.880000, -0.000000,
    0.000000, -0.202794, -0.000000,
  ],
  poses: [
    {
      centers: [
      -1.060018, 0.141852, 0.147484,
      0.895040, 0.049425, 0.082234,
      -0.559448, 0.880000, 0.026787,
      0.560048, 0.880000, -0.006796,
      -0.559160, 0.181929, -0.813833,
      0.000232, 1.215542, 0.007744,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.089725, 0.765756, 0.636842, -0.718254, 0.393219, -0.574012, -0.689972, -0.508918, 0.514725,
      -0.183881, -0.581554, -0.792454, 0.919110, 0.184078, -0.348358, 0.348462, -0.792408, 0.500663,
      0.556189, 0.820164, -0.134109, -0.718254, 0.393219, -0.574012, -0.418050, 0.415584, 0.807790,
      0.372214, -0.922860, 0.098924, 0.856635, 0.300554, -0.419339, 0.357259, 0.240826, 0.902424,
      0.101254, -0.945302, 0.310085, -0.186126, -0.324183, -0.927503, 0.977295, 0.036198, -0.208770,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999550, -0.000000, -0.029985, 0.000000, 1.000000, 0.000000, 0.029985, 0.000000, 0.999550,
      ]
    },
    {
      centers: [
      -1.060151, 0.141852, 0.146523,
      0.894965, 0.049425, 0.083046,
      -0.559472, 0.880000, 0.026279,
      0.560054, 0.880000, -0.006288,
      -0.558422, 0.181929, -0.814340,
      0.000225, 1.215542, 0.007744,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.090303, 0.765756, 0.636761, -0.717733, 0.393219, -0.574664, -0.690438, -0.508918, 0.514099,
      -0.183162, -0.581554, -0.792620, 0.919425, 0.184078, -0.347524, 0.348008, -0.792408, 0.500979,
      0.556310, 0.820164, -0.133605, -0.717733, 0.393219, -0.574664, -0.418782, 0.415584, 0.807410,
      0.372124, -0.922860, 0.099262, 0.857015, 0.300554, -0.418561, 0.356440, 0.240826, 0.902748,
      0.100972, -0.945302, 0.310177, -0.185284, -0.324183, -0.927672, 0.977484, 0.036198, -0.207883,
      0.994314, -0.000000, -0.106487, 0.000000, 1.000000, 0.000000, 0.106487, 0.000000, 0.994314,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999577, -0.000000, -0.029078, 0.000000, 1.000000, 0.000000, 0.029078, 0.000000, 0.999577,
      ]
    },
    {
      centers: [
      -1.060509, 0.141852, 0.143912,
      0.894758, 0.049425, 0.085250,
      -0.559535, 0.880000, 0.024902,
      0.560068, 0.880000, -0.004909,
      -0.556415, 0.181929, -0.815713,
      0.000206, 1.215542, 0.007745,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.091871, 0.765756, 0.636536, -0.716315, 0.393219, -0.576429, -0.691702, -0.508918, 0.512397,
      -0.181209, -0.581554, -0.793069, 0.920278, 0.184078, -0.345259, 0.346773, -0.792408, 0.501835,
      0.556637, 0.820164, -0.132234, -0.716316, 0.393219, -0.576429, -0.420769, 0.415584, 0.806377,
      0.371879, -0.922860, 0.100178, 0.858043, 0.300554, -0.416450, 0.354216, 0.240826, 0.903623,
      0.100208, -0.945302, 0.310425, -0.182999, -0.324183, -0.928125, 0.977993, 0.036198, -0.205475,
      0.995804, -0.000000, -0.091506, 0.000000, 1.000000, 0.000000, 0.091506, 0.000000, 0.995804,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999646, -0.000000, -0.026617, 0.000000, 1.000000, 0.000000, 0.026617, 0.000000, 0.999646,
      ]
    },
    {
      centers: [
      -1.061024, 0.141852, 0.140062,
      0.894443, 0.049425, 0.088496,
      -0.559622, 0.880000, 0.022871,
      0.560082, 0.880000, -0.002877,
      -0.553451, 0.181929, -0.817726,
      0.000178, 1.215542, 0.007745,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.094180, 0.765756, 0.636199, -0.714219, 0.393219, -0.579025, -0.693557, -0.508918, 0.509884,
      -0.178330, -0.581554, -0.793721, 0.921525, 0.184078, -0.341917, 0.344950, -0.792408, 0.503090,
      0.557114, 0.820164, -0.130213, -0.714219, 0.393219, -0.579025, -0.423693, 0.415584, 0.804845,
      0.371513, -0.922860, 0.101527, 0.859548, 0.300554, -0.413333, 0.350934, 0.240826, 0.904902,
      0.099081, -0.945302, 0.310786, -0.179630, -0.324183, -0.928783, 0.978732, 0.036198, -0.201925,
      0.997591, -0.000000, -0.069373, 0.000000, 1.000000, 0.000000, 0.069373, 0.000000, 0.997591,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999736, -0.000000, -0.022989, 0.000000, 1.000000, 0.000000, 0.022989, 0.000000, 0.999736,
      ]
    },
    {
      centers: [
      -1.061631, 0.141852, 0.135385,
      0.894044, 0.049425, 0.092437,
      -0.559717, 0.880000, 0.020405,
      0.560089, 0.880000, -0.000409,
      -0.549842, 0.181929, -0.820157,
      0.000144, 1.215542, 0.007746,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.096982, 0.765756, 0.635778, -0.711660, 0.393219, -0.582167, -0.695797, -0.508918, 0.506822,
      -0.174831, -0.581554, -0.794499, 0.923023, 0.184078, -0.337853, 0.342729, -0.792408, 0.504605,
      0.557682, 0.820164, -0.127757, -0.711661, 0.393219, -0.582166, -0.427235, 0.415584, 0.802970,
      0.371062, -0.922860, 0.103163, 0.861361, 0.300554, -0.409541, 0.346943, 0.240826, 0.906440,
      0.097711, -0.945302, 0.311220, -0.175535, -0.324183, -0.929566, 0.979612, 0.036198, -0.197610,
      0.999100, -0.000000, -0.042426, 0.000000, 1.000000, 0.000000, 0.042426, 0.000000, 0.999100,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999827, -0.000000, -0.018583, 0.000000, 1.000000, 0.000000, 0.018583, 0.000000, 0.999827,
      ]
    },
    {
      centers: [
      -1.062268, 0.141852, 0.130293,
      0.893591, 0.049425, 0.096723,
      -0.559809, 0.880000, 0.017720,
      0.560084, 0.880000, 0.002277,
      -0.545903, 0.181929, -0.822785,
      0.000107, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.100030, 0.765756, 0.635305, -0.708860, 0.393219, -0.585573, -0.698220, -0.508918, 0.503480,
      -0.171019, -0.581554, -0.795329, 0.924632, 0.184078, -0.333423, 0.340305, -0.792408, 0.506243,
      0.558288, 0.820164, -0.125081, -0.708861, 0.393219, -0.585573, -0.431081, 0.415584, 0.800912,
      0.370563, -0.922860, 0.104941, 0.863315, 0.300554, -0.405406, 0.342593, 0.240826, 0.908093,
      0.096217, -0.945302, 0.311685, -0.171076, -0.324183, -0.930397, 0.980549, 0.036198, -0.192910,
      0.999915, 0.000000, -0.013045, -0.000000, 1.000000, 0.000000, 0.013045, 0.000000, 0.999915,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999905, -0.000000, -0.013788, 0.000000, 1.000000, 0.000000, 0.013788, 0.000000, 0.999905,
      ]
    },
    {
      centers: [
      -1.062881, 0.141852, 0.125197,
      0.893117, 0.049425, 0.101008,
      -0.559887, 0.880000, 0.015035,
      0.560067, 0.880000, 0.004963,
      -0.541951, 0.181929, -0.825393,
      0.000070, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.103076, 0.765756, 0.634818, -0.706044, 0.393219, -0.588966, -0.700626, -0.508918, 0.500126,
      -0.167203, -0.581554, -0.796140, 0.926221, 0.184078, -0.328984, 0.337874, -0.792408, 0.507869,
      0.558882, 0.820164, -0.122402, -0.706044, 0.393219, -0.588965, -0.434917, 0.415584, 0.798835,
      0.370055, -0.922860, 0.106717, 0.865250, 0.300554, -0.401261, 0.338234, 0.240826, 0.909726,
      0.094721, -0.945302, 0.312143, -0.166612, -0.324183, -0.931207, 0.981463, 0.036198, -0.188205,
      0.999866, 0.000000, 0.016357, -0.000000, 1.000000, 0.000000, -0.016357, 0.000000, 0.999866,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999960, -0.000000, -0.008993, 0.000000, 1.000000, 0.000000, 0.008993, 0.000000, 0.999960,
      ]
    },
    {
      centers: [
      -1.063422, 0.141852, 0.120512,
      0.892663, 0.049425, 0.104943,
      -0.559948, 0.880000, 0.012568,
      0.560040, 0.880000, 0.007431,
      -0.538308, 0.181929, -0.827773,
      0.000036, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.105873, 0.765756, 0.634358, -0.703442, 0.393219, -0.592071, -0.702824, -0.508918, 0.497033,
      -0.163692, -0.581554, -0.796869, 0.927662, 0.184078, -0.324899, 0.335632, -0.792408, 0.509353,
      0.559416, 0.820164, -0.119938, -0.703442, 0.393219, -0.592071, -0.438433, 0.415584, 0.796911,
      0.369581, -0.922860, 0.108347, 0.867010, 0.300554, -0.397444, 0.334221, 0.240826, 0.911208,
      0.093345, -0.945302, 0.312557, -0.162506, -0.324183, -0.931932, 0.982283, 0.036198, -0.183878,
      0.999059, 0.000000, 0.043362, -0.000000, 1.000000, 0.000000, -0.043362, 0.000000, 0.999059,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999990, -0.000000, -0.004586, 0.000000, 1.000000, 0.000000, 0.004586, 0.000000, 0.999990,
      ]
    },
    {
      centers: [
      -1.063852, 0.141852, 0.116651,
      0.892276, 0.049425, 0.108182,
      -0.559990, 0.880000, 0.010536,
      0.560009, 0.880000, 0.009464,
      -0.535300, 0.181929, -0.829722,
      0.000007, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.108174, 0.765756, 0.633969, -0.701288, 0.393219, -0.594620, -0.704623, -0.508918, 0.494479,
      -0.160799, -0.581554, -0.797458, 0.928835, 0.184078, -0.321531, 0.333782, -0.792408, 0.510568,
      0.559847, 0.820164, -0.117907, -0.701288, 0.393219, -0.594620, -0.441323, 0.415584, 0.795314,
      0.369186, -0.922860, 0.109687, 0.868446, 0.300554, -0.394295, 0.330912, 0.240826, 0.912415,
      0.092210, -0.945302, 0.312894, -0.159123, -0.324183, -0.932516, 0.982943, 0.036198, -0.180312,
      0.997848, 0.000000, 0.065569, -0.000000, 1.000000, 0.000000, -0.065569, 0.000000, 0.997848,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, -0.000957, 0.000000, 1.000000, 0.000000, 0.000957, 0.000000, 1.000000,
      ]
    },
    {
      centers: [
      -1.064137, 0.141852, 0.114031,
      0.892007, 0.049425, 0.110379,
      -0.560014, 0.880000, 0.009156,
      0.559984, 0.880000, 0.010843,
      -0.533255, 0.181929, -0.831038,
      -0.000012, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.109735, 0.765756, 0.633701, -0.699822, 0.393219, -0.596346, -0.705838, -0.508918, 0.492742,
      -0.158835, -0.581554, -0.797851, 0.929624, 0.184078, -0.319242, 0.332523, -0.792408, 0.511388,
      0.560136, 0.820164, -0.116528, -0.699822, 0.393219, -0.596345, -0.443280, 0.415584, 0.794225,
      0.368914, -0.922860, 0.110596, 0.869415, 0.300554, -0.392155, 0.328664, 0.240826, 0.913227,
      0.091439, -0.945302, 0.313120, -0.156826, -0.324183, -0.932905, 0.983384, 0.036198, -0.177891,
      0.996745, 0.000000, 0.080613, -0.000000, 1.000000, 0.000000, -0.080613, 0.000000, 0.996745,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999999, -0.000000, 0.001506, 0.000000, 1.000000, 0.000000, -0.001506, 0.000000, 0.999999,
      ]
    },
    {
      centers: [
      -1.064240, 0.141852, 0.113065,
      0.891906, 0.049425, 0.111188,
      -0.560023, 0.880000, 0.008648,
      0.559974, 0.880000, 0.011351,
      -0.532501, 0.181929, -0.831521,
      -0.000019, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.110310, 0.765756, 0.633601, -0.699280, 0.393219, -0.596980, -0.706285, -0.508918, 0.492102,
      -0.158111, -0.581554, -0.797995, 0.929913, 0.184078, -0.318399, 0.332059, -0.792408, 0.511690,
      0.560241, 0.820164, -0.116020, -0.699281, 0.393219, -0.596980, -0.444000, 0.415584, 0.793822,
      0.368814, -0.922860, 0.110931, 0.869770, 0.300554, -0.391366, 0.327835, 0.240826, 0.913525,
      0.091155, -0.945302, 0.313203, -0.155979, -0.324183, -0.933046, 0.983545, 0.036198, -0.176998,
      0.996282, 0.000000, 0.086149, -0.000000, 1.000000, 0.000000, -0.086149, 0.000000, 0.996282,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999997, -0.000000, 0.002413, 0.000000, 1.000000, 0.000000, -0.002413, 0.000000, 0.999997,
      ]
    },
    {
      centers: [
      -1.064137, 0.141852, 0.114031,
      0.892007, 0.049425, 0.110379,
      -0.560014, 0.880000, 0.009156,
      0.559984, 0.880000, 0.010843,
      -0.533255, 0.181929, -0.831038,
      -0.000012, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.109735, 0.765756, 0.633701, -0.699822, 0.393219, -0.596346, -0.705839, -0.508918, 0.492742,
      -0.158835, -0.581554, -0.797851, 0.929624, 0.184078, -0.319242, 0.332523, -0.792408, 0.511388,
      0.560136, 0.820164, -0.116528, -0.699822, 0.393219, -0.596345, -0.443280, 0.415584, 0.794225,
      0.368914, -0.922860, 0.110596, 0.869415, 0.300554, -0.392155, 0.328664, 0.240826, 0.913227,
      0.091439, -0.945302, 0.313120, -0.156826, -0.324183, -0.932905, 0.983384, 0.036198, -0.177891,
      0.996745, 0.000000, 0.080613, -0.000000, 1.000000, 0.000000, -0.080613, 0.000000, 0.996745,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999999, -0.000000, 0.001506, 0.000000, 1.000000, 0.000000, -0.001506, 0.000000, 0.999999,
      ]
    },
    {
      centers: [
      -1.063852, 0.141852, 0.116651,
      0.892276, 0.049425, 0.108182,
      -0.559990, 0.880000, 0.010536,
      0.560009, 0.880000, 0.009464,
      -0.535300, 0.181929, -0.829722,
      0.000007, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.108174, 0.765756, 0.633969, -0.701288, 0.393219, -0.594620, -0.704623, -0.508918, 0.494479,
      -0.160799, -0.581554, -0.797458, 0.928835, 0.184078, -0.321531, 0.333782, -0.792408, 0.510568,
      0.559847, 0.820164, -0.117907, -0.701288, 0.393219, -0.594620, -0.441323, 0.415584, 0.795314,
      0.369186, -0.922860, 0.109687, 0.868446, 0.300554, -0.394295, 0.330912, 0.240826, 0.912415,
      0.092210, -0.945302, 0.312894, -0.159123, -0.324183, -0.932516, 0.982943, 0.036198, -0.180312,
      0.997848, 0.000000, 0.065569, -0.000000, 1.000000, 0.000000, -0.065569, 0.000000, 0.997848,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, -0.000957, 0.000000, 1.000000, 0.000000, 0.000957, 0.000000, 1.000000,
      ]
    },
    {
      centers: [
      -1.063422, 0.141852, 0.120512,
      0.892663, 0.049425, 0.104943,
      -0.559948, 0.880000, 0.012568,
      0.560040, 0.880000, 0.007431,
      -0.538308, 0.181929, -0.827773,
      0.000035, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.105873, 0.765756, 0.634358, -0.703442, 0.393219, -0.592071, -0.702824, -0.508918, 0.497033,
      -0.163692, -0.581554, -0.796869, 0.927662, 0.184078, -0.324899, 0.335632, -0.792408, 0.509353,
      0.559416, 0.820164, -0.119938, -0.703442, 0.393219, -0.592071, -0.438433, 0.415584, 0.796911,
      0.369581, -0.922860, 0.108347, 0.867010, 0.300554, -0.397444, 0.334221, 0.240826, 0.911208,
      0.093345, -0.945302, 0.312557, -0.162506, -0.324183, -0.931932, 0.982283, 0.036198, -0.183878,
      0.999059, 0.000000, 0.043362, -0.000000, 1.000000, 0.000000, -0.043362, 0.000000, 0.999059,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999990, -0.000000, -0.004586, 0.000000, 1.000000, 0.000000, 0.004586, 0.000000, 0.999990,
      ]
    },
    {
      centers: [
      -1.062881, 0.141852, 0.125197,
      0.893117, 0.049425, 0.101008,
      -0.559887, 0.880000, 0.015035,
      0.560067, 0.880000, 0.004963,
      -0.541951, 0.181929, -0.825393,
      0.000070, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.103076, 0.765756, 0.634818, -0.706044, 0.393219, -0.588966, -0.700626, -0.508918, 0.500126,
      -0.167203, -0.581554, -0.796140, 0.926221, 0.184078, -0.328984, 0.337874, -0.792408, 0.507869,
      0.558882, 0.820164, -0.122402, -0.706044, 0.393219, -0.588965, -0.434917, 0.415584, 0.798835,
      0.370055, -0.922860, 0.106717, 0.865250, 0.300554, -0.401261, 0.338234, 0.240826, 0.909726,
      0.094721, -0.945302, 0.312143, -0.166612, -0.324183, -0.931207, 0.981463, 0.036198, -0.188205,
      0.999866, 0.000000, 0.016357, -0.000000, 1.000000, 0.000000, -0.016357, 0.000000, 0.999866,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999960, -0.000000, -0.008993, 0.000000, 1.000000, 0.000000, 0.008993, 0.000000, 0.999960,
      ]
    },
    {
      centers: [
      -1.062268, 0.141852, 0.130293,
      0.893591, 0.049425, 0.096723,
      -0.559809, 0.880000, 0.017720,
      0.560084, 0.880000, 0.002277,
      -0.545903, 0.181929, -0.822785,
      0.000107, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.100030, 0.765756, 0.635305, -0.708860, 0.393219, -0.585573, -0.698220, -0.508918, 0.503480,
      -0.171019, -0.581554, -0.795329, 0.924632, 0.184078, -0.333423, 0.340305, -0.792408, 0.506243,
      0.558288, 0.820164, -0.125081, -0.708861, 0.393219, -0.585573, -0.431081, 0.415584, 0.800912,
      0.370563, -0.922860, 0.104941, 0.863315, 0.300554, -0.405406, 0.342593, 0.240826, 0.908093,
      0.096217, -0.945302, 0.311685, -0.171076, -0.324183, -0.930397, 0.980549, 0.036198, -0.192910,
      0.999915, -0.000000, -0.013045, 0.000000, 1.000000, 0.000000, 0.013045, 0.000000, 0.999915,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999905, -0.000000, -0.013788, 0.000000, 1.000000, 0.000000, 0.013788, 0.000000, 0.999905,
      ]
    },
    {
      centers: [
      -1.061631, 0.141852, 0.135385,
      0.894044, 0.049425, 0.092437,
      -0.559717, 0.880000, 0.020405,
      0.560089, 0.880000, -0.000409,
      -0.549842, 0.181929, -0.820157,
      0.000144, 1.215542, 0.007746,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.096982, 0.765756, 0.635778, -0.711660, 0.393219, -0.582167, -0.695797, -0.508918, 0.506822,
      -0.174831, -0.581554, -0.794499, 0.923023, 0.184078, -0.337853, 0.342729, -0.792408, 0.504605,
      0.557682, 0.820164, -0.127757, -0.711661, 0.393219, -0.582166, -0.427235, 0.415584, 0.802970,
      0.371062, -0.922860, 0.103163, 0.861361, 0.300554, -0.409541, 0.346943, 0.240826, 0.906440,
      0.097711, -0.945302, 0.311220, -0.175535, -0.324183, -0.929566, 0.979612, 0.036198, -0.197610,
      0.999100, -0.000000, -0.042426, 0.000000, 1.000000, 0.000000, 0.042426, 0.000000, 0.999100,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999827, -0.000000, -0.018583, 0.000000, 1.000000, 0.000000, 0.018583, 0.000000, 0.999827,
      ]
    },
    {
      centers: [
      -1.061024, 0.141852, 0.140062,
      0.894443, 0.049425, 0.088496,
      -0.559622, 0.880000, 0.022871,
      0.560082, 0.880000, -0.002877,
      -0.553451, 0.181929, -0.817726,
      0.000178, 1.215542, 0.007745,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.094180, 0.765756, 0.636199, -0.714219, 0.393219, -0.579025, -0.693557, -0.508918, 0.509884,
      -0.178330, -0.581554, -0.793721, 0.921525, 0.184078, -0.341917, 0.344950, -0.792408, 0.503090,
      0.557114, 0.820164, -0.130213, -0.714219, 0.393219, -0.579025, -0.423693, 0.415584, 0.804845,
      0.371513, -0.922860, 0.101527, 0.859548, 0.300554, -0.413333, 0.350935, 0.240826, 0.904902,
      0.099081, -0.945302, 0.310786, -0.179630, -0.324183, -0.928783, 0.978732, 0.036198, -0.201925,
      0.997591, -0.000000, -0.069373, 0.000000, 1.000000, 0.000000, 0.069373, 0.000000, 0.997591,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999736, -0.000000, -0.022989, 0.000000, 1.000000, 0.000000, 0.022989, 0.000000, 0.999736,
      ]
    },
    {
      centers: [
      -1.060509, 0.141852, 0.143912,
      0.894758, 0.049425, 0.085250,
      -0.559535, 0.880000, 0.024902,
      0.560068, 0.880000, -0.004909,
      -0.556415, 0.181929, -0.815713,
      0.000206, 1.215542, 0.007745,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.091871, 0.765756, 0.636536, -0.716315, 0.393219, -0.576429, -0.691702, -0.508918, 0.512397,
      -0.181209, -0.581554, -0.793069, 0.920278, 0.184078, -0.345259, 0.346773, -0.792408, 0.501835,
      0.556637, 0.820164, -0.132234, -0.716316, 0.393219, -0.576429, -0.420769, 0.415584, 0.806377,
      0.371879, -0.922860, 0.100178, 0.858043, 0.300554, -0.416450, 0.354216, 0.240826, 0.903623,
      0.100208, -0.945302, 0.310425, -0.182999, -0.324183, -0.928125, 0.977993, 0.036198, -0.205475,
      0.995804, -0.000000, -0.091506, 0.000000, 1.000000, 0.000000, 0.091506, 0.000000, 0.995804,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999646, -0.000000, -0.026617, 0.000000, 1.000000, 0.000000, 0.026617, 0.000000, 0.999646,
      ]
    },
    {
      centers: [
      -1.060151, 0.141852, 0.146523,
      0.894965, 0.049425, 0.083046,
      -0.559472, 0.880000, 0.026279,
      0.560054, 0.880000, -0.006288,
      -0.558422, 0.181929, -0.814340,
      0.000225, 1.215542, 0.007744,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.090303, 0.765756, 0.636761, -0.717733, 0.393219, -0.574664, -0.690438, -0.508918, 0.514099,
      -0.183162, -0.581554, -0.792620, 0.919425, 0.184078, -0.347524, 0.348008, -0.792408, 0.500979,
      0.556310, 0.820164, -0.133605, -0.717733, 0.393219, -0.574664, -0.418782, 0.415584, 0.807410,
      0.372124, -0.922860, 0.099262, 0.857015, 0.300554, -0.418561, 0.356440, 0.240826, 0.902748,
      0.100972, -0.945302, 0.310177, -0.185284, -0.324183, -0.927672, 0.977484, 0.036198, -0.207883,
      0.994314, -0.000000, -0.106487, 0.000000, 1.000000, 0.000000, 0.106487, 0.000000, 0.994314,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999577, -0.000000, -0.029078, 0.000000, 1.000000, 0.000000, 0.029078, 0.000000, 0.999577,
      ]
    },
    {
      centers: [
      -1.060018, 0.141852, 0.147484,
      0.895040, 0.049425, 0.082234,
      -0.559448, 0.880000, 0.026787,
      0.560048, 0.880000, -0.006796,
      -0.559160, 0.181929, -0.813833,
      0.000232, 1.215542, 0.007744,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.089725, 0.765756, 0.636842, -0.718254, 0.393219, -0.574012, -0.689972, -0.508918, 0.514725,
      -0.183881, -0.581554, -0.792454, 0.919110, 0.184078, -0.348358, 0.348462, -0.792408, 0.500663,
      0.556189, 0.820164, -0.134109, -0.718254, 0.393219, -0.574012, -0.418050, 0.415584, 0.807790,
      0.372214, -0.922860, 0.098924, 0.856635, 0.300554, -0.419339, 0.357259, 0.240826, 0.902424,
      0.101254, -0.945302, 0.310085, -0.186126, -0.324183, -0.927503, 0.977295, 0.036198, -0.208770,
      0.993709, -0.000000, -0.111996, 0.000000, 1.000000, 0.000000, 0.111996, 0.000000, 0.993709,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      0.999550, -0.000000, -0.029985, 0.000000, 1.000000, 0.000000, 0.029985, 0.000000, 0.999550,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flaggerArmature / Idle) */
cache_pose_sequence(g_flagger_idle);

var g_flag_idle =
/* Begin pose exported from flagger.blend (flagArmature / Idle) */
{
  bone_count: 2,
  frame_count: 21,
  fps: 4.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      -0.559160, 0.181929, -0.813833,
      0.683577, -0.619361, -0.829088,
      ],
      rotations: [
      0.101254, -0.945302, 0.310085, -0.186126, -0.324183, -0.927503, 0.977295, 0.036198, -0.208770,
      0.038712, -0.999225, 0.007133, -0.132597, -0.012212, -0.991095, 0.990414, 0.037422, -0.132967,
      ]
    },
    {
      centers: [
      -0.558422, 0.181929, -0.814340,
      0.684329, -0.619361, -0.828468,
      ],
      rotations: [
      0.100972, -0.945302, 0.310177, -0.185284, -0.324183, -0.927672, 0.977484, 0.036198, -0.207883,
      0.038706, -0.999225, 0.007168, -0.131698, -0.012212, -0.991215, 0.990534, 0.037422, -0.132069,
      ]
    },
    {
      centers: [
      -0.556415, 0.181929, -0.815712,
      0.686367, -0.619361, -0.826780,
      ],
      rotations: [
      0.100208, -0.945302, 0.310425, -0.182999, -0.324183, -0.928125, 0.977993, 0.036198, -0.205475,
      0.038688, -0.999225, 0.007263, -0.129257, -0.012212, -0.991536, 0.990856, 0.037422, -0.129629,
      ]
    },
    {
      centers: [
      -0.553451, 0.181929, -0.817726,
      0.689363, -0.619361, -0.824284,
      ],
      rotations: [
      0.099081, -0.945302, 0.310786, -0.179630, -0.324183, -0.928783, 0.978732, 0.036198, -0.201925,
      0.038661, -0.999225, 0.007403, -0.125658, -0.012212, -0.991999, 0.991320, 0.037422, -0.126033,
      ]
    },
    {
      centers: [
      -0.549842, 0.181929, -0.820157,
      0.692989, -0.619361, -0.821238,
      ],
      rotations: [
      0.097711, -0.945302, 0.311220, -0.175535, -0.324183, -0.929566, 0.979612, 0.036198, -0.197610,
      0.038628, -0.999225, 0.007574, -0.121285, -0.012212, -0.992543, 0.991866, 0.037422, -0.121663,
      ]
    },
    {
      centers: [
      -0.545903, 0.181929, -0.822785,
      0.696919, -0.619361, -0.817905,
      ],
      rotations: [
      0.096217, -0.945302, 0.311685, -0.171076, -0.324183, -0.930397, 0.980549, 0.036198, -0.192910,
      0.038592, -0.999225, 0.007759, -0.116524, -0.012212, -0.993113, 0.992438, 0.037422, -0.116905,
      ]
    },
    {
      centers: [
      -0.541951, 0.181929, -0.825393,
      0.700833, -0.619361, -0.814554,
      ],
      rotations: [
      0.094721, -0.945302, 0.312143, -0.166612, -0.324183, -0.931207, 0.981463, 0.036198, -0.188205,
      0.038554, -0.999225, 0.007944, -0.111760, -0.012212, -0.993660, 0.992987, 0.037422, -0.112144,
      ]
    },
    {
      centers: [
      -0.538308, 0.181929, -0.827774,
      0.704416, -0.619361, -0.811457,
      ],
      rotations: [
      0.093345, -0.945302, 0.312557, -0.162506, -0.324183, -0.931932, 0.982283, 0.036198, -0.183878,
      0.038519, -0.999225, 0.008114, -0.107380, -0.012212, -0.994143, 0.993472, 0.037422, -0.107767,
      ]
    },
    {
      centers: [
      -0.535300, 0.181929, -0.829722,
      0.707357, -0.619361, -0.808895,
      ],
      rotations: [
      0.092210, -0.945302, 0.312894, -0.159123, -0.324183, -0.932516, 0.982943, 0.036198, -0.180312,
      0.038489, -0.999225, 0.008253, -0.103771, -0.012212, -0.994526, 0.993856, 0.037422, -0.104161,
      ]
    },
    {
      centers: [
      -0.533255, 0.181929, -0.831038,
      0.709346, -0.619361, -0.807151,
      ],
      rotations: [
      0.091439, -0.945302, 0.313120, -0.156826, -0.324183, -0.932905, 0.983384, 0.036198, -0.177891,
      0.038468, -0.999225, 0.008348, -0.101322, -0.012212, -0.994779, 0.994110, 0.037422, -0.101713,
      ]
    },
    {
      centers: [
      -0.532501, 0.181929, -0.831521,
      0.710079, -0.619361, -0.806507,
      ],
      rotations: [
      0.091155, -0.945302, 0.313203, -0.155980, -0.324183, -0.933046, 0.983545, 0.036198, -0.176998,
      0.038461, -0.999225, 0.008383, -0.100419, -0.012212, -0.994870, 0.994202, 0.037422, -0.100811,
      ]
    },
    {
      centers: [
      -0.533255, 0.181929, -0.831038,
      0.709346, -0.619361, -0.807151,
      ],
      rotations: [
      0.091439, -0.945302, 0.313120, -0.156826, -0.324183, -0.932905, 0.983384, 0.036198, -0.177891,
      0.038468, -0.999225, 0.008348, -0.101322, -0.012212, -0.994779, 0.994110, 0.037422, -0.101713,
      ]
    },
    {
      centers: [
      -0.535300, 0.181929, -0.829722,
      0.707357, -0.619361, -0.808895,
      ],
      rotations: [
      0.092210, -0.945302, 0.312894, -0.159123, -0.324183, -0.932516, 0.982943, 0.036198, -0.180312,
      0.038489, -0.999225, 0.008253, -0.103771, -0.012212, -0.994526, 0.993856, 0.037422, -0.104161,
      ]
    },
    {
      centers: [
      -0.538308, 0.181929, -0.827774,
      0.704416, -0.619361, -0.811457,
      ],
      rotations: [
      0.093345, -0.945302, 0.312557, -0.162506, -0.324183, -0.931932, 0.982283, 0.036198, -0.183878,
      0.038519, -0.999225, 0.008114, -0.107380, -0.012212, -0.994143, 0.993472, 0.037422, -0.107767,
      ]
    },
    {
      centers: [
      -0.541951, 0.181929, -0.825393,
      0.700833, -0.619361, -0.814554,
      ],
      rotations: [
      0.094721, -0.945302, 0.312143, -0.166612, -0.324183, -0.931207, 0.981463, 0.036198, -0.188205,
      0.038554, -0.999225, 0.007944, -0.111760, -0.012212, -0.993660, 0.992987, 0.037422, -0.112144,
      ]
    },
    {
      centers: [
      -0.545903, 0.181929, -0.822785,
      0.696919, -0.619361, -0.817905,
      ],
      rotations: [
      0.096217, -0.945302, 0.311685, -0.171076, -0.324183, -0.930397, 0.980549, 0.036198, -0.192910,
      0.038592, -0.999225, 0.007759, -0.116524, -0.012212, -0.993113, 0.992438, 0.037422, -0.116905,
      ]
    },
    {
      centers: [
      -0.549842, 0.181929, -0.820157,
      0.692989, -0.619361, -0.821238,
      ],
      rotations: [
      0.097711, -0.945302, 0.311220, -0.175535, -0.324183, -0.929566, 0.979612, 0.036198, -0.197610,
      0.038628, -0.999225, 0.007574, -0.121285, -0.012212, -0.992543, 0.991866, 0.037422, -0.121663,
      ]
    },
    {
      centers: [
      -0.553451, 0.181929, -0.817726,
      0.689363, -0.619361, -0.824284,
      ],
      rotations: [
      0.099081, -0.945302, 0.310786, -0.179630, -0.324183, -0.928783, 0.978732, 0.036198, -0.201925,
      0.038661, -0.999225, 0.007403, -0.125658, -0.012212, -0.991999, 0.991320, 0.037422, -0.126033,
      ]
    },
    {
      centers: [
      -0.556415, 0.181929, -0.815712,
      0.686367, -0.619361, -0.826780,
      ],
      rotations: [
      0.100208, -0.945302, 0.310425, -0.182999, -0.324183, -0.928125, 0.977993, 0.036198, -0.205475,
      0.038688, -0.999225, 0.007263, -0.129257, -0.012212, -0.991536, 0.990856, 0.037422, -0.129629,
      ]
    },
    {
      centers: [
      -0.558422, 0.181929, -0.814340,
      0.684329, -0.619361, -0.828468,
      ],
      rotations: [
      0.100972, -0.945302, 0.310177, -0.185284, -0.324183, -0.927672, 0.977484, 0.036198, -0.207883,
      0.038706, -0.999225, 0.007168, -0.131698, -0.012212, -0.991215, 0.990534, 0.037422, -0.132069,
      ]
    },
    {
      centers: [
      -0.559160, 0.181929, -0.813833,
      0.683577, -0.619361, -0.829088,
      ],
      rotations: [
      0.101254, -0.945302, 0.310085, -0.186126, -0.324183, -0.927503, 0.977295, 0.036198, -0.208770,
      0.038712, -0.999225, 0.007133, -0.132597, -0.012212, -0.991095, 0.990414, 0.037422, -0.132967,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / Idle) */
cache_pose_sequence(g_flag_idle);

var g_flag_on_ground =
/* Begin pose exported from flagger.blend (flagArmature / FlagOnGround) */
{
  bone_count: 2,
  frame_count: 1,
  fps: 16.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      2.115338, -2.969760, -0.164363,
      1.373846, -3.196584, -0.070783,
      ],
      rotations: [
      -0.974207, 0.055329, 0.218770, -0.217882, 0.021685, -0.975735, -0.058731, -0.998233, -0.009071,
      -0.996013, -0.035881, -0.081676, 0.083466, -0.051602, -0.995174, 0.031493, -0.998023, 0.054391,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / FlagOnGround) */
cache_pose_sequence(g_flag_on_ground);

var g_flagger_crossed = 
/* Begin pose exported from flagger.blend (flaggerArmature / Cross) */
{
  bone_count: 12,
  frame_count: 1,
  fps: 16.000000,
  rest_centers: [
    -1.460000, 0.880000, 0.009999,
    1.460000, 0.880000, 0.009999,
    -0.560000, 0.880000, 0.010000,
    0.560000, 0.880000, 0.010000,
    3.610000, 0.880000, -1.170632,
    -0.000000, 1.215542, 0.007747,
    0.000000, -0.880241, 0.000000,
    -0.270000, -2.209999, -0.000001,
    0.270000, -2.210001, -0.000002,
    -0.270000, -0.880000, 0.000000,
    0.270000, -0.880000, -0.000000,
    0.000000, -0.202794, -0.000000,
  ],
  poses: [
    {
      centers: [
      -1.049728, 0.128719, -0.065792,
      0.853953, 0.030246, 0.048865,
      -0.560000, 0.880000, 0.010000,
      0.560000, 0.880000, 0.010000,
      0.639945, 1.403622, -1.030167,
      0.000000, 1.215542, 0.007747,
      0.000000, -0.880241, 0.000000,
      -0.358991, -2.183388, -0.249311,
      0.524700, -2.166378, -0.221951,
      -0.270000, -0.880000, 0.000000,
      0.270000, -0.880000, -0.000000,
      0.000000, -0.202794, -0.000000,
      ],
      rotations: [
      -0.341563, -0.041545, 0.938940, -0.795283, 0.545164, -0.265183, -0.500859, -0.837300, -0.219248,
      -0.261487, -0.087112, -0.961268, 0.952717, 0.136405, -0.271522, 0.154775, -0.986816, 0.047325,
      0.544142, 0.834756, 0.084213, -0.795283, 0.545164, -0.265182, -0.267272, 0.077324, 0.960514,
      0.326615, -0.944170, 0.043184, 0.912273, 0.302975, -0.275615, 0.247144, 0.129416, 0.960298,
      -0.828240, -0.558263, 0.048598, -0.069637, 0.016484, -0.997436, 0.556031, -0.829501, -0.052529,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000,
      0.997836, -0.063852, 0.015715, 0.065702, 0.977877, -0.198595, -0.002687, 0.199197, 0.979956,
      0.985434, 0.170023, 0.003443, -0.166549, 0.968997, -0.182500, -0.034366, 0.179269, 0.983200,
      0.997685, -0.068001, -0.000613, 0.066910, 0.979993, 0.187451, -0.012147, -0.187058, 0.982274,
      0.980943, 0.194295, -0.000406, -0.191504, 0.967201, 0.166879, 0.032816, -0.163621, 0.985977,
      1.000000, -0.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.000000, 0.000000, 1.000000,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flaggerArmature / Cross) */
cache_pose_sequence(g_flagger_crossed);

var g_flag_crossed = 
/* Begin pose exported from flagger.blend (flagArmature / Cross) */
{
  bone_count: 2,
  frame_count: 1,
  fps: 16.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      0.639945, 1.403622, -1.030167,
      0.553243, -0.069932, -1.056593,
      ],
      rotations: [
      -0.828239, -0.558263, 0.048598, -0.069637, 0.016484, -0.997436, 0.556031, -0.829501, -0.052529,
      -0.822263, -0.501552, -0.268939, 0.204968, 0.179861, -0.962101, 0.530916, -0.846224, -0.045091,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / Cross) */

var g_flag_crossed2 = 
/* Begin pose exported from flagger.blend (flagArmature / Cross2) */
{
  bone_count: 2,
  frame_count: 1,
  fps: 16.000000,
  rest_centers: [
    3.610000, 0.880000, -1.170632,
    2.610000, 0.880000, 0.009998,
  ],
  poses: [
    {
      centers: [
      -0.022882, 1.502941, -1.582705,
      -0.624908, 0.234503, -1.126410,
      ],
      rotations: [
      0.238019, -0.522604, 0.818677, -0.685294, 0.506949, 0.522852, -0.688272, -0.685483, -0.237474,
      0.026838, -0.316047, 0.948364, -0.735856, 0.635885, 0.232736, -0.676606, -0.704105, -0.215499,
      ]
    },
  ],
}
/* End pose exported from flagger.blend (flagArmature / Cross2) */
cache_pose_sequence(g_flag_crossed);

/* 2d vector functions */
function movv2(r, a) { r[0] = a[0]; r[1] = a[1]; }
function addv2(r, a) { r[0] += a[0]; r[1] += a[1]; }
function subv2(r, a) { r[0] -= a[0]; r[1] -= a[1]; }
function scalev2(r, a) { r[0] *= a; r[1] *= a; }
function dotv2(a, b) { return a[0] * b[0] + a[1] * b[1]; }

var g_debug = false;
function debug_message(s) { if (g_debug) mx.message(s); }

/*
################################################################################
## Video screen display
##
################################################################################
*/

function make_cell_map(font, characters, key) {
	var i, map;

	map = [];

  // * = 9
	key = characters.indexOf(key);

  // for 128 characters set up map for all indexes needed equal to the key
  // i = 33
  // map[!] = *
	for (i = 0; i < 128; i++)
    map[String.fromCharCode(i)] = key;

  // map[characters[i]] = i
  // i = 0
  // map[!] = 0;
  // i = 1
  // map["] = 1;
	for (i = 0; i < characters.length; i++)
    map[characters[i]] = i;

  font.map = map;
}

function get_cell_coords(font, character) {
  // if character is not in the font map we created, return
	if (!(character in font.map))
		mx.message("Not in map " + character);
  /* return the coords in our font variable
    ex. font.coords[font.map[character]];
    character = ','
    font.coords[font.map[,]];
    font.map[,] = 11;
    font.coords[11] = [360, 0, 40] */
	return font.coords[font.map[character]];
}

function draw_text(font, x, y, current_screen) {
	var i, cell_coords, sx, sy, dx, dy, width, height;

  // starting x and y values set to dx and dy
	dx = x;
	dy = y;

  // go through the whole screen 
	for (i = 0; i < current_screen.length; i++) {
    //if character equals newline
		if (current_screen[i] == "\n") {
      // reset the dx to the beginning
			dx = x;
      // new y value = old y value + (64 / 512 * 1)
			dy += font.line_height / font.height * font.yscale;
			continue;
		}
    // if character equals a space
		if (current_screen[i] == " ") {
      // get cell coords of a comma
			cell_coords = get_cell_coords(font, ","); /* comma about as wide as space */
      // cell_coords = [360, 0, 40]
      // new x value = old x value + (40 / 1024 * 1)
			dx += cell_coords[2] / font.width * font.xscale;
      // continue statement skips the next steps of the loop and continues to the next iteration
			continue;
		}
    // get cell coordinates of current character of font
		cell_coords = get_cell_coords(font, current_screen[i]);
    /* source x is first value / (font width * font xscale + xoffset)
      ex char = '"', cell coords = [24, 0, 32]
      sx = (24 / 1024 * 1 + 0) = 0.0234375
      sy = (0 / 512 * 1 + 0) = 0
      width = (32 / 1024 * 1) = 0.03125
      height = (64 / 512 * 1) = 0.125 */
		sx = cell_coords[0] / font.width * font.xscale + font.xoffset;
		sy = cell_coords[1] / font.height * font.yscale + font.yoffset;
		width = cell_coords[2] / font.width * font.xscale;
		height = font.line_height / font.height * font.yscale;
		mx.paste_custom_frame(font.tid, 0, sx, sy, dx, dy, width, height);
    /* add to dx so new character doesn't overlap
    dx += 0.03125 - (8 / (1024 * 1)) => 0.03125 - 0.0078125 => 0.0234375
    dx += 0.0234375 */
		dx += width - (font.overlap / (font.width * font.xscale));
	}
}

var g_screen_tid = mx.read_texture("@sx2022battlegroundsobjectpack/statue/other/timingtower/scoringtower.seq");

var g_screen_font = {
tid: g_screen_tid,
xoffset: 0,
yoffset: 0,
xscale: 1,
yscale: 1,
overlap: 8,
width: 512,
height: 512,
line_height: 64,
coords: [ [ 0, 0, 24 ], [ 24, 0, 32 ], [ 56, 0, 48 ], [ 104, 0, 40 ],
[ 144, 0, 56 ], [ 200, 0, 48 ], [ 248, 0, 16 ], [ 264, 0, 32 ],
[ 296, 0, 32 ], [ 328, 0, 32 ], [ 360, 0, 40 ], [ 400, 0, 24 ],
[ 424, 0, 32 ], [ 456, 0, 24 ], [ 480, 0, 32 ], [ 512, 0, 40 ],
[ 552, 0, 40 ], [ 592, 0, 48 ], [ 640, 0, 48 ], [ 688, 0, 48 ],
[ 736, 0, 40 ], [ 776, 0, 40 ], [ 816, 0, 40 ], [ 856, 0, 40 ],
[ 896, 0, 40 ], [ 936, 0, 24 ], [ 960, 0, 32 ], [ 0, 64, 40 ],
[ 40, 64, 40 ], [ 80, 64, 40 ], [ 120, 64, 32 ], [ 152, 64, 56 ],
[ 208, 64, 48 ], [ 256, 64, 48 ], [ 304, 64, 48 ], [ 352, 64, 48 ],
[ 400, 64, 48 ], [ 448, 64, 48 ], [ 496, 64, 48 ], [ 544, 64, 48 ],
[ 592, 64, 32 ], [ 624, 64, 40 ], [ 664, 64, 48 ], [ 712, 64, 40 ],
[ 752, 64, 56 ], [ 808, 64, 48 ], [ 856, 64, 48 ], [ 904, 64, 48 ],
[ 952, 64, 48 ], [ 0, 128, 48 ], [ 48, 128, 48 ], [ 96, 128, 48 ],
[ 144, 128, 48 ], [ 192, 128, 48 ], [ 240, 128, 64 ], [ 304, 128, 56 ],
[ 360, 128, 48 ], [ 408, 128, 48 ], [ 456, 128, 40 ], [ 496, 128, 24 ],
[ 520, 128, 40 ], [ 560, 128, 40 ], [ 600, 128, 40 ], [ 640, 128, 24 ],
[ 664, 128, 40 ], [ 704, 128, 48 ], [ 752, 128, 40 ], [ 792, 128, 48 ],
[ 840, 128, 40 ], [ 880, 128, 40 ], [ 920, 128, 48 ], [ 968, 128, 40 ],
[ 0, 192, 32 ], [ 32, 192, 32 ], [ 64, 192, 48 ], [ 112, 192, 32 ],
[ 144, 192, 56 ], [ 200, 192, 40 ], [ 240, 192, 40 ], [ 280, 192, 48 ],
[ 328, 192, 48 ], [ 376, 192, 40 ], [ 416, 192, 40 ], [ 456, 192, 32 ],
[ 488, 192, 40 ], [ 528, 192, 40 ], [ 568, 192, 56 ], [ 624, 192, 48 ],
[ 672, 192, 48 ], [ 720, 192, 40 ], [ 760, 192, 40 ], [ 800, 192, 16 ],
[ 816, 192, 40 ], [ 856, 192, 40 ] ]
};

make_cell_map(g_screen_font, 
 "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
 "*");

var g_current_screen = "";

function show_text(screen) {
	if (screen == g_current_screen)
		return
	g_current_screen = screen;
	mx.begin_custom_frame(g_screen_tid);
  // mx.paste_custom_frame(texture_id, frame_number, src_x, src_y, dst_x, dst_y, width, height)
	mx.paste_custom_frame(g_screen_tid, 0, 0, .5, 0.75, 0, 1.0, 0.5);
	mx.paste_custom_frame(g_screen_tid, 0, 0, .5, 0.75, .5, 1.0, 0.5);
	draw_text(g_screen_font, 0, 0, screen);
	mx.end_custom_frame(g_screen_tid);
}

function get_condensed_name(name) {
  // trim team name off
  name = name.replace(/\|.*/gm, "");
  // trim beginning and ending white spaces
  name = name.replace(/^\s+|\s+$/gm,"");
  // remove any non-alphabetical characters and spaces
  name = name.replace(/[^A-Za-z ]+/gm, "");
  // trim any final spaces off
  name = name.replace(/\s+$/gm, "");
  
  if (name.length == 0)
    return "Unknown Rider";
  name_arr = name.split(" ");
  if (name_arr.length > 1)
    name = name_arr[1];
  return name;
}

var tower_max_showing_riders = 5;
function update_screen() {
	// gets column numbers in array based on column n
	// used for getting laptimes
	var a = [];
  var riderName, riderNum, num_of_people_on_tower;
  if (!racingEvent) {

    // copy best_player_laps into the sorted array
    var best_player_laps_arr_srtd = best_player_laps.slice();
    // sort the array
    best_player_laps_arr_srtd.sort(function (a, b){return a[0] - b[0];});

    if (g_running_order.length < tower_max_showing_riders)
      num_of_people_on_tower = g_running_order.length;
    else
      num_of_people_on_tower = tower_max_showing_riders;

    for (var i = 0; i < num_of_people_on_tower; i++){
      // times are stored in the first column of every row
      var time = best_player_laps_arr_srtd[i][0];

      // if no lap, don't display
      if (time != undefinedTime){
        // slots are stored in the second column of every row
        var slot = best_player_laps_arr_srtd[i][1];
        // gets last name
        riderName = get_condensed_name(mx.get_rider_name(slot));
        riderNum = mx.get_rider_number(slot);
        a.push((i + 1).toString() + ')   ' + time_to_string(time) + ' - #' + riderNum  + ' ' + riderName);
      }
    }
    show_text("Top Best Laps\nPos Time      Rider Name\n" + a.join("\n"));
  }
  else {
    var timingGate;
    if (g_running_order.length < tower_max_showing_riders)
      num_of_people_on_tower = g_running_order.length;

    else
      num_of_people_on_tower = tower_max_showing_riders;
      
    for (var i = 0; i < num_of_people_on_tower; i++){
      timingGate = g_running_order[i].position;
      if (timingGate > 0){
        riderName = get_condensed_name(mx.get_rider_name(g_running_order[i].slot));
        riderNum = mx.get_rider_number(slot);
        a.push((i + 1).toString() + ')   ' + '#' + riderNum + ' ' + riderName);
      }
    }

    show_text("Running Order\nPos Rider  Name\n" + a.join("\n"));
  }

}