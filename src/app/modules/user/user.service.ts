import { User } from '../user.module'

import { TOrder, TUser } from './user.interface'
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

// const updateUserOrderFromDB = async (
//   userData: TUser,
//   userId: string,
//   orders: TOrder,
// ) => {
//   if (await User.isUserExists(userData.userId.toString())) {
//     // throw new Error('User already exists!')
//   } else {
//     throw new Error('data does not exist')
//   }

//   if (!User.orders) {
//     User.orders = []
//   }

//   const result = await User.updateOne({ userId }, userData)
//   return result
// }

const updateUserOrderFromDB = async (userId: string, orderData: TOrder) => {
  try {
    const existingUser = await User.findOne({ userId })

    if (!existingUser) {
      throw new Error('User not found')
    }

    if (!existingUser.orders) {
      existingUser.orders = [] // Create 'orders' array if it doesn't exist
    }

    existingUser.orders.push(orderData) // Add new order to the 'orders' array

    const result = await existingUser.save()
    return result
  } catch (err) {
    throw new Error(err.message || 'Error updating user order')
  }
}

const getUserOrderFromDB = async (userId: string) => {
  try {
    const existingUser = await User.findOne({ userId })

    if (!existingUser) {
      throw new Error('User not found')
    }
    const order_result = { orders: existingUser.orders }

    return order_result
  } catch (err) {
    throw new Error(err.message || 'Error getting user order')
  }
}

const getUserOrderTotalPriceFromDB = async (userId: string) => {
  try {
    const existingUser = await User.findOne({ userId })

    if (!existingUser) {
      throw new Error('User not found')
    }
    const order_result = { orders: existingUser.orders }
    let totalPrice = 0

    for (let i = 0; i < order_result.orders.length; i++) {
      totalPrice +=
        order_result.orders[i].price * order_result.orders[i].quantity
    }

    return totalPrice
  } catch (err) {
    throw new Error(err.message || 'Error getting user order')
  }
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  updateUserOrderFromDB,
  getUserOrderFromDB,
  getUserOrderTotalPriceFromDB,
  // updateUserOrderFromDB,
}
