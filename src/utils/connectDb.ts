import mongoose, { ConnectOptions } from 'mongoose'

import { MONGO_CLUSTER_URL, MONGO_DB_NAME, MONGO_PASSWORD, MONGO_USER_NAME } from './constants'

const connection: any = {}
let pending: Promise<void> | null = null

const mongoUrl = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_URL}/?retryWrites=true&w=majority`

const connectDb = async () => {
  try {
    // If there's already a connection in progress, wait for it
    if (pending) {
      await pending
      return
    }

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

    // Create a promise for the connection
    pending = (async () => {
      const db = await mongoose.connect(mongoUrl, {
        dbName: MONGO_DB_NAME
      } as ConnectOptions)
      console.log('MongoDB connected, yeah')
      connection.isConnected = db.connections[0].readyState
      pending = null
    })()

    await pending
  } catch (error: any) {
    pending = null
    console.log(error)
    console.log(`MongoDB can't connected, hic error is`, error.message)
    throw error
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
