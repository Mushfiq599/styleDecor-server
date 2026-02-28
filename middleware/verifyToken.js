import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    // Get token from request header
    const authHeader = req.headers.authorization

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized! No token provided." })
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1]

    try {
        // Verify token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Attach decoded user info to request
        req.user = decoded

        // Move to next middleware/route
        next()
    } catch (error) {
        return res.status(403).json({ message: "Forbidden! Invalid or expired token." })
    }
}

export default verifyToken
//     ```

// **What's happening here?**

// Every protected API call will pass through this function first. Think of it like a security guard at a door:
// - No token → 401 Unauthorized (you can't even enter)
// - Wrong/expired token → 403 Forbidden (wrong key)
// - Valid token → `next()` → allowed through ✅

// The token comes in the request header like:
// ```
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...