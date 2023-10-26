const jobs=[];

const getAllJobs = (userid) =>{
    const userData = jobs.filter(g => g.userid === userid);
    return userData;
}

const addJob = (position, company, jobLocation, jobType, jobStatus, dateOfInterview, userid) => {
    let jobId=newJobId();
    jobs.push({jobId,userid, position, company, jobLocation, jobType, jobStatus, dateOfInterview});
    return 'Nice';
}

const editJob = (position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, editJobId) =>
{
        objIndex = jobs.findIndex((obj => obj.jobId == editJobId));
        jobs[objIndex]={
            ...jobs[objIndex],
            position: position || jobs[objIndex].position,
            company: company || jobs[objIndex].company,
            jobLocation: jobLocation || jobs[objIndex].jobLocation,
            jobType: jobType || jobs[objIndex].jobType,
            jobStatus: jobStatus || jobs[objIndex].jobStatus, 
            dateOfInterview: dateOfInterview || jobs[objIndex].dateOfInterview, 
            jobId:newJobId(),}
}

const deleteJob = (jobId) => {
    objIndex = jobs.findIndex((obj => obj.jobId === jobId));
    jobs.splice(objIndex,1);
}

function newJobId(){
    let jobId=1
    if(!jobs.find(j => j.jobId))
    {
        jobId=1;
    }
    else
    {
        jobId=Math.max(...jobs.map(job => job.jobId))+1;
    }

    return jobId;
}

module.exports = {
    getAllJobs,
    addJob,
    editJob,
    deleteJob,
};