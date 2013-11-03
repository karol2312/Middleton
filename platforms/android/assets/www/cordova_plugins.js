cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.middleton.GSMstock/www/imei.js",
        "id": "com.middleton.GSMstock.imei",
        "clobbers": [
            "imei"
        ]
    }
]
});