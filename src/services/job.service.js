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


const getAllJobs=async(userId)=>{
       const jobs=await Job.find({user:userId}).sort({createdAt:-1})

       return jobs
}

const getOneJob=async(jobId,userId)=>{

    const job=await Job.findOne({_id:jobId,
                                 user:userId})

    if(!job){
        throw new Error("Job not found!!")
    }

    return job
}

module.exports={createJob, getAllJobs,getOneJob}