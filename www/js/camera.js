document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture); 
document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
}


   
function cameraTakePicture() {   
/*Camera Plugin Code*/
  navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
	  correctOrientation:true
  });

  function onSuccess(imageData) {
      //console.log(imageData);
       
       /*Crop Image Plugin Code*/
       plugins.crop(function success (data) {
          //console.log(data);
          var image = document.getElementById('output');
          image.src = data;
	$("#message_form").html('<div id="loader"><span class="icon-logo fa-2x ring"></span></div>');
	  document.getElementById('closem').click(); 

		 var options = new FileUploadOptions();
                options.fileKey = "file_v";
                options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";

                var params = {};
                params.value1 = "test";
                params.value2 = "param";

                options.params = params;
                options.chunkedMode = false;

                var ft = new FileTransfer();
                ft.upload(data, "https://clicaid.ru/api-mobile/user-page.php?id_user="+id_user, function(result){
                   $("#message_form").html('<i class="far fa-check"></i>').show('slow');
                }, function(error){
                 //alert('error : ' + JSON.stringify(error));
                }, options);
		

		
       }, 
       function fail () {

       }, imageData, {quality:100});
  }

 function onFail(message) {
    //alert('Failed because: ' + message);
 }   
} 
   
   
   
   





function cameraGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
   });

   function onSuccess(imageURL) {
      var image = document.getElementById('output');
      image.src = imageURL;

	  $("#message_form").html('<div id="loader"><span class="icon-logo fa-2x ring"></span></div>');
	  document.getElementById('closem').click();  
	  
	  var options = new FileUploadOptions();
                options.fileKey = "file_v";
                options.fileName = imageURL.substr(imageURL.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";

                var params = {};
                params.value1 = "test";
                params.value2 = "param";

                options.params = params;
                options.chunkedMode = false;

                var ft = new FileTransfer();
                ft.upload(imageURL, "https://clicaid.ru/api-mobile/user-page.php?id_user="+id_user, function(result){
                   $("#message_form").html('<i class="far fa-check"></i>').show('slow');
                }, function(error){
                    //alert('error : ' + JSON.stringify(error));
                }, options);
	  
	  
	 
	  

   }

   function onFail(message) {
      //alert('Failed because: ' + message);
   }

}