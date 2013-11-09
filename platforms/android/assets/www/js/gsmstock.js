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
			$("#login_login").show();
		else
			$("#login_login").hide();
	}
	
	//user login
    $('#login').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserLoginRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'login': $("#login_login").val(),
                'password': $('#login_password').val(),
                'imei' : imei
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {

                loginBool=data.ReturnValue;

				if(loginBool==true) {
                    $.mobile.navigate("#page_main", { transition: "slide", info: "info about the #bar hash" });
                } else {
                    $('#login_login').removeClass('boxShadow').addClass('boxShadowRed');
                    $('#login_password').removeClass('boxShadow').addClass('boxShadowRed');
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
                $("#register_login").text("");
                $("#register_password").text("");
                $("#register_question").text("");
                $("#register_answer").text("");
                
                $("#login_login").text($("#register_login").val());
                $.mobile.navigate("#main", { transition: "slide", info: "info about the #bar hash" });
                
            }
        });
    });
    
    //pobranie pytania do odzyskiwania has³a
    $('#remember_button_login').click(function () {
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserAnswerRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'imei': null,
                'login': $("#login_login").val()
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
                'imei': null,
                'login': $("#login_login").val(),
                'answer': $("#remember_answer").val()
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {
                $("#remember_question").text(data.ReturnValue);
                
                if(data.ReturnValue==true) {
                    $.mobile.navigate("#page_new_password", { transition: "slide", info: "info about the #bar hash" });
                } else {
                    alert("zle");
                }

            }
        });
    });
    
    $('#answer_button').click(function () {
        $("#remember_login").text($("#login_login").val());
        
        $.ajax({
            type: "GET",
            url: "http://46.254.72.71:8093/gsmstock/GsmStockService.svc/UserAnswerRequest",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            data: {
                'imei': null,
                'login': $("#login_login").val()
            },
            error: function (textStatus) {
                alert(textStatus);
            },

            success: function (data, status, xr) {
                $("#remember_question").text(data.UserAnswer[0].Question);

            }
        });
    });

});
