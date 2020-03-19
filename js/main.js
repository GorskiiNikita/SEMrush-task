'use strict';


VK.Auth.getLoginStatus(function(response) {
  	if (response.status === 'connected'){
  	    renderMainPage();
  	} else {
  		renderAuthPage();
	}
});

