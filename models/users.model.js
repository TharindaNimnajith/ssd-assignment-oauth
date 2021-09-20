const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  userId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  tokenType: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  accessToken: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  scope: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  loginHint: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  idToken: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  idpId: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  expiresIn: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  firstIssuedAt: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  expiresAt: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  givenName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  familyName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  taskArray: [{
    id: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    title: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    completed: {
      type: Boolean,
      required: false,
      unique: false,
      default: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Users'
})

UsersSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

UsersSchema.plugin(autoIncrement.plugin, {
  model: 'Users',
  field: 'userId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Users', UsersSchema)
