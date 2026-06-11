import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Service from './models/Service.model.js'

dotenv.config()

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const total = await Service.countDocuments({})
    const active = await Service.countDocuments({ isActive: true })
    console.log('Total services:', total)
    console.log('Active services:', active)
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

run()
