var loginBool = 'nono';

var imei = 'no_imei';
var verificationAnswer = false;

$(document).ready(function () {
    	document.addEventListener("deviceready", onDeviceReady, false);


	//phonegap loaded, get device imei
    function onDeviceReady() {
		window.plugins.imei.getIMEI( 
			function(result){imei = result;},
			function(error){alert(error);}
		);
		
		
		if(imei == 'no_imei')
			$("#user_login").show();
		else
			$("#user_login").hide();
	}
	
	
    $('#login').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserLoginRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'login': null,
                'password': $('#login_password').val(),
                'imei' : imei
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {

                loginBool=data.ReturnValue;

                if(loginBool==true) {
                    alert('Zalogowany');
                } else {
					alert('Niezalogowany');
				}
				
            }
        });
    });
    
    //zdarzenie klikniecia przycisku rejestracji
    $('#register_button').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserRegisterRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'login': $("#register_login").val(),
                'password': $("#register_password").val(),
                'imei': imei,
                'userRole': 2,
                'question': $("#register_question").val(),
                'answer': $("#register_answer").val()
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {

                alert('Zarejestrowano pomyœlnie !');
            }
        });
    });
    
    //pobranie pytania do odzyskiwania has³a
    $('#answer_button').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserAnswerRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'imei': imei,
                'login' : null
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {
                $("#remember_question").text(data.UserAnswer[0].Question);
                
            }
        });
    });
    
    //weryfikacja odpowiedzi do odzyskiwania has³a
    $('#remember_button').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/VerificationAnswerRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'imei': imei,
                'login': null,
                'answer': $("#remember_answer").val()
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {
                $("#remember_question").text(data.ReturnValue);

            }
        });
    });

});
