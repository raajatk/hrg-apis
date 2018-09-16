var encrypt = require('../../../application-utilities/EncryptionUtility');
var validator = require("email-validator");
module.exports = function () {


	var createUser = function (req, res, callback) {
		if(validator.validate(req.body.userData.email)){
			var self = this;
			var salt = uuid.v1();
			var user = new domain.User(req.body.userData);
			user.salt = salt;
			user.password = encrypt(salt, user.password);
			user.validate(function (err) {
				if (err != null || err == "undefined") {
					Logger.info(err.errors.stack);
					err.status = 400;
					callback(err, user);
				} else {
					self.services.userService.createUser(user,callback);
				}
			})
		}else {
			var resData = {
				error:true,
				message:"Email is Invalid"
			}
			callback(null,resData);
		}

	}

	var userLogin = function(req, res, callback){
		if(req.body.userData.email && req.body.userData.password){
			this.services.userService.userLogin(req.body.userData, callback);
		}else {
			var resData = {
				error:true,
				message:"Payload Incorrect"
			}
			callback(null,resData);
		}

	}

	var forgotPassword = function(req, res, callback){
		if(req.body.userData.email){
			this.services.userService.forgotPassword(req.body.userData, callback);
		}else {
			var resData = {
				error:true,
				message:"Payload Incorrect"
			}
			callback(null,resData);
		}

	}

	var resetPassword = function(req, res, callback){
		if(req.body.userData.email && req.body.userData.verificationToken && req.body.userData.newPassword){
			this.services.userService.resetPassword(req.body.userData,callback);
		}else {
			var resData = {
				error:true,
				message:"Payload Incorrect"
			}
			callback(null,resData);
		}

	}

	var testApi = function(req, res, callback){
		this.services.userService.testApi(callback);
	}

	return {
		createUser: createUser,
		userLogin:userLogin,
		forgotPassword:forgotPassword,
		resetPassword:resetPassword,
		testApi:testApi
	}
};
