var thymolServerConfiguration = {
	host: "localhost", //"localhost",     	// Server host defaults to 0.0.0.0
	port: 4400,                             	// Server listening port defaults to 3000
	webappRoot: __dirname + "/dist/release/",
	templatePath : "",
	debug : true,
	dataThymolLoading: true,
	resetPerRequest: true,
	/*  jQueryConfiguration: {                  // Properties to be copied to jQuery
	support: {
	  cors: true                          		// Required if you need to use jquery@1*
	}
	},*/
	defaults: {
		prefix : "th",
		dataPrefix : "data",
		precision : 10,
		protocol : "file://",
		locale : "ko",
		precedence : 20000,
		messagePath : "",
		resourcePath : "",
		messagesBaseName : "Messages",
		relativeRootPath: "",
		extendedMapping: false,
		localMessages: true,
		disableMessages: false,
		templateSuffix: ".html"
	},

	gulp : {
		db : {
			host :'127.0.0.1',
			port : 3306,
			user : 'test',
			password : 'test00',
			database:'copenhagen',
			connectionLimit:20,
			waitForConnections:false
		}
	}
};

module.exports = thymolServerConfiguration;
