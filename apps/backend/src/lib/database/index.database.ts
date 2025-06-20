import { connect, Connection } from 'mongoose'
import env from '@/lib/config/env'

let dbConnection: Connection | null = null

export async function connectDB() {
    if (dbConnection) {
        return dbConnection
    }

    try {
        const conn = await connect(env.MONGO_URI)
        dbConnection = conn.connection
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
        return dbConnection
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}

export function getDbConnection() {
    if (!dbConnection) {
        throw new Error('Database not connected. Call connectDB() first.')
    }
    return dbConnection
}