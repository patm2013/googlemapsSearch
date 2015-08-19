var http = require('https');

function requestPlaceID(name, keyword){
	return options = {
	  host: 'maps.googleapis.com',
	  path: '/maps/api/place/nearbysearch/json?location=29.8384829,-95.4393196&radius=49999&key=AIzaSyA1Q0xZs7tRI_DnfPdanbCJSNuvHJf7Vjo&name='+encodeURIComponent(name)+'&keyword='+encodeURIComponent(keyword)
	};
}

function requestHours(placeID){
	return options = {
	  host: 'maps.googleapis.com',
	  path: '/maps/api/place/details/json?key=AIzaSyA1Q0xZs7tRI_DnfPdanbCJSNuvHJf7Vjo&placeid='+encodeURIComponent(placeID)
	};
}

var arrPlaces = [
	['Amedeos','22704+Loop+494 Humble Tx'],
	//['Bareback Ice House','19940 1/2 Kuydendahl Spring Tx']
	['Casa Nueva','2209 FM 1960 W Houston TX'],
	['Chayns','3920 FM 1960 Rd W Ste 101 Houston TX'],
	['Chez Nous','217 S Avenue G Humble TX'],
	['Chicago Grill','4444 FM 1960 Houston TX'],
	['Chimichurris South American','1660 W Lake Houston Pkwy Houston TX'],
	//['Churrascos','7877 Willow Chase Blvd Houston TX'],
	['Coaches Sports Bar & Grill','5304 FM 1960 Rd E Humble TX'],
	// ['Crazy Frogs Saloon','17776 Tomball Pkwy Ste 49A Houston TX'],
	// ['EJs Place','16460 Kuykendahl Rd Ste 130 Houston TX'],
	// ['Gearheads Grub & Pub','5149 FM 1960 Rd W Houston TX'],
	// ['Hectors Mexian Restaurant','3333 FM 1960 E Humble TX'],
	// ['Jojos Asian Bistro','23940 WHY59 N Kingwood TX'],
	// ['Junkyard Bar and Grill','9607 FM 1960 Houston TX'],
	// ['Kingwood Country Club','1700 Lake Kingwood TRL Kingwood TX'],
	// ['Maks Sports Bar & Grill','5200 Louetta Rd Houston TX'],
	// ['Mamacitas Restaurant','15335 North Fwy Houston Tx'],
	// ['Mannys Mexican Grill','4795 E Mt Houston Rd Houston TX'],
	// ['Mi Rancho Grill & Bar','6096 FM 2920 Rd Spring TX'],
	// ['Mi Rancho Wilson Rd','4801 Wilson Rd Humble TX'],
	// ['Nicos Place','22610 Loop 494 Kingwood TX'],
	// ['On The Rox Humble','5054 FM 1960 E Humble TX'],
	// ['Parrot Pub','5010 Louetta Spring TX'],
	// ['Puerto Tacos','1660 W Lake Houston Pkwy Houston TX'],
	// ['Raffas','1660 W Lake Houston Pkwy Houston TX'],
	// ['Raveneaux Country Club','9415 Cypresswood Drive Spring TX'],
	// ['Golf Club of Houston','5860 Wilson Rd Humble TX'],
	// ['Shamrocks Pub','228 1st Street West Humble TX'],
	['Splendor','7440'],
	// ['St. James Restaurant & Cabaret','555 Rankin Rd Houston TX'],
	// ['The Hometown Chef','20114 Pinehurst Dr Humble TX'],
	// ['Time Out Tavern','7540 FM 1960 E Humble TX'],
	// ['Walden Lake Houston','18100 Walden Forest Humble TX'],
	// ['Whiskey River','7637 FM 1960 Rd W Houston TX'],
	// ['ZZ Gators Cove','733 Hamblen Rd Kingwood TX'],
	// ['Prospect Park Willowbrook','17776 State Hwy 249 Ste 28B Houston TX'],
	// ['Shamrocks Pub Willowbrook','7925 FM 1960 Rd W Houston TX']
]



callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var obj = JSON.parse(str);
    	var hoursOpts = requestHours(obj.results[0].place_id);
    	http.request(hoursOpts, callback2).end();
  });
}

callback2 = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var obj2 = JSON.parse(str);
    	console.log(obj2.result.name);
    	console.log(obj2.result.opening_hours.weekday_text);
  });
}

for (var i = 0; i < arrPlaces.length; i++) {
	var httpOpts = requestPlaceID(arrPlaces[i][0], arrPlaces[i][1]);
	http.request(httpOpts, callback).end();
}