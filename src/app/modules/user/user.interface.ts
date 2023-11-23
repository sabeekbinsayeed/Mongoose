import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  lastName: string
}

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TUserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  //   orders: {
  //     productName: string
  //     price: number
  //     quantity: number
  //   }[]
  isDeleted?: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>
}
