import { Request, Response } from 'express'
import { userValidationSchema } from './user.validation'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    // const { users } = req.body
    const users = req.body

    const zodParsedData = userValidationSchema.parse(users)

    const result = await UserServices.createUserIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User created succesfully',
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

    res.status(200).json({
      success: true,
      message: 'Users fetched succesfully',
      data: result,
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

    res.status(200).json({
      success: true,
      message: 'User is retrieved succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.deleteUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User is deleted succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong deleting',
      error: err,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const { users } = req.body

    const zodParsedData = userValidationSchema.parse(users)

    const result = await UserServices.updateUserFromDB(zodParsedData, userId)

    res.status(200).json({
      success: true,
      message: 'User is updated succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong while updating data',
      error: err,
    })
  }
}

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
