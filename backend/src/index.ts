import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDb from '@db/connect'
import authRoutes from '@routes/auth'
import foodRoutes from '@routes/food'
import mealRoutes from '@routes/meal'

// Initialize express
const app = express()

// Connect to database
connectDb

// Load environment variables
config()

// Get port and app url
const PORT = process.env.PORT || 3000,
APP_URL = process.env.APP_URL;

// CORS
app.use(cors({
    origin: APP_URL
}))

// Body parser
app.use(express.json())

// Uploads directory
app.use('/uploads', express.static('uploads'))
app.use('/foods', express.static('foods'))

// Routes 
app.use('', authRoutes)
app.use('', foodRoutes)
app.use('', mealRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} >> http://localhost:${PORT}`)
})