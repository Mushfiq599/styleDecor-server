import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

// Initialize Firebase Admin SDK
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth()

const demoUsers = [
  {
    email: "user@styledecor.com",
    password: "User@123",
    displayName: "Demo User",
    role: "user",
  },
  {
    email: "admin@styledecor.com",
    password: "Admin@123",
    displayName: "Demo Admin",
    role: "admin",
  },
  {
    email: "decorator@styledecor.com",
    password: "Decorator@123",
    displayName: "Demo Decorator",
    role: "decorator",
  },
]

const seedUsers = async () => {
  try {
    console.log("🌱 Starting to seed demo users in Firebase...")

    for (const user of demoUsers) {
      try {
        // Check if user already exists
        await auth.getUserByEmail(user.email)
        console.log(`⏭️  User ${user.email} already exists, skipping...`)
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          // Create user in Firebase
          await auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.displayName,
          })
          console.log(`✅ Created user: ${user.email}`)
        } else {
          throw error
        }
      }
    }

    console.log("✅ Demo users seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding users:", error.message)
    process.exit(1)
  }
}

seedUsers()
