import cors from 'cors'
import express from 'express'
import connectDb from './db/connect'
import { config } from 'dotenv'

// Load environment variables
config()

// Connect to database
connectDb

// Get port and app url
const PORT = process.env.PORT || 3000,
    APP_URL = process.env.APP_URL;

// Initialize express
const app = express()

// Body parser
app.use(express.json())

// Uploads directory
app.use('/uploads', express.static('uploads'))
app.use('/foods', express.static('foods'))

app.use(cors({
    origin: APP_URL
}))

// Routes 
const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/food')

app.use('', authRoutes)
app.use('', foodRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} >> http://localhost:${PORT}`)
})