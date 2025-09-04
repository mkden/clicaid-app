document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

}


cordova.plugins.ThemeDetection.isAvailable((res)=>{
  alert(res);
},(err)=>{
  console.log('Error when running isAvailable ->',err);
});

cordova.plugins.ThemeDetection.isDarkModeEnabled((res)=>{
  console.log('Is it dark mode? ->',res);
},(err)=>{
  console.log('Error when running isDarkModeEnabled  ->',err);
});
		
		
		
		
		
		
		
		var permissions = cordova.plugins.permissions;
 
var list = [
  permissions.ACCESS_COARSE_LOCATION,
  permissions.ACCESS_FINE_LOCATION,
  permissions.ACCESS_BACKGROUND_LOCATION,
  permissions.FOREGROUND_SERVICE,
  permissions.CAMERA,
  permissions.WRITE_EXTERNAL_STORAGE,
  permissions.READ_SMS,
  permissions.RECEIVE_SMS,
  permissions.WAKE_LOCK
];
 
permissions.hasPermission(list, callback, null);
 
function error() {
  console.warn('Camera or Accounts permission is not turned on');
}
 
function success( status ) {
  if( !status.hasPermission ) {
  
    permissions.requestPermissions(
      list,
      function(status) {
        if( !status.hasPermission ) error();
      },
      error);
  }
}
