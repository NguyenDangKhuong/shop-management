import connectDb from '@/lib/connectDb'
import UserModel from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDb()
    const { email, password, name } = await req.json()

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "Email đã tồn tại" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
      email,
      password: hashed,
      name,
      role: "user",
    })

    return NextResponse.json({ message: "Tạo user thành công" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Đã có lỗi xảy ra" }, { status: 500 })
  }
}
