'use strict';


function loginVk(){
	VK.Auth.login(function(response) {
	    if (response.status === 'connected') {
            renderMainPage();
	    }
	});
}


function logoutVk() {
    VK.Auth.logout(function (response) {
        if (response.session == null){
            renderAuthPage();
        }
    });
}
