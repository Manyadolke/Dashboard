import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'


// import mongoose from 'mongoose';


// add


dotenv.config();

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)

connectToDatabase();

const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
} )


// const DB= 'mongodb+srv://manyadolke:clustor-gig@cluster0.sj2xw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(DB).then(()=>{
//   console.log('connection successful');
// }).catch((err)=>console.log('no connection'));



