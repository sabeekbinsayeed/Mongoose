import { Request, Response } from 'express'
import { userValidationSchema } from './user.validation'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body

    const zodParsedData = userValidationSchema.parse(users)

    const result = await UserServices.createUserIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User created succesfully',
      data: result,
    })
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
    console.log(err)
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
  } catch (err) {
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
  } catch (err) {
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
      message: err.message || 'something went wrong',
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
