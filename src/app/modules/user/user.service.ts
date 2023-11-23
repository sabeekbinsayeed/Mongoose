import { User } from '../user.module'

import { TUser } from './user.interface'
//ts-node-dev --respawn --transpile-only src/server.ts
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!')
  }
  const result = await User.create(userData)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId })
  return result
}

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

const updateUserFromDB = async (userData: TUser, userId: string) => {
  if (await User.isUserExists(userData.userId.toString())) {
    // throw new Error('User already exists!')
  } else {
    throw new Error('data does not exist')
  }
  const result = await User.updateOne({ userId }, userData)
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
}
