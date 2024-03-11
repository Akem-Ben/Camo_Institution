import mongoose from 'mongoose'
import dotenv from 'dotenv'
import setup from './setup'

const {URI} = setup

dotenv.config()

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(`${URI}`)
            console.log(`Database connected`)
    }catch(err){
        console.log(err)
    }
}