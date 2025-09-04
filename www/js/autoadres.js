

var autocomplete_service = new google.maps.places.AutocompleteService();//подключаем гуглосервис
var counrty_val = 'Россия';//это сюда будем писать значения наших местоположений
var region_val = '';
var city_val = ' ';
var dom_val = ' ';
var street_val = ' ';
var city_list = [];
var street_list = [];
var dom_list = [];
//в принципе дальше по аналогии с небольшими изменениями

$('#city').keyup(function(){
    city_val = region_val+' '+$('#city').val();
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
    $( "#city" ).autocomplete({
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
$('#acord').val(latlng);




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
     //log('no result')
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
$('#acord').val(latlng);




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
$('#acord').val(latlng);



  });
	
	


});