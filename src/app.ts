import express from "express"
import dotenv from "dotenv"
import {HttpError} from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser'
import {database} from './configurations'
import studentRoutes from './routes/studentRoutes/studentRoutes'
import lecturerRoutes from './routes/lecturerRoutes/lecturerRoutes.ts'
import institutionRoutes from './routes/institutionRoutes/institutionRoutes'
import examRoutes from './routes/examRoutes/examRoutes'
import courseRoutes from './routes/courseRoutes/courseRoutes'
import generalRoutes from "./routes/generalUserRoutes/generalRoutes"

const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use(bodyParser.json())
app.use("/student", studentRoutes)
app.use("/lecturer", lecturerRoutes)
app.use("/institution", institutionRoutes)
app.use("/exam", examRoutes)
app.use("/course", courseRoutes)
app.use("/user", generalRoutes)

database.sync({}).then( ()=>{
    console.log("Database is connected");
}).catch((err:HttpError)=>{
    console.log(err);
})


app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})

export default app;