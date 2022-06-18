/*
################################################################################
## Video screen display
##
################################################################################
*/

function makeCellMap(font, characters, key) {
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

function getCellCoords(font, character) {
    // if character is not in the font map we created, return
	if (!(character in font.map)) {
        mx.message("Not in map " + character);
    }
    /* return the coords in our font variable
    ex. font.coords[font.map[character]];
    character = ','
    font.coords[font.map[,]];
    font.map[,] = 11;
    font.coords[11] = [360, 0, 40] */
	return font.coords[font.map[character]];
}

function drawText(font, x, y, currentScreen) {
  var i, cellCoords, sx, sy, dx, dy, width, height;

  // starting x and y values set to dx and dy
	dx = x;
	dy = y;

  // go through the whole screen 
	for (i = 0; i < currentScreen.length; i++) {
    //if character equals newline
		if (currentScreen[i] == "\n") {
      // reset the dx to the beginning
			dx = x;
      // new y value = old y value + (64 / 512 * 1)
			dy += font.line_height / font.height * font.yscale;
			continue;
		}

    // if character equals a space
		if (currentScreen[i] == " ") {
      // get cell coords of a comma
			cellCoords = getCellCoords(font, ","); /* comma about as wide as space */
      // cellCoords = [360, 0, 40]
      // new x value = old x value + (40 / 1024 * 1)
			dx += cellCoords[2] / font.width * font.xscale;
			continue;
		}

    // get cell coordinates of current character of font
		cellCoords = getCellCoords(font, currentScreen[i]);
      /* source x is first value / (font width * font xscale + xoffset)
      ex char = '"', cell coords = [24, 0, 32]
      sx = (24 / 1024 * 1 + 0) = 0.0234375
      sy = (0 / 512 * 1 + 0) = 0
      width = (32 / 1024 * 1) = 0.03125
      height = (64 / 512 * 1) = 0.125 */
		sx = cellCoords[0] / font.width * font.xscale + font.xoffset;
		sy = cellCoords[1] / font.height * font.yscale + font.yoffset;
		width = cellCoords[2] / font.width * font.xscale;
		height = font.line_height / font.height * font.yscale;
		mx.paste_custom_frame(font.tid, 0, sx, sy, dx, dy, width, height);
      /* add to dx so new character doesn't overlap
      dx += 0.03125 - (8 / (1024 * 1)) => 0.03125 - 0.0078125 => 0.0234375
      dx += 0.0234375 */
		dx += width - (font.overlap / (font.width * font.xscale));
	}
}

var screenTextureID = mx.read_texture("@os2022bgsxobj/statue/other/timingtower/scoringtower.seq");

var screenFont = {
tid: screenTextureID,
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

makeCellMap(screenFont, 
 "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
 "*");

var currentScreen = "";

function showText(screen) {
	if (screen == currentScreen)
		return
	currentScreen = screen;
	mx.begin_custom_frame(screenTextureID);
  // mx.paste_custom_frame(texture_id, frame_number, src_x, src_y, dst_x, dst_y, width, height)
	mx.paste_custom_frame(screenTextureID, 0, 0, .5, 0.75, 0, 1.0, 0.5);
	mx.paste_custom_frame(screenTextureID, 0, 0, .5, 0.75, .5, 1.0, 0.5);
	drawText(screenFont, 0, 0, screen);
	mx.end_custom_frame(screenTextureID);
}

function getCondensedName(name) {
  // trim team name off
  name = name.replace(/\|.*/gm, "");
  // trim beginning and ending white spaces
  name = name.replace(/^\s+|\s+$/gm,"");
  // remove any non-alphabetical characters and spaces
  name = name.replace(/[^A-Za-z ]+/gm, "");
  // trim any final spaces off
  name = name.replace(/\s+$/gm, "");
  
  if (name.length == 0) {
    return "Unknown Rider";
  }

  nameArray = name.split(" ");
  if (nameArray.length > 1) {

    var lastNameEntry = nameArray[nameArray.length - 1];
    while (lastNameEntry == "Jr" || lastNameEntry == "Sr") {
        nameArray.pop();
        lastNameEntry = nameArray[nameArray.length - 1];
        if (nameArray.length == 1) {
            return nameArray[0];
        }
    }
    return nameArray[nameArray.length - 1];
  }
  return name;
}

var towerMaxRidersShowing = 5;
function updateScreen() {
	// gets column numbers in array based on column n
	// used for getting laptimes
	var a = [];
  var riderName, riderNum, numOfPeopleOnTower;
  if (!racingEvent) {

    // copy bestPlayerLaptimes into the sorted array
    var bestPlayerLapsArrSrtd = bestPlayerLaptimes.slice();
    // sort the array
    bestPlayerLapsArrSrtd.sort(function (a, b){return a[0] - b[0];});

    if (globalRunningOrder.length < towerMaxRidersShowing)
      numOfPeopleOnTower = globalRunningOrder.length;
    else
      numOfPeopleOnTower = towerMaxRidersShowing;

    for (var i = 0; i < numOfPeopleOnTower; i++){
      // times are stored in the first column of every row
      var time = bestPlayerLapsArrSrtd[i][0];

      // if no lap, don't display
      if (time != undefinedTime){
        // slots are stored in the second column of every row
        var slot = bestPlayerLapsArrSrtd[i][1];
        // gets last name
        riderName = getCondensedName(mx.get_rider_name(slot));
        riderNum = mx.get_rider_number(slot);
        a.push((i + 1).toString() + ')   ' + timeToString(time) + ' - #' + riderNum  + ' ' + riderName);
      }
    }
    showText("Top Best Laps\nPos Time      Rider Name\n" + a.join("\n"));
  }
  else {
    var timingGate;
    if (globalRunningOrder.length < towerMaxRidersShowing)
      numOfPeopleOnTower = globalRunningOrder.length;

    else
      numOfPeopleOnTower = towerMaxRidersShowing;
      
    for (var i = 0; i < numOfPeopleOnTower; i++){
      timingGate = globalRunningOrder[i].position;
      if (timingGate > 0){
        riderName = getCondensedName(mx.get_rider_name(globalRunningOrder[i].slot));
        riderNum = mx.get_rider_number(slot);
        a.push((i + 1).toString() + ')   ' + '#' + riderNum + ' ' + riderName);
      }
    }

    showText("Running Order\nPos Rider  Name\n" + a.join("\n"));
  }

}

