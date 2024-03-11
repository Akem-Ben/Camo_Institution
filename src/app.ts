import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './configurations';

dotenv.config()

const app = express()

connectDB()


app.use(express.json())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use(bodyParser.json())

const {PORT} = process.env

app.listen(PORT, ()=>{
    console.log(`App listening on Port ${PORT}`)
})

export default app