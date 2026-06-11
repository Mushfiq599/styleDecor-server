import mongoose from "mongoose"
import dotenv from "dotenv"
import Service from "./models/Service.model.js"

dotenv.config()

const seedServices = [
  // (Copy of seed data - minimal set or the full array)
  // For brevity, we'll import from seed.js if available, otherwise define a subset here.
]

import fs from 'fs'
import path from 'path'

const loadSeedData = () => {
  const seedPath = path.join(process.cwd(), 'seed.js')
  if (!fs.existsSync(seedPath)) return []
  const content = fs.readFileSync(seedPath, 'utf-8')

  // Find the start of the seedServices array
  const idx = content.indexOf('const seedServices')
  if (idx === -1) return []
  const arrStart = content.indexOf('[', idx)
  if (arrStart === -1) return []

  // Find matching closing bracket for the array
  let i = arrStart
  let depth = 0
  while (i < content.length) {
    if (content[i] === '[') depth++
    else if (content[i] === ']') {
      depth--
      if (depth === 0) break
    }
    i++
  }
  if (depth !== 0) return []
  const arrText = content.slice(arrStart, i + 1)

  try {
    // evaluate the array text
    // eslint-disable-next-line no-eval
    const parsed = eval(arrText)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch (err) {
    console.error('Failed to eval seed array:', err.message)
    return []
  }
}

const appendSeed = async () => {
  try {
    const servicesToInsert = loadSeedData()
    if (!servicesToInsert.length) {
      console.log('No seed data found to append.')
      process.exit(0)
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    for (const s of servicesToInsert) {
      const exists = await Service.findOne({ service_name: s.service_name })
      if (exists) {
        console.log(`Skipping existing: ${s.service_name}`)
        continue
      }
      const doc = new Service(s)
      await doc.save()
      console.log(`Inserted: ${s.service_name}`)
    }

    console.log('Append seeding completed')
    process.exit(0)
  } catch (err) {
    console.error('Append seeding failed:', err.message)
    process.exit(1)
  }
}

appendSeed()
