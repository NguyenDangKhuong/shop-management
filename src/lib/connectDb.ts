import mongoose, { ConnectOptions } from 'mongoose'

import { MONGO_PASSWORD, MONGO_USER_NAME } from '../utils/constants'

const connection: any = {}
const mongoUrl = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@racroishop-management.2j99luj.mongodb.net/?retryWrites=true&w=majority`

// const mongoVercelUrl = `mongodb+srv://vercel-admin-user:vercel-admin-user-password@racroishop-management.2j99luj.mongodb.net/?retryWrites=true&w=majority`

const connectDb = async () => {
  try {
    if (connection.isConnected) {
      console.log('DB is already connected, haha')
      return
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState
      if (connection.isConnected === 1) {
        // use existing database connection
        console.log('Use previous connection, hihi')
        return
      }
      await mongoose.disconnect()
    }

    const db = await mongoose.connect(mongoUrl, {
      dbName: 'main'
    } as ConnectOptions)
    console.log('MongoDB connected, yeah')
    connection.isConnected = db.connections[0].readyState
  } catch (error: any) {
    console.log(error)
    console.log(`MongoDB can't connected, hic error is`, error.message)
    // throw new Error(`MongoDB can't connected, hic error is`, error.message);
    process.exit(1)
  }
}

export default connectDb

export const disconnectDb = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('not discounted')
    }
  }
}
