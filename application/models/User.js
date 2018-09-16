 var softDelete = require('mongoose-softdelete');
 var timestamps = require('mongoose-timestamp');

 var UserSchema = new mongooseSchema({
	name: {
		type: String,
		default: '',
		required: true,
		trim: true,
    validate: [stringNotNull, "Name is required."]
	},
  email: {
		type: String,
		default: '',
		required: true,
		trim: true,
    unique:true
	},
  password: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
  salt:{
    type:String,
    default:'',
    required:true,
    trim:true
  },
  created: {
	  type: Date,
		default: Date.now
	}
});

UserSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

UserSchema.plugin(timestamps);
UserSchema.plugin(softDelete);

function stringNotNull(obj){
    return obj.length
}



var User = mongoose.model('User', UserSchema);
module.exports = User
