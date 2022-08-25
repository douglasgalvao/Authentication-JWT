require('dotenv').config()

import express from 'express'
import cors from 'cors'
import auth from './controllers/auth'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(auth)

export default app;

