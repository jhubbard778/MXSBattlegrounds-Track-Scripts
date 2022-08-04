/*
################
Global Variables
################
*/
var slotPositionHolder = [];
var globalRunningOrder = mx.get_running_order();
// checks to make sure rider switched gates
var currentTimingGates = [];
var mainEvent = false;
var racingEvent = false;
const crowdConstantBaseVol = 1.5;
// p and r store location of rider(s)
var p = [], r = [];

const globalFinishLaps = mx.get_finish_laps();
const globalFinishTime = mx.get_finish_time();

const undefinedTime = 999999999;

const normalLapLength = mx.normal_lap_length;
const firstLapLength = mx.first_lap_length;

// true = track is in stadium, false = track is not in stadium
/*
I would recommend just keeping this false even if inside a stadium if you plan
on having multiple variants of the crash sounds that way you can get multiple reactions.
Then just change the coordinates at which to play the crash sounds in bleacherSoundPositions.

If you do not care about just one sound playing, you can set it to true and everyone will hear
the same one sound at their respective camera position on the track.
*/
const stadium = false;

// Coordinates of each bleacher
const bleacherSoundPositions = [
  [501.216370, 0.000000, 89.343277],
  [401.438477, 0.000000, 89.981873],
  [175.382095, 0.000000, 177.147705],
  [96.677391, 0.000000, 251.701660],
  [665.066406, 0.000000, 282.699982],
  [663.629700, 0.000000, 424.943176],
  [564.827332, 0.000000, 593.606628],
  [413.560547, 0.000000, 594.283997],
  [237.951218, 0.000000, 584.044800]
];
const numOfBleachers = bleacherSoundPositions.length;

determineMainEvent();

// An array of objects to hold each crowd member property and the individual coordinates of each member
const race_event_crowd = [
  {coords: [[56.668068,0.000000,339.100342]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/tw1.png"},
  {coords: [[96.465622,0.000000,228.782822]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/blue.png"},
  {coords: [[404.335052,11.500000,78.787910]], size: 5.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/liz.png"},
  {coords: [[620.161255,0.000000,132.784134],[606.727722,0.000000,109.642570],[660.052185,0.000000,466.246521],[305.507935,0.000000,105.902184],[239.582687,0.000000,130.172623],[70.060242,0.000000,307.828918],[32.064861,0.000000,324.591583],[284.099060,0.000000,572.637756],[308.030731,0.000000,596.343811],[460.020172,0.000000,589.077698],[616.705322,0.000000,577.337280],[652.121460,0.000000,190.968887],[567.231567,0.000000,112.287567],[464.618408,0.000000,104.724220],[314.676605,0.000000,84.066147]], size: 7.000000, aspect: 2.000000, png: "@os2022bgsxobj/billboards/crowd/g3.png"},
  {coords: [[645.520081,0.000000,519.914612],[617.976440,0.000000,140.618988],[89.715950,1.750000,269.490631],[376.968933,7.750000,82.914581],[393.119385,5.500000,88.803993],[520.020752,6.750000,85.220688],[496.181305,4.250000,91.110100],[529.115417,4.250000,91.110100],[509.140686,3.000000,94.054810],[475.373993,0.500000,99.944221],[173.553696,4.250000,181.474762],[170.884445,3.000000,188.308441],[242.862808,7.750000,589.204529],[257.096893,6.750000,567.092163],[252.130234,6.750000,573.182068],[232.315552,3.000000,583.500244],[233.488998,1.750000,577.402222],[413.693268,6.750000,598.405701],[389.419006,6.750000,598.593872],[444.919861,5.500000,595.218811],[407.730072,5.500000,595.507141],[434.661438,3.000000,589.408752],[423.225586,3.000000,589.497375],[441.423035,0.500000,583.466736],[590.494690,1.750000,585.751160],[544.139404,1.750000,586.110535],[673.601746,9.000000,415.200043],[670.629456,7.750000,408.491577],[667.721375,6.750000,417.412964],[664.810486,5.500000,425.644989],[661.862671,4.250000,424.903687],[658.821350,3.000000,401.399017],[655.978394,1.750000,426.160187],[634.212463,0.000000,142.358826],[218.341599,0.000000,150.712357],[22.597816,0.000000,358.647766],[151.739014,0.000000,560.938904]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/rogan.png"},
  {coords: [[79.739441,6.750000,262.809357],[89.836288,6.750000,252.712524],[77.946548,5.500000,268.766693],[96.215240,5.500000,250.498032],[389.155426,4.250000,91.748695],[374.816925,3.000000,94.693405],[517.240234,3.000000,94.054810],[147.926926,9.000000,190.443726],[158.598160,4.250000,196.430267],[675.187805,9.000000,309.301361],[666.181641,5.500000,267.455963],[654.463440,0.500000,282.223358],[654.527527,0.500000,297.826813],[253.829315,9.000000,580.417114],[234.393524,7.750000,599.589172],[261.736267,6.750000,561.403564],[227.397491,4.250000,594.189758],[246.849304,3.000000,565.679688],[244.270767,3.000000,568.841370],[410.101196,7.750000,601.378296],[398.479980,6.750000,598.523621],[437.056396,0.500000,583.500549],[587.145081,7.750000,600.501099],[548.699768,7.750000,600.799194],[566.221069,5.500000,594.773743],[673.751465,9.000000,451.631805],[667.663269,6.750000,403.276031],[664.739380,5.500000,408.342621],[661.946167,4.250000,445.215240],[652.954956,0.500000,407.006348],[653.054565,0.500000,431.240204],[256.576111,0.000000,121.522530],[249.871048,0.000000,109.229904],[306.225616,0.000000,93.425102],[458.207153,0.000000,92.626869],[656.166321,0.000000,155.367142],[660.476746,0.000000,194.799316],[359.263550,0.000000,602.308655],[363.757660,0.000000,587.069580],[298.925842,0.000000,582.102600],[183.044174,0.000000,589.399231],[135.181763,0.000000,548.168335]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/5.png"},
  {coords: [[252.094025,0.000000,118.097397],[81.114662,0.000000,294.993530],[37.234299,0.000000,336.178040],[519.602844,0.000000,579.711304],[649.712891,0.000000,165.593582],[331.860901,0.000000,83.695984],[156.545547,0.000000,216.354004],[75.966843,0.000000,491.747192],[86.304199,7.750000,252.080185],[79.452934,4.250000,271.424744],[114.654068,3.000000,240.388123],[118.802307,1.750000,240.404327],[376.700531,6.750000,85.859283],[405.698639,6.750000,85.859283],[420.619598,6.750000,85.859283],[370.389069,1.750000,97.638107],[375.491089,0.500000,100.582817],[426.660767,0.500000,100.582817],[479.152954,7.750000,82.275986],[505.107574,6.750000,85.220688],[470.445038,4.250000,91.110100],[479.795227,0.500000,99.944221],[165.266907,6.750000,181.432663],[169.972397,5.500000,180.891617],[187.400665,4.250000,167.627838],[172.471359,0.500000,195.050400],[675.090027,9.000000,285.511200],[666.286865,5.500000,293.064484],[660.226196,3.000000,251.399384],[231.593506,6.750000,598.363220],[249.535751,5.500000,571.704102],[250.022385,1.750000,557.129761],[388.633026,9.000000,604.489563],[405.162689,3.000000,589.637451],[437.240448,1.750000,586.443970],[559.358276,9.000000,603.661316],[551.904175,5.500000,594.884766],[550.352905,4.250000,591.951965],[670.692322,7.750000,423.786011],[667.789490,6.750000,433.985962],[667.832397,6.750000,444.427887],[661.773682,4.250000,403.248657],[653.100098,0.500000,442.326904]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/g6.png"},
  {coords: [[82.701813,3.000000,272.340302],[103.070938,3.000000,251.971222],[408.333405,3.000000,94.693405],[394.517059,1.750000,97.638107],[489.095459,9.000000,79.331276],[523.142700,7.750000,82.275986],[474.189423,6.750000,85.220688],[500.348541,4.250000,91.110100],[532.958008,3.000000,94.054810],[492.195190,1.750000,96.999512],[511.924896,1.750000,96.999512],[497.052917,0.500000,99.944221],[151.272934,9.000000,187.097717],[154.655914,9.000000,183.714752],[177.534988,7.750000,165.000168],[194.414246,6.750000,152.285385],[173.742462,5.500000,177.121567],[198.397629,4.250000,156.630890],[672.017822,7.750000,254.486526],[669.197876,6.750000,284.847748],[660.376343,3.000000,287.940430],[654.335938,0.500000,251.205002],[242.531784,9.000000,594.269592],[385.085815,5.500000,595.682678],[395.966553,3.000000,589.708740],[563.671997,9.000000,603.627869],[566.029846,7.750000,600.664795],[532.186462,6.750000,597.982422],[574.925964,4.250000,591.761475],[536.405579,4.250000,592.060120],[540.983154,3.000000,589.079834],[661.963928,4.250000,449.530579],[656.037781,1.750000,440.608124],[205.149200,0.000000,152.387192],[232.608047,0.000000,120.617950],[245.379608,0.000000,116.786484],[322.647522,0.000000,92.041595],[315.303864,0.000000,102.258835],[646.845520,0.000000,328.607361],[649.187927,0.000000,537.171692],[478.122498,0.000000,599.820923],[467.585968,0.000000,583.217896],[346.415802,0.000000,590.721191]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/6.png"},
  {coords: [[47.090256,0.000000,306.453827],[295.656219,0.000000,575.887817],[647.577698,0.000000,334.255920],[452.493347,0.000000,105.581314],[94.846909,6.750000,247.701920],[104.744865,5.500000,241.968430],[85.666969,4.250000,265.210724],[103.235893,4.250000,247.641830],[377.317688,9.000000,79.969872],[385.897278,9.000000,79.969872],[408.094604,9.000000,79.969872],[403.694336,7.750000,82.914581],[414.749146,5.500000,88.803993],[408.125916,4.250000,91.748695],[417.902069,3.000000,94.693405],[419.966675,1.750000,97.638107],[530.889221,7.750000,82.275986],[478.238251,6.750000,85.220688],[490.413483,5.500000,88.165398],[510.684509,5.500000,88.165398],[501.961609,0.500000,99.944221],[181.256561,7.750000,161.278610],[150.121262,6.750000,196.578262],[172.470993,6.750000,174.228577],[191.500977,6.750000,155.198639],[160.340546,3.000000,198.852325],[663.320190,4.250000,287.717987],[663.395508,4.250000,306.041473],[660.415649,3.000000,297.504944],[258.851135,7.750000,569.600403],[244.803070,6.750000,582.166260],[228.693634,5.500000,597.259705],[218.347565,4.250000,605.286316],[251.984726,3.000000,559.382874],[406.102753,9.000000,604.354126],[397.630341,9.000000,604.419800],[437.653564,5.500000,595.275146],[406.830658,4.250000,592.569275],[597.420898,7.750000,600.421448],[589.427490,6.750000,597.538635],[670.735291,7.750000,434.247314],[667.851074,6.750000,448.972748],[658.916870,3.000000,424.634796],[655.901794,1.750000,407.520599]], size: 8.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/g5.png"},
  {coords: [[658.408813,0.000000,236.778976],[576.670959,0.000000,102.198685],[346.144348,0.000000,102.198654],[238.543945,0.000000,118.482399],[123.759445,0.000000,218.579391],[498.604431,0.000000,593.903625],[86.059341,0.000000,498.690765],[354.952698,0.000000,580.194153],[96.528488,7.750000,241.855911],[109.030579,4.250000,241.847168],[113.944817,4.250000,236.932938],[92.913315,3.000000,262.128815],[86.794830,1.750000,272.411743],[99.166695,1.750000,260.039917],[92.725365,0.500000,270.645660],[433.271973,6.750000,85.859283],[378.470123,4.250000,91.748695],[434.137115,3.000000,94.693405],[397.084076,0.500000,100.582817],[473.968536,3.000000,94.054810],[520.901123,0.500000,99.944221],[184.600037,5.500000,166.264008],[672.119995,7.750000,279.348145],[669.244812,6.750000,296.268433],[666.226562,5.500000,278.389435],[660.452209,3.000000,306.396210],[257.480957,5.500000,561.962036],[253.752716,4.250000,561.874268],[247.241714,4.250000,569.857727],[239.185410,1.750000,570.417542],[401.918243,5.500000,595.552185],[380.847015,5.500000,595.715515],[413.820496,4.250000,592.515076],[385.997040,4.250000,592.730835],[416.171783,1.750000,586.607300],[581.189331,4.250000,591.712891],[559.554565,3.000000,588.935852],[670.712036,7.750000,428.592407],[667.702026,6.750000,412.704437],[664.756653,5.500000,412.551361],[664.855957,5.500000,436.719421],[664.876221,5.500000,441.648621],[652.975098,0.500000,411.903870],[653.032837,0.500000,425.962372]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/rogan2.png"},
  {coords: [[88.149132,5.500000,258.564117],[82.694626,4.250000,268.183044],[106.266319,3.000000,248.775848],[122.033363,1.750000,237.173279],[433.440613,7.750000,82.914581],[421.090302,5.500000,88.803993],[412.207184,0.500000,100.582817],[499.577728,9.000000,79.331276],[511.795074,9.000000,79.331276],[514.709778,6.750000,85.220688],[532.274658,6.750000,85.220688],[524.040039,4.250000,91.110100],[529.492004,1.750000,96.999512],[526.420288,0.500000,99.944221],[173.462158,7.750000,169.072983],[161.224548,6.750000,185.475006],[672.038147,7.750000,259.425842],[669.069824,6.750000,253.696426],[663.216858,4.250000,262.576355],[237.166443,7.750000,596.189148],[248.557892,0.500000,554.266296],[414.400482,9.000000,604.289795],[445.413300,7.750000,601.104553],[432.284302,6.750000,598.261536],[393.986145,5.500000,595.613647],[420.189270,4.250000,592.465759],[557.999451,6.750000,597.782288],[597.375488,5.500000,594.532227],[545.996399,3.000000,589.040955],[573.246216,1.750000,585.884888],[559.620361,1.750000,585.990540],[549.414612,1.750000,586.069641],[670.612915,7.750000,404.466217],[667.770325,6.750000,429.328644],[664.901062,5.500000,447.681671],[655.863770,1.750000,398.267975],[652.992981,0.500000,416.265106],[242.066406,0.000000,111.977554],[339.373901,0.000000,93.464310],[598.738586,0.000000,129.591293],[641.204102,0.000000,179.719635],[654.933533,0.000000,175.409256],[646.606445,0.000000,354.446411],[652.078857,0.000000,496.303986],[633.678406,0.000000,554.101501],[343.336517,0.000000,578.710510],[287.683899,0.000000,583.677612],[192.859924,0.000000,596.885376],[147.479889,0.000000,565.728943]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/1.png"},
  {coords: [[99.147598,6.750000,243.401245],[115.876556,1.750000,243.330078],[401.523071,6.750000,85.859283],[384.435272,5.500000,88.803993],[409.318542,5.500000,88.803993],[400.698029,1.750000,97.638107],[414.007538,1.750000,97.638107],[433.574707,1.750000,97.638107],[479.464355,9.000000,79.331276],[483.887238,9.000000,79.331276],[505.705963,9.000000,79.331276],[500.172699,7.750000,82.275986],[482.547546,6.750000,85.220688],[509.736237,6.750000,85.220688],[494.972748,3.000000,94.054810],[478.860199,1.750000,96.999512],[525.279053,1.750000,96.999512],[471.230438,0.500000,99.944221],[192.130753,7.750000,150.404434],[161.330490,5.500000,189.533493],[186.134521,3.000000,173.058411],[177.786102,1.750000,185.571243],[184.387482,1.750000,178.969879],[194.777786,1.750000,168.579590],[198.481308,1.750000,164.876083],[675.011902,9.000000,266.498260],[666.145325,5.500000,258.615784],[663.286255,4.250000,279.465698],[654.400452,0.500000,266.905792],[241.705536,5.500000,581.305115],[224.711517,4.250000,597.483154],[226.835983,3.000000,590.219055],[426.679626,6.750000,598.304993],[544.102051,6.750000,597.890015],[591.035400,5.500000,594.581360],[561.778503,5.500000,594.808167],[557.452759,4.250000,591.896912],[658.933533,3.000000,428.695435],[658.957581,3.000000,434.545319],[656.067688,1.750000,447.889282],[264.657196,0.000000,108.326973],[55.203720,0.000000,301.337097],[68.134903,0.000000,494.027924],[145.722107,0.000000,554.692810],[187.868240,0.000000,593.805725],[166.954819,0.000000,586.142822],[327.876404,0.000000,603.544128],[484.168304,0.000000,581.194031],[645.090027,0.000000,426.817688],[643.653015,0.000000,194.056152]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/2.png"},
  {coords: [[84.613922,9.000000,249.606003],[102.927162,9.000000,231.292816],[82.726135,5.500000,263.987122],[99.933083,5.500000,246.780197],[96.192192,4.250000,254.685516],[85.815979,3.000000,269.226135],[119.687744,0.500000,243.683334],[395.851929,7.750000,82.914581],[417.349396,7.750000,82.914581],[413.675629,4.250000,91.748695],[408.582367,1.750000,97.638107],[516.849060,5.500000,88.165398],[512.503662,4.250000,91.110100],[499.329895,3.000000,94.054810],[521.842346,3.000000,94.054810],[527.338623,3.000000,94.054810],[184.521637,9.000000,153.849091],[180.481247,5.500000,170.382782],[163.178207,3.000000,196.014679],[179.330353,3.000000,179.862564],[189.009109,3.000000,170.183823],[195.625885,3.000000,163.567062],[169.469162,0.500000,198.052612],[672.193115,7.750000,297.139740],[666.306335,5.500000,297.792969],[666.364441,5.500000,311.929230],[657.509888,1.750000,306.975983],[260.376648,9.000000,572.389099],[253.970535,7.750000,575.584778],[227.427139,7.750000,608.130981],[222.494919,5.500000,604.860229],[219.323669,5.500000,608.748657],[237.711685,4.250000,581.542969],[241.780121,1.750000,567.236084],[227.517105,0.500000,580.065491],[219.543091,0.500000,589.842834],[410.253967,9.000000,604.321960],[418.076111,3.000000,589.537292],[390.603790,1.750000,586.805481],[405.394226,0.500000,583.746033],[547.792664,9.000000,603.750977],[540.762695,9.000000,603.805481],[539.102600,6.750000,597.928772],[556.388672,5.500000,594.849976],[534.552917,5.500000,595.019287],[578.565979,3.000000,588.788452],[586.067627,1.750000,585.785461],[554.061462,1.750000,586.033630],[667.806396,6.750000,438.102905],[664.836487,5.500000,431.980927],[664.937805,5.500000,456.625275],[661.752319,4.250000,398.044037]], size: 8.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/groupsit.png"},
  {coords: [[110.249596,5.500000,236.463715],[100.325020,4.250000,250.552704],[122.323799,3.000000,232.718414],[105.714844,1.750000,253.491776],[414.672394,9.000000,79.969872],[431.690979,9.000000,79.969872],[420.361938,4.250000,91.748695],[424.820374,4.250000,91.748695],[384.482635,3.000000,94.693405],[374.963531,1.750000,97.638107],[387.171509,1.750000,97.638107],[380.425354,0.500000,100.582817],[488.420532,7.750000,82.275986],[474.837982,5.500000,88.165398],[495.362457,5.500000,88.165398],[506.228180,5.500000,88.165398],[513.200623,3.000000,94.054810],[187.875214,9.000000,150.495529],[164.867294,7.750000,177.667816],[166.170227,4.250000,188.858215],[195.245117,4.250000,159.783386],[175.853851,3.000000,183.339050],[181.486115,1.750000,181.871231],[191.826797,1.750000,171.530579],[675.107117,9.000000,289.659027],[675.133240,9.000000,296.027161],[672.267883,7.750000,315.338928],[669.099670,6.750000,260.947754],[663.200134,4.250000,258.502441],[657.357910,1.750000,270.005219],[657.426270,1.750000,286.639984],[657.448730,1.750000,292.092285],[257.060974,4.250000,557.817810],[229.927948,4.250000,591.087036],[389.206940,5.500000,595.650696],[441.971893,3.000000,589.352051],[441.398254,1.750000,586.411682],[427.610229,1.750000,586.518616],[567.344849,6.750000,597.709839],[589.203979,3.000000,588.705994],[552.287903,3.000000,588.992188],[673.646912,9.000000,426.197449],[673.681763,9.000000,434.674377],[661.735107,4.250000,393.853455],[659.050415,3.000000,457.130249],[141.051834,0.000000,549.974609],[502.737488,0.000000,579.324402],[637.974548,0.000000,553.586609],[661.454712,0.000000,483.823395],[667.324585,0.000000,471.631775],[665.744141,0.000000,382.452087],[662.357666,0.000000,230.282166],[641.135193,0.000000,170.001221],[649.037170,0.000000,140.199387],[336.569702,0.000000,87.820404]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/4.png"},
  {coords: [[79.948776,9.000000,254.271149],[91.199432,5.500000,255.513840],[117.085770,4.250000,233.791992],[92.581665,1.750000,266.624908],[420.090302,9.000000,79.969872],[382.518616,7.750000,82.914581],[380.868256,6.750000,85.859283],[385.269348,6.750000,85.859283],[379.952148,5.500000,88.803993],[433.550598,5.500000,88.803993],[429.722351,3.000000,94.693405],[492.828583,7.750000,82.275986],[500.509186,6.750000,85.220688],[172.644897,9.000000,165.725815],[148.335342,7.750000,194.199738],[170.410370,4.250000,184.618088],[190.982727,4.250000,164.045776],[167.519684,1.750000,195.837631],[669.166809,6.750000,277.286346],[669.221619,6.750000,290.625092],[666.109924,5.500000,249.996918],[666.126526,5.500000,254.043076],[663.166260,4.250000,250.264038],[663.361755,4.250000,297.829529],[660.355835,3.000000,282.937836],[245.638046,5.500000,576.483276],[234.188751,5.500000,590.521851],[242.494659,4.250000,575.678345],[221.592102,4.250000,601.308044],[238.918900,3.000000,575.403564],[235.977264,3.000000,579.010437],[225.321808,1.750000,587.416443],[219.194427,1.750000,594.929565],[216.503876,1.750000,598.228577],[239.438873,0.500000,565.447571],[383.326416,9.000000,604.530701],[445.872437,6.750000,598.156189],[427.625549,5.500000,595.352844],[568.526001,9.000000,603.590271],[574.254761,7.750000,600.601074],[539.378601,7.750000,600.871460],[562.243042,6.750000,597.749390],[664.721741,5.500000,404.046509],[661.880737,4.250000,429.294952],[658.841614,3.000000,406.323883],[658.896057,3.000000,419.569977],[658.989441,3.000000,442.299835],[656.020752,1.750000,436.468018],[20.941399,0.000000,353.553284],[170.402039,0.000000,578.421631],[330.022369,0.000000,593.096741],[512.897217,0.000000,580.453491],[655.584778,0.000000,551.329041],[651.972412,0.000000,500.982056],[667.456909,0.000000,373.826080],[645.105469,0.000000,359.771759],[657.508911,0.000000,321.747162],[644.701050,0.000000,219.010742],[635.245178,0.000000,121.973404],[277.508606,0.000000,104.335869]], size: 6.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/3.png"},
  {coords: [[293.396484,0.000000,105.583801],[554.638733,0.000000,109.628006],[595.028809,0.000000,116.333069],[607.321411,0.000000,132.776443],[659.168640,0.000000,332.240295],[647.035706,0.000000,374.067139],[660.445862,0.000000,503.379181],[367.019623,0.000000,577.454163],[338.283600,0.000000,594.695740],[312.740509,0.000000,581.924194],[159.162476,0.000000,569.791504],[116.697067,0.000000,545.525696],[43.899223,0.000000,322.662537],[140.963089,0.000000,233.900238],[215.996094,0.000000,133.324036],[107.135788,9.000000,227.084198],[102.021729,6.750000,240.527130],[111.216850,6.750000,231.332031],[120.980080,4.250000,229.897690],[119.426559,3.000000,235.615646],[388.606873,3.000000,94.693405],[416.415802,0.500000,100.582817],[486.887146,6.750000,85.220688],[525.407349,6.750000,85.220688],[486.085876,5.500000,88.165398],[491.885895,4.250000,91.110100],[503.466980,3.000000,94.054810],[485.770477,1.750000,96.999512],[165.823883,9.000000,172.546799],[157.770294,6.750000,188.929260],[178.127563,6.750000,168.572037],[166.928818,5.500000,183.935181],[669.265625,6.750000,301.338898],[666.269836,5.500000,288.920288],[663.303711,4.250000,283.715179],[660.330261,3.000000,276.712585],[657.283691,1.750000,251.931259],[657.393860,1.750000,278.752380],[234.996689,9.000000,603.508789],[237.502304,6.750000,591.118103],[252.639664,5.500000,567.898193],[254.599396,3.000000,556.176880],[241.601318,3.000000,572.114502],[398.540100,7.750000,601.467957],[422.552032,5.500000,595.392212],[444.402069,4.250000,592.278015],[432.228333,4.250000,592.372375],[432.487579,1.750000,586.480774],[401.143555,0.500000,583.778992],[391.553955,0.500000,583.853333],[584.120056,9.000000,603.469360],[571.555115,6.750000,597.677185],[593.767395,4.250000,591.615356],[589.101685,4.250000,591.651550],[584.245544,3.000000,588.744385],[532.383118,3.000000,589.146484],[570.872375,0.500000,582.958496],[673.569458,9.000000,407.343811],[673.664062,9.000000,430.357574],[673.722290,9.000000,444.531891],[670.770569,7.750000,442.837067],[667.683350,6.750000,408.162201],[661.838440,4.250000,419.000854],[661.990540,4.250000,456.005890],[655.960815,1.750000,421.886230],[653.015442,0.500000,421.730103]], size: 7.000000, aspect: 2.000000, png: "@os2022bgsxobj/billboards/crowd/g1.png"},
  {coords: [[231.641388,0.000000,143.541306],[650.867004,0.000000,202.290741],[330.204376,0.000000,95.573814],[441.137360,0.000000,97.952408],[585.292480,0.000000,108.225021],[637.671509,0.000000,162.071487],[661.829041,0.000000,158.797791],[659.232544,0.000000,211.628311],[658.329529,0.000000,344.268921],[657.765320,0.000000,491.471863],[649.863159,0.000000,510.888123],[657.087830,0.000000,532.223511],[518.124695,0.000000,597.359497],[474.099274,0.000000,581.668396],[459.537018,0.000000,602.890869],[356.924133,0.000000,590.473389],[323.848633,0.000000,584.716187],[316.172424,0.000000,611.470154],[26.169115,0.000000,346.528107],[59.244617,0.000000,307.921234],[201.141861,0.000000,145.591797],[281.967773,0.000000,111.274704],[100.177345,7.750000,238.207062],[108.618484,7.750000,229.765945],[95.765862,3.000000,259.276276],[123.390556,0.500000,239.980530],[126.708580,0.500000,236.662521],[393.511322,6.750000,85.859283],[397.810425,5.500000,88.803993],[403.506317,4.250000,91.748695],[403.964508,3.000000,94.693405],[390.171661,0.500000,100.582817],[432.161865,0.500000,100.582817],[481.502106,4.250000,91.110100],[470.997620,1.750000,96.999512],[516.185852,0.500000,99.944221],[162.943726,9.000000,175.426956],[187.895432,7.750000,154.639740],[168.502243,6.750000,178.197327],[155.964523,5.500000,194.899460],[173.029572,1.750000,190.327759],[181.886490,0.500000,185.635300],[672.000549,7.750000,250.285843],[660.248413,3.000000,256.800446],[657.339783,1.750000,265.589508],[234.732849,6.750000,594.513916],[232.667480,4.250000,587.727966],[229.778900,3.000000,586.610596],[223.832260,3.000000,593.902100],[216.324539,3.000000,603.107666],[227.968262,1.750000,584.171509],[401.744568,9.000000,604.387878],[436.764343,7.750000,601.171631],[422.542938,7.750000,601.281860],[389.366180,7.750000,601.539062],[425.196533,4.250000,592.426880],[411.638275,3.000000,589.587219],[385.400909,3.000000,589.790649],[579.987671,9.000000,603.501404],[592.126099,7.750000,600.462463],[561.370300,7.750000,600.700928],[571.437012,5.500000,594.733276],[547.760254,5.500000,594.916870],[561.504272,4.250000,591.865540],[570.234863,3.000000,588.853027],[583.456360,0.500000,582.860962],[559.057617,0.500000,583.050110],[554.015381,0.500000,583.089172],[661.820801,4.250000,414.709625],[661.901489,4.250000,434.349579]], size: 9.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/g2.png"},
  {coords: [[452.217438,0.000000,96.121719],[352.990906,0.000000,101.314461],[344.072937,0.000000,109.667999],[330.413757,0.000000,109.667999],[340.573486,0.000000,98.266533],[310.658905,0.000000,108.652000],[299.708984,0.000000,109.667969],[273.293793,0.000000,110.571045],[262.795471,0.000000,121.182297],[241.347229,0.000000,137.550705],[212.787186,0.000000,163.062851],[131.170822,0.000000,229.552551],[151.264465,0.000000,224.359802],[123.381714,0.000000,255.741928],[72.244492,0.000000,292.768372],[64.229607,0.000000,315.684143],[49.554462,0.000000,331.826782],[52.263718,0.000000,317.490295],[255.387238,0.000000,550.106812],[196.122223,0.000000,592.439148],[304.605316,0.000000,587.584839],[348.856476,0.000000,581.827820],[470.434296,0.000000,593.229431],[524.732239,0.000000,587.810364],[605.332825,0.000000,577.876160],[645.520081,0.000000,569.409668],[642.698242,0.000000,534.302063],[659.292725,0.000000,520.078369],[644.279175,0.000000,485.196686],[646.537231,0.000000,464.312958],[659.970825,0.000000,387.663635],[647.779175,0.000000,365.763794],[653.084778,0.000000,213.255539],[652.746460,0.000000,180.744598],[643.038208,0.000000,157.264374],[603.076477,0.000000,119.334846],[586.933716,0.000000,122.947197],[547.198303,0.000000,110.868401],[542.570007,0.000000,95.854607],[110.317825,9.000000,223.902176],[106.167686,4.250000,244.710052],[98.635475,3.000000,256.406677],[95.522530,1.750000,263.684052],[109.260490,0.500000,254.110565],[381.578827,9.000000,79.969872],[388.510132,7.750000,82.914581],[429.328918,7.750000,82.914581],[397.512268,6.750000,85.859283],[375.134918,5.500000,88.803993],[371.941437,4.250000,91.748695],[370.326538,3.000000,94.693405],[404.086548,0.500000,100.582817],[504.395294,4.250000,91.110100],[501.838898,1.750000,96.999512],[511.786957,0.500000,99.944221],[186.828934,0.500000,180.692871],[672.248657,7.750000,310.659485],[220.836349,6.750000,611.553101],[230.529556,1.750000,581.030945],[405.433350,7.750000,601.414490],[441.593964,6.750000,598.189392],[417.291473,5.500000,595.432983],[429.495697,3.000000,589.448792],[391.355896,3.000000,589.744446],[578.386169,5.500000,594.679443],[541.458069,4.250000,592.020935],[532.352051,4.250000,592.091553],[566.100037,3.000000,588.885071],[577.995483,1.750000,585.848083],[564.052612,1.750000,585.956177],[658.861145,3.000000,411.083191],[652.916748,0.500000,397.712006]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/9.png"},
  {coords: [[477.370392,0.000000,593.874146],[140.316360,0.000000,558.312500],[174.859375,0.000000,583.824707],[485.520752,0.000000,587.662170],[507.420563,0.000000,583.146729],[632.046082,0.000000,559.666687],[654.848511,0.000000,479.292664],[647.623596,0.000000,383.791748],[644.462830,0.000000,346.990997],[652.138916,0.000000,243.136017],[658.460510,0.000000,170.889160],[648.526794,0.000000,149.215118],[623.691956,0.000000,145.828537],[594.793640,0.000000,125.960625],[577.183655,0.000000,109.027832],[560.025330,0.000000,101.803154],[458.428253,0.000000,99.093887],[359.540405,0.000000,98.416565],[349.606476,0.000000,107.447426],[299.033722,0.000000,98.642303],[259.749512,0.000000,105.866989],[274.424622,0.000000,91.191841],[251.847488,0.000000,126.637962],[132.414490,0.000000,246.296814],[71.004639,0.000000,300.030029],[33.752365,0.000000,344.958588],[36.235847,0.000000,314.931000],[64.457230,0.000000,481.776031],[149.121429,0.000000,577.954590],[211.977402,0.000000,145.988495],[74.791588,5.500000,271.921631],[113.631775,5.500000,233.081543],[401.196045,9.000000,79.969872],[427.278656,5.500000,88.803993],[394.865204,4.250000,91.748695],[379.933685,3.000000,94.693405],[412.406921,3.000000,94.693405],[408.101837,0.500000,100.582817],[529.547607,9.000000,79.331276],[468.553192,7.750000,82.275986],[499.661011,5.500000,88.165398],[477.101349,4.250000,91.110100],[533.421631,4.250000,91.110100],[506.317932,1.750000,96.999512],[168.691040,9.000000,169.679657],[154.787064,6.750000,191.912476],[188.205933,6.750000,158.493683],[176.707184,4.250000,178.321289],[675.069946,9.000000,280.614319],[672.064392,7.750000,265.815002],[672.211182,7.750000,301.535828],[669.126282,6.750000,267.424744],[660.395020,3.000000,292.471130],[654.426147,0.500000,273.158722],[240.303528,7.750000,592.342590],[223.827682,6.750000,607.885315],[225.887573,5.500000,600.700378],[249.441925,3.000000,562.500732],[221.165680,3.000000,597.171692],[236.628937,1.750000,573.552185],[242.216736,0.500000,562.041504],[236.406876,0.500000,569.165283],[418.004059,6.750000,598.372253],[436.519501,4.250000,592.339111],[411.380890,1.750000,586.644409],[553.887085,9.000000,603.703735],[553.753906,6.750000,597.815186],[543.512939,5.500000,594.949768],[539.377686,5.500000,594.981873],[565.657837,4.250000,591.833313],[664.676575,5.500000,393.065338],[661.791809,4.250000,407.660126],[653.079651,0.500000,437.343750],[653.130432,0.500000,449.713470]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/dude.png"},
  {coords: [[279.621979,0.000000,582.348022],[319.533112,0.000000,576.121887],[350.025208,0.000000,577.718323],[493.705200,0.000000,601.824524],[514.139648,0.000000,589.052979],[612.480652,0.000000,571.013245],[625.092529,0.000000,571.013245],[646.006165,0.000000,551.855957],[648.560425,0.000000,526.312805],[649.677979,0.000000,531.421448],[646.325623,0.000000,390.934357],[657.660339,0.000000,366.508789],[654.946350,0.000000,350.225067],[660.534058,0.000000,245.498337],[660.054993,0.000000,202.075058],[663.088257,0.000000,177.010880],[644.409912,0.000000,176.372284],[638.662659,0.000000,148.753815],[587.416870,0.000000,116.665298],[553.093262,0.000000,100.381569],[447.727875,0.000000,98.944763],[350.025513,0.000000,96.390434],[292.713165,0.000000,110.758438],[322.247375,0.000000,98.625458],[259.187836,0.000000,115.228500],[233.006165,0.000000,125.605423],[134.186279,0.000000,238.793198],[51.490459,0.000000,325.639771],[59.791973,0.000000,316.220764],[20.838722,0.000000,330.588776],[72.882812,0.000000,483.528198],[78.797035,7.750000,259.587311],[82.999611,7.750000,255.384750],[106.806061,6.750000,235.742798],[89.551605,0.500000,273.819397],[97.867592,0.500000,265.503448],[425.723907,9.000000,79.969872],[429.345276,4.250000,91.748695],[379.846741,1.750000,97.638107],[420.453766,0.500000,100.582817],[523.284973,9.000000,79.331276],[509.029602,7.750000,82.275986],[514.182068,7.750000,82.275986],[524.512878,5.500000,88.165398],[508.494904,4.250000,91.110100],[496.371490,1.750000,96.999512],[184.452850,6.750000,162.246750],[193.513321,5.500000,157.350754],[191.849106,3.000000,167.343826],[178.817490,0.500000,188.704285],[672.231628,7.750000,306.512024],[669.283447,6.750000,305.682922],[666.245483,5.500000,282.993774],[663.233521,4.250000,266.626831],[256.777252,9.000000,576.802490],[250.783157,9.000000,584.152161],[230.193405,9.000000,609.398315],[240.576385,6.750000,587.348816],[251.001862,4.250000,565.247192],[222.361359,1.750000,591.046387],[437.919067,9.000000,604.107422],[416.657990,7.750000,601.327515],[402.491180,6.750000,598.492554],[394.473450,6.750000,598.554688],[412.168488,5.500000,595.472717],[397.661865,4.250000,592.640381],[404.982086,1.750000,586.694031],[533.305908,7.750000,600.918518],[549.600220,6.750000,597.847412],[586.334412,5.500000,594.617798],[546.041443,4.250000,591.985413],[568.473450,1.750000,585.921875],[667.624573,6.750000,393.848389],[664.918701,5.500000,451.978943],[659.020325,3.000000,449.806152],[655.926636,1.750000,413.557800]], size: 7.000000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/8.png"},
  {coords: [[569.638794,0.000000,106.190018],[307.505371,0.000000,99.643219],[224.195801,0.000000,140.056274],[149.691238,0.000000,220.656647],[129.823395,0.000000,233.751373],[76.315590,0.000000,300.128113],[63.898174,0.000000,302.498505],[46.852432,0.000000,315.367340],[43.578747,0.000000,330.042480],[62.273525,0.000000,475.254852],[343.008301,0.000000,584.531494],[459.069885,0.000000,581.657898],[520.453186,0.000000,588.283264],[509.198273,0.000000,594.748901],[493.553131,0.000000,583.813232],[481.739441,0.000000,575.751221],[600.994690,0.000000,573.586121],[622.781616,0.000000,581.713867],[626.281128,0.000000,564.781006],[651.341736,0.000000,542.994202],[658.115112,0.000000,514.772583],[653.373901,0.000000,519.626648],[653.938538,0.000000,470.070099],[652.809692,0.000000,385.970306],[654.502930,0.000000,373.440002],[652.245117,0.000000,345.670227],[661.049927,0.000000,241.815445],[646.600586,0.000000,226.350113],[648.519531,0.000000,182.776260],[650.551575,0.000000,157.941422],[631.925476,0.000000,147.668823],[600.656128,0.000000,123.059753],[560.581360,0.000000,113.351631],[463.961609,0.000000,93.893257],[443.416412,0.000000,92.312859],[328.160156,0.000000,105.407600],[102.312553,1.750000,256.894043],[102.619293,0.500000,260.751740],[116.534355,0.500000,246.836716],[425.814240,6.750000,85.859283],[405.243958,5.500000,88.803993],[383.726898,4.250000,91.748695],[433.348724,4.250000,91.748695],[393.443237,3.000000,94.693405],[475.447357,9.000000,79.331276],[517.792664,9.000000,79.331276],[533.942932,9.000000,79.331276],[473.050140,7.750000,82.275986],[518.872131,7.750000,82.275986],[480.015442,5.500000,88.165398],[478.208130,3.000000,94.054810],[490.842499,3.000000,94.054810],[492.963837,0.500000,99.944221],[506.445953,0.500000,99.944221],[179.148987,9.000000,159.221741],[156.946045,7.750000,185.589050],[176.638504,5.500000,174.225525],[161.734055,4.250000,193.294373],[179.553268,4.250000,175.475204],[183.958740,4.250000,171.069748],[182.846436,3.000000,176.346481],[194.227646,0.500000,173.294174],[675.210388,9.000000,314.799622],[672.163391,7.750000,289.915314],[666.336121,5.500000,305.048920],[663.339539,4.250000,292.425415],[663.418335,4.250000,311.606934],[660.299683,3.000000,269.283875],[654.479980,0.500000,286.258179],[654.595520,0.500000,314.366028],[252.631653,1.750000,553.930420],[443.256409,9.000000,604.066101],[384.602966,7.750000,601.575989],[436.701630,6.750000,598.227295],[431.915344,5.500000,595.319641],[391.827698,4.250000,592.685608],[400.408325,3.000000,589.674316],[431.542358,0.500000,583.543335],[418.632385,0.500000,583.643433],[580.152893,7.750000,600.555298],[543.473511,7.750000,600.839661],[570.138916,4.250000,591.798584],[593.862244,3.000000,588.669861],[582.022217,1.750000,585.816833],[673.624451,9.000000,420.723389],[670.595398,7.750000,400.207794],[670.752075,7.750000,438.332031],[670.801270,7.750000,450.301453],[667.874756,6.750000,454.736145],[664.780212,5.500000,418.274109],[661.922791,4.250000,439.531769],[658.791382,3.000000,394.095825],[656.000549,1.750000,431.554932],[139.739334,0.000000,206.723022],[131.677292,0.000000,220.372620],[60.445236,0.000000,488.249969],[334.554779,0.000000,583.717407],[321.783203,0.000000,594.892517],[476.798004,0.000000,588.826050],[530.278870,0.000000,576.373779],[609.302979,0.000000,584.356018],[652.885925,0.000000,485.855347],[668.850342,0.000000,484.099243],[652.247375,0.000000,340.099915],[652.885986,0.000000,235.373260],[655.599976,0.000000,224.517441],[646.180969,0.000000,208.712677],[649.693054,0.000000,171.675156],[622.074524,0.000000,123.462540],[264.630798,0.000000,112.925995]], size: 7.500000, aspect: 1.000000, png: "@os2022bgsxobj/billboards/crowd/7.png"},
];

// Add racing event crowd
if (racingEvent && race_event_crowd != undefined) {
  for (var i = 0; i < race_event_crowd.length; i++) {
    for (var j = 0; j < race_event_crowd[i].coords.length; j++) {
      mx.add_billboard(race_event_crowd[i].coords[j][0], race_event_crowd[i].coords[j][1], race_event_crowd[i].coords[j][2], race_event_crowd[i].size, race_event_crowd[i].aspect, race_event_crowd[i].png);
    }
  }
}

