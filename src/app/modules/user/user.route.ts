import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/', UserControllers.createUser)
router.get('/', UserControllers.getAllUsers)
router.get('/:userId', UserControllers.getSingleUser)
router.put('/:userId', UserControllers.updateUser)
router.put('/:userId/orders', UserControllers.updateUserOrders)
router.get('/:userId/orders', UserControllers.getUserOrders)
router.get(
  '/:userId/orders/total-price',
  UserControllers.getUserOrdersTotalPrice,
)

router.delete('/:userId', UserControllers.deleteUser)

export const UserRoutes = router
