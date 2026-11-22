const Job = require('../models/job.model')

const createJob=async(jobData,userId)=>{
    
const {company,position, status,location}=jobData

    const job =await Job.create({
         company,
        position,
        status,
        location,
        user:userId
    })
  
    return job;
}
module.exports={createJob}