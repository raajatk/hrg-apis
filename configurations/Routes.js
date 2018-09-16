	module.exports = function (app) {
		var controllers = app.controllers,
			views = app.views;

		return {
			"/api/test": [{
					method: "GET",
					action: controllers.userController.testApi,
					views: {
						json: views.jsonView
					}
				}],

				"/api/create": [{
						method: "POST",
						action: controllers.userController.createUser,
						views: {
							json: views.jsonView
						}
				}],

				"/api/login": [{
						method: "POST",
						action: controllers.userController.userLogin,
						views: {
							json: views.jsonView
						}
				}],

				"/api/forgot": [{
						method: "POST",
						action: controllers.userController.forgotPassword,
						views: {
							json: views.jsonView
						}
				}],

				"/api/reset": [{
						method: "POST",
						action: controllers.userController.resetPassword,
						views: {
							json: views.jsonView
						}
				}]



		};
	};
