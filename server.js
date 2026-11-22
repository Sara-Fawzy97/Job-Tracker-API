const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);
require('dotenv').config();
const app = require('./src/app')
const connectDB = require("./src/config/database")
const port = process.env.PORT || 3000

// const jobsRouter=require('./routes/jobs.routes')


const startServer = async () => {

    await connectDB();

    app.listen(3000, () => {
        console.log('server is running')
    })


}

// app.use('/jobs',jobsRouter)
// app.get('/',(req,res)=>{

//     res.send('Welcome express')
// })

startServer()
