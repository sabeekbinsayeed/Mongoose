import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { TAddress, TUser, TUserName, UserModel } from './user/user.interface'
import config from '../config'

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'first name is required'] },
  lastName: { type: String, required: [true, 'last name is required'] },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'street is required'] },
  city: { type: String, required: [true, 'city is required'] },
  country: { type: String, required: [true, 'country  is required'] },
})

// const orderSchema = new Schema<TOrder>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// })

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  password: { type: String, required: true },
  fullName: {
    type: userNameSchema,
    required: [true, 'Guardian information is required'],
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: { type: addressSchema, required: [true, 'address is required'] },
  //   orders: [orderSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

//for deleting data
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

export const User = model<TUser, UserModel>('User', userSchema)
