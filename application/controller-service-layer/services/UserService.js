var BaseService = require('./BaseService');
var encrypt = require('../../../application-utilities/EncryptionUtility');
var nodemailer = require('nodemailer');
UserService = function (app) {
	this.app = app;
};

UserService.prototype = new BaseService();

UserService.prototype.createUser = function (user, callback) {
	user.save(function (err, userObj) {
		callback(err, userObj);
	});
}

UserService.prototype.userLogin = function (userData, callback) {
	console.log("The user data is ",userData);
	//Fetch the User Details from the Db
	domain.User.findOne({email:userData.email},function(err,userObj){
		if(!err && userObj){
			console.log("the res is ",err,userObj);
			var encryptPassword = encrypt(userObj.salt, userData.password);
			if(encryptPassword == userObj.password){
				//Login
				domain.AuthenticationToken.count({email:userData.email},function(err,count){
					if(count==0){
						console.log("the count res is ",err,count);
						var authenticationObj = new domain.AuthenticationToken({
								email: userObj.email,
								user: userObj._id,
								authToken: uuid.v1()
						});

						//Create the AuthenticationToken for the Session
						authenticationObj.save(function (err, authObj) {
								if (!err && authObj) {
									var resData = {}
									resData.authToken = authObj.authToken;
									resData.user = {name:userObj.name,email:userObj.email,created:userObj.created};
									console.log("the res is",resData);
									callback(err, resData);
								}
						})
					}else {
						//Update the AuthenticationToken is Already Available
						var authToken = uuid.v1();
						console.log("the new authToken is ",authToken);
						domain.AuthenticationToken.update({email:userObj.email},{$set:{authToken:authToken}},function(err,updateRes){
							if(!err){
								var resData = {}
								resData.authToken = authToken;
								resData.user = {name:userObj.name,email:userObj.email,created:userObj.created};
								console.log("the res is",resData);
								callback(err, resData);
							}else {
								var resData = {
									error:err,
									message:"Some Error has Occured"
								}
								callback(err,resData);
							}
						})
					}
				})


			}else {
					//No Login When Password is Incorrect
					var resData = {
						error:"Login Failed",
						message:"Email or password is Incorrect"
					}
					callback(err, resData);
			}
		}else {
				//No Login When User Not Found
				var resData = {
					error:"Login Failed",
					message:"User Not Found"
				}
				callback(err, resData);
		}
	})
}

UserService.prototype.forgotPassword = function (userData, callback) {
	//Fetch the User Details
	domain.User.findOne({email:userData.email},function(err,userObj){
		if(!err && userObj){
			//Create the Verification Link to be sent to the user's mail
			domain.VerificationToken.findOne({email:userData.email,isUsed:false},function(err,tokenObj){
				if(!tokenObj){
					var verificationTokenObj = new domain.VerificationToken({
							email: userData.email,
							user: userObj._id,
							verificationToken: uuid.v1()
					});

					//Save the Verification Token and Send the Mail
					//Please update the emailFrom and password in the Environment.js file
					verificationTokenObj.save(function(err,res){
						if(!err && res){
							//Send Verification Email to the User
							var link = "http://domainname.com/reset/token/"+res.verificationToken;
							var emailBody = "Hi,\n" + userObj.name + "\nPlease Click the link below to reset your password\n"+link+"\nThanks,\nAdmin Team";
							sendEmail(userData.email,"Verification Email for Password Reset",emailBody);
							var resData = {
								link:link,
								token:res.verificationToken
							}
							callback(err, resData);
						}else {
							var resData = {
								error:"Error",
								message:"Can not generate Verification Token"
							}
							callback(err, resData);
						}
					})
				}else {
					//If the Previously generated token is not yet used, send it again
					var link = "http://domainname.com/reset/token/"+tokenObj.verificationToken;
					var emailBody = "Hi,\n" + userObj.name + "\nPlease Click the link below to reset your password\n"+link+"\nThanks,\nAdmin Team";
					sendEmail(userData.email,"Verification Email for Password Reset",emailBody);
					var resData = {
						link:link,
						token:tokenObj.verificationToken
					}
					callback(err, resData);
				}
			})
		}else {
			var resData = {
				error:"Error",
				message:"User Not Found"
			}
			callback(err, resData);
		}
	})

}

var sendEmail = function (emailto, subject, emailBody) {

	console.log("configurationHolder.config.emailFrom",configurationHolder.config.emailFrom);
  configurationHolder.EmailUtil.email(configurationHolder.config.emailFrom, emailto, subject, emailBody);
}

UserService.prototype.resetPassword = function (userData, callback) {
	console.log("the request is ",userData);
	//Verify the Token Received
	domain.VerificationToken.findOne({email:userData.email,verificationToken:userData.verificationToken},function(err,tokenObj){
		console.log("the res is ",err,tokenObj);
		if(!err && tokenObj &&!tokenObj.isUsed){
			domain.User.findOne({email:userData.email},function(userErr,userObj){
				if(!err && userObj){
					//Encrypt the Password and update it in the Db
					var password = encrypt(userObj.salt, userData.newPassword);
					domain.User.update({email:userData.email},{$set:{password:password}},function(updateErr,res){
						if(!err){
							domain.VerificationToken.update({email:userData.email,verificationToken:userData.verificationToken},{$set:{isUsed:true}},function(updateErr,updateRes){
								if(!updateErr){
									var resData = {
										error:false,
										success:true,
										message:"The Password has been udated Successfully"
									}
									callback(err,resData);
								}else {
									var resData = {
										error:true,
										success:false,
										message:"Password Can not be Updated"
									}
									callback(err,resData);
								}
							})
						}
					})
				}else {
					var resData = {
						error:true,
						success:false,
						message:"Password Can not be Updated"
					}
					callback(err,resData);
				}
			})
		}else {
			if(tokenObj){
				var resData = {
					error:true,
					success:false,
					message:"This Verification Token has been Used Previously."
				}
			}else {
				var resData = {
					error:true,
					success:false,
					message:"This Verification Token is not Correct."
				}
			}
			callback(err,resData);
		}
	})
}




UserService.prototype.testApi = function (callback) {
	console.log("TEST API RAN SUCCESSFULLY");
	callback(false,{res:"TEST API RAN SUCCESSFULLY"});
}
module.exports = function (app) {
	return new UserService(app);
};
