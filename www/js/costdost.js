

// Store old reference
const appendChild = Element.prototype.appendChild;

// All services to catch
const urlCatchers = [
  "/AuthenticationService.Authenticate?",
  "/QuotaService.RecordEvent?"
];

// Google Map is using JSONP.
// So we only need to detect the services removing access and disabling them by not
// inserting them inside the DOM
Element.prototype.appendChild = function (element) {
  const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
  const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));

  if (!isGMapAccessScript) {
    return appendChild.call(this, element);
  }

  // Extract the callback to call it with success data
  // Only needed if you actually want to use Autocomplete/SearchBox API
const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
const [a, b] = callback.split('.');
window[a][b]([1, null, 0, null, null, [1]]);

  // Returns the element to be compliant with the appendChild API
  return element;
};















var city4 = '';
var autocomplete_service = new google.maps.places.AutocompleteService();//подключаем гуглосервис
var counrty_val = 'Россия';//это сюда будем писать значения наших местоположений
var region_val = '';
var city_val = '';
var city_val2 = '';
var city_val3 = '';
var dom_val = ' ';
var dom_val2 = ' ';
var dom_val3 = ' ';
var dom_val4 = ' ';
var street_val = ' ';
var street_val2 = ' ';
var street_val3 = ' ';
var street_val4 = ' ';
var city_list = [];
var city_list2 = [];
var city_list3 = [];
var p_list = [];
var street_list = [];
var street_list2 = [];
var street_list3 = [];
var street_list4 = [];
var dom_list = [];

var place_val =''; 
var place_val2 ='';
var place_val3 ='';
//в принципе дальше по аналогии с небольшими изменениями





$('#city1').keyup(function(){
    city_val = region_val+' '+$('#city1').val();
    var request = {
        input: city_val,
    };
  //log(request);
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
		
			
			
              //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');

                            city_list[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("locality", result.types)) {
                    //log(result);
                }
            });
        }
        else{
         //log('no result')
        }
    }
    $( "#city1" ).autocomplete({
        source: city_list,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
	

        if(ui.item){
var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label}, function(results, status) {
var lat = results[0].geometry.location.lat();
var lng = results[0].geometry.location.lng();


var latlng = lat + ',' + lng;
$('#startcord1').val(latlng);	



  });
 city_val = ui.item.label;
        }
    }
});










$('#street').keyup(function(){
    street_val = city_val+' '+$('#street').val();
    var request = {
        input: street_val,
    };
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
                //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');	
                            street_list[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("route", result.types)) {
                    //log(result);
                }
            });
        }
        else{
            log('no result')
        }
    }

    $( "#street" ).autocomplete({
        source: street_list,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
        if(ui.item){
		var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label+' '+city_val}, function(results, status) {
var lat = results[0].geometry.location.lat();
var lng = results[0].geometry.location.lng();

			
var latlng = lat + ',' + lng;
$('#startcord1').val(latlng);
	



  });
            street_val = ui.item.label;
        }
    }
});





$('#dom').keyup(function(){

var dom_val = city_val+','+street_val+','+$('#dom').val();

var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address':dom_val}, function(results, status) {
var lat = results[0].geometry.location.lat();
var lng = results[0].geometry.location.lng();

			
var latlng = lat + ',' + lng;
$('#startcord1').val(latlng);


  });
	


});


















$('#city2').keyup(function(){
    city_val2 = region_val+' '+$('#city2').val();
    var request = {
        input: city_val2,
    };
  //log(request);
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
		
			
			
              //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');

                            city_list2[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("locality", result.types)) {
                    //log(result);
                }
            });
        }
        else{
         //log('no result')
        }
    }
    $( "#city2" ).autocomplete({
        source: city_list2,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
	

        if(ui.item){
var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label}, function(results, status) {
var lat2 = results[0].geometry.location.lat();
var lng2 = results[0].geometry.location.lng();


var latlng2 = lat2 + ',' + lng2;
$('#startcord2').val(latlng2);	



  });
 city_val2 = ui.item.label;
        }
    }
});






$('#street2').keyup(function(){
    street_val2 = city_val2+' '+$('#street2').val();
    var request = {
        input: street_val2,
    };
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
                //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');	
                            street_list2[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("route", result.types)) {
                    //log(result);
                }
            });
        }
        else{
            log('no result')
        }
    }

    $( "#street2" ).autocomplete({
        source: street_list2,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
        if(ui.item){
		var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label+' '+city_val2}, function(results, status) {
var lat2 = results[0].geometry.location.lat();
var lng2 = results[0].geometry.location.lng();

		
var latlng2 = lat2 + ',' + lng2;
$('#startcord2').val(latlng2);	




  });
            street_val2 = ui.item.label;
        }
    }
});





$('#dom2').keyup(function(){

var dom_val2 = city_val2+','+street_val2+','+$('#dom2').val();

var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address':dom_val2}, function(results, status) {
var lat2 = results[0].geometry.location.lat();
var lng2 = results[0].geometry.location.lng();

				
var latlng2 = lat2 + ',' + lng2;
$('#startcord2').val(latlng2);	



  });
	


});















$('#city3').keyup(function(){
    city_val3 = region_val+' '+$('#city3').val();
    var request = {
        input: city_val3,
    };
  //log(request);
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
		
			
			
              //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');

                            city_list3[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("locality", result.types)) {
                    //log(result);
                }
            });
        }
        else{
         //log('no result')
        }
    }
    $( "#city3" ).autocomplete({
        source: city_list3,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
	

        if(ui.item){
var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label}, function(results, status) {
var lat3 = results[0].geometry.location.lat();
var lng3 = results[0].geometry.location.lng();


var latlng3 = lat3 + ',' + lng3;
$('#startcord3').val(latlng3);	



  });
 city_val3 = ui.item.label;
        }
    }
});










$('#street3').keyup(function(){
    street_val3 = city_val3+' '+$('#street3').val();
    var request = {
        input: street_val3,
    };
   
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
                //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');	
                            street_list3[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("route", result.types)) {
                    //log(result);
                }
            });
        }
        else{
            log('no result')
        }
    }

    $( "#street3" ).autocomplete({
        source: street_list3,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
        if(ui.item){
		var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label+' '+city_val3}, function(results, status) {
var lat3 = results[0].geometry.location.lat();
var lng3 = results[0].geometry.location.lng();


	
var latlng3 = lat3 + ',' + lng3;
$('#startcord3').val(latlng3);	



  });
            street_val3 = ui.item.label;
        }
    }
});





$('#dom3').keyup(function(){

var dom_val3 = city_val3+','+street_val3+','+$('#dom3').val();

var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address':dom_val3}, function(results, status) {
var lat3 = results[0].geometry.location.lat();
var lng3 = results[0].geometry.location.lng();

		
var latlng3 = lat3 + ',' + lng3;
$('#startcord3').val(latlng3);	
	

  });
	


});







/////////////////////////////////









$('#street4').keyup(function(){
	
var city4=$("#city4 option:selected").text();
	
    street_val4 = city4+' '+$('#street4').val();
    var request = {
        input: street_val4,
    };
   
    autocomplete_service.getPlacePredictions(request, google_addresses_callback);
    function google_addresses_callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var counter = 0;
            $.each(results, function (index, result) {
                //log(result);
                function in_array(value, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == value){
                            var formated = result.description;
                            formated = formated.split(',');	
                            street_list4[counter] = formated[0];
                            counter++;
                            return true;
                        }
                    }
                        return false;
                }
                if (in_array("route", result.types)) {
                    //log(result);
                }
            });
        }
        else{
            log('no result')
        }
    }

    $( "#street4" ).autocomplete({
        source: street_list4,
        focus: displayItem,
        select: displayItem,
        change: displayItem
    });
    function displayItem(event, ui) {
        if(ui.item){
		var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': ui.item.label+' '+city4}, function(results, status) {
var lat4 = results[0].geometry.location.lat();
var lng4 = results[0].geometry.location.lng();

			
var latlng = lat4 + ',' + lng4;
$('#cordinat').val(latlng4);



  });
            street_val4 = ui.item.label;
        }
    }
});





$('#dom4').keyup(function(){

var dom_val4 = city4+','+street_val4+','+$('#dom4').val();

var geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address':dom_val4}, function(results, status) {
var lat4 = results[0].geometry.location.lat();
var lng4 = results[0].geometry.location.lng();
			
var latlng4 = lat4 + ',' + lng4;
$('#cordinat').val(latlng4);

  });
	


});
































   var directionsDisplay;
    var directionsService;
    var map;


    function initMap() {
      directionsService = new google.maps.DirectionsService;
      var chicago = new google.maps.LatLng(45.19045, 33.36686699999996);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: chicago,
		mapTypeControl: false,
			streetViewControl: false,
			fullscreenControl: false,
			gestureHandling: 'greedy'
      });
	
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
		
      });

	   calcRoute();
    }



	



    function calcRoute() {



var startcord1 = $('#startcord1').val();
var startcord2 = $('#startcord2').val();
var startcord3 = $('#startcord3').val();

var mycity = $('#city1').val();
var mycity2 = $('#city2').val();
var gdun = $( "#gdun" ).val();



if(startcord1>'0' & startcord2>'0'){

  document.getElementById("zak").style.display = "block";
  document.getElementById("errorr").style.display = "none";


if(startcord3>'0'){
	
 var waypts = [
  {location: startcord2, stopover: true},
  ];	
	
         var request = {
      origin: startcord1, // Haight.
      destination: startcord3, // Ocean Beach.
      waypoints: waypts, 
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
	
}
else{

      var request = {
	 origin: startcord1, // Haight.
      destination: startcord2, // Ocean Beach.
        travelMode: google.maps.TravelMode.DRIVING
      };
	  
}  
	  
	              directionsService.route(request, function(response, status) {
                if(status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    var route = response.routes[0];
                  // alert(route.legs[1].duration.text);
                    var summaryPanel = document.getElementById('directions_panel');
                    summaryPanel.innerHTML = '';
                    // For each route, display summary information.
					
					if(route.legs.length=='1'){
					var clas='';
					}else{
					var clas='marshrut';
					}
					
                    for(var i = 0; i < route.legs.length; i++) {
                        var routeSegment = i + 1;
                        summaryPanel.innerHTML += '<div class="'+ clas +'"><b>Маршрут: ' + routeSegment + '</b><br>'+ route.legs[i].start_address + ' <i class="fa fa-long-arrow-right"></i> '+route.legs[i].end_address + '<br>'+ route.legs[i].duration.text + '<br>'+ route.legs[i].distance.text + '<br></div>';;
                        //summaryPanel.innerHTML += route.legs[i].start_address + ' <i class="fa fa-long-arrow-right"></i> ';
                        //summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                        //summaryPanel.innerHTML += route.legs[i].duration.text + '<br>';
                        //summaryPanel.innerHTML += + route.legs[i].distance.text + '<br>';
                    }
					
					var randNum=response.routes[0].legs[0].duration.value/60;
					var time1 = parseFloat(randNum.toFixed(1));
					var des=response.routes[0].legs[0].distance.value/1000;
					var dest1 = parseFloat(des.toFixed(1));
					
					

					
					
					
					
					if(route.legs.length=='1'){
					var times = time1;
                    var dests = dest1;
					var tri=0;
					$('#name1').val(route.legs[0].start_address);	
					$('#name2').val(route.legs[0].end_address);	
					}
					else{
					var randNum2=response.routes[0].legs[1].duration.value/60;
					var time2 = parseFloat(randNum2.toFixed(1));
					var des2=response.routes[0].legs[1].distance.value/1000;
					var dest2 = parseFloat(des2.toFixed(1));
					var times = time1+time2;
                    var dests = dest1+dest2;
					$('#name1').val(route.legs[0].start_address);	
					$('#name2').val(route.legs[0].end_address);	
					$('#name3').val(route.legs[1].end_address);	
					var tri=1;
					}
					
					
			
					
					$('#alltime').val(times);
					$('#allkm').val(dests);
					
var cords=startcord1+"-"+startcord2+"-"+startcord3;



$.ajax({
	url: '../ajax/cost-dostav.php',     
	method: 'get',           
	dataType: 'json',        
	data: {time:times,dest:dests,cord:cords,city:mycity,city2:mycity2,gdun:gdun,tri:tri},    
	success: function(data){ 

$('#cost').html('Итого к оплате: '+data.cost_dostav+' <i class="fa fa-rub" aria-hidden="true"></i>');
$('#price').val(data.cost_dostav);
$('#gtime').text(data.gdun);
$('#totals').text(data.cost_dostav);
$('#recipientAmount1').val(data.cost_dostav);

	
	
	}
});	






                }
            });
			
			
}
						
else{
 document.getElementById("zak").style.display = "none";
  document.getElementById("errorr").style.display = "block";

}



	  

    };



