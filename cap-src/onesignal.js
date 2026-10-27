import { Capacitor } from '@capacitor/core';
import OneSignal from '@onesignal/capacitor-plugin';
const APP_ID = '8c912104-8b46-497f-9ea2-d0cd76def931';
let started=false;
async function init(){
 if(started || !Capacitor.isNativePlatform()) return;
 started=true;
 try {
  await OneSignal.initialize(APP_ID);
  const id=localStorage.getItem('id_user');
  if(id && id!=='null' && id!=='undefined') await OneSignal.login(String(id));
  if(OneSignal.Notifications && OneSignal.Notifications.addEventListener){
   OneSignal.Notifications.addEventListener('click', function(event) { console.log('OneSignal click:',event); });
  }
  if(OneSignal.Notifications && OneSignal.Notifications.requestPermission){
   await OneSignal.Notifications.requestPermission(false);
  }
 } catch(error) { started=false;console.error('Capacitor OneSignal init failed:',error); }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
