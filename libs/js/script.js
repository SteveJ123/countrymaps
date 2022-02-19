// $(window).on('load', function () {if ($('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {$(this).remove();});}});	
// 	console.log("test");
// 	geo = navigator.geolocation;
// 	console.log("geo", geo);

// 	$.get("https://ipinfo.io", function(response) {
//     console.log(response.city, response.country);
// }, "jsonp");

// fetch('https://api.ipregistry.co/?key=tryout')
//     .then(function (response) {
// 		console.log("response", response);
//         return response.json();
//     })
//     .then(function (payload) {
// 		console.log("payload", payload);
//         console.log(payload.location.country.name + ', ' + payload.location.city);
//     });

$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
	setTimeout(removeLoader, 3000); //wait for page load PLUS two seconds.
});
function removeLoader() {
	$("#loadingDiv").fadeOut(3000, function () {
		// fadeOut complete. Remove the loading div
		$("#loadingDiv").remove(); //makes page more lightweight 
	});
}

// L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';

var countryBorders;
var data = { "features": [] };
// 
var listOfCountries = [];



var map;
var geojsonLayer;
var lat;
var lon;
var country;
var databorder = {};
var allCountriesDetails;

var latitude = 51.5085;
var longitude = -0.1257;

// Creates a red marker with the coffee icon
//  var redMarker = L.AwesomeMarkers.icon({
//     icon: 'coffee',
//     markerColor: 'red'
//   });

//  var helloPopup = L.popup().setContent('Hello World!');

// L.easyButton('fa-globe', function(btn, map){
//     helloPopup.setLatLng(map.getCenter()).openOn(map);
// }).addTo(map);



function countryAllDetails() {
	$.ajax({
		url: "libs/php/getAllCountriesDetails.php",
		type: 'POST',
		dataType: 'json',
		// data: {
		// 	lat: lat, //dropdown you selected country
		// 	lon:  lon,//dropdown you selected language
		// },
		success: function (result) {

			// console.log("result country details", result);
			// country = result.data.country;
			// console.log("country selected", country);

			// for (var i = 0; i < countryBorders.features.length; i++) {
			// 	// Do stuff with arr[i] or i
			// 	if(countryBorders.features[i].properties.name === country){
			// 		data.features.push(countryBorders.features[i]);
			// 	}
			//   }

			//   console.log("countrySelected", data)

			if (result.status.name == "ok") {
				console.log("result country details", result.data);
				allCountriesDetails = result.data;
				// countryBordersHighlight();
				// document.getElementById("country").innerHTML = country;
				// document.getElementById("temperature").innerHTML = result.data.main.temp;
				// document.getElementById("timezone").innerHTML = result.data.timezone;
				// document.getElementById("windspeed").innerHTML = result.data.wind.speed;
				// $('#temperature').html(result.data.main.temp);

				// $('#txtContinent').html(result['data'][0]['continent']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);
				// lat = result.data.lat;
				// lon = result.data.lon;
				getSelectedCountryInfo(country);


			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}

countryAllDetails();

function getCountryListDropdown() {
	$.ajax({
		url: "libs/php/getCountryBorders.php",
		type: 'POST',
		dataType: 'json',
		// data: {
		// 	lat: lat, //dropdown you selected country
		// 	lon:  lon,//dropdown you selected language
		// },
		success: function (result) {

			console.log("country list data", result);

			if (result.status.name == "ok") {
				console.log("country list data", result.data);
				var countryListData = result.data;
				// result.data.features[i].properties.name
				// for (var key in countryListData.features) {					
				// 		listOfCountries.push(countryListData.features[key].name); 

				//   }

				countryListData.features.forEach(function (item, index) {
					listOfCountries.push(countryListData.features[index].properties)
				});
				console.log("listOfCountries", listOfCountries.sort());

				var countryselect = document.getElementById('countryselect');


				//     for (var country in listOfCountries){
				// 	var myOption = document.createElement("option");
				// 	myOption.text = country;
				// 	myOption.value = country;
				// 	countryselect.appendChild(myOption);
				//    }

				// list of countries is sorted
				listOfCountries.sort((a, b) => a.name > b.name ? 1 : -1);

				listOfCountries.forEach(function (item, index) {
					// console.log("option", item);					   
					var myOption = document.createElement("option");
					myOption.text = item.name;
					myOption.value = item.iso_a2;
					countryselect.appendChild(myOption);
				});


				// document.getElementById("country").innerHTML = country;
				// document.getElementById("temperature").innerHTML = result.data.main.temp;
				// document.getElementById("timezone").innerHTML = result.data.timezone;
				// document.getElementById("windspeed").innerHTML = result.data.wind.speed;
				// $('#temperature').html(result.data.main.temp);

				// $('#txtContinent').html(result['data'][0]['continent']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);
				// lat = result.data.lat;
				// lon = result.data.lon;



			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}

getCountryListDropdown();

function getExchangeRate(passedkey) {
	$.ajax({
		url: "libs/php/getExchangeRate.php",
		type: 'POST',
		dataType: 'json',
		// data: {
		// 	lat: lat, //dropdown you selected country
		// 	lon:  lon,//dropdown you selected language
		// },
		success: function (result) {

			// console.log("result country details", result);
			// country = result.data.country;
			// console.log("country selected", country);

			// for (var i = 0; i < countryBorders.features.length; i++) {
			// 	// Do stuff with arr[i] or i
			// 	if(countryBorders.features[i].properties.name === country){
			// 		data.features.push(countryBorders.features[i]);
			// 	}
			//   }

			//   console.log("countrySelected", data)

			if (result.status.name == "ok") {
				console.log("get exchange rate", result.data.rates);
				let exchangeRates = result.data.rates;

				let exchageRateOfSelectedCountry = exchangeRates[passedkey];
				console.log("exchageRateOfSelectedCountry", exchageRateOfSelectedCountry);

				// for(var key in exchangeRates){
				// 	if(exchangeRates.hasOwnProperty(passedkey)){
				// 		console.log("exchange rates key", passedkey);
				// 	}
				// }

				document.getElementById("exchangeRate").innerHTML = exchageRateOfSelectedCountry;
				// allCountriesDetails = result.data;
				// countryBordersHighlight();
				// document.getElementById("country").innerHTML = country;
				// document.getElementById("temperature").innerHTML = result.data.main.temp;
				// document.getElementById("timezone").innerHTML = result.data.timezone;
				// document.getElementById("windspeed").innerHTML = result.data.wind.speed;
				// $('#temperature').html(result.data.main.temp);

				// $('#txtContinent').html(result['data'][0]['continent']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);
				// lat = result.data.lat;
				// lon = result.data.lon;
				// getSelectedCountryInfo(country);


			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}

// getExchangeRate(key);

function countryBordersHighlight() {
	$.ajax({
		url: "libs/php/getCountryBorders.php",
		type: 'POST',
		dataType: 'json',
		// data: {
		// 	country: $('#selCountry').val(), //dropdown you selected country
		// 	lang: $('#selLanguage').val() //dropdown you selected language
		// },
		success: function (result) {

			countryBorders = result.data;
			// countryborderoutput = result.data
			console.log("country borders result", countryBorders);
			getCountryMapHighlight();

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}
countryBordersHighlight();

function countryWeather(lat, lon) {
	$.ajax({
		url: "libs/php/getCountryWeather.php",
		type: 'POST',
		dataType: 'json',
		data: {
			lat: lat, //dropdown you selected country
			lon: lon,//dropdown you selected language
		},
		success: function (result) {

			console.log("result country weather", result, "wind speed", result.data.wind.speed, "timezone", result.data.timezone, "country temperature", result.data.main.temp);
			// country = result.data.country;
			// console.log("country selected", country);

			// for (var i = 0; i < countryBorders.features.length; i++) {
			// 	// Do stuff with arr[i] or i
			// 	if(countryBorders.features[i].properties.name === country){
			// 		data.features.push(countryBorders.features[i]);
			// 	}
			//   }

			//   console.log("countrySelected", data)

			if (result.status.name == "ok") {
				document.getElementById("country").innerHTML = country;
				document.getElementById("temperature").innerHTML = result.data.main.temp + " F";
				document.getElementById("timezone").innerHTML = result.data.timezone;
				document.getElementById("windspeed").innerHTML = result.data.wind.speed;
				document.getElementById("wikipedia").href = "https://en.wikipedia.org/wiki/" + country;
				// getSelectedCountryInfo(country);	 
				console.log("testing", country);
				// $('#temperature').html(result.data.main.temp);

				// $('#txtContinent').html(result['data'][0]['continent']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);
				// lat = result.data.lat;
				// lon = result.data.lon;



			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}

function separator(numb) {
	var str = numb.toString().split(".");
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return str.join(".");
}



function getSelectedCountryInfo(selectedCountry) {
	console.log("selected country", selectedCountry);
	console.log("all country details now", allCountriesDetails);
	for (var i = 0; i < allCountriesDetails.length; i++) {
		//cca3
		if (allCountriesDetails[i].name.common === selectedCountry) {
			console.log(allCountriesDetails[i]);
			capital = allCountriesDetails[i].capital[0];
			for (var key in allCountriesDetails[i].currencies) {
				if (allCountriesDetails[i].currencies.hasOwnProperty(key)) {
					//   alert(key); // 'a'
					//   alert(object[key]); // 'hello'
					// key = key;
					key = key;
					getExchangeRate(key);
					currency = allCountriesDetails[i].currencies[key].name;
					// getExchangeRate(key);
				}
			}

			population = allCountriesDetails[i].population;
			// console.log(capital, currency, population);		 
			let numb = population;

			document.getElementById("capital").innerHTML = capital;
			document.getElementById("currency").innerHTML = currency;
			document.getElementById("population").innerHTML = separator(numb);
		}

	}
}

function findAddress(selectedValue) {
	console.log("selected value", selectedValue);
	// var latitude = 51.5085;
	// var longitude  = -0.1257;
	// for (var i = 0; i < countryLatLongitude.length; i++) {
	// 	// Do stuff with arr[i] or i
	// 	if(countryLatLongitude[i].country = selectedValue){
	// 		databorder =countryLatLongitude[i];
	// 	}
	//   }

	//   console.log("countrySelected", allCountriesDetails[1]);

	country;

	for (var i = 0; i < allCountriesDetails.length; i++) {

		if (allCountriesDetails[i].cca2 === selectedValue) {
			console.log("countrySelected", allCountriesDetails[i]);
			country = allCountriesDetails[i].name.common;
			countryCapital = allCountriesDetails[i].capital[0];
		}
	}

	console.log("all countries", allCountriesDetails);

	for (var i = 0; i < allCountriesDetails.length; i++) {
		// console.log("country lat lang", allCountriesDetails[i]);
		if (allCountriesDetails[i].name.common === country) {
			latitude = allCountriesDetails[i].capitalInfo.latlng[0];
			longitude = allCountriesDetails[i].capitalInfo.latlng[1];
		}
	}
	for (var i = 0; i < countryBorders.features.length; i++) {
		// Do stuff with arr[i] or i
		console.log("country lat lang", countryBorders.features[i].geometry.coordinates[0]);
		if (countryBorders.features[i].properties.name === country) {
			// databorder = countryBorders.features[i]
			countryCoordinates = countryBorders.features[i].geometry.coordinates[0];
			data.features = [];
			data.features.push(countryBorders.features[i]);
		}
	}

	console.log("countrySelected", data)
	console.log("country coordinates", countryCoordinates.length);

	//   map = L.map('map').setView([latitude, longitutude], 2);
	map.panTo(new L.LatLng(latitude, longitude));
	map.removeLayer(geojsonLayer);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	if (countryCoordinates.length === 1) {
		console.log("country coordinates value", countryCoordinates[0])
		for (let i = 0; i < 5; i++) {
			let lan = countryCoordinates[0][i][0];
			let lat = countryCoordinates[0][i][1];
			console.log("lat lan", lat, lan);
			marker = new L.marker([lat, lan])
				.addTo(map);
		}
	} else {
		for (let i = 0; i < 10; i++) {
			let lan = countryCoordinates[i][0];
			let lat = countryCoordinates[i][1];
			console.log("lat lan", lat, lan);
			marker = new L.marker([lat, lan])
				.addTo(map);
		}
	}


	L.marker([latitude, longitude]).addTo(map).on("click", function (event) {
		// var clickedMarker = event.layer;
		// do some stuff…
		L.popup()
			.setLatLng([latitude, longitude])
			.setContent(`<p>Country: ${country} </p><p>City: ${countryCapital} </p>`)
			.openOn(map);
	});
	geojsonLayer = L.geoJSON(data, {
		style: {
			fillColor: 'blue',
			weight: 2,
			opacity: 1,
			color: 'white',  //Outline color
			fillOpacity: 0.7
		}
	}).addTo(map);




	countryWeather(latitude, longitude);
	getSelectedCountryInfo(country);
	// getExchangeRate(key);


}

// get country borders



//---get country borders

// get country map hightlight
function getCountryMapHighlight() {
	$.ajax({
		url: "libs/php/getCountryMap.php",
		type: 'POST',
		dataType: 'json',
		// data: {
		// 	country: $('#selCountry').val(), //dropdown you selected country
		// 	lang: $('#selLanguage').val() //dropdown you selected language
		// },
		success: function (result) {

			console.log("result country info", result);
			country = result.data.country;
			console.log("country selected", country);
			for (var i = 0; i < countryBorders.features.length; i++) {
				// Do stuff with arr[i] or i
				if (countryBorders.features[i].properties.name === country) {
					data.features.push(countryBorders.features[i]);
				}
			}

			console.log("countrySelected", data)

			if (result.status.name == "ok") {

				// $('#txtContinent').html(result['data'][0]['continent']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);
				lat = result.data.lat;
				lon = result.data.lon;
				countryWeather(lat, lon);
				// getSelectedCountryInfo(country);

				map = L.map('map').setView([result.data.lat, result.data.lon], 2);

				// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
				// const tileUrl = 'https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=nVcOJKXmRYhsVMute6wi'; 

				// L.tileLayer(tileUrl, { attribution }).addTo(map);
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				L.marker([result.data.lat, result.data.lon]).addTo(map).on("click", function (event) {
					// var clickedMarker = event.layer;
					// do some stuff…
					L.popup()
						.setLatLng([result.data.lat, result.data.lon])
						.setContent(`<p>Country: ${result.data.country} </p><p>City: ${result.data.city} </p>`)
						.openOn(map);
				});

				// console.log(payload.location.country.name + ', ' + payload.location.city);
				console.log("data", data);
				// 		L.GeoJSON.coordsToLatLngs(data.coordinates[0],2)
				// 		L.polyline(latLngs, {
				//     color: "green",
				//     weight: 14,
				//     opacity: 1
				// }).addTo(map);


				L.easyButton('<span class="star" data-bs-toggle="modal" data-bs-target="#exampleModal">&starf;</span>', function () {
					// alert('you just clicked the html entity \&starf;');
				}).addTo(map);



				geojsonLayer = L.geoJSON(data, {
					style: {
						fillColor: 'blue',
						weight: 2,
						opacity: 1,
						color: 'white',  //Outline color
						fillOpacity: 0.7
					}
				}).addTo(map);

			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
		}
	});
}




//not working
$.ajax({
	url: "libs/php/getCountryDetails.php",
	type: 'POST',
	dataType: 'json',
	// data: {
	// 	country: $('#selCountry').val(), //dropdown you selected country
	// 	lang: $('#selLanguage').val() //dropdown you selected language
	// },
	success: function (result) {

		console.log("result country detail", result);

		if (result.status.name == "ok") {

			// $('#txtContinent').html(result['data'][0]['continent']);
			// $('#txtCapital').html(result['data'][0]['capital']);
			// $('#txtLanguages').html(result['data'][0]['languages']);
			// $('#txtPopulation').html(result['data'][0]['population']);
			// $('#txtArea').html(result['data'][0]['areaInSqKm']);

			// var map = L.map('map').setView([result.data.lat, result.data.lon], 2);

			// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
			// const tileUrl = 'https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=nVcOJKXmRYhsVMute6wi'; 

			// L.tileLayer(tileUrl, { attribution }).addTo(map);

			// L.marker([result.data.lat, result.data.lon]).addTo(map);
			// 		L.popup()
			// 	.setLatLng([lat, lon])   
			// .setContent(`<p>City:  </p><p>Time Zone: </p>`)
			// .openOn(map);
			// console.log(payload.location.country.name + ', ' + payload.location.city);
			// 		L.GeoJSON.coordsToLatLngs(data.coordinates[0],2)
			// 		L.polyline(latLngs, {
			//     color: "green",
			//     weight: 14,
			//     opacity: 1
			// }).addTo(map);
			// 		L.geoJSON(data, {
			//     style: {
			//         fillColor: 'blue',
			//         weight: 2,
			//         opacity: 1,
			//         color: 'white',  //Outline color
			//         fillOpacity: 0.7
			//     }
			// }).addTo(map);

		}

	},
	error: function (jqXHR, textStatus, errorThrown) {
		// your error code
	}
});

//not working
$.ajax({
	url: "libs/php/getCountryListLatLan.php",
	type: 'POST',
	dataType: 'json',
	// data: {
	// 	country: $('#selCountry').val(), //dropdown you selected country
	// 	lang: $('#selLanguage').val() //dropdown you selected language
	// },
	success: function (result) {

		console.log("country list", result);

		// if (result.status.name == "ok") {

		// $('#txtContinent').html(result['data'][0]['continent']);
		// $('#txtCapital').html(result['data'][0]['capital']);
		// $('#txtLanguages').html(result['data'][0]['languages']);
		// $('#txtPopulation').html(result['data'][0]['population']);
		// $('#txtArea').html(result['data'][0]['areaInSqKm']);
		// lat = result.data.lat;
		// lon = result.data.lon;

		// map = L.map('map').setView([result.data.lat, result.data.lon], 2);

		// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
		// const tileUrl = 'https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=nVcOJKXmRYhsVMute6wi'; 

		// L.tileLayer(tileUrl, { attribution }).addTo(map);
		// 		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		// 		}).addTo(map);
		// 		L.marker([result.data.lat, result.data.lon]).addTo(map);
		// 		L.popup()
		// 	.setLatLng([result.data.lat, result.data.lon])   
		// .setContent(`<p>Country: ${result.data.country} </p><p>City: ${result.data.city} </p>`)
		// .openOn(map);
		// console.log(payload.location.country.name + ', ' + payload.location.city);
		// console.log("data", data);
		// 		L.GeoJSON.coordsToLatLngs(data.coordinates[0],2)
		// 		L.polyline(latLngs, {
		//     color: "green",
		//     weight: 14,
		//     opacity: 1
		// }).addTo(map);
		// 		L.geoJSON(data, {
		//     style: {
		//         fillColor: 'blue',
		//         weight: 2,
		//         opacity: 1,
		//         color: 'white',  //Outline color
		//         fillOpacity: 0.7
		//     }
		// }).addTo(map);

		// }

	},
	error: function (jqXHR, textStatus, errorThrown) {
		// your error code
		console.log("error", errorThrown)
	}
});


var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
	myInput.focus()
})
