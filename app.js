/**
 * Module dependencies.
 */

var mongoosemask = require('mongoosemask');
global.configurationHolder = require('./configurations/Dependencies.js')

global.app = module.exports = express();
app.use(bodyParser());
app.use(errorHandler());


global.router = express.Router();
app.use(express.static(__dirname + '/public'));
//global.route = require('./configurations/routes');
global.domain = require('./configurations/Databases.js');

//removing fields from the response
app.use(mongoosemask(function (result, mask, done) {
	var masked = mask(result, []);
	if (masked.object) {
		masked.object = mask(result.object, ['__v', 'salt', 'password']);
	}
	done(null, masked);
}));

Layers = require('./application-utilities/layers').Express;
var wiring = require('./configurations/Routes');
new Layers(app, router, __dirname + '/application/controller-service-layer', wiring);

//app.use('/',router)

configurationHolder.Bootstrap.initApp()
