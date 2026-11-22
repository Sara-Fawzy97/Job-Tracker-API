const jobService=require('../services/job.service')


const addNewJob=async (req,res)=>{
    try{ 
    // const {company, position,status,location}=req.body

    const jobData=req.body
   
    const newjob=await jobService.createJob(jobData,req.user.userId);
    
    res.status(201).json({
        message:'new job added successfully',
        data:newjob
    })
    }
    catch(error){
        res.status(500).json({
            message:'Somthing went wrong from controller ',
            error:error.message
        })
    }
}

module.exports={addNewJob}