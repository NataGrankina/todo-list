"use strict";

require.config({
	baseUrl: "../todos",
	paths: {
		"todos": "scripts/todos",
		"arrayHelper": "scripts/arrayHelper",
		"todosPresenter": "scripts/todosPresenter",
		"lodash": "bower_components/lodash/lodash",
		"text": "bower_components/text/text"
	},
	config: {
    	text: {
      		useXhr: function (url, protocol, hostname, port) {
        		// allow cross-domain requests
        		// remote server allows CORS
        		return true;
      		}
    	}
  }
});

require(["todosPresenter"], function(todosPresenter){
  todosPresenter.initialize();
});