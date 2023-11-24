import { Request, Response } from 'express'
import { userValidationSchema } from './user.validation'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const users = req.body

    const zodParsedData = userValidationSchema.parse(users)

    const result = await UserServices.createUserIntoDB(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'User created succesfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    const usersWithoutPassword = result.map(user => {
      const { password, ...userWithoutPassword } = user.toObject()
      return userWithoutPassword
    })

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: usersWithoutPassword,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-an
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.getSingleUserFromDB(userId)

    const { password, ...userWithoutPassword } = result.toObject()

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: userWithoutPassword,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.deleteUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userDataToUpdate = req.body

    const result = await UserServices.updateUserFromDB(userDataToUpdate, userId)
    const { password, ...userWithoutPassword } = result.toObject()

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: userWithoutPassword,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    })
  }
}
//eitake comment korlam 10.32 te
// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params

//     const { users } = req.body

//     // const zodParsedData = userValidationSchema.parse(users)

//     const result = await UserServices.updateUserFromDB(users, userId)

//     res.status(200).json({
//       success: true,
//       message: 'User is updated succesfully',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong while updating data',
//       error: err,
//     })
//   }
// }

// const updateUserOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params

//     const { order } = req.body
//     const UserData = await UserServices.getSingleUserFromDB(userId)
//     // const result = await UserServices.getSingleUserFromDB(userId)
//     const result = await UserServices.updateUserOrderFromDB(
//       UserData,
//       userId,
//       order,
//     )

//     res.status(200).json({
//       success: true,
//       message: 'User is updated succesfully',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong while updating data',
//       error: err,
//     })
//   }
// }

const updateUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { productName, price, quantity } = req.body

    const orderData = {
      productName,
      price,
      quantity,
    }

    const result = await UserServices.updateUserOrderFromDB(userId, orderData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong while updating data',
      error: err,
    })
  }
}

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getUserOrderFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Order get successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong while updating orders data',
      error: err,
    })
  }
}
const getUserOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getUserOrderTotalPriceFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'total price get successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong while total pricedata',
      error: err,
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  updateUserOrders,
  getUserOrders,
  getUserOrdersTotalPrice,
  // updateUserOrder,
}
