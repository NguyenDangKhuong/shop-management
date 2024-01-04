import mongoose, { ConnectOptions } from 'mongoose'

const connection: any = {}
const mongoUrl = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER_NAME}:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@racroishop-management.2j99luj.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
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
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: 'main'
    } as ConnectOptions)
    console.log('MongoDB connected, yeah')
    connection.isConnected = db.connections[0].readyState
  } catch (error: any) {
    console.log(`MongoDB can't connected, hic`)
    console.log(error.message)
    process.exit(1)
  }
}

export const disconnectDB = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('not discounted')
    }
  }
}

export default connectDB
