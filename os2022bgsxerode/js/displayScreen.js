/*
################################################################################
## Video screen display
##
################################################################################
*/

/*
 Colors
 ######
 red: honda
 orange: ktm
 yellow: suzuki
 green: kawi
 blue: yamaha
 white: husqvarna
 cyan: tm
 crimson: gasgas
*/
var teamAvatars = {
  privateerRed: {page: 1, row: 0, col: 0, color: "red"},
  privateerOrange: {page: 1, row: 0, col: 0, color: "orange"},
  privateerYellow: {page: 1, row: 0, col: 0, color: "yellow"},
  privateerBlue: {page: 1, row: 0, col: 0, color: "green"},
  privateerGreen: {page: 1, row: 0, col: 0, color: "blue"},
  privateerWhite: {page: 1, row: 0, col: 0, color: "white"},
  phils: {page: 1, row: 0, col: 0, color: "crimson"},
  dbd: {page: 1, row: 0, col: 0, color: "orange"},
  jdr: {page: 1, row: 0, col: 0, color: "yellow"},
  aspect: {page: 1, row: 0, col: 0, color: "blue"},
  mv: {page: 1, row: 0, col: 0, color: "red"},
  swap: {page: 1, row: 0, col: 0, color: "orange"},
  covenant: {page: 1, row: 0, col: 0, color: "orange"},
  wildside: {page: 1, row: 0, col: 0, color: "orange"},
  bpc: {page: 1, row: 0, col: 0, color: "crimson"},
  panini: {page: 1, row: 0, col: 0, color: "blue"},
  galaxy: {page: 1, row: 0, col: 0, color: "green"},
  yogi: {page: 1, row: 0, col: 0, color: "green"},
  default: {page: 1, row: 0, col: 0}
}

var riderAvatars = [
  { avatar: teamAvatars.jdr, re: /\bjack.*\bhaley\b/i },
  { avatar: teamAvatars.privateerWhite, re: /\bjer.*\bsmith\b/i },
  { avatar: teamAvatars.panini, re: /\balexis.*\bleclair\b/i },
  { avatar: teamAvatars.panini, re: /\bjer.*\bseabolt\b/i },
  { avatar: teamAvatars.panini, re: /\bpayson.*\bjohnson\b/i },
  { avatar: teamAvatars.aspect, re: /\batom.*\bholm\b/i },
  { avatar: teamAvatars.mv, re: /\bjeremy.*\bcohenour\b/i },
  { avatar: teamAvatars.mv, re: /\brace.*\bkarlin\b/i },
  { avatar: teamAvatars.panini, re: /\bmatias.*\bjanice\b/i },
  { avatar: teamAvatars.privateerRed, re: /\bsean.*\bklein\b/i },
  { avatar: teamAvatars.bpc, re: /\bchase.*\bblakely\b/i },
  { avatar: teamAvatars.aspect, re: /\bneal.*\bwells\b/i },
  { avatar: teamAvatars.phils, re: /\bjakob.*\bhubbard\b/i },
  { avatar: teamAvatars.privateerOrange, re: /\bdevin.*\bdavis\b/i },
  { avatar: teamAvatars.phils, re: /\bbraden.*\bcarter\b/i },
  { avatar: teamAvatars.galaxy, re: /\bclint.*\bmartin\b/i },
  { avatar: teamAvatars.panini, re: /\bcolby.*\begeland\b/i },
  { avatar: teamAvatars.yogi, re: /\blogan.*\bleitzel\b/i },
  { avatar: teamAvatars.phils, re: /\btyler.*\blang\b/i },
  { avatar: teamAvatars.jdr, re: /\bdaniel.*\bmills\b/i },
  { avatar: teamAvatars.phils, re: /\bbryce.*\bwhealon\b/i },
       
  /* catch all - this should be last */
  { avatar: teamAvatars.default, re: /.*/ },
];

var brandRegExps = [
  { re: /^crf?[0-9]+/, color: "red" },
  { re: /^fc[0-9]+/, color: "white" },
  { re: /^kx[0-9]+/, color: "green" },
  { re: /^[0-9]+sx/, color: "orange" },
  { re: /^rmz?[0-9]+/, color: "yellow" },
  { re: /^yz[0-9]+/, color: "blue" },
  { re: /./, color: "none" },
];

function getBrandColor(model) {
  var i;

  for (i = 0; i < brandRegExps.length - 1; i++)
    if (model.match(brandRegExps[i].re))
      break;

  return brandRegExps[i].color;
}

var avatarMap = [];
function getAvatar(slot, name) {
  var i;

  if (slot in avatarMap)
    return avatarMap[slot];

  for (i = 0; i < riderAvatars.length; i++)
    if (name.match(riderAvatars[i].re)) {
      avatarMap[slot] = riderAvatars[i].avatar;
      return avatarMap[slot];
    }

  return null;
}


function makeCellMap(font, characters, key) {
	var i, map;

	map = [];

  // * = 9
	key = characters.indexOf(key);

  // for 128 characters set up map for all indexes needed equal to the key
  // map["!"] = *
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
  character = ','
  font.coords[font.map[,]];
  font.map[,] = 11;
  font.coords[11] = [360, 0, 40] */
	return font.coords[font.map[character]];
}

function drawText(font, startX, startY, textToDraw, draw) {
  var i, cellCoords, sourceX, sourceY, destinationX, destinationY, width, height;

  // starting x and y values set to dx and dy
	destinationX = startX;
	destinationY = startY;

  // go through the whole sentence
	for (i = 0; i < textToDraw.length; i++) {
		if (textToDraw[i] == "\n") {
      // reset the destination x to the beginning
			destinationX = startX;
			destinationY += font.line_height / font.height * font.yscale;
			continue;
		}

		if (textToDraw[i] == " ") {
			cellCoords = getCellCoords(font, ","); /* comma about as wide as space */
			destinationX += cellCoords[2] / font.width * font.xscale;
			continue;
		}

    // get cell coordinates of current character from font
		cellCoords = getCellCoords(font, textToDraw[i]);
    //mx.message("character: " + textToDraw[i] + " | coords: [" + cellCoords[0].toString() + ", " + cellCoords[1].toString() + ", " + cellCoords[2].toString() + "]");
    sourceX = cellCoords[0] / font.width * font.xscale + font.xoffset;
		sourceY = cellCoords[1] / font.height * font.yscale + font.yoffset;
		width = cellCoords[2] / font.width * font.xscale;
		height = font.line_height / font.height * font.yscale;
    if (draw) {
      mx.paste_custom_frame(font.tid, 1, sourceX, sourceY, destinationX, destinationY, width, height);
    }
    // new X destination
    destinationX += width - font.overlap / font.width * font.xscale;
	}

  return destinationX - startX;
}

function drawScreenText(f, x, y, s, c) {
  if (!c) {
    drawText(f, x, y, s, true);
    return;
  }
  var w;
  w = drawText(f, x, y, s, false);
  drawText(f, x - w * 0.5, y, s, true);
}

var screenTextureID = mx.read_texture("@os2022bgsxobj/statue/other/timingtower/timingtower.seq");

var numbersFont = {
  tid: screenTextureID,
  xoffset: 0,
  yoffset: 0,
  xscale: 555 / 2048,
  yscale: 410 / 1024,
  width: 2048,
  height: 2048,
  line_height: 283,
  overlap: 0,
  coords: [ [ 0, 0, 223 ], [ 223, 0, 142], [ 365, 0, 217 ], [ 582, 0, 201 ],
  [ 783, 0, 221 ], [ 1004, 0, 207 ], [ 1211, 0, 198], [ 1409, 0, 218 ],
  [ 1627, 0, 204 ], [ 1831, 0, 202 ], [ 0, 283, 99 ], [ 99, 283, 90 ], 
  [ 189, 283, 154 ], [ 343, 283, 132 ], [ 475, 283, 159 ], [ 634, 283, 175 ], 
  [ 809, 283, 187 ], [ 996, 283, 204 ], [ 1200, 283, 175 ], [ 1375, 283, 129 ], 
  [ 1504, 283, 148 ], [ 1652, 283, 75 ], [ 1727, 283, 73 ], [ 1800, 283, 144 ], 
  [ 0, 566, 154 ], [ 154, 566, 135 ], [ 289, 566, 140 ], [ 429, 566, 100 ], 
  [ 533, 566, 138 ], [ 671, 566, 148 ], [ 819, 566, 143 ], [ 962, 566, 133 ], 
  [ 1095, 566, 95 ]]
};

makeCellMap(numbersFont, "0123456789:.FLCHQMEahilnpsufygevt", ".");

var textFont = {
  tid: screenTextureID,
  xoffset: 0,
  yoffset: 0.5,
  xscale: 520 / 2048,
  yscale: 475 / 1024,
  width: 2048,
  height: 2048,
  line_height: 196,
  overlap: 0,
  coords: [ [ 0, 0, 120 ], [ 120, 0, 108 ], [ 228, 0, 108 ], [ 336, 0, 112 ],
  [ 448, 0, 111 ], [ 559, 0, 76 ], [ 635, 0, 109 ], [ 744, 0, 108 ],
  [ 852, 0, 56 ], [ 908, 0, 64 ], [ 972, 0, 108 ], [ 1080, 0, 46 ],
  [ 1126, 0, 164 ], [ 1290, 0, 107 ], [ 1397, 0, 114 ], [ 1511, 0, 111 ],
  [ 1622, 0, 112 ], [ 1734, 0, 79 ], [ 1813, 0, 98 ], [ 0, 196, 88 ],
  [ 88, 196, 98 ], [ 186, 196, 103 ], [ 289, 196, 149 ],[ 438, 196, 103 ],
  [ 541, 196, 101 ], [ 642, 196, 91 ], [ 733, 196, 127 ], [ 860, 196, 118 ],
  [ 978, 196, 135 ], [ 1113, 196, 130 ], [ 1243, 196, 122 ], [ 1365, 196, 103 ],
  [ 1469, 196, 128 ], [ 1606, 196, 124 ], [ 1730, 196, 65 ], [ 1795, 196, 112 ],
  [ 1907, 196, 126 ], [ 0, 392, 118 ], [ 118, 392, 157 ], [ 275, 392, 135 ],
  [ 410, 392, 140 ], [ 550, 392, 130 ], [ 680, 392, 132 ], [ 818, 392, 127 ],
  [ 945, 392, 112 ], [ 1057, 392, 115 ], [ 1172, 392, 119 ], [ 1291, 392, 117 ],
  [ 1408, 392, 164 ], [ 1572, 392, 123 ], [ 1695, 392, 116 ], [ 1811, 392, 114 ],
  [ 1925, 392, 61 ], [ 0, 588, 152 ], [ 152, 588, 118 ], [ 270, 588, 117 ],
  [ 387, 588, 161 ], [ 548, 588, 82 ], [ 630, 588, 129 ], [ 759, 588, 80 ],
  [ 839, 588, 77 ], [ 916, 588, 74 ], [ 990, 588, 80 ], [ 1070, 588, 122 ],
  [ 1192, 588, 116 ], [ 1308, 588, 97 ], [ 1405, 588, 66 ], [ 1471, 588, 72 ],
  [ 1543, 588, 102 ], [ 1645, 588, 65 ], [ 1710, 588, 85 ], [ 1795, 588, 65 ],
  [ 1860, 588, 100 ], [ 0, 784, 80 ], [ 80, 784, 116 ], [ 196, 784, 111 ], 
  [ 307, 784, 90 ], [ 397, 784, 97 ], [ 494, 784, 73 ], [ 567, 784, 70 ], 
  [ 637, 784, 115 ], [ 752, 784, 62 ], [ 814, 784, 117 ], [ 931, 784, 88 ], 
  [ 1019, 784, 112 ], [ 1131, 784, 112 ], [ 1243, 784, 115 ], [ 1358, 784, 113 ], 
  [ 1471, 784, 111 ], [ 1582, 784, 115 ], [ 1697, 784, 113 ], [ 1810, 784, 130 ] ]
};
  
makeCellMap(textFont, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-=+_[]\\|:;\"'<>/?,.~`0123456789",
"*");

var colors = {
	width: 490,
	height: 150,
  XValues: [23, 279, 536, 779],
  YStart: 611,
  YDifference: 79,
  yoffset: 0.2,
  xoffset: 0,
	coords: {
		red: [512, 312],
		orange: [24, 460],
		yellow: [512, 164],
		green: [512, 18],
		blue: [24, 164],
		white: [24, 18],
		cyan: [512, 460],
		crimson: [24, 312],
		get default() {return this.white;}
	}
}

function getCondensedName(name) {
  // trim team name off
  name = name.replace(/\|.*/gm, "");
  // trim beginning and ending white spaces
  name = name.replace(/^\s+|\s+$/gm,"");
  // remove any non-alphabetical characters and spaces except for apostrophes
  name = name.replace(/[^A-Za-z &^\']+/gm, "");
  // trim any final spaces off
  name = name.replace(/\s+$/gm, "");
  
  if (name.length == 0) {
    return "Unknown Rider";
  }

  nameArray = name.split(" ");
  if (nameArray.length > 1) {
    var lastNameEntry = nameArray[nameArray.length - 1];
    while (lastNameEntry.toLowerCase().match(/(jr\W|jr$)/) || lastNameEntry.toLowerCase().match(/(sr\W|sr$)/)) {
        nameArray.pop();
        lastNameEntry = nameArray[nameArray.length - 1];
        if (nameArray.length == 1) {
          if (nameArray[0].length > 10) {
            nameArray[0] = nameArray[0].substring(0, 10) + ".";
          }
          return nameArray[0].toUpperCase();
        }
    }
    if (nameArray[nameArray.length - 1].length > 10) {
      nameArray[nameArray.length - 1] = nameArray[nameArray.length - 1].substring(0, 10) + ".";
    }
    return nameArray[nameArray.length - 1].toUpperCase();
  }
  if (name.length > 10) {
    name = name.substring(0, 10) + ".";
  }
  return name.toUpperCase();
}

var towerMaxRidersShowing = 5;
var lastScreenUpdate = 0;
var prevHead;
function updateScreen() {
  var riderName, numOfPeopleOnTower;
  var r = globalRunningOrder;
  // Update Qualifying Times
  if (!racingEvent) {

    // copy bestPlayerLaptimes into the sorted array
    var bestPlayerLapsArrSrtd = bestPlayerLaptimes.slice();
    // sort the array
    bestPlayerLapsArrSrtd.sort(function (a, b) {return a[0] - b[0];});

    numOfPeopleOnTower = towerMaxRidersShowing
    if (r.length < towerMaxRidersShowing) {
      numOfPeopleOnTower = r.length;
    }
      
    
    mx.begin_custom_frame(screenTextureID);
    mx.paste_custom_frame(screenTextureID, 0, 0, 0, 0, 0, 1, 1);
    drawHead(548 / 1024, "Qualifying", true);
    var startY = (630 / 1024);
    var colorY = (colors.YStart / 1024);
    for (var i = 0; i < numOfPeopleOnTower; i++) {
      // times are stored in the first column of every row
      var time = bestPlayerLapsArrSrtd[i][0];

      // if no lap, don't display
      if (time != undefinedTime) {
        // slots are stored in the second column of every row
        var slot = bestPlayerLapsArrSrtd[i][1];
        var riderNum = mx.get_rider_number(slot);
        var text = timeToString(time, true) + " | " + riderNum.toString();
        drawBody(startY, text, true);
        colorWork(slot, colorY);
      }
      startY += (79 / 1024);
      colorY += (colors.YDifference / 1024);
    }
    mx.end_custom_frame(screenTextureID);
    return;
  }

  var seconds = mx.seconds;
  if (seconds < lastScreenUpdate) lastScreenUpdate = seconds - 1/8;
  if (seconds - lastScreenUpdate < 1 / 8) return;

  var center = true;
  var head = timeOrLapsRemaining();
  if (!gateDropped || seconds == 0) {
    head = "Main Event";
    if (!mainEvent) {
      if (globalFinishTime / 60 == 6) head = "Heat";
      else head = "LCQ"
    }
  }

  // If there's no need to update the screen then return
  if (prevHead == head && !checkTopFivePositionChange()) return;

  prevHead = head;
  lastScreenUpdate = seconds;
  
  numOfPeopleOnTower = towerMaxRidersShowing;
  if (r.length < towerMaxRidersShowing) {
    numOfPeopleOnTower = r.length;
  }

  mx.begin_custom_frame(screenTextureID);
  // Paste the original texture
  mx.paste_custom_frame(screenTextureID, 0, 0, 0, 0, 0, 1, 1);
  // Draw the head text
  drawHead(548 / 1024, head, center);
  // Update the screen based on the running order
  var startY = (625 / 1024);
  var colorY = (colors.YStart / 1024);
  for (var i = 0; i < numOfPeopleOnTower; i++) {
    var timingGate = r[i].position;
    var slot = r[i].slot;
    if (timingGate > 0) {
      riderName = getCondensedName(mx.get_rider_name(slot));
      // Draw body and color
      drawBody(startY, riderName, true);
      colorWork(slot, colorY);
    }
    startY += (79 / 1024);
    colorY += (colors.YDifference / 1024);
  }
  mx.end_custom_frame(screenTextureID);

}

function drawBody(y, t, c) {
  var coords = [82, 329, 596, 840];
  if (c) coords = [169, 427, 675.5, 917];
  drawScreenText(textFont, coords[0] / 1024, y, t, c);
  drawScreenText(textFont, coords[1] / 1024, y, t, c);
  drawScreenText(textFont, coords[2] / 1024, y, t, c);
  drawScreenText(textFont, coords[3] / 1024, y, t, c);
}

function drawHead(y, t, c) {
  // Northwest coordinates on board in px of where text should be placed
  var coords = [30, 286, 543, 786];
  if (c) coords = [143, 399, 649, 892];
  drawScreenText(numbersFont, coords[0] / 1024, y, t, c);
  drawScreenText(numbersFont, coords[1] / 1024, y, t, c);
  drawScreenText(numbersFont, coords[2] / 1024, y, t, c);
  drawScreenText(numbersFont, coords[3] / 1024, y, t, c);
}

function colorWork(slot, destinationY) {
  var t = {};

  t.color = getBrandColor(mx.get_bike_model(slot));
  t.name = mx.get_rider_name(slot).replace(/\|.*/, "").toUpperCase();
  t.avatar = getAvatar(slot, t.name);

  if ("color" in t.avatar)
    t.color = t.avatar.color;

  var colorCoords = colors.coords[t.color];

  var sourceX = colorCoords[0] / 2048 + colors.xoffset;
  var sourceY = colorCoords[1] / 2048 + colors.yoffset;
  var width = colors.width / 2048;
  var height = colors.height / 2048;
  
  // draw colors
  mx.paste_custom_frame(screenTextureID, 1, sourceX, sourceY, colors.XValues[0] / 1024, destinationY, width, height);
  mx.paste_custom_frame(screenTextureID, 1, sourceX, sourceY, colors.XValues[1] / 1024, destinationY, width, height);
  mx.paste_custom_frame(screenTextureID, 1, sourceX, sourceY, colors.XValues[2] / 1024, destinationY, width, height);
  mx.paste_custom_frame(screenTextureID, 1, sourceX, sourceY, colors.XValues[3] / 1024, destinationY, width, height);
}

