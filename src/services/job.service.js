const Job = require('../models/job.model')

const createJob = async (jobData, userId) => {

    const { company, position, status, location } = jobData

    const job = await Job.create({
        company,
        position,
        status,
        location,
        user: userId
    })

    return job;
}


const getAllJobs = async (userId, filters) => {
    const query = {
        user: userId,
    }
    //search
    if (filters.search) {
        query.$or = [
            {
                position: {
                    $regex: filters.search,
                    $options: 'i'
                }
            },
            {
                company: {
                    $regex: filters.search,
                    $options: 'i'
                }
            }, {
                location: {
                    $regex: filters.search,
                    $options: 'i'
                }
            }
        ]
    }

//filter by status
    if (filters.status) {
        query.status = filters.status
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 })

    return jobs
}

const getOneJob = async (jobId, userId) => {

    const job = await Job.findOne({
        _id: jobId,
        user: userId
    })

    if (!job) {
        throw new Error("Job not found!!")
    }

    return job
}

const updateJob = async (jobId, userId, jobData) => {
    const { company, position, status, location } = jobData

    const updates = {}

    if (company !== undefined) updates.company = company;
    if (position !== undefined) updates.position = position;
    if (status !== undefined) updates.status = status;
    if (location !== undefined) updates.location = location;

    const job = await Job.findOneAndUpdate({ _id: jobId, user: userId }, updates, {
        new: true,
        runValidators: true
    })

    if (!job) {
        throw new Error('job not found')
    }

    return job
}

const deleteJob = async (jobId, userId) => {
    const job = await Job.findOneAndDelete({ _id: jobId, user: userId })


    if (!job) {
        throw new Error('job not found')
    }

    return job
}

module.exports = { createJob, getAllJobs, getOneJob, updateJob, deleteJob }