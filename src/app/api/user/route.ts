import UserModel from '@/models/User'
import connectDb from '@/utils/connectDb'

export async function getUserByEmail(email: string) {
  await connectDb()
  console.log("📦 Models available:", UserModel) // debug model
  return UserModel.findOne({ email })
}

export async function createUser(email: string, password: string, name: string, role: 'admin' | 'user' = 'user') {
  await connectDb()
  return UserModel.create({
    email,
    password,
    name,
    role,
  })
}

export async function getUserById(id: string) {
  await connectDb()
  return UserModel.findById(id)
} 