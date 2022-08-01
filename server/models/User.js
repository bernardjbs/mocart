const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Picture = require('./Picture');

let PicSchema = new Schema({
  filename: String
});

// Schema to create User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      // validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String, 
      required: true,
    },
    firstName: {
      type: String, 
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userType: String, 

    shippingDetails: [
      {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
          required: true
        },
      },
    ],
    orders: [
      {
        type: Schema.Types.Mixed, 
        ref: 'order'
      },
    ], 
    pictures: [
      {
        pictureId: {
          type: String
        },
      },
    ], 
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Hash the password before saving to database
userSchema.pre('save', function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Initialise User model
const User = model('user', userSchema);

module.exports = User;
