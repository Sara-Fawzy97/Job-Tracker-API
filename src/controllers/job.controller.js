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

const getAllJobs=async(req,res)=>{
      try{
        const jobs=await jobService.getAllJobs(req.user.userId)
        res.status(200).json({
            success:true,
            results:jobs.length,
            data:jobs
        })
      }
        catch(error){
            res.status(500).json({
                message:'Something wrong',
                error:error.message
            })
        }
      
}

const getOneJob=async(req,res)=>{
   try{
    const jobId=req.params.id;
    const userId=req.user.userId

    const job=await jobService.getOneJob(jobId,userId)

     res.status(200).json({
        status:true,
        data:job
     })
   }
   catch(error){
    res.status(500).json({
        message:'Something wrong ',
    error:error.message
    })
   }

}


const updateJob=async(req,res)=>{
    try{
        const jobId=req.params.id
            const updatedData=req.body;

            const job=await jobService.updateJob(jobId,req.user.userId,updatedData)

            res.status(200).json({
                status:true,
                data:job,
                message:'job updated successfully'
            })
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:"something went wrong",
            error:error.message
        })
    }
}
const deleteJob=async(req,res)=>{
    try{

      await jobService.deleteJob(req.params.id,req.user.userId)

       res.status(200).json({
                status:true,
                message:'job deleted successfully'
            })
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:"something went wrong",
            error:error.message
        })
    }
}
module.exports={addNewJob,getAllJobs,getOneJob,updateJob,deleteJob}