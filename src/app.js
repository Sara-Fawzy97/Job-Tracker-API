const express=require('express')
const app=express()
const authRoute=require('./routes/auth.routes')
const jobRoutes=require('./routes/job.routes')

app.use(express.json())

app.use('/auth',authRoute)
app.use('/jobs',jobRoutes)


module.exports=app