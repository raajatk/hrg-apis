
   global.express = require('express');
   global.errorHandler = require('errorhandler')
   global.bodyParser = require('body-parser')
   global.Promise = require('node-promise').Promise
   global.async = require('async')
   global.crypto = require('crypto')
   global.uuid = require('node-uuid');
   global.winston = require('winston');
   global.ifAsync = require('if-async')
   // Database dependencies and Connection setting
   global.mongoose = require('mongoose');
   global.mongooseSchema = mongoose.Schema;
   global.dbConnection = require('./DbConnection.js').getDbConnection()

   //global variable to hold all the environment specific configuration
   global.configurationHolder = {}

   // Application specific configuration details
   configurationHolder.config = require('./Environment.js').configVariables()

    //Application specific intial program to execute when server starts
    configurationHolder.Bootstrap = require('./Bootstrap.js')

   // Application specific security authorization middleware
   configurationHolder.security = require('../application-middlewares/AuthorizationMiddleware').AuthorizationMiddleware

   //UTILITY CLASSES
   configurationHolder.EmailUtil = require('../application-utilities/EmailUtility')
   configurationHolder.errorMessage = require('./Messages').appErrorMessages
   global.Logger = require('../application-utilities/LoggerUtility').logger

   module.exports = configurationHolder
