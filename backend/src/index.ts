import cors from 'cors'
import express from 'express'
import connectDb from './db'
import { config } from 'dotenv'

// Load environment variables
config()

// Connect to database
connectDb

const PORT = process.env.PORT || 3000,
APP_URL = process.env.APP_URL;

// Initialize express
const app = express()

// Uploads directory
app.use('/uploads', express.static('uploads'))

app.use(cors({
    origin: APP_URL
}))

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} >> http://localhost:${PORT}`)
})