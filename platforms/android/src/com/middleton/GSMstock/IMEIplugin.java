package com.middleton.GSMstock;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

import android.content.Context;
import android.telephony.TelephonyManager;

public class IMEIplugin extends CordovaPlugin {

	@Override
	 public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {

        String result = "";        

        boolean returnState  = false;

        if (action.equals("get")) {

            TelephonyManager telephonyManager = 
				(TelephonyManager)this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);

            result = telephonyManager.getDeviceId();

            

            if (result==null) {

                        callbackContext.error("could not retrieve IMEI");

                  }

            else{

                  callbackContext.success(result);

            }            

            

            returnState = true;

        }

        else {

            returnState = false;            

        }

        return  returnState;

    } 

 

}


