#Steps to Setup and Start the Server
  # First of all create the Database in mongodb,
      name: hrg, user:admin, password:hrg

  # Go to the project direcory,

  # Run the command,
      npm install

  # Now to start the server, run the following command:
      NODE_ENV=development nohup node app.js &
      for the development environment

      NODE_ENV=production nohup node app.js &
      for the production environment

      and so on.. According to the environments in the Environment.js file in configurations direcory

  # Now the server is started and start hitting the APIs from the API interaction app like Postman.

# APIs : All the APIs can be found in the Routes.js file in the configurations direcory

  # Create User API(POST): /api/Create

    # Payload Example:
      {
        "userData":{
          "name":"Rajat",
          "email":"rajatkatiyar@gmail.com",
          "password":"123456"
        }
      }

    # Content-Type : application/json

    # Response Example:
      {
        "error": false,
        "object": {
            "deletedAt": null,
            "deleted": false,
            "createdAt": "2018-09-16T12:03:33.655Z",
            "updatedAt": "2018-09-16T12:03:33.655Z",
            "id": "5b9e46951eb70d617d02ddaf",
            "created": "2018-09-16T12:03:33.648Z",
            "email": "rajatkatiyar@gmail.com",
            "name": "Rajat"
            },
        "message": "",
        "extendedMessage": "",
        "timeStamp": 1537099413664
      }

  # User Login API(POST): /api/login

    # Payload Example:
      {
        "userData":{
          "email":"rajatkatiyar@gmail.com",
          "password":"123456"
        }
      }

    # Content-Type : application/json

    # Response Example:
      {
        "error": false,
        "object": {
            "authToken": "aeaed310-b9a7-11e8-a3ec-bf58ad2851e0",
            "user": {
                "name": "Rajat",
                "email": "rajatkatiyar@gmail.com",
                "created": "2018-09-16T10:04:42.892Z"
            }
        },
        "message": "",
        "extendedMessage": "",
        "timeStamp": 1537099047654
      }

  #Forgot API(POST): /api/forgot  
    # Since this API sends an Email to the User, so please update the emailFrom and password fields in the Environment.js file in the configurations direcory
    
    # Payload Example:
      {
        "userData":{
          "email":"rajatkatiyar@gmail.com"
        }
      }

    # Content-Type : application/json

    # Response Example:
      {
	    "error": false,
	    "object": {
		"link": "http://domainname.com/reset/token/32023160-b9af-11e8-b1e0-496b6353dd56",
		"token": "32023160-b9af-11e8-b1e0-496b6353dd56"
	    },
	    "message": "",
	    "extendedMessage": "",
	    "timeStamp": 1537102274449
      }

    #Reset API(POST): /api/reset/
    # Payload Example:
      {
        "userData":{
          "email":"rajatkatiyar@gmail.com",
          "verificationToken":"b29cdd80-b9a4-11e8-ba09-47d5aadafa3e",
		      "newPassword":"abcdef"
        }
      }

    # Content-Type : application/json

    # Response Example:
      {
	    "error": false,
	    "object": {
		"error": false,
		"success": true,
		"message": "The Password has been udated Successfully"
	    },
	    "message": "",
	    "extendedMessage": "",
	    "timeStamp": 1537102344095
      }

#Project Structure

 # It has all the layers of the application Controller , Services and Views. Controllers and Services resides in controller-service-layer and it was automatically binded to routes at the time of application boot.

 #Views decides the response type depending upon content-type of request.

 # 2. configurations [Directory]


  #Insides configurations deirectory resides following files

  # a. Messages - A file that will contain all kind of message error and success. Change at one place and reflect at every place.

  # b. Bootstrap - A file contains all the functions that should run at the boot time.

  # c. Environment - A file that contains constant of application like port, email configurations , roles etc

  # d. Dependencies - File contains all the dependecies used in the project

  # e. Routes - File which decides for which url , which controller and which acction will be called.

  # 3. application-middleware [Directory]

  # Directory which will contain all the custom middleware used in the project.

  # 4. application-utility [Directory]
  # Contains all the utility functions like mail sending , aws upload etc.
