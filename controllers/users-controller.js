const UserModel = require('../models/users.model')

const addUser = async (req, res) => {
  let existingUser
  let taskArray = []

  let {
    tokenType,
    accessToken,
    scope,
    loginHint,
    idToken,
    idpId,
    expiresIn,
    firstIssuedAt,
    expiresAt,
    googleId,
    imageUrl,
    email,
    name,
    givenName,
    familyName
  } = req.body

  try {
    existingUser = await UserModel.findOne({
      googleId: googleId
    })
    if (existingUser) {
      taskArray = existingUser.taskArray
      await existingUser.remove()
    }
    const user = new UserModel({
      tokenType,
      accessToken,
      scope,
      loginHint,
      idToken,
      idpId,
      expiresIn,
      firstIssuedAt,
      expiresAt,
      googleId,
      imageUrl,
      email,
      name,
      givenName,
      familyName,
      taskArray
    })
    await user.save()
    res.send({
      status: 201
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

const updateUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  const {
    taskArray
  } = req.body

  try {
    user = await UserModel.findOne({
      googleId: id
    })
    user.taskArray = taskArray
    await user.save()
    res.send({
      status: 201
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

const getUser = async (req, res) => {
  let user
  let taskArray = []

  const {
    id
  } = req.params

  try {
    user = await UserModel.findOne({
      googleId: id
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

exports.addUser = addUser
exports.updateUser = updateUser
exports.getUser = getUser
